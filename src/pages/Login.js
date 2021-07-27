import React from "react";
import { Alert, Image, StyleSheet, TextInput, View } from "react-native";
import { ActivityIndicator, Colors } from 'react-native-paper';
import { Button, Dialog } from "react-native-paper";
import firebase from "firebase"
import logo from "../images/logo.png"


export default function login({ route, navigation }) {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleNavigateToRegister() {
        let usernameFromDB = false
        if (!username || !password) {
            Dialog("Erro", "Preencha os campos corretamente!");        
            } else {
                var ref = firebase.database().ref("users");
      
                ref.on("value", function (snapshot) {
                snapshot.forEach((usuarios) => {
                    if (username == usuarios.val().username) {
                        usernameFromDB = true;
                    }
                })
                }, function (error) {
                console.log("Error: " + error.code);
                });

                if (usernameFromDB) {
                    Alert.alert("Erro", "Username já cadastrado. Faça login ou crie uma conta com outro username.")
                } else {
                    navigation.navigate('Register', {username, password})
                }                
            }
    };

    function handleLogin() {
        let usernameFromDB = false
        let emailFromDB = "";
        if (!username || !password) {
            Alert.alert("Erro", "Preencha os campos corretamente!");
      
          } else {
            var ref = firebase.database().ref("users");
      
            ref.on("value", function (snapshot) {
              snapshot.forEach((users) => {
                if (username == users.val().username) {
                    usernameFromDB = true;
                    emailFromDB = users.val().email
                    console.log(emailFromDB)
                }
              })
            }, function (error) {
              console.log("Error: " + error.code);
            });

            if (!usernameFromDB) {
                Alert.alert("Erro", "Insira um username já cadastrado, ou então, cadastre-se.")
            } else {

            <ActivityIndicator animating={true} color={Colors.red800} />
                firebase
                .auth()
                .signInWithEmailAndPassword(emailFromDB, password)
                .then(() => {
                    const user = firebase.auth().currentUser;
        
                    if (!user.emailVerified) {
                    firebase.auth().signOut().then(Alert.alert("Erro!", "Por favor, verifique seu e-mail antes de fazer login!"))
                    } else {
                        navigation.navigate("MainScreen")
                    }
                  })
                  .catch(error => {
                    Alert.alert(`Erro ${error.code}`, `${error.message}`)
                  })
            }
        }
    }
    
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <TextInput
                name="Nome"
                placeholder="Username"
                type='outlined'
                style={styles.input}
                value={username}
                onChangeText={username => setUsername(username)}
                color="#000000"
                backgroundColor="#fff"
                
            />

            <TextInput
                name="Nome"
                placeholder="Senha"
                type='outlined'
                style={styles.input}
                secureTextEntry={true}
                value={password}
                onChangeText={password => setPassword(password)}
                color="#000000"
                backgroundColor="#fff"
                
            />
            
            <Button icon="login" mode="contained" style={styles.button} dark={true} onPress={handleLogin}>
                Entrar
            </Button>
            <Button icon="account-plus" mode="contained" style={styles.button} dark={true} onPress={handleNavigateToRegister} >
                Registrar-se
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