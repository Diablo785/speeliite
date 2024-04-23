import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Importē attēlus no vietējā projekta mapes
import logo from './images/logo.png';
import ceo from './images/ceo.png';
import junior from './images/junior.png';
import senior from './images/senior.png';

const TeamMember = ({ image, title, name }) => (
  <View style={styles.member}>
    <Image source={image} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.name}>{name}</Text>
  </View>
);

const App = () => (
  <View style={styles.container}>
    <Image source={logo} style={styles.logo} />
    <Text style={styles.text}>OUR TEAM</Text>
    <View style={styles.team}>
      <TeamMember image={ceo} title="FOUNDER AKA CEO OF VALTERS CO" name="VALTERS" />
      <TeamMember image={senior} title="SENIOR DEVELOPER PROGAMERS AKA" name="IMKA" />
      <TeamMember image={junior} title="JUNIOR DEVELOPER" name="OLEGS" />
    </View>
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
    width: 300,
    height: 300,
    marginBottom: 10, 
    marginTop: 60,
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50, 
  },
  team: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  member: {
    alignItems: 'center',
    margin: 10, 
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  title: {
    color: 'white',
    fontSize: 6, 
    marginTop: 10, 
  },
  name: {
    color: 'white',
    fontSize: 10, 
  },
});

export default App;
