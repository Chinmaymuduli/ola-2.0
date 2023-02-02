import {Box, Divider, Input, Pressable, Row, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_API_KEY} from 'utils';
import {PrivateRoutesTypes} from 'src/types/AllRoutes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<PrivateRoutesTypes, 'Destination'>;
const Destination = ({route: {params}, navigation}: Props) => {
  const address = params?.currentAddress;
  const [destination, setDestination] = useState<any>();
  const [showAuto, setShowAuto] = useState(false);
  console.log(address);
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
            {/* <Input
              variant={'unstyled'}
              fontSize={14}
              placeholder={'my destination location'}
              value={destination}
              InputLeftElement={
                <Box px={4}>
                  <Row alignItems={'center'}>
                    <Octicons name="dot-fill" size={24} color={'red'} />
                  </Row>
                </Box>
              }
            /> */}
            {/* <Box> */}
            <Text pl={15} bg={'red.100'}>
              {destination ? destination : 'my destination location'}
            </Text>
            {/* </Box> */}
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
        <Box flex={1}>
          <GooglePlacesAutocomplete
            styles={{
              container: {
                flex: 0,
                width: '90%',
                // height: 40,
                borderWidth: 1,
                borderRadius: 8,
                marginTop: 15,
                alignSelf: 'center',
                justifyContent: 'center',
              },

              textInput: {
                fontSize: 13,
                height: 30,
                // borderRadius: 8,
              },
            }}
            placeholder="Where are you from ?"
            onPress={(data, details = null) => {
              // navigation.navigate('HomeScreen', {
              //   latitude: details?.geometry?.location?.lat,
              //   longitude: details?.geometry?.location?.lng,
              //   des: data?.description,
              // });
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
      )}
    </Box>
  );
};

export default Destination;
