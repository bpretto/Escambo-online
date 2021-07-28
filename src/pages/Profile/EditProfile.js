import React from "react";
import { StyleSheet, View, Text, Slider } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Dialog, TextInput, Portal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewPost({ route, navigation }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: "Editar Perfil",
        });
    }, [navigation]);

    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [range, setRange] = React.useState(100);
    const [password, setPassword] = React.useState('');

    function handleEdit() {
        setPasswordVisible(false)

    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaView}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.divider}>
                        <Text style={styles.labelText}>Username</Text>
                        <TextInput maxLength={30} style={styles.titleInput} />
                    </View>
                    <View style={styles.divider}>
                        <Text style={styles.labelText}>Nome</Text>
                        <TextInput maxLength={30} style={styles.titleInput} />
                    </View>
                    <View style={styles.divider}>
                        <Text style={styles.labelText}>Whatsapp</Text>
                        <TextInput maxLength={11} style={styles.titleInput} />
                    </View>
                    <View style={styles.divider}>
                        <Text style={styles.labelText}>Raio do radar de escambo</Text>
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
                            style={styles.buttonDeleteDialog}
                            dark={true}
                            onPress={handleEdit}
                        >
                            Editar
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

    buttonDeleteDialog: {
        alignSelf:"flex-end",
        marginTop:10,
        backgroundColor:"#FF9F38",
    },

    inputDialog: {
        backgroundColor:"ghostwhite",
        marginBottom: 10
    }
});