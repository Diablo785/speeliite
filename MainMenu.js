import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MainMenu = () => {
  const navigation = useNavigation();
  const logoSlideInAnimation = useRef(new Animated.Value(-200)).current;
  const buttonsSlideInAnimation = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoSlideInAnimation, {
        toValue: 30,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(buttonsSlideInAnimation, {
        toValue: 100,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { transform: [{ translateY: logoSlideInAnimation }] }]}>
        <Image source={require('./images/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => {}} style={styles.burgerIcon}>
        <Image source={require('./images/burger_menu.png')} style={styles.burgerMenuIcon} />
      </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: buttonsSlideInAnimation }] }]}>
        <ShadowWrapper>
          <TouchableOpacity style={styles.playButton} onPress={() => navigation.navigate('Game')}>
            <Text style={styles.buttonText}>PLAY</Text>
          </TouchableOpacity>
        </ShadowWrapper>
        <ShadowWrapper>
          <TouchableOpacity style={styles.skinsButton} onPress={() => navigation.navigate('Skins')}>
            <Text style={styles.buttonText}>SKINS</Text>
          </TouchableOpacity>
        </ShadowWrapper>
        <ShadowWrapper>
          <TouchableOpacity style={styles.infoButton} onPress={() => navigation.navigate('Info')}>
            <Text style={styles.buttonText}>INFO</Text>
          </TouchableOpacity>
        </ShadowWrapper>
      </Animated.View>
    </View>
  );
};

const ShadowWrapper = ({ children }) => {
  return Platform.OS === 'ios' ? (
    <View style={styles.shadowWrapper}>
      {children}
    </View>
  ) : (
    <View>
      {children}
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
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  burgerIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  burgerMenuIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 150,
  },
  playButton: {
    backgroundColor: '#0C9600',
    width: 165,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  skinsButton: {
    backgroundColor: '#A00000',
    width: 165,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  infoButton: {
    backgroundColor: '#2059EC',
    width: 165,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  shadowWrapper: {
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: {
      height: 5,
      width: 0,
    },
    elevation: 5,
    borderRadius: 10,
  },
});

export default MainMenu;