import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native'
import { auth, db } from '../firebase'
import { useNavigation } from '@react-navigation/native';
import bgImages from '../assets/bgImages.png'
import QRCode from 'react-native-qrcode-svg';

const HomeScreen = () => {
    const homeNavigation = useNavigation()
// console.log('auth:', auth)
    const handleSignOut = () => {
        auth
        .signOut()
        .then(() => {
            homeNavigation.replace("Login")
        })
        .catch(error => alert(error.message))
    }

    const [post, setPost] = useState([]);
console.log('hello',post)
//     const readable1 = post.name;
//     const readable2 = post.firstdose;
//     const readable3 = post.seconddose;
//     const qrReadable = {...readable1, ...readable2, ...readable3};
// console.log(qrReadable)
    useEffect(async () => {
        await db.collection('users')
        .where('userID', '==', auth.currentUser.uid)
        .onSnapshot(snapshot => {
            setPost(snapshot.docs.map(doc => doc.data()))
            //console.log(snapshot)
        })
        
    }, []);

    return (
        // <View style={styles.container}>
            <ImageBackground source={bgImages} style={styles.bgcontainer}>
            <Text>Email: {auth.currentUser?.email}</Text>
            <Text>UID: {auth.currentUser?.uid}</Text>
            {
                post.map((user) => (
                    <View>
                    <Text>Name: {user.name}</Text>
                    <Text>First Dose: {user.firstdose}</Text>
                    <Text>Second Dose: {user.seconddose}</Text>
                    <Text>ID: {user.userID}</Text>
                    </View>
                ))
            }
            <QRCode value={post ? post : ''} size={200} color='white' backgroundColor='black'></QRCode>
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
            </ImageBackground>
        // </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        width: null,
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
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
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
