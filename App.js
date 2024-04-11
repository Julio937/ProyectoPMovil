import { Entypo, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TransactionsPage() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Transacciones</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name='person-circle-outline' size={24} color='#F0B90B' />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.transactionsList}>
        <View style={styles.transactionItem}>
          <View style={styles.transactionLeft}>
            <Text style={styles.transactionTitle}>Compra de acciones</Text>
            <Text style={styles.transactionDate}>10 de abril, 2024</Text>
          </View>
          <View style={styles.transactionRight}>
            <Text style={styles.transactionAmount}>-$500.000,00</Text>
          </View>
        </View>
        <View style={styles.transactionItem}>
          <View style={styles.transactionLeft}>
            <Text style={styles.transactionTitle}>Venta de acciones</Text>
            <Text style={styles.transactionDate}>1 de abril, 2024</Text>
          </View>
          <View style={styles.transactionRight}>
            <Text style={styles.transactionAmount}>+$300.000,00</Text>
          </View>
        </View>
        <View style={styles.transactionItem}>
          <View style={styles.transactionLeft}>
            <Text style={styles.transactionTitle}>Compra de acciones</Text>
            <Text style={styles.transactionDate}>4 de abril, 2024</Text>
          </View>
          <View style={styles.transactionRight}>
            <Text style={styles.transactionAmount}>-$300.000.00</Text>
          </View>
        </View>
        <View style={styles.transactionItem}>
          <View style={styles.transactionLeft}>
            <Text style={styles.transactionTitle}>Compra de acciones</Text>
            <Text style={styles.transactionDate}>3 de abril, 2024</Text>
          </View>
          <View style={styles.transactionRight}>
            <Text style={styles.transactionAmount}>-$500.000,00</Text>
          </View>
        </View>
        <View style={styles.transactionItem}>
          <View style={styles.transactionLeft}>
            <Text style={styles.transactionTitle}>Compra de acciones</Text>
            <Text style={styles.transactionDate}>2 de abril, 2024</Text>
          </View>
          <View style={styles.transactionRight}>
            <Text style={styles.transactionAmount}>-$500.000,00</Text>
          </View>
        </View>
        <View style={styles.transactionItem}>
          <View style={styles.transactionLeft}>
            <Text style={styles.transactionTitle}>Compra de acciones</Text>
            <Text style={styles.transactionDate}>8 de abril, 2024</Text>
          </View>
          <View style={styles.transactionRight}>
            <Text style={styles.transactionAmount}>-$500.000,00</Text>
          </View>
        </View>
        <View style={styles.transactionItem}>
          <View style={styles.transactionLeft}>
            <Text style={styles.transactionTitle}>Compra de acciones</Text>
            <Text style={styles.transactionDate}>10 de abril, 2024</Text>
          </View>
          <View style={styles.transactionRight}>
            <Text style={styles.transactionAmount}>-$500.000,00</Text>
          </View>
        </View>
        <View style={styles.transactionItem}>
          <View style={styles.transactionLeft}>
            <Text style={styles.transactionTitle}>Venta de acciones</Text>
            <Text style={styles.transactionDate}>12 de abril, 2024</Text>
          </View>
          <View style={styles.transactionRight}>
            <Text style={styles.transactionAmount}>+$500.000,00</Text>
          </View>
        </View>
        <View style={styles.transactionItem}>
          <View style={styles.transactionLeft}>
            <Text style={styles.transactionTitle}>Venta de acciones</Text>
            <Text style={styles.transactionDate}>18 de abril, 2024</Text>
          </View>
          <View style={styles.transactionRight}>
            <Text style={styles.transactionAmount}>-$500.000,00</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name='pie-chart-outline' size={24} color='white' />
          <Text style={styles.menuItemText}>Resumen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Entypo name='line-graph' size={24} color='white' />
          <Text style={styles.menuItemText}>Operar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name='wallet-outline' size={24} color='white' />
          <Text style={styles.menuItemText}>Balance</Text>
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
