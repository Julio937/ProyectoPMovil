import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import config from '../logic/config';

export default function CountryScreen() {
  const navigation = useNavigation();
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    // Obtener la lista de países desde el backend
    axios
      .get(`${config.SERVER_IP}/paises`)
      .then((response) => {
        setPaises(response.data);
      })
      .catch((error) => {
        console.error('Hubo un error al obtener los países', error);
      });
  }, []);

  const handleSelectCountry = (pais) => {
    // Aquí puedes manejar la selección del país, por ejemplo, guardarlo en el estado global o en AsyncStorage
    console.log('País seleccionado:', pais);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>País</Text>
      <FlatList
        data={paises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.countryButton} onPress={() => handleSelectCountry(item)}>
            <Text style={styles.buttonCountryText}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.form}>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
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
