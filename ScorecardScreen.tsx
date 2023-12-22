import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Game: undefined;
  Scorecard: undefined;
};

type ScorecardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Scorecard'>;

type Props = {
  navigation: ScorecardScreenNavigationProp;
};

export const ScorecardScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scorecard</Text>
      {/* Display the scores here */}
      <Button title="Back to Game" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});