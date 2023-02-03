import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useAppContext} from '../../src/contexts/AppContextProvider';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_API_KEY} from 'utils';

type MAP_TYPES = {
  lat?: any;
  lng?: any;
};

const MapTracking = ({lat, lng}: MAP_TYPES) => {
  const [timeInformation, setTimeInformation] = useState<any>();
  const {userDestination, currentUserAddress, currentDes, destinationDes} =
    useAppContext();
  const mapRef = useRef<any>();

  // console.log({currentDes});
  // console.log({destinationDes});

  useEffect(() => {
    if (!userDestination && !currentUserAddress) return;
    mapRef.current.fitToSuppliedMarkers(
      ['currentUserAddress', 'userDestination'],
      {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
      },
    );
  }, [userDestination, currentUserAddress]);

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

  // console.log(currentUserAddress);
  return (
    <MapView
      ref={mapRef}
      showsUserLocation={true}
      style={styles.mapStyle}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: currentUserAddress?.coords?.latitude,
        longitude: currentUserAddress?.coords?.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      {userDestination && currentUserAddress && (
        <MapViewDirections
          origin={{
            latitude: currentUserAddress?.coords?.latitude,
            longitude: currentUserAddress?.coords?.longitude,
          }}
          destination={{
            latitude: userDestination?.lat,
            longitude: userDestination?.lng,
          }}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={3}
          strokeColor="hotpink"
        />
      )}
      {currentUserAddress && (
        <Marker
          coordinate={{
            latitude: currentUserAddress?.coords?.latitude,
            longitude: currentUserAddress?.coords?.longitude,
          }}
          // pinColor="red"
          identifier={'origin'}
          title={'My Origin'}
        />
      )}
      {userDestination && (
        <Marker
          coordinate={{
            latitude: userDestination?.lat,
            longitude: userDestination?.lng,
          }}
          pinColor="black"
          identifier={'destination'}
          title={'My Destination'}
        />
      )}
    </MapView>
  );
};

export default MapTracking;

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
  },
});
