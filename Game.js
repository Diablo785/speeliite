import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');
const MOVE_INCREMENT = 6;
const COUNTDOWN_DURATION = 3;

const Game = () => {
  const [score, setScore] = useState(0);
  const [playerPosition, setPlayerPosition] = useState(width / 2 - 25);
  const [currentDirection, setCurrentDirection] = useState(null);
  const [countdown, setCountdown] = useState(COUNTDOWN_DURATION);
  const [isPaused, setIsPaused] = useState(false);
  const [isCountdownPaused, setIsCountdownPaused] = useState(false);
  const moveIntervalRef = useRef(null);
  const countdownAnimations = useRef(Array.from({ length: COUNTDOWN_DURATION }, () => new Animated.Value(0))).current;

  const moveLeft = () => {
    setPlayerPosition(position => Math.max(0, position - MOVE_INCREMENT));
  };

  const moveRight = () => {
    setPlayerPosition(position => Math.min(width - 50, position + MOVE_INCREMENT));
  };

  const handlePress = (direction) => {
    if ((direction === 'left' && currentDirection === 'right') || (direction === 'right' && currentDirection === 'left')) {
      setCurrentDirection(direction);
      clearInterval(moveIntervalRef.current);
    } else {
      setCurrentDirection(direction);
    }
  };

  const handleRelease = () => {
    setCurrentDirection(null);
  };

  const handlePausePress = () => {
    setIsPaused(true);
    setIsCountdownPaused(true);
  };

  const handleResumePress = () => {
    setIsPaused(false);
    setIsCountdownPaused(false);
  };

  const handleRestartPress = () => {
    setScore(0);
    setCountdown(COUNTDOWN_DURATION);
    clearInterval(moveIntervalRef.current);
    setIsPaused(false);
    setIsCountdownPaused(false);
    countdownAnimations.forEach(anim => anim.setValue(0));
    startCountdownAnimations();
  };

  const startCountdownAnimations = () => {
    countdownAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: height / 2 + 100,
        duration: 1000,
        useNativeDriver: true,
        delay: index * 1000,
      }).start();
    });
  };

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (!isPaused && !isCountdownPaused) {
        if (countdown > 0) {
          setCountdown(prevCountdown => prevCountdown - 1);
        } else {
          setScore(prevScore => prevScore + 1);
        }
      }
    }, 1000);
  
    return () => clearInterval(gameLoop);
  }, [countdown, isPaused, isCountdownPaused]);

  useEffect(() => {
    const movePlayer = () => {
      if (currentDirection === 'left') {
        moveLeft();
      } else if (currentDirection === 'right') {
        moveRight();
      }
    };

    if (currentDirection && countdown === 0 && !isPaused) {
      const moveInterval = setInterval(movePlayer, 10);
      moveIntervalRef.current = moveInterval;
      return () => clearInterval(moveInterval);
    }
  }, [currentDirection, countdown, isPaused]);

  useEffect(() => {
    startCountdownAnimations();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePausePress} style={styles.pauseIcon}>
        <Image source={require('./images/pause_icon.png')} style={styles.pauseIconImage} />
      </TouchableOpacity>
      {isPaused && (
        <View style={styles.overlay}>
          <Text style={styles.pausedText}>Paused</Text>
          <TouchableOpacity onPress={handleResumePress} style={styles.menuItem}>
            <Text style={styles.menuText}>Resume</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRestartPress} style={styles.menuItem}>
            <Text style={styles.menuText}>Restart</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Settings")} style={styles.menuItem}>
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Main Menu")} style={styles.menuItem}>
            <Text style={styles.menuText}>Main Menu</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={[styles.player, { left: playerPosition }]}></View>
      <View style={styles.arrowContainer}>
        <TouchableOpacity
          onPressIn={() => handlePress('left')}
          onPressOut={handleRelease}
        >
          <Image source={require('./images/arrow_left.png')} style={styles.arrowImage} />
        </TouchableOpacity>
        <TouchableOpacity
          onPressIn={() => handlePress('right')}
          onPressOut={handleRelease}
        >
          <Image source={require('./images/arrow_right.png')} style={styles.arrowImage} />
        </TouchableOpacity>
      </View>
      {countdown > 0 && (
        <View style={styles.countdownContainer}>
          {countdownAnimations.map((anim, index) => (
            <Animated.Text
              key={index}
              style={[
                styles.countdown,
                {
                  transform: [{ translateY: anim }],
                },
              ]}
            >
              {COUNTDOWN_DURATION - index}
            </Animated.Text>
          ))}
        </View>
      )}
      {countdown === 0 && (
        <Text style={styles.score}>{score}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  player: {
    position: 'absolute',
    bottom: 175,
    width: 50,
    height: 50,
    backgroundColor: 'red',
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  arrowImage: {
    width: 65,
    height: 65,
  },
  score: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    top: 35,
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
  },
  countdown: {
    fontSize: 72,
    fontWeight: 'bold',
    color: 'white',
    zIndex: 11,
  },
  pauseIcon: {
    position: 'absolute',
    top: 35,
    left: 25,
  },
  pauseIconImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(120, 120, 120, 0.8)',
    width: '75%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: '12.5%',
    top: '25%',
    borderRadius: 20,
    zIndex: 10,
  },
  menuItem: {
    backgroundColor: 'white',
    width: 150,
    height: 50,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  pausedText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
});

export default Game;
