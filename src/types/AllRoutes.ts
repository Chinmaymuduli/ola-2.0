import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type PrivateRoutesTypes = {
  HomeScreen: {
    latitude?: any;
    longitude?: any;
    des?: any;
  };
  SelectLocation: undefined;
  Destination: undefined;
};
export type PublicRoutesTypes = {};

export type PublicNavigationProps =
  NativeStackNavigationProp<PublicRoutesTypes>;
export type PrivateNavigationProps =
  NativeStackNavigationProp<PrivateRoutesTypes>;
