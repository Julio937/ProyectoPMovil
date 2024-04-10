import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.marketOverview}>
        <View style={styles.marketOverviewBox}>
          <Text style={styles.marketOverviewText}>Estado actual del mercado</Text>
          {/* Aquí puedes agregar componentes para mostrar el estado del mercado */}
        </View>
      </View>
      <View style={styles.walletInfo}>
        <View style={styles.walletInfoBox}>
          <Text style={styles.walletInfoText}>Billetera del usuario</Text>
          {/* Aquí puedes agregar componentes para mostrar información de la billetera */}
        </View>
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
