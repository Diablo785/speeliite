import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import logo from './images/logo.png';
import burgerIcon from './images/burger.png'; 
const TeamMember = ({ image, title, name }) => (
  <View style={styles.member}>
    <Image source={image} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.name}>{name}</Text>
  </View>
);

const App = () => (
  <View style={styles.container}>
    
    <TouchableOpacity style={styles.burgerButton}>
      <Image source={burgerIcon} style={styles.burgerIcon} />
    </TouchableOpacity>

    <Image source={logo} style={styles.logo} />
    <Text style={styles.text}>Welcome to Valters Co Production, where we craft captivating mobile games led by visionary founder Valters. </Text>
    <Text style={styles.text}>Our Senior Developer, Imka, and Junior Developer, Olegs, work synergistically to bring innovation and excitement to every project.</Text>
    <Text style={styles.text}>With a commitment to excellence and a passion for gaming, we redefine the mobile gaming experience one game at a time. Join us on our journey of creativity and entertainment at Valters Co Production.</Text>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>OUR TEAM</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start', 
    paddingTop: 50, 
  },
  logo: {
    width: 320,
    height: 320,
    marginBottom: 10, 
    marginTop: 60,
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 30, 
  },
  team: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  member: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  title: {
    color: 'white',
    fontSize: 5, 
    marginTop: 10, 
  },
  name: {
    color: 'white',
    fontSize: 10, 
  },
  button: {
    backgroundColor: '#0000FF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  
  burgerButton: {
    position: 'absolute',
    top: 40, 
    left: 20,
    zIndex: 1, 
  },
  burgerIcon: {
    width: 30,
    height: 30,
  },
});

export default App;
