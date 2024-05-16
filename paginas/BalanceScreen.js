import { Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BalanceContext } from '../logic/Context';

export default function BalanceScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false); // Simula el estado de carga de datos

  const context = useContext(BalanceContext);

  const balance = context?.balance;
  const earnings = context?.earnings;

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Balance</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name='person-circle-outline' size={24} color='#F0B90B' />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.walletContent}>
        {loading ? (
          <ActivityIndicator size='large' color='#F0B90B' />
        ) : (
          <>
            <View style={styles.walletCard}>
              <Text style={styles.walletCardTitle}>Saldo disponible</Text>
              <Text style={styles.walletInfoText}>${balance ? balance.toLocaleString() : '0'}</Text>
            </View>
            <View style={styles.walletCard}>
              <Text style={styles.walletCardTitle}>Ganancias totales</Text>
              <Text style={styles.walletInfoText}>${earnings ? earnings.toLocaleString() : '0'}</Text>
            </View>
          </>
        )}
      </ScrollView>

      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Home')}>
          <Ionicons name='pie-chart-outline' size={24} color='white' />
          <Text style={styles.menuItemText}>Resumen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Trade')}>
          <Entypo name='line-graph' size={24} color='white' />
          <Text style={styles.menuItemText}>Operar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Transactions')}>
          <Ionicons name='list-outline' size={24} color='white' />
          <Text style={styles.menuItemText}>Transacciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Configuration')}>
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
  walletContent: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  walletCard: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  walletCardTitle: {
    color: '#F0B90B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  walletInfoText: {
    color: 'white',
    fontSize: 24,
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
