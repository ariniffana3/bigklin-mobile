import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import styles from './styles';
import axios from '../../utils/axios';

export default function Register(props) {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const handleChangeForm = (text, name) => {
    setForm({...form, [name]: text});
  };
  const handleSubmit = async () => {
    try {
      const resultRegister = await axios.post('register', form);
      console.log(resultRegister.data.msg);
      alert(resultRegister.data.msg);
      setTimeout(() => {
        props.navigation.navigate('Login');
      }, 2000);
    } catch (error) {
      console.log(error.response.data.msg);
      alert(error.response.data.msg);
    }
  };
  const login = () => {
    props.navigation.navigate('Login');
  };
  return (
    <>
      <View style={styles.body}>
        <Text style={styles.login_text}>
          Register <Text style={styles.bigklin_text}>Bigklin</Text>
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

          <Button onPress={handleSubmit} title="Register" />
        </View>
        <Text style={styles.text_signUp}>
          Alredy have an account ?{' '}
          <Text onPress={login} style={styles.text_signUp_link}>
            Login
          </Text>
        </Text>
      </View>
    </>
  );
}
