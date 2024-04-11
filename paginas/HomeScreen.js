import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.marketOverview}>
        <Text style={styles.marketOverviewText}>Estado actual del mercado</Text>
        {/* Aquí puedes agregar componentes para mostrar el estado del mercado */}
      </View>
      <View style={styles.walletInfo}>
        <Text style={styles.walletInfoText}>Billetera del usuario</Text>
        {/* Aquí puedes agregar componentes para mostrar información de la billetera */}
      </View>
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name='pie-chart-outline' size={24} color='white' />
          <Text style={styles.menuItemText}>Resumen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name='wallet-outline' size={24} color='white' />
          <Text style={styles.menuItemText}>Billetera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name='list-outline' size={24} color='white' />
          <Text style={styles.menuItemText}>Transacciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  marketOverview: {
    flex: 1,
    justifyContent: 'center',
  },
  marketOverviewText: {
    color: '#F0B90B',
    fontSize: 24,
    textAlign: 'center',
  },
  walletInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  walletInfoText: {
    color: '#F0B90B',
    fontSize: 24,
    textAlign: 'center',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
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
});
