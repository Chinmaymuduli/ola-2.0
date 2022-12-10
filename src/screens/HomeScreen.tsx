import {Box, ScrollView, Text} from 'native-base';
import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_API_KEY} from 'utils';

const HomeScreen = () => {
  return (
    <Box flex={1} safeAreaTop bg={'white'}>
      {/* <ScrollView> */}
      <Box>
        <GooglePlacesAutocomplete
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          placeholder="Where are you from ?"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'en',
          }}
          debounce={400}
          nearbyPlacesAPI={'GooglePlacesSearch'}
          enablePoweredByContainer={false}
          minLength={2}
        />
      </Box>
      <Box>
        <Text>First Test</Text>
      </Box>
      {/* </ScrollView> */}
    </Box>
  );
};

export default HomeScreen;
