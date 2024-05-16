import { Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation();

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.marketOverview}>
        <Text style={styles.sectionTitle}>Estado actual del mercado</Text>
        <Text style={styles.marketOverviewText}>Dow Jones: +0.45%</Text>
        <Text style={styles.marketOverviewText}>S&P 500: +0.60%</Text>
      </View>

      <View style={styles.walletInfo}>
        <Text style={styles.sectionTitle}>Balance de la cuenta</Text>
        <Text style={styles.walletInfoText}>$12,345.67</Text>
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
});
