import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [registerData, setRegisterData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    cedula: '',
  });

  const validateEmail = (text) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(text);
  };

  const isRegisterEnabled =
    registerData.name &&
    registerData.lastName &&
    registerData.email &&
    registerData.password &&
    registerData.cedula &&
    validateEmail(registerData.email);

  const handleRegister = () => {
    console.log('Registro completado');
    console.log('Nombre:', registerData.name);
    console.log('Apellido:', registerData.lastName);
    console.log('Correo Electrónico:', registerData.email);
    console.log('Contraseña:', registerData.password);
    console.log('Cédula:', registerData.cedula);

    navigation.navigate('Home');
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
          value={registerData.cedula}
          onChangeText={(text) => setRegisterData({ ...registerData, cedula: text })}
          keyboardType='numeric'
        />
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
});
