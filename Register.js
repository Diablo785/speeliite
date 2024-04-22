import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
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

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { transform: [{ translateY: logoSlideInAnimation }] }]}>
        <Image source={require('./images/logo.png')} style={styles.logo} />
      </Animated.View>
      <View style={styles.middleContainer}>
        <TouchableOpacity style={styles.leftButton} onPress={navigateToLogin}>
          <Image source={require('./images/arrow_left.png')} style={styles.arrowImage} />
        </TouchableOpacity>
        <Text style={styles.loginText}>REGISTER</Text>
        <TouchableOpacity style={styles.rightButton} onPress={navigateToLogin}>
          <Image source={require('./images/arrow_right.png')} style={styles.arrowImage} />
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: buttonsSlideInAnimation }] }]}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#2059EC" // Set placeholder text color here
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#2059EC" // Set placeholder text color here
        />
        <TextInput
          style={styles.input}
          placeholder="Email" // Added email input field
          placeholderTextColor="#2059EC" // Set placeholder text color here
        />
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
      </Animated.View>
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
  arrowImage: {
    width: 55,
    height: 55,
  },
  middleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: '47%',
    width: '100%',
    height: 60,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderTopColor: '#2059EC',
    borderBottomColor: '#2059EC',
    borderWidth: 1,
  },
  loginText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  leftButton: {
    marginRight: 'auto',
  },
  rightButton: {
    marginLeft: 'auto',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
  },
  input: {
    backgroundColor: 'transparent',
    width: 200,
    height: 50,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2059EC',
    color: '#2059EC',
    fontSize: 30,
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#2059EC',
    width: 185,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
});

export default Register;
