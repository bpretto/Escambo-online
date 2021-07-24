import React from "react";
import { Alert, Image, StyleSheet, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import firebase from "firebase"
import logo from "../../images/logo.png"


export default function register({ route, navigation }) {
    const { username, password } = route.params;

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [tel, setTel] = React.useState('');

    function handleNavigateToMapView() {
            let emailFromDB = false
            if (!name || !email || !tel) {
                Alert.alert("Erro", "Preencha os campos corretamente!");        
                } else {
                    var ref = firebase.database().ref("users");
          
                    ref.on("value", function (snapshot) {
                    snapshot.forEach((usuarios) => {
                        if (email == usuarios.val().email) {
                            emailFromDB = true;
                        }
                    })
                    }, function (error) {
                    console.log("Error: " + error.code);
                    });
    
                    if (emailFromDB) {
                        Alert.alert("Erro", "Email já cadastrado. Faça login ou crie uma conta com outro e-mail.")
                    } else {
                        navigation.navigate('MapView', {
                            username,
                            password,
                            name,
                            email,
                            tel
                        })
                    }                
                }
    };
    
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo}></Image>
            <TextInput
                name="Nome"
                placeholder="Nome"
                type='outlined'
                style={styles.input}
                value={name}
                onChangeText={name => setName(name)}
                color="#000000"
                backgroundColor="#fff"
            />            
            <TextInput
                name="Nome"
                placeholder="E-mail"
                type='outlined'
                style={styles.input}
                value={email}
                onChangeText={email => setEmail(email)}
                color="#000000"
                backgroundColor="#fff"
            />
            <TextInput
                name="Nome"
                placeholder="Número de Whatsapp"
                type='outlined'
                style={styles.input}
                value={tel}
                keyboardType="numeric"
                onChangeText={tel => setTel(tel)}
                color="#000000"
                backgroundColor="#fff"
            />
            
            <Button icon="arrow-right-bold" mode="contained" style={styles.button} dark={true} onPress={handleNavigateToMapView}>
                Continuar
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