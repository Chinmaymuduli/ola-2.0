import React from 'react';
import {Box} from 'native-base';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_API_KEY} from 'utils';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';
import {PrivateNavigationProps} from 'src/types/AllRoutes';

const SelectLocation = () => {
  const navigation = useNavigation<PrivateNavigationProps>();
  return (
    <Box flex={1} bg={'white'}>
      <GooglePlacesAutocomplete
        styles={{
          container: {
            flex: 0,
            width: '90%',
            borderWidth: 1,
            borderRadius: 8,
            marginTop: 15,
            alignSelf: 'center',
          },

          textInput: {
            fontSize: 18,
            // height: 25,
            borderRadius: 8,
          },
        }}
        placeholder="Where are you from ?"
        onPress={(data, details = null) => {
          navigation.navigate('HomeScreen', {
            latitude: details?.geometry?.location?.lat,
            longitude: details?.geometry?.location?.lng,
            des: data?.description,
          });
          // console.log(data?.description);
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
  );
};

export default SelectLocation;
