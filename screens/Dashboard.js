import { View, Text } from 'react-native';
import React from 'react';
import state from '../services/state.service';
import { useSnapshot } from 'valtio';
import Article from '../components/Article';

const Dashboard = ({ navigation }) => {
  const snapshot = useSnapshot(state);

  return (
    <>
      <View className='bg-black flex-1'>
        <Text className='text-2xl text-white bg-black'>
          {snapshot.posts.length}
        </Text>
        <View>
          {snapshot.posts.map((p) => {
            return <Article key={p.id} post={p} />;
          })}
        </View>
      </View>
    </>
  );
};

export default Dashboard;
