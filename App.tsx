import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GameScreen } from './screens/GameScreen';
import { ScorecardScreen } from './screens/ScorecardScreen';

type RootStackParamList = {
  Game: undefined;
  Scorecard: { score: { X: number; O: number; draws: number } };
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Game">
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Scorecard" component={ScorecardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;