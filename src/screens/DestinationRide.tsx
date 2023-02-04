import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Center,
  FlatList,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import {MapTracking} from 'components';
import {useAppContext} from '../../src/contexts/AppContextProvider';
import {IMAGES} from '../assets';
import {GOOGLE_MAPS_API_KEY} from 'utils';

const DestinationRide = () => {
  const {userDestination, currentUserAddress, currentDes, destinationDes} =
    useAppContext();
  const [selectedCar, setSelectedCar] = useState<any>();
  const [timeInformation, setTimeInformation] = useState<any>();

  useEffect(() => {
    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${currentDes}&destinations=${destinationDes}&key=${GOOGLE_MAPS_API_KEY}`,
      )
        .then(res => res.json())
        .then(data => setTimeInformation(data?.rows[0].elements[0]));
    };

    getTravelTime();
  }, [userDestination, currentUserAddress, GOOGLE_MAPS_API_KEY]);

  const RIDE_ARRAY = [
    {
      id: 'r1',
      name: 'Ola X',
      image: IMAGES.RIDE_CAR1,
      travelTime: 'travel time..',
      price: 210,
      multiplier: 10,
    },
    {
      id: 'r2',
      name: 'Ola XL',
      image: IMAGES.RIDE_CAR2,
      travelTime: 'travel time..',
      price: 230,
      multiplier: 12,
    },
    {
      id: 'r3',
      name: 'Ola LUX',
      image: IMAGES.RIDE_CAR3,
      travelTime: 'travel time..',
      price: 250,
      multiplier: 15,
    },
  ];

  console.log({timeInformation});

  const BASIC_PRICE = 1.5;
  return (
    <Box flex={1}>
      <Box h={'1/2'}>
        <MapTracking />
      </Box>
      <Box h={'1/2'} bg={'white'}>
        <Center my={3}>
          <Text bold fontSize={16}>
            Select a Ride -{' '}
            {(parseInt(timeInformation?.distance?.text) * 1.6).toFixed(1)} Km
          </Text>
        </Center>
        <Box px={3}>
          <FlatList
            data={RIDE_ARRAY}
            renderItem={({item}) => (
              <Pressable
                onPress={() => setSelectedCar(item)}
                bg={'white'}
                borderWidth={selectedCar?.id === item?.id ? 1 : 0}
                borderRadius={7}
                borderColor={'blue.300'}
                mb={1}
                // mt={2}
                px={2}
                justifyContent={'space-between'}
                flexDirection={'row'}
                alignItems={'center'}>
                <Box>
                  <Image
                    source={item?.image}
                    resizeMode={'contain'}
                    style={{
                      height: 80,
                      width: 100,
                    }}
                    alt={item?.name}
                  />
                </Box>
                <VStack>
                  <Text bold>{item?.name}</Text>
                  <Text fontWeight={'semibold'} fontSize={10}>
                    {timeInformation?.duration?.text} Travel Time
                  </Text>
                </VStack>
                <Box>
                  <Text bold>
                    {new Intl.NumberFormat('en-gb', {
                      style: 'currency',
                      currency: 'INR',
                    }).format(
                      (timeInformation?.duration?.value *
                        BASIC_PRICE *
                        item?.multiplier) /
                        100,
                    )}
                  </Text>
                </Box>
              </Pressable>
            )}
          />
        </Box>
        <Box px={4} mt={1}>
          <Button
            colorScheme={'secondary'}
            isDisabled={!selectedCar ? true : false}>
            <Text bold color={'white'}>
              Choose {selectedCar?.name}
            </Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DestinationRide;
