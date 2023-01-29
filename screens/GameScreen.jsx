import { Text, View, StyleSheet } from 'react-native'
import Title from '../components/Title'

function GameScreen() {
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {/* GUESS */}
      <View>
        <Text>Higher or Lower</Text>
        {/* + */}
        {/* - */}
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