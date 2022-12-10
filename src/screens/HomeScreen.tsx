import {MapTracking} from 'components';
import {Box, Image, Pressable, Row, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GOOGLE_MAPS_API_KEY} from 'utils';
import {IMAGES} from '../assets';
import {PrivateRoutesTypes} from 'src/types/AllRoutes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

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

type Props = NativeStackScreenProps<PrivateRoutesTypes, 'HomeScreen'>;
const HomeScreen = ({route: {params}, navigation}: Props) => {
  const lat = params?.latitude;
  const lng = params?.longitude;
  const des = params?.des;
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedCar, setSelectedCar] = useState<string>('1');
  return (
    <Box flex={1} safeAreaTop bg={'white'}>
      <Box h={'1/2'}>
        <MapTracking />
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
                  {des ? des : 'your location'}
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
            <Pressable px={4} py={3}>
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
