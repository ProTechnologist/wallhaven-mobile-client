import React from 'react';
import { View, Text, Button, Alert } from 'react-native';

const LandingPage = ({ navigation }) => {
  return (
    <>
      <View className='items-center justify-center bg-black flex-1'>
        <View>
          <Text className='text-2xl text-white text-center'>Social App</Text>
          <Text className='text-2xl text-white text-center'>Landing Page</Text>
        </View>
        <View className='flex flex-row mt-8 justify-evenly w-screen'>
          <View>
            <Text
              className='text-white text-lg font-medium bg-red-500 px-4 py-1 rounded shadow-lg w-36 text-center'
              onPress={() => navigation.navigate('Login')}>
              Login
            </Text>
          </View>
          <View>
            <Text
              className='text-white text-lg font-medium bg-red-500 px-4 py-1 rounded shadow-lg w-36 text-center'
              onPress={() => navigation.navigate('Register')}>
              Register
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default LandingPage;
