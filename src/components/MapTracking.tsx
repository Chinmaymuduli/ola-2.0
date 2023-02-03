import {StyleSheet, Text, View, Platform} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  AnimatedRegion,
} from 'react-native-maps';
import {useAppContext} from '../../src/contexts/AppContextProvider';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_API_KEY} from 'utils';
import {requestLocationPermission} from '../../src/screens/HomeScreen';
import Geolocation from 'react-native-geolocation-service';

type MAP_TYPES = {
  lat?: any;
  lng?: any;
};

export const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const cords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          heading: position?.coords?.heading,
        };
        console;
        resolve(cords);
      },
      error => {
        reject(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });

const MapTracking = ({lat, lng}: MAP_TYPES) => {
  const [timeInformation, setTimeInformation] = useState<any>();
  const {userDestination, currentUserAddress, currentDes, destinationDes} =
    useAppContext();
  const mapRef = useRef<any>();

  // location tracking

  const markerRef = useRef<any>();
  const [state, setState] = useState({
    curLoc: {
      latitude: 30.7046,
      longitude: 77.1025,
    },
    destinationCords: {},
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: 30.7046,
      longitude: 77.1025,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }),
    time: 0,
    distance: 0,
    heading: 0,
  });

  const {
    curLoc,
    time,
    distance,
    destinationCords,
    isLoading,
    coordinate,
    heading,
  } = state;
  const updateState = (data: any) => setState(state => ({...state, ...data}));

  const getLiveLocation = async () => {
    const locPermissionDenied = await requestLocationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude, heading} = await getCurrentLocation();
      console.log('get live location after 4 second', heading);
      animate(latitude, longitude);
      updateState({
        heading: heading,
        curLoc: {latitude, longitude},
        coordinate: new AnimatedRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }),
      });
    }
  };

  const animate = (latitude: any, longitude: any) => {
    const newCoordinate: any = {latitude, longitude};
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef?.current?.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  // tracking

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

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
