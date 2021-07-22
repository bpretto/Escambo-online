import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import logo from "../../images/logo.png"


export default function Homepage({ route, navigation }) {

    const [name, setName] = React.useState('');
    const [whatsapp, setWhatsapp] = React.useState('');

    function handleNavigateToMapView() {
        navigation.navigate('MapView')
    }
    
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo}></Image>
            <TextInput
                name="Nome"
                label="João"
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
                label="João"
                placeholder="Número de Whatsapp"
                type='outlined'
                style={styles.input}
                value={whatsapp}
                onChangeText={whatsapp => setWhatsapp(whatsapp)}
                color="#000000"
                backgroundColor="#fff"
                
            />
            
            <Button icon="login" mode="contained" style={styles.button} dark={true} onPress={handleNavigateToMapView}>
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