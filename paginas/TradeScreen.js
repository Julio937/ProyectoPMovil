import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import config from '../logic/config';

export default function TradeScreen() {
  const [selectedAction, setSelectedAction] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [priceInUSD, setPriceInUSD] = React.useState(0);
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [quantityError, setQuantityError] = React.useState('');
  const [priceError, setPriceError] = React.useState('');
  const [selectedActionName, setSelectedActionName] = React.useState('');
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [userCountry, setUserCountry] = React.useState('Colombia');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [countryError, setCountryError] = React.useState('');
  const [isBuying, setIsBuying] = React.useState(true);

  const [accionesDisponibles, setAccionesDisponibles] = useState([]);
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const [userCountryId, setUserCountryId] = useState(null);

  const fetchUserData = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        const decodedToken = jwtDecode(userToken);
        const userId = decodedToken.usuario.id;
        // Obtener los datos del usuario junto con sus acciones
        const responseUsuario = await axios.get(`${config.SERVER_IP}/usuarios/${userId}`);
        const usuarioConAcciones = responseUsuario.data;

        // Si el usuario está comprando, obtener las acciones permitidas para el país del usuario
        if (isBuying) {
          const responseAccionesPermitidas = await axios.get(
            `${config.SERVER_IP}/paises/${usuarioConAcciones.pais_id}`
          );
          let accionesPermitidas = responseAccionesPermitidas.data.acciones_permitidas;

          // Verificar si accionesPermitidas es un arreglo o un solo valor
          if (Array.isArray(accionesPermitidas)) {
            // Es un arreglo, obtener detalles de cada acción
            const accionesDetalles = await Promise.all(
              accionesPermitidas.map(async (accionId) => {
                const responseAccion = await axios.get(`${config.SERVER_IP}/acciones/${accionId}`);
                return responseAccion.data;
              })
            );
            setAccionesDisponibles(accionesDetalles);
          } else if (accionesPermitidas) {
            // Es un solo valor, obtener detalles de esa acción
            const responseAccion = await axios.get(`${config.SERVER_IP}/acciones/${accionesPermitidas}`);
          } else {
            // No hay acciones permitidas
            setAccionesDisponibles([]);
          }
        } else {
          setAccionesDisponibles(usuarioConAcciones.acciones || []);
        }
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [isBuying]);

  const handleBuySellToggle = (isBuy) => {
    setIsBuying(isBuy);
    setSelectedAction('');
    setSelectedActionName('');
    setPrice('');
    setTotalAmount(0);
    // Llamar a fetchUserData para actualizar las acciones disponibles según el modo (comprar/vender)
    fetchUserData();
  };

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          const decodedToken = jwtDecode(userToken);
          const userId = decodedToken.usuario.id;
          // Obtener el país del usuario
          const responseUsuario = await axios.get(`${config.SERVER_IP}/usuarios/${userId}`);
          const paisId = responseUsuario.data.pais_id;
          // Obtener las monedas permitidas para el país del usuario
          const responseMonedas = await axios.get(`${config.SERVER_IP}/moneda`);
          const monedasPermitidas = responseMonedas.data.filter((moneda) => moneda.pais_id === paisId);
          // Actualizar el estado con las monedas permitidas
          setAvailableCurrencies(monedasPermitidas.map((moneda) => moneda.nombre));
          if (monedasPermitidas.includes('USD')) {
            setSelectedCurrency('USD');
          } else {
            // Si USD no está disponible, selecciona la primera moneda disponible
            setSelectedCurrency(monedasPermitidas[0].nombre);
          }
        }
      } catch (error) {
        console.error('Error al obtener las monedas:', error);
      }
    };

    fetchCurrencies();
  }, [userCountryId]); // Dependencia para re-fetch cuando cambie el país del usuario

  const exchangeRates = {
    USD: 1,
    COP: 3830.13,
    BOB: 6.91,
  };

  const convertPrice = (price, currency) => {
    const rate = exchangeRates[currency];
    // Asegúrate de que el precio sea un número antes de convertirlo
    const numericPrice = typeof price === 'number' ? price : parseFloat(price);
    return (numericPrice * rate).toFixed(2);
  };

  const handleOperate = async () => {
    if (isNaN(parseFloat(quantity)) || parseFloat(quantity) <= 0) {
      setQuantityError('Ingrese una cantidad válida.');
    } else if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      setPriceError('Ingrese un precio válido.');
    } else if (selectedAction && quantity && price) {
      const totalPrice = parseFloat(quantity) * parseFloat(priceInUSD);
      setTotalAmount(totalPrice.toFixed(2));
      const operationType = isBuying ? 'compra' : 'venta';

      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          const decodedToken = jwtDecode(userToken);
          const userId = decodedToken.usuario.id;

          // Crear la transacción
          const transaccionData = {
            usuario_id: userId,
            accion_id: selectedAction,
            tipo: operationType,
            cantidad: parseInt(quantity),
            precio_unitario: parseFloat(priceInUSD), // Guardar el precio unitario en dólares
            fecha_transaccion: new Date().toISOString(),
          };
          await axios.post(`${config.SERVER_IP}/transaccion`, transaccionData);

          // Asociar o desasociar la acción con el usuario
          if (isBuying) {
            // Asociar acción a usuario
            await axios.post(`${config.SERVER_IP}/usuarios/acciones`, {
              usuario_id: userId,
              accion_id: selectedAction,
              cantidad: parseInt(quantity),
            });
          } else {
            // Desasociar acción de usuario
            await axios.delete(`${config.SERVER_IP}/usuarios/acciones/desasociar`, {
              data: { usuario_id: userId, accion_id: selectedAction },
            });
          }

          Alert.alert(`Operación realizada: ${operationType} de ${selectedActionName} ${quantity} a USD ${priceInUSD}`);
        }
      } catch (error) {
        console.error('Error al realizar la operación:', error);
        Alert.alert('Error al realizar la operación.');
      }

      setQuantity('');
      setPrice('');
      setQuantityError('');
      setPriceError('');
    } else {
      Alert.alert('Por favor, complete todos los campos.');
    }
  };

  React.useEffect(() => {
    if (selectedAction && selectedCurrency) {
      // Encuentra la acción seleccionada para obtener su valor en USD
      const accionSeleccionada = accionesDisponibles.find((accion) => accion.id === selectedAction);
      if (accionSeleccionada) {
        // Actualiza priceInUSD con el valor de la acción seleccionada
        setPriceInUSD(accionSeleccionada.valor_dolares);
        // Realiza la conversión de moneda
        const priceConverted = convertPrice(accionSeleccionada.valor_dolares, selectedCurrency);
        setPrice(priceConverted);
      }
    }
  }, [selectedCurrency, selectedAction, accionesDisponibles]);

  React.useEffect(() => {
    // Cuando actualices priceInUSD, asegúrate de que sea un número
    const updatePriceInUSD = (newPrice) => {
      const numericPrice = parseFloat(newPrice);
      if (!isNaN(numericPrice)) {
        setPriceInUSD(numericPrice);
      } else {
        console.error('newPrice debe ser un número');
        setPriceInUSD(0);
      }
    };
  }, [selectedCurrency, priceInUSD]);

  const validateForm = () => {
    // Verifica que selectedAction, quantity y price tengan valores válidos
    if (
      selectedAction &&
      !isNaN(parseFloat(quantity)) &&
      parseFloat(quantity) > 0 &&
      !isNaN(parseFloat(price)) &&
      parseFloat(price) > 0
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  // Llama a validateForm cada vez que cambien los valores de selectedAction, quantity o price
  React.useEffect(() => {
    validateForm();
  }, [selectedAction, quantity, price]);

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
            onPress={() => handleBuySellToggle(true)}
          >
            <Text style={styles.operarSelectText}>Comprar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.operarOptionButton, !isBuying ? styles.selectedOption : null]}
            onPress={() => handleBuySellToggle(false)}
          >
            <Text style={styles.operarSelectText}>Vender</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.operarSelect}>
          <Text style={styles.operarTitle}>Seleccione una acción</Text>
          <ScrollView style={styles.actionList}>
            {isBuying
              ? accionesDisponibles.map((accion, index) => (
                  <TouchableOpacity
                    key={accion.id ? accion.id.toString() : index.toString()} // Usa index si accion.id es undefined
                    style={[styles.operarSelectButton, selectedAction === accion.id && styles.selected]}
                    onPress={() => {
                      setSelectedAction(accion.id);
                      setSelectedActionName(accion.nombre);
                      const priceConverted = convertPrice(accion.valor_dolares, selectedCurrency);
                      setPrice(priceConverted);
                    }}
                  >
                    <Text style={styles.operarSelectText}>{accion.nombre}</Text>
                  </TouchableOpacity>
                ))
              : accionesDisponibles.map((accion, index) => (
                  <TouchableOpacity
                    key={accion.id ? accion.id.toString() : index.toString()} // Usa index si accion.id es undefined
                    style={[styles.operarSelectButton, selectedAction === accion.id && styles.selected]}
                    onPress={() => {
                      setSelectedAction(accion.id);
                      setSelectedActionName(accion.nombre);
                      const priceConverted = convertPrice(accion.valor_dolares, selectedCurrency);
                      setPrice(priceConverted);
                    }}
                  >
                    <Text style={styles.operarSelectText}>{accion.nombre}</Text>
                  </TouchableOpacity>
                ))}
          </ScrollView>
        </View>

        <View style={styles.operarItem}>
          <View style={styles.operarLeft}>
            <Text style={styles.operarTitle}>Moneda</Text>
            <Text style={styles.operarDate}>Seleccione la moneda</Text>
          </View>

          <View style={styles.operarRight}>
            <ScrollView style={styles.actionList} horizontal>
              {availableCurrencies.length > 0 ? (
                availableCurrencies.map((currency, index) => (
                  <TouchableOpacity
                    key={index.toString()}
                    style={[
                      styles.operarSelectButton,
                      selectedCurrency === currency && styles.selected,
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
