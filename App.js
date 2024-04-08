import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const MainMenu = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Your logo image */}
        <Image source={require('./images/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.buttonContainer}>
        {/* Play Button */}
        <TouchableOpacity style={styles.playButton} onPress={() => console.log('Play button pressed')}>
          <Text style={styles.buttonText}>PLAY</Text>
        </TouchableOpacity>
        {/* Skins Button */}
        <TouchableOpacity style={styles.skinsButton} onPress={() => console.log('Skins button pressed')}>
          <Text style={styles.buttonText}>SKINS</Text>
        </TouchableOpacity>
        {/* Info Button */}
        <TouchableOpacity style={styles.infoButton} onPress={() => console.log('Info button pressed')}>
          <Text style={styles.buttonText}>INFO</Text>
        </TouchableOpacity>
      </View>
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
    flex: 1,
    justifyContent: 'flex-end', // Align logo at the bottom of its container
    alignItems: 'center',
    marginTop: 30, // Adjust as needed to position the logo lower
  },
  logo: {
    width: 300, // Adjust width as needed
    height: 300, // Adjust height as needed
    resizeMode: 'contain',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100, // Adjust as needed to position the button container lower
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
});

export default MainMenu;
