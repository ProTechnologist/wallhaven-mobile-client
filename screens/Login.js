import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
// import axios from 'axios';
import { login } from '../services/auth.service';

const Login = ({ navigation }) => {
  const [formData, setFormData] = useState('');

  const handleChange = (value, field) => {
    setFormData((current) => {
      return { ...current, [field]: value };
    });
  };

  const handleSubmit = async () => {
    console.log('user in handleSubmit', formData);
    const isSuccessful = await login(formData).catch((e) => console.log(e));

    if (isSuccessful) navigation.navigate('Dashboard');
  };

  return (
    <View className='items-center justify-center bg-black flex-1'>
      <View>
        <View className='items-center text-center'>
          <Text className='text-white text-2xl'>Social App</Text>
          <Text className='text-white text-2xl'> - Login - </Text>
        </View>

        <Text className='text-white justify-start text-lg my-3'>Username</Text>
        <TextInput
          placeholder='Enter Username'
          name='username'
          onChangeText={(v) => handleChange(v, 'username')}
          className='text-white border border-white w-screen p-3 rounded-lg'
        />
        <Text className='text-white justify-start text-lg my-3'>Password</Text>
        <TextInput
          placeholder='Enter Password'
          onChangeText={(v) => handleChange(v, 'password')}
          secureTextEntry={true}
          className='text-white border border-white w-screen p-3 rounded-lg'
        />
        <View className='rounded-lg bg-red-500 mt-8'>
          <Text
            className='text-white m-2 text-center text-lg'
            onPress={handleSubmit}>
            Login
          </Text>
        </View>
        <View className='rounded-lg bg-gray-500 mt-4'>
          <Text
            className='text-white m-2 text-center text-lg'
            onPress={() => navigation.navigate('LandingPage')}>
            Cancel
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
