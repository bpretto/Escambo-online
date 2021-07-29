import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Dialog, IconButton, Portal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewPost({ route, navigation }) {

    const [confirmationVisible, setConfirmationVisible] = React.useState(false);

    function handleSentTradeOffer() {
        //firebase
        setConfirmationVisible(true)
    }

    function handleHideConfirmation() {
        setConfirmationVisible(false)
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaView}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <Text style={styles.pageTitle}>Cadastrar novo item</Text>
                    <View style={styles.divider}>
                        <Text style={styles.labelText}>Título</Text>
                        <TextInput maxLength={30} style={styles.titleInput} />
                    </View>
                    <View style={styles.divider}>
                        <Text style={styles.labelText}>Descrição</Text>
                        <TextInput maxLength={500} multiline={true} numberOfLines={25} style={styles.descriptionInput} />
                    </View>
                    <View style={styles.divider}>
                        <Text style={styles.labelText}>O que você quer em troca?</Text>
                        <TextInput maxLength={400} multiline={true} numberOfLines={15} style={styles.exchangeInput} />
                    </View>
                    <View style={styles.divider}>
                        <Text style={styles.labelText}>Imagens</Text>
                        <IconButton icon="plus" color="#fff" size={40} style={styles.imageButton} />
                    </View>
                    <View style={styles.divider}>
                        <Button
                            icon="send"
                            mode="contained"
                            style={styles.button}
                            dark={true}
                            onPress={handleSentTradeOffer}
                        >
                            Enviar proposta de troca
                        </Button>
                    </View>
                </ScrollView>
            </SafeAreaView>

            <Portal>
                <Dialog visible={confirmationVisible} dismissable={true} onDismiss={handleHideConfirmation}>
                    <Dialog.Title>Proposta enviada!</Dialog.Title>
                    <Dialog.Content>
                        <Button
                            icon="check"
                            mode="contained"
                            dark={true}
                            onPress={handleHideConfirmation}
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

    pageTitle: {
        fontWeight: "bold",
        fontSize: 19,
        marginTop: "2%"
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
});