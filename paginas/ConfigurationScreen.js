import { Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ConfigurationScreen() {
  const navigation = useNavigation();

  const handHome = () => {
    navigation.navigate('Home');
  };

  const handBalance = () => {
    navigation.navigate('Balance');
  };

  const handTrade = () => {
    navigation.navigate('Trade');
  };

  const handTransactions = () => {
    navigation.navigate('Transactions');
  };

  const handleNotifications = () => {
    navigation.navigate('Notifications');
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleCountry = () => {
    navigation.navigate('Country');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Configuración</Text>
      </View>
      <ScrollView style={styles.settingsList}>
        <TouchableOpacity style={styles.settingItem} onPress={handleNotifications}>
          <Text style={styles.settingText}>Notificaciones</Text>
          <Ionicons name='notifications-outline' size={24} color='#F0B90B' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={handleCountry}>
          <Text style={styles.settingText}>País</Text>
          <Ionicons name='flag-outline' size={24} color='#F0B90B' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={handleProfile}>
          <Text style={styles.settingText}>Perfil</Text>
          <Ionicons name='person-circle-outline' size={24} color='#F0B90B' />
        </TouchableOpacity>
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
        <TouchableOpacity style={styles.menuItem} onPress={handTransactions}>
          <Ionicons name='list-outline' size={24} color='white' />
          <Text style={styles.menuItemText}>Transacciones</Text>
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
  settingsList: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  settingText: {
    color: '#F0B90B',
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
