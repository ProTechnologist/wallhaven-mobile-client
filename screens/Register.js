import { View, Text, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';

const Register = ({ navigation }) => {
  const [formData, setFormData] = useState('');

  const handleTextChange = (text, field) => {
    setFormData({ ...formData, [field]: text });
  };

  const handleSubmit = async () => {
    console.log('Handle Submit Fired - State Data', formData);
  };

  return (
    <View className='items-center justify-center bg-black flex-1'>
      <View>
        <View className='items-center text-center'>
          <Text className='text-white text-2xl'>Social App</Text>
          <Text className='text-white text-2xl'> - Register - </Text>
        </View>

        <Text className='text-white justify-start text-lg my-3'>Name</Text>
        <TextInput
          placeholder='Enter Name'
          name='name'
          onChangeText={(value) => handleTextChange(value, 'name')}
          className='text-white border border-white w-screen p-3 rounded-lg'
        />
        <Text className='text-white justify-start text-lg my-3'>Username</Text>
        <TextInput
          placeholder='Enter Username'
          name='username'
          onChangeText={(value) => handleTextChange(value, 'username')}
          className='text-white border border-white w-screen p-3 rounded-lg'
        />
        <Text className='text-white justify-start text-lg my-3'>Password</Text>
        <TextInput
          placeholder='Enter Password'
          name='password'
          onChangeText={(value) => handleTextChange(value, 'password')}
          secureTextEntry={true}
          className='text-white border border-white w-screen p-3 rounded-lg'
        />
        <Text className='text-white justify-start text-lg my-3'>
          Confirm Password
        </Text>
        <TextInput
          placeholder='Enter Confirm'
          name='confirmPassword'
          secureTextEntry={true}
          onChangeText={(value) => handleTextChange(value, 'confirmPassword')}
          className='text-white border border-white w-screen p-3 rounded-lg'
        />
        <View className='rounded-lg bg-red-500 mt-8'>
          <Text
            className='text-white m-2 text-center text-lg'
            onPress={handleSubmit}>
            Register
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

export default Register;
