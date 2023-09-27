import React from 'react';
import {Text, View, Button} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home(props) {
  const handleCashier = () => {
    props.navigation.navigate('Order');
  };
  const handleRecap = () => {
    // props.navigation.navigate('Print');
    props.navigation.navigate('Recap');
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      props.navigation.navigate('AuthScreen', {screen: 'Login'});
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.body}>
      <Text style={styles.menu}>Menu Bigklin</Text>
      <View style={styles.container}>
        <View style={styles.cont}>
          <Icon
            name="cash-register"
            size={80}
            color="#1C208A"
            onPress={handleCashier}
          />
          <Text style={styles.text}>Cashier</Text>
        </View>
        <View style={styles.cont}>
          <Icon2 name="book" size={80} color="#1C208A" onPress={handleRecap} />
          <Text style={styles.text}>Recap</Text>
        </View>
      </View>

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
