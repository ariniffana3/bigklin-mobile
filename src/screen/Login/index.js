import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import styles from './styles';
import axios from '../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login(props) {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const handleChangeForm = (text, name) => {
    setForm({...form, [name]: text});
  };
  const handleSubmit = async () => {
    try {
      console.log(form);
      const resultLogin = await axios.post('login', form);
      console.log(resultLogin.data.data);
      await AsyncStorage.setItem('token', resultLogin.data.data.token);
      props.navigation.navigate('AppScreen', {screen: 'Home'});
    } catch (error) {
      console.log(error.response.data.msg);
      alert(error.response.data.msg);
    }
  };
  const signUp = () => {
    props.navigation.navigate('Register');
  };
  return (
    <>
      <View style={styles.body}>
        <Text style={styles.login_text}>
          Login <Text style={styles.bigklin_text}>Bigklin</Text>
        </Text>

        <View style={styles.form}>
          <View>
            <Text style={styles.form}>Username</Text>
            <TextInput
              onChangeText={text => handleChangeForm(text, 'username')}
              style={styles.form_control}
              placeholder="Write your username"
              required
            />
          </View>
          <View>
            <Text style={styles.form}>Password</Text>
            <View style={styles.form_control_container_password}>
              <TextInput
                onChangeText={text => handleChangeForm(text, 'password')}
                style={styles.form_control_password}
                placeholder="Write your password"
                required
                secureTextEntry={true}
              />
            </View>
          </View>

          <Button onPress={handleSubmit} title=" Sign In" />
        </View>
        <Text style={styles.text_signUp}>
          Don't have an account ?{' '}
          <Text onPress={signUp} style={styles.text_signUp_link}>
            Sign Up
          </Text>
        </Text>
      </View>
    </>
  );
}
