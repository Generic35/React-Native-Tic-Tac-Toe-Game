import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [isHumanTurn, setIsHumanTurn] = useState(true);

  useEffect(() => {
    // Check if there is a winner
    const winner = checkForWinner();
    if (winner) {
      Alert.alert(`Player ${winner} wins!`);
      return;
    }

    // Check for a draw
    if (board.every(cell => cell !== null)) {
      Alert.alert("It's a draw!");
      return;
    }

    // If it's CPU's turn, make a move
    if (!isHumanTurn) {
      const bestMove = findBestMove(board);
      if (bestMove !== -1) {
        makeMove(bestMove, 'O');
      }
    }
  }, [board, isHumanTurn]);

  const makeMove = (index, player) => {
    if (board[index] || checkForWinner() || board.every(cell => cell !== null)) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setIsHumanTurn(!isHumanTurn);
  };

  const onPressCell = (index) => {
    if (isHumanTurn) {
      makeMove(index, 'X');
    }
  };

  const checkForWinner = () => {
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

  const findBestMove = (board) => {
    const emptyIndices = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    if (emptyIndices.length === 0) return -1;
    // CPU's strategy is just to take a random empty spot
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setIsHumanTurn(true);
  };

  const renderCell = (index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.cell}
        onPress={() => onPressCell(index)}
      >
        <Text style={styles.cellText}>{board[index]}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {board.map((_, index) => renderCell(index))}
      </View>
      <TouchableOpacity style={styles.button} onPress={restartGame}>
        <Text style={styles.buttonText}>Restart Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // ...styles remain unchanged
});

export default App;
