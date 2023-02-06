import { useState } from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'

import PrimaryButton from '../components/ui/PrimaryButton';
import NumberContainer from '../components/game/NumberContainer';
import Title from '../components/ui/Title'

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber }) {
  const initialGuess = generateRandomBetween(minBoundary, maxBoundary, userNumber)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)


  function nextGuessHandler(direction) {
    console.log('min', minBoundary)
    console.log('max', maxBoundary)

    if (direction === 'lower' && currentGuess < userNumber || direction === 'greater' && currentGuess > userNumber) {
      Alert.alert("Don't lie", "you know that this is wrong",
        [{ text: 'Sorry', style: 'cancel' }]
      )

      return;
    }


    if ('lower' === direction) {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRandomNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
    setCurrentGuess(newRandomNumber);
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or Lower</Text>
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>+</PrimaryButton>
        </View>
      </View>
      <View>
        {/* LOG ROUNDS */}
      </View>
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ddd52f',
    textAlign: 'center',
    borderWidth: '2',
    borderColor: '#ddd52f',
    padding: 12,
  }
})