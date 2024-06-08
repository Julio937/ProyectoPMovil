import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import config from '../logic/config';

export default function ProfileScreen() {
  const navigation = useNavigation();

  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [paises, setPaises] = useState([]);
  const [profileData, setProfileData] = useState({
    name: '',
    lastName: '',
    email: '',
    country: '',
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const fetchPaises = async () => {
    try {
      const response = await axios.get(`${config.SERVER_IP}/paises`);
      setPaises(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de países:', error);
    }
  };

  useEffect(() => {
    fetchPaises();
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        const decodedToken = jwtDecode(userToken);
        setUserId(decodedToken.usuario.id);

        const response = await axios.get(`${config.SERVER_IP}/usuarios/${decodedToken.usuario.id}`);
        setProfileData({
          name: response.data.nombre,
          lastName: response.data.apellido,
          email: response.data.correo,
          country: response.data.pais_id.toString(),
          password: '',
        });
      } else {
        setErrorMessage('No se encontró el token del usuario.');
      }
    } catch (error) {
      console.error('Error al obtener los datos del perfil:', error);
      setErrorMessage('Error al obtener los datos del perfil.');
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleSaveProfile = async () => {
    try {
      const response = await axios.put(`${config.SERVER_IP}/usuarios/${userId}`, {
        nombre: profileData.name,
        apellido: profileData.lastName,
        correo: profileData.email,
        pais_id: profileData.country,
      });

      if (response.status === 200) {
        alert('Perfil actualizado con éxito.');
      } else {
        console.error('Error al actualizar el perfil:', response.data);
      }
    } catch (error) {
      console.error('Error al guardar el perfil:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Nombre'
          value={profileData.name}
          onChangeText={(text) => setProfileData({ ...profileData, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder='Apellido'
          value={profileData.lastName}
          onChangeText={(text) => setProfileData({ ...profileData, lastName: text })}
        />
        <TextInput
          style={styles.input}
          placeholder='Correo Electrónico'
          value={profileData.email}
          onChangeText={(text) => setProfileData({ ...profileData, email: text })}
          keyboardType='email-address'
        />
        <Picker
          selectedValue={profileData.country}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setProfileData({ ...profileData, country: itemValue })}
        >
          {paises.map((pais, index) => (
            <Picker.Item key={index} label={pais.nombre} value={pais.id.toString()} />
          ))}
        </Picker>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Guardar Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Volver</Text>
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
  saveButton: {
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
  input: {
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  picker: {
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
});
