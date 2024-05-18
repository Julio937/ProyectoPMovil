import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CountryScreen() {
  const navigation = useNavigation();

  const handleGoToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>País</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder='País' />
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.goBackButton} onPress={handleGoToLogin}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
    padding: 20,
  },
  title: {
    color: '#F0B90B',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#333333',
    borderRadius: 5,
    color: 'white',
    fontSize: 16,
    height: 50,
    marginBottom: 20,
    padding: 10,
  },
  registerButton: {
    alignItems: 'center',
    backgroundColor: '#F0B90B',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  goBackButton: {
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
  },
});
