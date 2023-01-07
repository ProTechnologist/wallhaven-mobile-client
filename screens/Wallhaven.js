import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Wallhaven = ({ navigation }) => {
  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;

  const [wallpapers, setWallpapers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('simple');

  const client = axios.create({
    baseURL: 'https://wallhaven.cc/api/v1',
    ContentType: 'applicaton/json',
  });

  const mockedApi = async () => {
    const str =
      '{"data":[{"id":"7p2lpy","url":"https://wallhaven.cc/w/7p2lpy","short_url":"https://whvn.cc/7p2lpy","views":478,"favorites":9,"source":"","purity":"sfw","category":"general","dimension_x":3060,"dimension_y":2048,"resolution":"3060x2048","ratio":"1.49","file_size":7982662,"file_type":"image/png","created_at":"2022-12-20 08:27:25","colors":["#424153","#999999","#000000","#cccccc","#993399"],"path":"https://w.wallhaven.cc/full/7p/wallhaven-7p2lpy.png","thumbs":{"large":"https://th.wallhaven.cc/lg/7p/7p2lpy.jpg","original":"https://th.wallhaven.cc/orig/7p/7p2lpy.jpg","small":"https://th.wallhaven.cc/small/7p/7p2lpy.jpg"}},{"id":"9d6q2x","url":"https://wallhaven.cc/w/9d6q2x","short_url":"https://whvn.cc/9d6q2x","views":590,"favorites":12,"source":"","purity":"sfw","category":"people","dimension_x":1280,"dimension_y":892,"resolution":"1280x892","ratio":"1.43","file_size":283767,"file_type":"image/jpeg","created_at":"2022-12-03 13:56:04","colors":["#999999","#cccccc","#abbcda","#424153","#996633"],"path":"https://w.wallhaven.cc/full/9d/wallhaven-9d6q2x.jpg","thumbs":{"large":"https://th.wallhaven.cc/lg/9d/9d6q2x.jpg","original":"https://th.wallhaven.cc/orig/9d/9d6q2x.jpg","small":"https://th.wallhaven.cc/small/9d/9d6q2x.jpg"}},{"id":"qz6x7l","url":"https://wallhaven.cc/w/qz6x7l","short_url":"https://whvn.cc/qz6x7l","views":710,"favorites":17,"source":"","purity":"sfw","category":"people","dimension_x":1800,"dimension_y":2700,"resolution":"1800x2700","ratio":"0.67","file_size":483505,"file_type":"image/jpeg","created_at":"2022-12-03 06:24:18","colors":["#424153","#000000","#999999","#996633","#663300"],"path":"https://w.wallhaven.cc/full/qz/wallhaven-qz6x7l.jpg","thumbs":{"large":"https://th.wallhaven.cc/lg/qz/qz6x7l.jpg","original":"https://th.wallhaven.cc/orig/qz/qz6x7l.jpg","small":"https://th.wallhaven.cc/small/qz/qz6x7l.jpg"}},{"id":"zymwko","url":"https://wallhaven.cc/w/zymwko","short_url":"https://whvn.cc/zymwko","views":720,"favorites":21,"source":"","purity":"sfw","category":"people","dimension_x":1800,"dimension_y":2700,"resolution":"1800x2700","ratio":"0.67","file_size":368888,"file_type":"image/jpeg","created_at":"2022-12-03 06:24:18","colors":["#424153","#000000","#e7d8b1","#663300","#996633"],"path":"https://w.wallhaven.cc/full/zy/wallhaven-zymwko.jpg","thumbs":{"large":"https://th.wallhaven.cc/lg/zy/zymwko.jpg","original":"https://th.wallhaven.cc/orig/zy/zymwko.jpg","small":"https://th.wallhaven.cc/small/zy/zymwko.jpg"}}],"meta":{"current_page":1,"last_page":43,"per_page":24,"total":1024,"query":"fashion","seed":null}}';

    return new Promise((resolve, reject) => {
      try {
        resolve(JSON.parse(str));
      } catch (e) {
        console.log('rejecting in mock api');
        reject();
      }
    });
  };

  const handleSearchSubmit = (e) => {
    console.log('user input', e.nativeEvent.text);

    setWallpapers([]);
    setCurrentPage(1);
    setSearchTerm(e.nativeEvent.text);
  };

  const getWallpapers = async () => {
    let url = `/search?q=${searchTerm}&categories=101&order=desc`;
    if (currentPage && currentPage > 1) url = url + '$&page=' + currentPage;

    const res = await client.get(url).catch((e) => console.log('get error', e));

    setCurrentPage(res.data.meta.current_page);

    if (currentPage === 1) {
      console.log('in getWallpapers, setter for current page == 1');
      setWallpapers(res.data.data);
    }
    if (currentPage > 1) {
      setWallpapers((current) => {
        return current.concat(res.data.data);
      });
    }

    console.log(
      `T. Wallpapers ${wallpapers.length}, page count ${currentPage}`
    );
  };

  // use effect when the page index changes.
  useEffect(() => {
    console.log('use effect fired');
    getWallpapers();
  }, [currentPage, searchTerm]);

  const loadMore = async () => {
    console.log('load more fired');
    setCurrentPage(currentPage + 1);
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const enableSomeButton = () => {
    // console.log('load more content by pagination');
  };

  return (
    <>
      <ScrollView
        minimumZoomScale={1}
        maximumZoomScale={5}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            enableSomeButton();
          }
        }}
        scrollEventThrottle={400}>
        <View
          style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {wallpapers &&
            wallpapers.length > 10 &&
            wallpapers.map((w) => {
              return (
                <Pressable
                  key={w.id}
                  onPress={() => {
                    navigation.navigate('WallhavenImageViewer', {
                      url: w.path,
                    });
                  }}>
                  <Image
                    source={{ uri: w.thumbs.large }}
                    // source={{
                    //   uri: 'https://images.unsplash.com/photo-1607166452427-7e4477079cb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                    // }}
                    style={{
                      height: deviceHeight / 4,
                      width: deviceWidth / 2 - 12,
                      borderRadius: 10,
                      margin: 4,
                    }}
                  />
                </Pressable>
              );
            })}
        </View>
      </ScrollView>

      {/* search button */}

      <TextInput
        onSubmitEditing={(e) => handleSearchSubmit(e)}
        placeholder='Search'
        placeholderTextColor='white'
        style={{
          position: 'absolute',
          bottom: 80,
          backgroundColor: 'black',
          opacity: 0.7,
          width: '90%',
          marginLeft: '5%',
          height: 50,
          borderRadius: 10,
          fontSize: 20,
          textAlign: 'center',
          color: 'white',
        }}
      />

      {/* load more */}

      <Text
        onPress={loadMore}
        // className=' text-2xl bg-gray-700  px-1 rounded-lg text-center'
        style={{
          position: 'absolute',
          bottom: 20,
          backgroundColor: 'black',
          opacity: 0.7,
          width: '90%',
          marginLeft: '5%',
          height: 50,
          borderRadius: 10,
          fontSize: 20,
          textAlign: 'center',
          color: 'white',
          paddingTop: 10,
        }}>
        Load More
      </Text>
    </>
  );
};

export default Wallhaven;
