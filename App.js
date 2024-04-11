import { Entypo, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function OperarPage() {
  const [selectedAction, setSelectedAction] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);

  const handleOperate = () => {
    if (selectedAction && quantity && price) {
      Alert.alert(`Operación realizada: ${selectedAction} ${quantity} a $${price}`);
    } else {
      Alert.alert('Por favor, complete todos los campos.');
    }
  };

  React.useEffect(() => {
    if (selectedAction && quantity) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [selectedAction, quantity, price]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Operar</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name='person-circle-outline' size={24} color='#F0B90B' />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.operarList}>
        <View style={styles.operarItem}>
          <View style={styles.operarLeft}>
            <Text style={styles.operarTitle}>Acción</Text>
            <Text style={styles.operarDate}>Nombre de la acción</Text>
          </View>
          <View style={styles.operarRight}>
            <Text style={styles.operarAmount}>$0,00</Text>
          </View>
        </View>
        <View style={styles.operarSelect}>
          <Text style={styles.operarTitle}>Seleccione una acción</Text>
          <View style={styles.actionList}>
            <TouchableOpacity
              style={[styles.operarSelectButton, selectedAction === 'ACCION 1' && styles.selected]}
              onPress={() => setSelectedAction('ACCION 1')}
            >
              <Text style={styles.operarSelectText}>ACCION 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.operarSelectButton, selectedAction === 'ACCION 2' && styles.selected]}
              onPress={() => setSelectedAction('ACCION 2')}
            >
              <Text style={styles.operarSelectText}>ACCION 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.operarSelectButton, selectedAction === 'ACCION 3' && styles.selected]}
              onPress={() => setSelectedAction('ACCION 3')}
            >
              <Text style={styles.operarSelectText}>ACCION 3</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.operarItem}>
          <View style={styles.operarLeft}>
            <Text style={styles.operarTitle}>Cantidad</Text>
            <Text style={styles.operarDate}>Cantidad de acciones</Text>
          </View>
          <View style={styles.operarRight}>
            <TextInput style={styles.input} value={quantity} onChangeText={setQuantity} keyboardType='numeric' />
          </View>
        </View>
        <View style={styles.operarItem}>
          <View style={styles.operarLeft}>
            <Text style={styles.operarTitle}>Precio</Text>
            <Text style={styles.operarDate}>Precio de la acción</Text>
          </View>
          <View style={styles.operarRight}>
            <Text style={styles.input} value={price} onChangeText={setPrice} keyboardType='numeric' />
          </View>
        </View>
        <View style={styles.operarItem}>
          <View style={styles.operarLeft}>
            <Text style={styles.operarTitle}>Total</Text>
            <Text style={styles.operarDate}>Total a pagar/recibir</Text>
          </View>
          <View style={styles.operarRight}>
            <Text style={styles.operarAmount}>$0,00</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[styles.operarButton, { backgroundColor: isFormValid ? '#F0B90B' : 'gray' }]}
        onPress={handleOperate}
      >
        <Text style={styles.operarButtonText}>Confirmar</Text>
      </TouchableOpacity>
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
          <Ionicons name='list-outline' size={24} color='white' />
          <Text style={[styles.menuItemText, styles.transactionsText]}>Transacciones</Text>
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
  operarList: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  operarItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  operarLeft: {
    flex: 1,
  },
  operarRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  operarTitle: {
    color: '#F0B90B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  operarDate: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  operarAmount: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  operarSelect: {
    marginTop: 20,
    marginBottom: 20,
  },
  operarSelectButton: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  operarSelectText: {
    color: 'white',
    fontSize: 16,
  },
  actionList: {
    marginTop: 10,
  },
  selected: {
    backgroundColor: '#555',
  },
  input: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    color: 'white',
    fontSize: 16,
    width: '100%',
  },
  operarButton: {
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  operarButtonText: {
    color: 'black',
    fontSize: 16,
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
  transactionsText: {
    fontWeight: 'bold',
  },
});
