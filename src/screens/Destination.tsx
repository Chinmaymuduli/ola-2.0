import {
  Box,
  Button,
  Divider,
  Input,
  Pressable,
  Row,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_API_KEY} from 'utils';
import {PrivateRoutesTypes} from 'src/types/AllRoutes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppContext} from '../../src/contexts/AppContextProvider';

type Props = NativeStackScreenProps<PrivateRoutesTypes, 'Destination'>;
const Destination = ({route: {params}, navigation}: Props) => {
  const address = params?.currentAddress;
  const [destination, setDestination] = useState<any>();
  const [showAuto, setShowAuto] = useState(false);
  // console.log(address);
  const {setUserDestination} = useAppContext();
  useEffect(() => {
    setUserDestination(destination);
  }, [destination]);

  return (
    <Box flex={1} bg={'white'}>
      <Box py={4} px={3}>
        <Row alignItems={'center'} space={5}>
          <Ionicons name="arrow-back" size={28} color={'black'} />
          <Text bold fontSize={18}>
            Destination
          </Text>
        </Row>
      </Box>
      <Box px={3}>
        <VStack shadow={3} bg={'white'} borderRadius={7}>
          <Box>
            <Input
              variant={'unstyled'}
              value={address}
              fontSize={14}
              InputLeftElement={
                <Box px={4}>
                  <Octicons name="dot-fill" size={24} color={'green'} />
                </Box>
              }
            />
          </Box>
          <Divider />

          <Pressable onPress={() => setShowAuto(true)} h={10}>
            <Text ml={'12'} pt={'1'} noOfLines={1}>
              {destination ? destination : 'my destination location'}
            </Text>
          </Pressable>
          <Box position={'absolute'} top={12} left={0}>
            <Box px={4}>
              <Row alignItems={'center'}>
                <Octicons name="dot-fill" size={24} color={'red'} />
              </Row>
            </Box>
          </Box>
          <Box
            height={8}
            width={0.5}
            bg={'gray.400'}
            position={'absolute'}
            top={7}
            left={5}></Box>
        </VStack>
      </Box>

      {showAuto && (
        <>
          <Box px={4} pt={6} pb={4}>
            <Text bold fontSize={16} color={'#0284c7'}>
              Search your destination
            </Text>
          </Box>
          <Box flex={1}>
            <GooglePlacesAutocomplete
              styles={{
                container: {
                  flex: 0,
                  width: '90%',
                  alignSelf: 'center',
                },

                textInput: {
                  fontSize: 14,
                  height: 40,
                  borderRadius: 8,
                  borderWidth: 1,
                },
              }}
              placeholder="Where are you from ?"
              onPress={(data, details = null) => {
                setDestination(details?.formatted_address);
              }}
              query={{
                key: GOOGLE_MAPS_API_KEY,
                language: 'en',
              }}
              fetchDetails={true}
              debounce={400}
              nearbyPlacesAPI={'GooglePlacesSearch'}
              enablePoweredByContainer={false}
              minLength={2}
            />
          </Box>
        </>
      )}

      <Box position={'absolute'} bottom={0} px={4}>
        <Button
          onPress={() => navigation.navigate('HomeScreen', {})}
          w={'xs'}
          size="md"
          colorScheme="secondary"
          isDisabled={destination ? false : true}>
          <Text bold color={'white'} letterSpacing={1}>
            Start Ride
          </Text>
        </Button>
      </Box>
    </Box>
  );
};

export default Destination;
