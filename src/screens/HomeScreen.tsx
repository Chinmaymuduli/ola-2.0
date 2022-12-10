import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const HomeScreen = () => {
  return (
    <View style={styles.wrapperStyle}>
      <ScrollView>
        <Text>hello user i am home screen</Text>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wrapperStyle: {
    flex: 1,
  },
});
