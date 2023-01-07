import { View, Text, Image } from 'react-native';
import React from 'react';

const Article = (props) => {
  return (
    <View className='bg-black items-center mb-4'>
      <Image
        source={require('../assets/tileBg.png')}
        className='object-scale-down h-64 w-96 rounded-2xl opacity-60'
      />

      <View className='mx-4 absolute mt-4'>
        <Text className='text-white text-center text-4xl'>
          {props.post.post_title}
        </Text>
        <Text className='text-white text-justify text-lg'>
          {' '}
          {props.post.post_description}{' '}
        </Text>
      </View>
    </View>
  );
};

export default Article;
