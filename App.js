import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Gyroscope } from 'expo-sensors';

const { height, width } = Dimensions.get('window');

const App = () => {
  const [score, setScore] = useState(0);
  const [gyroData, setGyroData] = useState({});

  // Setup gyroscope sensor
  useEffect(() => {
    const subscription = Gyroscope.addListener(gyroscopeData => {
      setGyroData(gyroscopeData);
    });

    return () => subscription.remove();
  }, []);

  // Handle user input (e.g., tapping on the screen or device rotation)
  const handleLeft = () => {
    // Implement player action (e.g., move left)
  };

  const handleRight = () => {
    // Implement player action (e.g., move right)
  };

  const handleDeviceRotation = () => {
    const { gamma } = gyroData;
    if (gamma > 5) {
      // Move right
    } else if (gamma < -5) {
      // Move left
    }
  };

  // Game loop to update game state
  useEffect(() => {
    const gameLoop = setInterval(() => {
      // Update game logic here
      // For example, move character, spawn obstacles, check for collisions, etc.
      // Update score
      setScore(score => score + 1);
    }, 1000); // Adjust the interval based on your game's requirements

    return () => clearInterval(gameLoop);
  }, []);

  return (
    <View style={styles.container}>
      {/* Player Character */}
      <View style={styles.player}></View>

      {/* Buttons for left and right movement */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLeft}>
          <Text>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRight}>
          <Text>Right</Text>
        </TouchableOpacity>
      </View>

      {/* Score Display */}
      <Text style={styles.score}>Score: {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  player: {
    width: 50,
    height: 50,
    backgroundColor: 'red', // Example color
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  score: {
    fontSize: 20,
  },
});

export default App;
