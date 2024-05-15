import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NotificationsScreen({ navigation }) {
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Notificaciones de ejemplo
  const dummyNotifications = [
    { id: 1, title: '¡Bienvenido!', message: 'Gracias por usar nuestra aplicación.' },
    { id: 2, title: 'Nuevas funcionalidades', message: 'Hemos añadido nuevas funcionalidades. ¡Échales un vistazo!' },
    {
      id: 3,
      title: 'Recordatorio',
      message: 'No olvides completar tu perfil para acceder a todas las características.',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Notificaciones</Text>
      {dummyNotifications.map((notification) => (
        <View key={notification.id} style={styles.notification}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationMessage}>{notification.message}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <Text style={styles.goBackButtonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    alignItems: 'center',
    paddingTop: 40,
  },
  headerText: {
    color: '#F0B90B',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notification: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '90%',
  },
  notificationTitle: {
    color: '#F0B90B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationMessage: {
    color: 'white',
    fontSize: 16,
  },
  goBackButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  goBackButtonText: {
    color: '#F0B90B',
    fontSize: 16,
  },
});
