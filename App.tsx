/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import PrivateRoutes from './src/routes/PrivateRoutes';
import {Provider as PaperProvider} from 'react-native-paper';
import {QueryClient, QueryClientProvider} from 'react-query';
import {NativeBaseProvider} from 'native-base';
import Routes from './src/Routes';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <NavigationContainer>
      <PaperProvider>
        <NativeBaseProvider>
          <Routes />
        </NativeBaseProvider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
