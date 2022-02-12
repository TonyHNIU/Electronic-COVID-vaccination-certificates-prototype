import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import { auth } from '../firebase';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginNavigation = useNavigation()

    const handleLogin = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with: ', user.email);
        })
        .catch(error => alert(error.message))
    }

    useEffect(async () => {
        const unsubscribe = await auth.onAuthStateChanged(user => {
            if (user) {
                loginNavigation.replace("Home")
            }
        })
        return unsubscribe
    }, [])

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.text}>Electronic COVID Vaccine Card Prototype</Text>
            <View style={styles.inputContainer}>
                <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                />
                <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>

            <View>
            <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.navButtonText}>Don't have account? Create here</Text>
            </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
    text: {
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
        textAlign: 'center'
    },
    forgotButton: {
        marginVertical: 35,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
    },
})
