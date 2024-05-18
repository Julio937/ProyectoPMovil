import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CountryScreen() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>País</Text>
      <TouchableOpacity style={styles.countryButton} onPress={handleGoBack}>
        <Text style={styles.buttonCountryText}>Colombia</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.countryButton} onPress={handleGoBack}>
        <Text style={styles.buttonCountryText}>Bolivia</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.countryButton} onPress={handleGoBack}>
        <Text style={styles.buttonCountryText}>Mexico</Text>
      </TouchableOpacity>
      <View style={styles.form}>
        <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
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
    marginTop: 20,
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
  countryButton: {
    alignItems: 'center',
    backgroundColor: '#F0B90B',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonCountryText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
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
