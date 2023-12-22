import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type Player = 'X' | 'O';
type Cell = Player | null;
type Board = Cell[];
type Score = { X: number; O: number; draws: number };

type RootStackParamList = {
  Game: undefined;
  Scorecard: { score: Score };
};

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Game'>;

type Props = {
  navigation: GameScreenNavigationProp;
};

export const GameScreen: React.FC<Props> = ({ navigation }) => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [isHumanTurn, setIsHumanTurn] = useState<boolean>(true);
  const [score, setScore] = useState<Score>({ X: 0, O: 0, draws: 0 });

  useEffect(() => {
    const winner = checkForWinner();
    if (winner) {
      Alert.alert(`Player ${winner} wins!`);
      setScore(prevScore => ({ ...prevScore, [winner]: prevScore[winner] + 1 }));
      return;
    }

    if (board.every(cell => cell !== null)) {
      Alert.alert("It's a draw!");
      setScore(prevScore => ({ ...prevScore, draws: prevScore.draws + 1 }));
      return;
    }

    if (!isHumanTurn) {
      const bestMove = findBestMove();
      if (bestMove !== -1) {
        makeMove(bestMove, 'O');
      }
    }
  }, [board, isHumanTurn]);

  const makeMove = (index: number, player: Player) => {
    if (board[index] || checkForWinner() || board.every(cell => cell !== null)) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setIsHumanTurn(!isHumanTurn);
  };

  const onPressCell = (index: number) => {
    if (isHumanTurn) {
      makeMove(index, 'X');
    }
  };

  const checkForWinner = (): Player | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const findBestMove = (): number => {
    const emptyIndices = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null) as number[];
    if (emptyIndices.length === 0) return -1;
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setIsHumanTurn(true);
  };

  const renderCell = (index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.cell}
      onPress={() => onPressCell(index)}
    >
      <Text style={styles.cellText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  const goToScorecard = () => {
    navigation.navigate('Scorecard', { score });
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {board.map((_, index) => renderCell(index))}
      </View>
      <Button title="Go to Scorecard" onPress={goToScorecard} />
      <TouchableOpacity style={styles.button} onPress={restartGame}>
        <Text style={styles.buttonText}>Restart Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  cell: {
    width: '33.333%',
    height: '33.333%',
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 40,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});