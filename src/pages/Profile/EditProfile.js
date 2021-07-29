import React from "react";
import { StyleSheet, View, Text, Slider } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Dialog, TextInput, Portal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import firebase from "firebase";
import Fire from "../../components/Fire";

export default function EditProfile({ route, navigation }) {

    let { username, name, email, tel, range, lat, lng } = route.params

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: "Editar Perfil",
        });
    }, [navigation]);

    const user = firebase.auth().currentUser;
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [confirmationVisible, setConfirmationVisible] = React.useState(false);
    const [errorVisible, setErrorVisible] = React.useState(false);
    const [newUsername, setNewUsername] = React.useState(username);
    const [newName, setNewName] = React.useState(name);
    const [newTel, setNewTel] = React.useState(tel);
    const [newRange, setNewRange] = React.useState(range);
    const [password, setPassword] = React.useState('');

    function handleEdit() {
        const credential = firebase.auth.EmailAuthProvider.credential(
            firebase.auth().currentUser.email,
            password
        );

        user.reauthenticateWithCredential(credential)
        .then(function() {
            
            const objItens = {
                id: user.uid,
                username: newUsername,
                name: newName,
                email,
                tel: newTel,
                range: newRange,
                location: {
                    lat,
                    lng
                },
            }

            Fire.update("users", objItens);

            setConfirmationVisible(true)
        })
        .catch(function(error) {
            console.log(error)
            setErrorVisible(true)
        });

        
    }
    
    function handleHideConfirmationAndError() {
        setConfirmationVisible(false)
        setErrorVisible(false)
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaView}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} style={styles.scrollView} showsVerticalScrollIndicator={false}>

                    <View style={styles.divider}>
                        <Text style={styles.labelText}>Username</Text>
                        <TextInput
                            maxLength={30}
                            value={newUsername}
                            onChangeText={(newUsername) => setNewUsername(newUsername)}
                            style={styles.titleInput}
                        />
                    </View>

                    <View style={styles.divider}>
                        <Text style={styles.labelText}>Nome</Text>
                        <TextInput
                            maxLength={30}
                            value={newName}
                            onChangeText={(newName) => setNewName(newName)}
                            style={styles.titleInput}
                        />
                    </View>

                    <View style={styles.divider}>
                        <Text style={styles.labelText}>Whatsapp</Text>
                        <TextInput
                            maxLength={11}
                            value={newTel}
                            onChangeText={(newTel) => setNewTel(newTel)}
                            style={styles.titleInput}
                        />
                    </View>
                    <View style={styles.divider}>
                        <Text style={styles.labelText}>Raio do radar de escambo</Text>
                        <Slider
                            style={styles.slider}
                            maximumValue={1000}
                            minimumValue={1}
                            step={1}
                            minimumTrackTintColor="#000"
                            value={newRange}
                            onValueChange={newRange => setNewRange(newRange)}
                            thumbTintColor="#000"
                        />
                        <Text style={styles.text}>
                            {newRange} km
                        </Text>
                    </View>
                    <View style={styles.divider}>
                        <Button icon="content-save" mode="contained" style={styles.button} dark={true} onPress={() => setPasswordVisible(true)}>
                            Salvar
                        </Button>
                    </View>
                </ScrollView>
            </SafeAreaView>

            <Portal>
                <Dialog visible={passwordVisible} dismissable={true} onDismiss={()=>setPasswordVisible(false)}>
                    <Dialog.Title>Digite sua senha:</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            style={styles.inputDialog}
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                            placeholder='Senha'
                        />
                        <Button
                            icon="account-edit"
                            mode="contained"
                            dark={true}
                            onPress={handleEdit}
                        >
                            Editar
                        </Button>
                    </Dialog.Content>
                </Dialog>
            </Portal>

            <Portal>
                <Dialog visible={confirmationVisible} dismissable={true} onDismiss={handleHideConfirmationAndError}>
                    <Dialog.Title>Perfil atualizado!</Dialog.Title>
                    <Dialog.Content>
                        <Button
                            icon="check"
                            mode="contained"
                            dark={true}
                            onPress={handleHideConfirmationAndError}
                        >
                            Ok!
                        </Button>
                    </Dialog.Content>
                </Dialog>
            </Portal>

            <Portal>
                <Dialog visible={errorVisible} dismissable={true} onDismiss={handleHideConfirmationAndError}>
                    <Dialog.Title>Erro, tente novamente mais tarde!</Dialog.Title>
                    <Dialog.Content>
                        <Button
                            icon="check"
                            mode="contained"
                            dark={true}
                            onPress={handleHideConfirmationAndError}
                        >
                            Ok!
                        </Button>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: "center"
    },

    safeAreaView: {
        width: "100%",
        marginTop: "-8%",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: "10%"
    },
    
    scrollView: {
        width: '100%',
        height: "100%",
        marginHorizontal: "10%"
    },
    
    divider: {
        marginTop:"5%",
        width: "80%",
    },

    labelText: {
        marginBottom: "2%",
    },
    
    titleInput: {
        padding: 10,
        color: "#000",
        backgroundColor: "ghostwhite",
        width: "100%",
        height: 40,
        textAlignVertical: "center",
        justifyContent: "center"
    },

    descriptionInput: {
        backgroundColor: "ghostwhite",
        padding: 10,
        width: "100%",
        height: 300,
        textAlignVertical: "center",
        justifyContent: "center",
        textAlignVertical: "top"
    },

    exchangeInput: {
        padding: 10,
        backgroundColor: "ghostwhite",
        width: "100%",
        height: 150,
        textAlignVertical: "center",
        justifyContent: "center",
        textAlignVertical: "top"
    },

    imageButton: {
        backgroundColor: "#ffd731",        
    },

    button: {
        width: "100%",
        marginBottom: "5%"
    },

    inputDialog: {
        backgroundColor:"ghostwhite",
        marginBottom: 10
    }
});