import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

type MAP_TYPES = {
  lat?: any;
  lng?: any;
};

const MapTracking = ({lat, lng}: MAP_TYPES) => {
  return (
    <MapView
      showsUserLocation={true}
      style={styles.mapStyle}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 20.2529425,
        longitude: 85.7807879,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
};

export default MapTracking;

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
  },
});
