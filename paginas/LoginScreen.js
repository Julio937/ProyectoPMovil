import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import config from '../logic/config';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const loginData = {
        correo: email,
        contraseña: password,
      };

      const response = await axios.post(`${config.SERVER_IP}/auth/iniciar-sesion`, loginData);
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

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Acciones & Gestión</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='Correo electrónico'
          placeholderTextColor='#B0B0B0'
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='Contraseña'
          placeholderTextColor='#B0B0B0'
          secureTextEntry={true}
          autoCapitalize='none'
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp}>
        <Text style={styles.loginText}>Registrarse</Text>
      </TouchableOpacity>
      <StatusBar style='auto' />
      {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#F0B90B',
    marginBottom: 50,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#333',
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#F0B90B',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: '#141414',
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
