import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigation = useNavigation();
  const sidebarSlideInAnimation = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    Animated.timing(sidebarSlideInAnimation, {
      toValue: sidebarOpen ? 0 : -200,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [sidebarOpen]);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarSlideInAnimation }] }]}>
      <TouchableOpacity onPress={closeSidebar} style={styles.closeIconContainer}>
        <Image 
          source={require('./images/close_icon.png')} 
          style={styles.closeIcon} 
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarButton} onPress={() => navigation.navigate('Play')}>
        <Text style={styles.buttonText}>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarButton} onPress={() => navigation.navigate('Skins')}>
        <Text style={styles.buttonText}>Skins</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarButton} onPress={() => navigation.navigate('Info')}>
        <Text style={styles.buttonText}>Info</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarButton} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 200,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  sidebarButton: {
    backgroundColor: '#2059EC',
    width: 165,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  closeIconContainer: {
    position: 'absolute',
    top: 30,
    left: 30,
    zIndex: 1,
  },
  closeIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  buttonText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
});

export default Sidebar;
