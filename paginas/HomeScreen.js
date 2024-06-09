import { Entypo, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import config from '../logic/config';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [balance, setBalance] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [userId, setUserId] = useState(null);
  const [accionesDisponibles, setAccionesDisponibles] = useState([]);

  const handBalance = () => {
    navigation.navigate('Balance');
  };
  const handTrade = () => {
    navigation.navigate('Trade');
  };
  const handTransactions = () => {
    navigation.navigate('Transactions');
  };
  const handConfiguration = () => {
    navigation.navigate('Configuration');
  };
  const fetchUserData = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        const decodedToken = jwtDecode(userToken);
        const userId = decodedToken.usuario.id;

        const balanceResponse = await axios.get(`${config.SERVER_IP}/usuarios/${userId}/balance`);
        setBalance(balanceResponse.data.balance);

        const earningsResponse = await axios.get(`${config.SERVER_IP}/usuarios/${userId}/earnings`);
        setEarnings(earningsResponse.data.earnings);
      } else {
        console.error('No se encontró el token del usuario.');
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };
  const fetchAccionesDisponibles = async () => {
    try {
      const response = await axios.get(`${config.SERVER_IP}/acciones?limit=5&order=desc`);
      setAccionesDisponibles(response.data);
    } catch (error) {
      console.error('Error al obtener las acciones disponibles:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchAccionesDisponibles();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.marketOverview}>
        <Text style={styles.sectionTitle}>Acciones disponibles</Text>
        {accionesDisponibles.slice(0, 5).map((accion, index) => (
          <View key={index} style={styles.accionItem}>
            <Text style={styles.accionText}>
              {accion.nombre}: ${accion.valor_dolares}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.walletInfo}>
        <Text style={styles.sectionTitle}>Balance de la cuenta</Text>
        <Text style={styles.walletInfoText}>${balance.toLocaleString()}</Text>
        <Text style={styles.sectionTitle}>Ganancias</Text>
        <Text style={styles.walletInfoText}>${earnings.toLocaleString()}</Text>
      </View>

      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={handBalance}>
          <Ionicons name='wallet-outline' size={24} color='white' />
          <Text style={styles.menuItemText}>Balance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handTrade}>
          <Entypo name='line-graph' size={24} color='white' />
          <Text style={styles.menuItemText}>Operar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handTransactions}>
          <Ionicons name='list-outline' size={24} color='white' />
          <Text style={styles.menuItemText}>Transacciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handConfiguration}>
          <Ionicons name='settings-outline' size={24} color='white' />
          <Text style={styles.menuItemText}>Configuración</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style='auto' />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  marketOverview: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    width: '90%',
    padding: 10,
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#F0B90B',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  marketOverviewText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  },
  walletInfo: {
    flex: 1,
    justifyContent: 'center',
    width: '90%',
    padding: 10,
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    marginBottom: 20,
  },
  walletInfoText: {
    color: '#ffffff',
    fontSize: 24,
    textAlign: 'center',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  menuItem: {
    alignItems: 'center',
  },
  menuItemText: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
  accionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  accionText: {
    color: 'white',
    fontSize: 18,
  },
});
