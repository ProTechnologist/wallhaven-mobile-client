import { View, Text, Image, Dimensions } from 'react-native';
import React from 'react';
// import { ImageZoom } from '@likashefqet/react-native-image-zoom';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';

const WallhavenImageViewer = (navigation) => {
  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;

  return (
    <>
      <ReactNativeZoomableView
        maxZoom={30}
        minZoom={0.5}
        zoomStep={0.5}
        initialZoom={1}
        bindToBorders={true}
        onZoomAfter={this.logOutZoomState}
        style={{
          padding: 10,
          backgroundColor: 'black',
        }}>
        <Image
          source={{ uri: navigation.route.params.url }}
          style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
        />
      </ReactNativeZoomableView>
    </>
  );
};

export default WallhavenImageViewer;
