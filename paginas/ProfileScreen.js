import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const navigation = useNavigation();

  // Estado local para los datos del perfil
  const [profileData, setProfileData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    // Cargar los datos del perfil solo en la primera renderización
    loadProfileData();
  }, []);

  const loadProfileData = () => {
    // Simular cargar los datos del perfil desde un almacenamiento externo (por ejemplo, AsyncStorage)
    const storedProfileData = {
      name: 'Julian',
      lastName: 'Vallejo',
      email: 'julian@example.com',
      password: '********',
    };

    // Actualizar el estado local con los datos del perfil cargados
    setProfileData(storedProfileData);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSaveProfile = () => {
    console.log('Perfil Guardado');
    console.log('Nombre:', profileData.name);
    console.log('Apellido:', profileData.lastName);
    console.log('Correo Electrónico:', profileData.email);
    console.log('Contraseña:', profileData.password);

    alert('Perfil guardado localmente');
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
        <TextInput
          style={styles.input}
          placeholder='Contraseña'
          value={profileData.password}
          onChangeText={(text) => setProfileData({ ...profileData, password: text })}
          secureTextEntry={true}
        />
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
});
