import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const WorkoutScreen = () => {
  return (
    <View style={styles.container}>
      <Text>WorkoutScreen Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WorkoutScreen;