import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import logo from "../images/logo.png"


export default function Homepage({ route, navigation }) {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleNavigateToRegister() {
        navigation.navigate('Register')
    }
    
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo}></Image>
            <TextInput
                name="Nome"
                label="João"
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
                label="João"
                placeholder="Senha"
                type='outlined'
                style={styles.input}
                secureTextEntry={true}
                value={password}
                onChangeText={password => setPassword(password)}
                color="#000000"
                backgroundColor="#fff"
                
            />
            
            <Button icon="login" mode="contained" style={styles.button} dark={true} onPress={() => {console.log(username, password)}}>
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