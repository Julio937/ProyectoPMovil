import { Entypo, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import config from '../logic/config';

export default function Transactions() {
  const navigation = useNavigation();

  const [transacciones, setTransacciones] = useState([]);
  const [loading, setLoading] = useState(true);

  const handHome = () => {
    navigation.navigate('Home');
  };

  const handBalance = () => {
    navigation.navigate('Balance');
  };

  const handTrade = () => {
    navigation.navigate('Trade');
  };
  const handConfiguration = () => {
    navigation.navigate('Configuration');
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const fetchTransacciones = async () => {
    try {
      setLoading(true);
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        const decodedToken = jwtDecode(userToken);
        const userId = decodedToken.usuario.id;

        // Asegúrate de que la ruta coincida con tu endpoint de backend
        const response = await axios.get(`${config.SERVER_IP}/transaccion`, {
          params: { usuario_id: userId },
        });
        setTransacciones(response.data);
      } else {
        console.error('No se encontró el token del usuario.');
      }
    } catch (error) {
      console.error('Error al obtener las transacciones:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransacciones();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Transacciones</Text>
        <TouchableOpacity style={styles.profileButton} onPress={handleProfile}>
          <Ionicons name='person-circle-outline' size={24} color='#F0B90B' />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.transactionsList}>
        {loading ? (
          <ActivityIndicator size='large' color='#F0B90B' />
        ) : (
          transacciones.map((transaccion, index) => (
            <View key={index} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <Text style={styles.transactionTitle}>
                  {transaccion.tipo === 'compra' ? 'Compra' : 'Venta'} de acciones
                </Text>
                <Text style={styles.transactionDate}>
                  {new Date(transaccion.fecha_transaccion).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.transactionRight}>
                <Text style={styles.transactionAmount}>
                  {transaccion.tipo === 'compra' ? '-' : '+'}${transaccion.cantidad * transaccion.precio_unitario}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={handHome}>
          <Ionicons name='pie-chart-outline' size={24} color='white' />
          <Text style={styles.menuItemText}>Resumen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handTrade}>
          <Entypo name='line-graph' size={24} color='white' />
          <Text style={styles.menuItemText}>Operar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handBalance}>
          <Ionicons name='wallet-outline' size={24} color='white' />
          <Text style={styles.menuItemText}>Balance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handConfiguration}>
          <Ionicons name='settings-outline' size={24} color='white' />
          <Text style={styles.menuItemText}>Configuración</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerText: {
    color: '#F0B90B',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileButton: {
    justifyContent: 'center',
  },
  transactionsList: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  transactionLeft: {
    flex: 1,
  },
  transactionRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  transactionTitle: {
    color: '#F0B90B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionDate: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  transactionAmount: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 20,
    paddingBottom: 20,
  },
  menuItem: {
    alignItems: 'center',
  },
  menuItemText: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
});
