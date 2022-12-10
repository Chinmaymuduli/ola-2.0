import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const MapTracking = () => {
  return (
    <MapView
      showsUserLocation={true}
      style={styles.mapStyle}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
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
