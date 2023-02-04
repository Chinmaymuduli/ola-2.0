import {StyleSheet, Text, View, Platform, TouchableOpacity} from 'react-native';
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
import {Box, Image} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import {IMAGES} from '../assets';

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
      latitude: currentUserAddress?.coords?.latitude,
      longitude: currentUserAddress?.coords?.longitude,
    },
    destinationCords: {},
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: currentUserAddress?.coords?.latitude,
      longitude: currentUserAddress?.coords?.longitude,
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
      console.log(
        'get live location after 4 second',
        heading,
        // latitude,
        // longitude,
      );
      // console.log()
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

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  //   const onPressLocation = () => {
  //     navigation.navigate('chooseLocation', { getCordinates: fetchValue })
  // }
  const fetchValue = (data: {
    destinationCords: {latitude: any; longitude: any};
  }) => {
    console.log('this is data', data);
    updateState({
      destinationCords: {
        latitude: data.destinationCords.latitude,
        longitude: data.destinationCords.longitude,
      },
    });
  };

  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: curLoc.latitude,
      longitude: curLoc.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  // tracking

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

  console.log({curLoc});
  return (
    <Box flex={1}>
      <MapView
        ref={mapRef}
        showsUserLocation={true}
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          // latitude: currentUserAddress?.coords?.latitude,
          // longitude: currentUserAddress?.coords?.longitude,
          ...curLoc,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {userDestination && currentUserAddress && (
          <MapViewDirections
            // origin={{
            //   latitude: currentUserAddress?.coords?.latitude,
            //   longitude: currentUserAddress?.coords?.longitude,
            // }}
            origin={curLoc}
            destination={{
              latitude: userDestination?.lat,
              longitude: userDestination?.lng,
            }}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={true}
            onStart={params => {
              console.log(
                `Started routing between "${params.origin}" and "${params.destination}"`,
              );
            }}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min.`);
              // fetchTime(result.distance, result.duration),
              //     mapRef.current.fitToCoordinates(result.coordinates, {
              //         edgePadding: {
              //             // right: 30,
              //             // bottom: 300,
              //             // left: 30,
              //             // top: 100,
              //         },
              //     });
            }}
            onError={errorMessage => {
              console.log('GOT AN ERROR', errorMessage);
            }}
          />
        )}
        {currentUserAddress && (
          <Marker.Animated
            coordinate={{
              latitude: currentUserAddress?.coords?.latitude,
              longitude: currentUserAddress?.coords?.longitude,
            }}
            // pinColor="red"
            identifier={'origin'}
            title={'My Origin'}
          />
        )}

        {/* <Marker.Animated
          ref={markerRef}
          coordinate={{
            latitude: currentUserAddress?.coords?.latitude,
            longitude: currentUserAddress?.coords?.longitude,
          }}>
          <Image
            source={IMAGES.LOGO}
            alt="logo"
            style={{
              width: 20,
              height: 20,
              transform: [{rotate: `${heading}deg`}],
            }}
            resizeMode="contain"
          />
        </Marker.Animated> */}
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
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
        onPress={onCenter}>
        <Octicons name="dot-fill" color={'green'} />
      </TouchableOpacity>
    </Box>
  );
};

export default MapTracking;

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
  },
});
