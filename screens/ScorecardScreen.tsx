import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackNavigationProp, RouteProp } from '@react-navigation/stack';

type RootStackParamList = {
  Game: undefined;
  Scorecard: { score: { X: number; O: number; draws: number } };
};

type ScorecardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Scorecard'>;
type ScorecardScreenRouteProp = RouteProp<RootStackParamList, 'Scorecard'>;

type Props = {
  navigation: ScorecardScreenNavigationProp;
  route: ScorecardScreenRouteProp;
};

export const ScorecardScreen: React.FC<Props> = ({ navigation, route }) => {
  const { score } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scorecard</Text>
      <Text style={styles.scoreText}>X: {score.X}</Text>
      <Text style={styles.scoreText}>O: {score.O}</Text>
      <Text style={styles.scoreText}>Draws: {score.draws}</Text>
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
  scoreText: {
    fontSize: 20,
    marginVertical: 5,
  },
});



