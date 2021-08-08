import React from "react";
import { Image, StyleSheet, View, Slider, Text, Alert } from "react-native";
import { Button } from "react-native-paper";
import Fire from "../../components/Fire"
import firebase from "firebase"
import logo from "../../images/logo.png"


export default function Range({ route, navigation }) {

    const { username, password, name, email, tel, lat, lng } = route.params;

    console.log(username, password, name, tel, lat, lng)

    const [range, setRange] = React.useState(100);

    async function handleNavigateToHomepage() {
        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    var user = firebase.auth().currentUser;

                    Fire.update("users", {
                        id: user.uid,
                        username,
                        name,
                        email,
                        tel,
                        range,
                        location: {
                            lat,
                            lng
                        },
                    });

                    user.sendEmailVerification().then(function () {
                        Alert.alert("Verificação", "Por favor, clique no link que enviamos para seu e-mail para autenticar sua conta!")
                        navigation.navigate("Login")
                    }).catch(function (error) {
                    console.log(error)
                    })
                });

            
        } catch (error) {
            console.log(error.code, error.message);
        }
    }
    
    
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo}></Image>
            <Text style={styles.text}>
                Deseja receber oportunidades de escambo em um raio de quantos quilômetros?
            </Text>
            <Slider
                style={styles.slider}
                maximumValue={1000}
                minimumValue={1}
                step={1}
                minimumTrackTintColor="#000"
                value={range}
                onValueChange={range => setRange(range)}
                thumbTintColor="#000"
            />
            <Text style={styles.text}>
                {range} km
            </Text>
            
            <Button icon="arrow-right-bold" mode="contained" style={styles.button} dark={true} onPress={handleNavigateToHomepage}>
                Criar conta
            </Button>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        marginBottom: 30,
        width: "90%",
        maxHeight: 100
    },

    text: {
        fontSize: 19,
        textAlign:"center",
        marginBottom: 10
    },

    slider: {
        width: "65%",
    },

    input: {
        paddingHorizontal: 10,
        width: "60%",
        marginBottom: 10
    },

    button: {
        marginBottom: 10,
        width: "60%",
        backgroundColor: "#000"
    },
});