import {Box, ScrollView, Text} from 'native-base';
import React from 'react';

const HomeScreen = () => {
  return (
    <Box flex={1} safeAreaTop bg={'white'}>
      <ScrollView>
        <Box>
          <Text>hello user i am home screen</Text>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default HomeScreen;
