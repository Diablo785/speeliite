import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Sidebar from './sidebar';

const MainMenu = () => {
  const navigation = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Set initial state to false
  const logoSlideInAnimation = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    // No need to open the sidebar when component mounts, set it to false instead
    setSidebarOpen(false);
  }, []);

  useEffect(() => {
    Animated.timing(logoSlideInAnimation, {
      toValue: 30,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleSidebar} style={styles.burgerIcon}>
        <Image 
          source={require('./images/burger_menu.png')} 
          style={styles.burgerMenuIcon} 
        />
      </TouchableOpacity>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Animated.View style={[styles.logoContainer, { transform: [{ translateY: logoSlideInAnimation }] }]}>
        <Image source={require('./images/logo.png')} style={styles.logo} />
      </Animated.View>
      <Animated.View style={[styles.buttonContainer]}>
        <ShadowWrapper>
          <TouchableOpacity style={styles.playButton} onPress={() => navigation.navigate('Play')}>
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
    position: 'relative',
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
    top: 30,
    left: 20,
    zIndex: 1,
  },
  burgerMenuIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: 'white', // Change to white for better visibility
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 150,
    zIndex: 2,
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
