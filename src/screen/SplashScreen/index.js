import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen(props) {
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');

    setTimeout(() => {
      if (token) {
        props.navigation.navigate('AppScreen');
      } else {
        props.navigation.navigate('AuthScreen');
      }
    }, 1000);
  };
  return (
    <View style={styles.splash_body}>
      <Image
        source={require('../../assets/bigklin.png')}
        style={styles.splash_image}
      />
      <Text style={styles.splash_text}>Bigklin</Text>
    </View>
  );
}
