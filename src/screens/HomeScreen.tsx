import {MapTracking} from 'components';
import {Box, Image, Pressable, Row, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GOOGLE_MAPS_API_KEY} from 'utils';
import {IMAGES} from '../assets';
import {PrivateRoutesTypes} from 'src/types/AllRoutes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ActivityIndicator, PermissionsAndroid, StyleSheet} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {useFocusEffect} from '@react-navigation/native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {useAppContext} from '../../src/contexts/AppContextProvider';

const CAR_DATA = [
  {
    id: '1',
    title: 'Daily',
    img: IMAGES.CAR_1,
  },
  {
    id: '2',
    title: 'Rentals',
    img: IMAGES.CAR_2,
  },
  {
    id: '3',
    title: 'Outstation',
    img: IMAGES.CAR_3,
  },
];

// Location Setup
export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

type Props = NativeStackScreenProps<PrivateRoutesTypes, 'HomeScreen'>;
const HomeScreen = ({route: {params}, navigation}: Props) => {
  const {userDestination, setCurrenUserAddress, setCurrentDes} =
    useAppContext();
  const lat = params?.latitude;
  const lng = params?.longitude;
  const des = params?.des;
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedCar, setSelectedCar] = useState<string>('1');
  const [location, setLocation] = useState<any>(false);
  const [currentAddress, setCurrentAddress] = useState<any>();

  // Set Location
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      // console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log({position});
            setLocation(position);
            setCurrenUserAddress(position);
          },
          error => {
            // See error code charts below.
            // console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      getLocation();
    }, []),
  );

  useEffect(() => {
    Geocoder.init(GOOGLE_MAPS_API_KEY);
    Geocoder.from({
      lat: location?.coords?.latitude,
      lng: location?.coords?.longitude,
    }).then(json => {
      setCurrentAddress(json.results[0].formatted_address);
      setCurrentDes(json.results[0].formatted_address);
    });
  }, [location?.coords?.latitude, location?.coords?.longitude]);

  // useEffect(() => {
  //   setCurrentDes(des);
  // }, [des]);
  // console.log(c);

  return (
    <Box flex={1} safeAreaTop bg={'white'}>
      <Box h={'1/2'}>
        {location?.coords && (
          <MapView
            showsUserLocation={true}
            style={styles.mapStyle}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: location?.coords?.latitude,
              longitude: location?.coords?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{
                latitude: location?.coords?.latitude,
                longitude: location?.coords?.longitude,
              }}
              pinColor="red"
            />
          </MapView>
        )}
        <Box position={'absolute'} w={'full'} px={4} mt={5}>
          <Pressable
            bg={'white'}
            py={3}
            borderRadius={5}
            shadow={2}
            onPress={() => navigation.navigate('SelectLocation')}>
            <Row justifyContent={'space-between'} alignItems={'center'} px={2}>
              <Row space={3} alignItems={'center'}>
                <Octicons name="dot-fill" size={20} color={'green'} />
                <Text width={260} noOfLines={1}>
                  {des ? des : currentAddress}
                </Text>
              </Row>
              <Pressable onPress={() => setIsFavorite(!isFavorite)}>
                <Ionicons
                  name={isFavorite ? 'heart-sharp' : 'heart-outline'}
                  size={20}
                  color={'green'}
                />
              </Pressable>
            </Row>
          </Pressable>
        </Box>
      </Box>
      <Box h={'1/2'}>
        <Row space={10} px={7} mt={4}>
          {CAR_DATA?.map(item => (
            <Pressable
              alignItems={'center'}
              key={item?.id}
              onPress={() => setSelectedCar(item?.id)}>
              <VStack alignItems={'center'} pb={1} space={1}>
                <Image
                  source={item?.img}
                  alt={item.title}
                  style={{width: 35, height: 35}}
                />
                <Text>{item.title}</Text>
              </VStack>
              {selectedCar === item?.id && (
                <Box h={1} w={9} bgColor={'black'}></Box>
              )}
            </Pressable>
          ))}
        </Row>
        <Box px={3} mt={5}>
          <Box bg={'white'} shadow={3} borderRadius={7}>
            <Pressable
              px={4}
              py={3}
              onPress={() =>
                navigation.navigate('Destination', {
                  currentAddress: currentAddress,
                })
              }>
              <Row
                px={2}
                alignItems={'center'}
                space={2}
                bg={'green.50'}
                py={3}
                borderRadius={7}>
                <Ionicons name="search" size={24} color={'green'} />
                <Text fontWeight={'bold'} fontSize={16}>
                  Search Destination
                </Text>
              </Row>
            </Pressable>
            <Pressable px={3} pb={3}>
              <Row alignItems={'center'} space={4}>
                <VStack alignItems={'center'}>
                  <Ionicons name="location-sharp" size={22} />
                  <Text>3.5 km</Text>
                </VStack>
                <Text noOfLines={1} fontWeight={'semibold'}>
                  Near AMRI Hospital, Kolathia,BBSR
                </Text>
              </Row>
            </Pressable>
          </Box>
          <Box px={3} mt={2}>
            <Row alignItems={'center'} space={6}>
              <VStack space={2}>
                <Text fontWeight={'bold'}>
                  Invite your friends to try ola 2.0
                </Text>
                <Box bg={'gray.100'} borderRadius={5}>
                  <Text textAlign={'center'} letterSpacing={2} py={1}>
                    2ZAJG55522JHNJH
                  </Text>
                </Box>
              </VStack>
              <Image
                source={IMAGES.VOUCHER}
                alt="voucher"
                style={{
                  height: 100,
                  width: 100,
                }}
                resizeMode={'contain'}
              />
            </Row>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
  },
});
