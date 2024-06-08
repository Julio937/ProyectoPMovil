import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import config from '../logic/config';

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [errorMessage, setErrorMessage] = useState('');

  const [registerData, setRegisterData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    id_card: '',
    country: '',
  });
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Obtener la lista de países desde el backend
    axios
      .get(`${config.SERVER_IP}/paises`)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los países', error);
      });
  }, []);

  const validateEmail = (text) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(text);
  };

  const isRegisterEnabled =
    registerData.name &&
    registerData.lastName &&
    registerData.email &&
    registerData.password &&
    registerData.id_card &&
    validateEmail(registerData.email) &&
    registerData.country;

  const handleRegister = async () => {
    try {
      const userData = {
        nombre: registerData.name,
        apellido: registerData.lastName,
        correo: registerData.email,
        contraseña: registerData.password,
        cedula: registerData.id_card,
        pais_id: registerData.country,
      };

      const response = await axios.post(`${config.SERVER_IP}/auth/registrar`, userData);
      if (response.data && response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
        navigation.navigate('Home');
      } else {
        console.error('No se recibió un token del servidor');
      }
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  };

  const handleGoToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Nombre'
          value={registerData.name}
          onChangeText={(text) => setRegisterData({ ...registerData, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder='Apellido'
          value={registerData.lastName}
          onChangeText={(text) => setRegisterData({ ...registerData, lastName: text })}
        />
        <TextInput
          style={styles.input}
          placeholder='Correo Electrónico'
          value={registerData.email}
          onChangeText={(text) => setRegisterData({ ...registerData, email: text })}
          keyboardType='email-address'
        />
        <TextInput
          style={styles.input}
          placeholder='Contraseña'
          value={registerData.password}
          onChangeText={(text) => setRegisterData({ ...registerData, password: text })}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder='Cédula'
          value={registerData.id_card}
          onChangeText={(text) => setRegisterData({ ...registerData, id_card: text })}
          keyboardType='numeric'
        />
        <Picker
          selectedValue={registerData.country}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setRegisterData({ ...registerData, country: itemValue })}
        >
          {countries.map((country, index) => (
            <Picker.Item key={index} label={country.nombre} value={country.id} />
          ))}
        </Picker>
      </View>
      <TouchableOpacity
        style={[styles.registerButton, !isRegisterEnabled && { opacity: 0.5 }]}
        onPress={handleRegister}
        disabled={!isRegisterEnabled}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoToLogin}>
        <Text style={styles.buttonText}>Volver al inicio de sesión</Text>
      </TouchableOpacity>
      {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#F0B90B',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#F0B90B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'white',
    backgroundColor: '#333',
    marginBottom: 10,
  },
  goBackButton: {
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
