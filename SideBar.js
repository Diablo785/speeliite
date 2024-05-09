import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useNavigation } from '@react-navigation/native';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigation = useNavigation();
  const sidebarSlideInAnimation = useRef(new Animated.Value(-200)).current;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    Animated.timing(sidebarSlideInAnimation, {
      toValue: sidebarOpen ? 0 : -375,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [sidebarOpen]);

  useEffect(() => {
    getUserDataFromStorage();
  }, []);

  const getUserDataFromStorage = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem('userData');
      if (userDataJSON !== null) {
        const userData = JSON.parse(userDataJSON);
        setUserData(userData);
      }
    } catch (error) {
      console.error('Error getting user data from AsyncStorage:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      setUserData(null);
      navigation.navigate('LandingPage');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Animated.View style={[styles.sidebarContainer, { transform: [{ translateX: sidebarSlideInAnimation }] }]}>
      <View style={styles.sidebar}>
        <View style={styles.userDataContainer}>
          {userData && (
            <Text style={styles.usernameText}>Welcome, {userData.username}!</Text>
          )}
        </View>
    
        <View style={styles.sidebarButtonsContainer}>
          <TouchableOpacity style={[styles.sidebarButton, { backgroundColor: '#0C9600' }]} onPress={() => navigation.navigate('Game')}>
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.sidebarButton, { backgroundColor: '#A00000' }]} onPress={() => navigation.navigate('Skins')}>
            <Text style={styles.buttonText}>Skins</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.sidebarButton, { backgroundColor: '#2059EC' }]} onPress={() => navigation.navigate('Info')}>
            <Text style={styles.buttonText}>Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.sidebarButton, { backgroundColor: '#E1CD1D' }]} onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.sidebarButton, { backgroundColor: '#FFFFFF' }]} onPress={handleSignOut}>
            <Text style={[styles.buttonText, { color: '#000000' }]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    position: 'absolute',
    zIndex: 3,
  },
  sidebar: {
    height: 500,
    width: 250,
    backgroundColor: 'rgba(20, 20, 20, 0.85)',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  sidebarButtonsContainer: {
    alignItems: 'center',
  },
  sidebarButton: {
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
  usernameText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  userDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Sidebar;
