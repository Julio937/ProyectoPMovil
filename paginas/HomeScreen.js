import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Acciones & Gestión</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileButtonText}>Perfil</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Mis Acciones</Text>
          <Text style={styles.cardText}>Ver las acciones que opero</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Gestoras Activas</Text>
          <Text style={styles.cardText}>Explorar gestoras de activos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Consultas</Text>
          <Text style={styles.cardText}>Acceder a servicios de consultas</Text>
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
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#F0B90B',
  },
  profileButton: {
    backgroundColor: '#F0B90B',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
  },
  profileButtonText: {
    color: '#141414',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    width: '100%',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    color: '#F0B90B',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
  },
});
