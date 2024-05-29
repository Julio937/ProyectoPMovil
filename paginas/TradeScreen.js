import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TradeScreen() {
  const [selectedAction, setSelectedAction] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [priceInUSD, setPriceInUSD] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [quantityError, setQuantityError] = React.useState('');
  const [priceError, setPriceError] = React.useState('');
  const [selectedActionName, setSelectedActionName] = React.useState('');
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [userCountry, setUserCountry] = React.useState('Colombia');
  const [selectedCurrency, setSelectedCurrency] = React.useState('');
  const [countryError, setCountryError] = React.useState('');
  const [isBuying, setIsBuying] = React.useState(true);

  const actionsByCountry = {
    Colombia: [
      { id: 'ACCION 1', name: 'Empresa X', price: (Math.random() * (100 - 10) + 10).toFixed(2) },
      { id: 'ACCION 2', name: 'Empresa Y', price: (Math.random() * (100 - 10) + 10).toFixed(2) },
    ],
    Bolivia: [
      { id: 'ACCION 1', name: 'Empresa X', price: (Math.random() * (100 - 10) + 10).toFixed(2) },
      { id: 'ACCION 3', name: 'Empresa Z', price: (Math.random() * (100 - 10) + 10).toFixed(2) },
    ],
  };

  const UserActions = {
    Colombia: [
      { id: 'ACCION 10', name: 'Empresa X', price: (Math.random() * (100 - 10) + 10).toFixed(2) },
      { id: 'ACCION 21', name: 'Empresa Y', price: (Math.random() * (100 - 10) + 10).toFixed(2) },
    ],
    Bolivia: [
      { id: 'ACCION 15', name: 'Empresa X', price: (Math.random() * (100 - 10) + 10).toFixed(2) },
      { id: 'ACCION 33', name: 'Empresa Z', price: (Math.random() * (100 - 10) + 10).toFixed(2) },
    ],
  };

  const currenciesByCountry = {
    Colombia: ['COP', 'USD'],
    Bolivia: ['BOB', 'USD'],
  };

  const exchangeRates = {
    USD: 1,
    COP: 3830.13,
    BOB: 6.91,
  };

  const convertPrice = (priceInUSD, currency) => {
    const rate = exchangeRates[currency];
    return (priceInUSD * rate).toFixed(2);
  };

  const handleOperate = () => {
    if (isNaN(parseFloat(quantity)) || parseFloat(quantity) <= 0) {
      setQuantityError('Ingrese una cantidad válida.');
    } else if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      setPriceError('Ingrese un precio válido.');
    } else if (selectedAction && quantity && price) {
      const totalPrice = parseFloat(quantity) * parseFloat(price);
      setTotalAmount(totalPrice.toFixed(2));
      const operationType = isBuying ? 'Compra' : 'Venta';
      Alert.alert(
        `Operación realizada: ${operationType} de ${selectedActionName} ${quantity} a ${selectedCurrency} ${price}`
      );
      setQuantity('');
      setPrice('');
      setQuantityError('');
      setPriceError('');
    } else {
      Alert.alert('Por favor, complete todos los campos.');
    }
  };

  React.useEffect(() => {
    if (selectedAction && quantity && !isNaN(parseFloat(quantity)) && parseFloat(quantity) > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [selectedAction, quantity, price]);

  React.useEffect(() => {
    if (userCountry in actionsByCountry) {
      const action = actionsByCountry[userCountry].find((action) => action.id === selectedAction);
      if (action) {
        const priceUSD = parseFloat(action.price);
        setSelectedActionName(action.name);
        setPriceInUSD(priceUSD);
        setPrice(priceUSD);
        setCountryError('');
      } else {
        setSelectedActionName('');
        setPrice('');
      }
    } else {
      setCountryError('El país del usuario no está disponible.');
      setSelectedActionName('');
      setPrice('');
    }
  }, [selectedAction, userCountry]);

  React.useEffect(() => {
    if (userCountry in currenciesByCountry) {
      setSelectedCurrency(currenciesByCountry[userCountry][0]);
    } else {
      setSelectedCurrency('');
    }
  }, [userCountry]);

  React.useEffect(() => {
    if (selectedCurrency === 'USD') {
      setPrice(priceInUSD.toFixed(2));
    } else {
      setPrice(convertPrice(priceInUSD, selectedCurrency));
    }
  }, [selectedCurrency]);

  const navigation = useNavigation();

  const handleHome = () => {
    navigation.navigate('Home');
  };

  const handleBalance = () => {
    navigation.navigate('Balance');
  };

  const handleTransactions = () => {
    navigation.navigate('Transactions');
  };

  const handleConfiguration = () => {
    navigation.navigate('Configuration');
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleBuy = () => {
    setSelectedAction('');
    setIsBuying(true);
  };

  const handleSell = () => {
    setSelectedAction('');
    setIsBuying(false);
  };

  const actionsToDisplay = isBuying ? actionsByCountry[userCountry] : UserActions[userCountry];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Operar</Text>
        <TouchableOpacity style={styles.profileButton} onPress={handleProfile}>
          <Ionicons name='person-circle-outline' size={24} color='#F0B90B' />
        </TouchableOpacity>
      </View>
      {countryError ? <Text style={styles.errorText}>{countryError}</Text> : null}
      <ScrollView contentContainerStyle={styles.operarList}>
        <View style={styles.operarItem}>
          <View style={styles.operarLeft}>
            <Text style={styles.operarTitle}>Acción</Text>
            <Text style={styles.operarDate}>{selectedActionName}</Text>
          </View>
          <View style={styles.operarRight}>
            <Text style={styles.operarAmount}>${price}</Text>
          </View>
        </View>
        <View style={styles.operarSelect}>
          <View style={styles.operarLeft}>
            <Text style={styles.operarTitle}>Operación</Text>
          </View>
        </View>
        <View style={styles.operarOptions}>
          <TouchableOpacity
            style={[styles.operarOptionButton, isBuying ? styles.selectedOption : null]}
            onPress={handleBuy}
          >
            <Text style={styles.operarSelectText}>Comprar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.operarOptionButton, !isBuying ? styles.selectedOption : null]}
            onPress={handleSell}
          >
            <Text style={styles.operarSelectText}>Vender</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.operarSelect}>
          <Text style={styles.operarTitle}>Seleccione una acción</Text>
          <ScrollView style={styles.actionList}>
            {userCountry in actionsByCountry ? (
              actionsToDisplay.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  style={[styles.operarSelectButton, selectedAction === action.id && styles.selected]}
                  onPress={() => setSelectedAction(action.id)}
                >
                  <Text style={styles.operarSelectText}>{action.id}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.errorText}>No hay acciones disponibles para el país del usuario.</Text>
            )}
          </ScrollView>
        </View>
        <View style={styles.operarItem}>
          <View style={styles.operarLeft}>
            <Text style={styles.operarTitle}>Moneda</Text>
            <Text style={styles.operarDate}>Seleccione la moneda</Text>
          </View>
          <View style={styles.operarRight}>
            <ScrollView style={styles.actionList} horizontal>
              {userCountry in currenciesByCountry ? (
                currenciesByCountry[userCountry].map((currency) => (
                  <TouchableOpacity
                    key={currency}
                    style={[
                      styles.operarSelectButton,
                      selectedCurrency === currency && styles.selected,
                      !selectedAction && styles.disabledButton,
                      selectedAction && styles.enabledButton,
                    ]}
                    onPress={() => setSelectedCurrency(currency)}
                    disabled={!selectedAction}
                  >
                    <Text style={styles.operarSelectText}>{currency}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.errorText}>No hay tipo de monedas disponibles para el país del usuario.</Text>
              )}
            </ScrollView>
          </View>
        </View>
        <View style={styles.operarItem}>
          <View style={styles.operarLeft}>
            <Text style={styles.operarTitle}>Cantidad</Text>
            <Text style={styles.operarDate}>Cantidad de acciones</Text>
          </View>
          <View style={styles.operarRight}>
            <TextInput
              style={[styles.input, quantityError && styles.inputError]}
              value={quantity}
              onChangeText={(text) => {
                setQuantity(text);
                setQuantityError('');
              }}
              keyboardType='numeric'
            />
            {quantityError ? <Text style={styles.errorText}>{quantityError}</Text> : null}
          </View>
        </View>
        <View style={styles.operarItem}>
          <View style={styles.operarLeft}>
            <Text style={styles.operarTitle}>Precio</Text>
            <Text style={styles.operarDate}>Precio de la acción</Text>
          </View>
          <View style={styles.operarRight}>
            <TextInput
              style={[styles.input, priceError && styles.inputError]}
              value={price}
              onChangeText={(text) => {
                setPrice(text);
                setPriceError('');
              }}
              keyboardType='numeric'
            />
            {priceError ? <Text style={styles.errorText}>{priceError}</Text> : null}
          </View>
        </View>
        <View style={styles.operarItem}>
          <View style={styles.operarLeft}>
            <Text style={styles.operarTitle}>Total</Text>
            <Text style={styles.operarDate}>Total {isBuying ? 'pagado' : 'vendido'}/recibido</Text>
          </View>
          <View style={styles.operarRight}>
            <Text style={styles.operarAmount}>
              {selectedCurrency} {totalAmount}
            </Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[styles.operarButton, { backgroundColor: isFormValid ? '#F0B90B' : 'gray' }]}
        onPress={handleOperate}
        disabled={!isFormValid}
      >
        <Text style={styles.operarButtonText}>Confirmar</Text>
      </TouchableOpacity>
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={handleHome}>
          <Ionicons name='pie-chart-outline' size={24} color='white' />
          <Text style={styles.menuItemText}>Resumen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleTransactions}>
          <Ionicons name='list-outline' size={24} color='white' />
          <Text style={styles.menuItemText}>Transacciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleBalance}>
          <Ionicons name='wallet-outline' size={24} color='white' />
          <Text style={styles.menuItemText}>Balance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleConfiguration}>
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
  operarOptions: {
    flexDirection: 'row',
    alignItems: 'center',
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
  disabledButton: {
    opacity: 0.5,
  },
  enabledButton: {
    opacity: 1,
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
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  operarButton: {
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  operarOptionButton: {
    backgroundColor: 'gray',
    width: '40%',
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
  errorText: {
    color: 'red',
    marginTop: 5,
    textAlign: 'center',
  },
});
