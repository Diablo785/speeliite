import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();
    const logoSlideInAnimation = useRef(new Animated.Value(-200)).current;
    const buttonsSlideInAnimation = useRef(new Animated.Value(300)).current;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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

    const handleLogin = () => {
        // Define the URL of your PHP login endpoint
        const url = 'http://localhost/speeliite/login.php';
    
        // Define the request body
        const body = JSON.stringify({
            username: username,
            password: password,
        });
    
        // Define the request options
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        };
    
        // Make the fetch request
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // Navigate to the Home screen upon successful login
                    navigation.navigate('MainMenu');
                } else {
                    // Set error message if login fails
                    setError(data.message);
                    console.error('regnars gejs');
                }
            })
            .catch((error) => {
                console.error('Error logging in:', error);
            });
    };
    

    const navigateToRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.logoContainer, { transform: [{ translateY: logoSlideInAnimation }] }]}>
                <Image source={require('./images/logo.png')} style={styles.logo} />
            </Animated.View>
            <View style={styles.middleContainer}>
                <TouchableOpacity style={styles.leftButton} onPress={navigateToRegister}>
                    <Image source={require('./images/arrow_left.png')} style={styles.arrowImage} />
                </TouchableOpacity>
                <Text style={styles.loginText}>LOGIN</Text>
                <TouchableOpacity style={styles.rightButton} onPress={navigateToRegister}>
                    <Image source={require('./images/arrow_right.png')} style={styles.arrowImage} />
                </TouchableOpacity>
            </View>
            <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: buttonsSlideInAnimation }] }]}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    placeholderTextColor="#0C9600"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    placeholderTextColor="#0C9600"
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                {error ? <Text style={styles.error}>{error}</Text> : null}
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
        borderTopColor: '#0C9600',
        borderBottomColor: '#0C9600',
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
        bottom: 150,
    },
    input: {
        backgroundColor: 'transparent',
        width: 200,
        height: 50,
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#0C9600',
        color: '#0C9600',
        fontSize: 30,
        textAlign: 'center',
    },
    loginButton: {
        backgroundColor: '#0C9600',
        width: 145,
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
    error: {
        color: 'red',
        marginTop: 10,
    },
});

export default Login;

