import React from "react";
import { StyleSheet, View, TextInput, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Card, IconButton, Paragraph, Searchbar, Title, FAB, Portal, Dialog } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SpecifiedItemList({ route, navigation }) {

    // const { id } = route.params; 
    const [confirmVisible, setConfirmVisible] = React.useState(false);
    const [confirmationVisible, setConfirmationVisible] = React.useState(false);    

    function handleNavigateToCreateNewItem() {
        navigation.navigate("CreateNewItem")
    }

    function handleShowConfirmationDialog(id) {
        setConfirmVisible(true)
    }

    function handleSendTrade() {
        setConfirmVisible(false)
        //firebase
        setConfirmationVisible(true)
    }

    function handleCancel() {
        setConfirmVisible(false)
    }

    function handleHideConfirmation() {
        setConfirmationVisible(false)
    }

    return (
        <View style={styles.container}>

            <SafeAreaView style={styles.safeAreaView}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>Selecione um item para oferecer na troca</Text>

                    <Card style={styles.card} acessible={true} onPress={(id) => handleShowConfirmationDialog(id)}>
                        <Card.Content>
                            <Card.Cover source={{ uri: 'https://vitasuco.com.br/wp-content/uploads/2020/08/capa_blog_vita_suco.png' }} />
                            <Title style={styles.cardTitle} >test</Title>
                            <Paragraph style={styles.cardParagraph}>testsdfjhasojkdhfasljkdfhlsuaidfhjksdhflkjasdhfasdjkh</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card} acessible={true} onPress={(id) => handleNavigateToSpecifiedItemList(id)}>
                        <Card.Content>
                            <Card.Cover source={{ uri: 'https://vitasuco.com.br/wp-content/uploads/2020/08/capa_blog_vita_suco.png' }} />
                            <Title style={styles.cardTitle} >test</Title>
                            <Paragraph style={styles.cardParagraph}>testsdfjhasojkdhfasljkdfhlsuaidfhjksdhflkjasdhfasdjkh</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card} acessible={true} onPress={(id) => handleShowConfirmationDialog(id)}>
                        <Card.Content>
                            <Card.Cover source={{ uri: 'https://vitasuco.com.br/wp-content/uploads/2020/08/capa_blog_vita_suco.png' }} />
                            <Title style={styles.cardTitle} >test</Title>
                            <Paragraph style={styles.cardParagraph}>testsdfjhasojkdhfasljkdfhlsuaidfhjksdhflkjasdhfasdjkh</Paragraph>
                        </Card.Content>
                    </Card>
                </ScrollView>
            </SafeAreaView>

            <Portal>
                <Dialog visible={confirmVisible} dismissable={true} onDismiss={handleCancel}>
                    <Dialog.Title>Você tem certeza?</Dialog.Title>
                    <Dialog.Content>
                        <Text style={styles.dialogText}>
                            Deseja trocar seu 
                            <Text style={styles.dialogTextBold}>
                                {" ITEM AQUI "}
                            </Text>
                            pelo item?
                        </Text>
                        <Button
                            icon="check"
                            mode="contained"
                            dark={true}
                            onPress={handleSendTrade}
                        >
                            Confirmar
                        </Button>
                        <Button
                            icon="cancel"
                            mode="contained"
                            dark={true}
                            onPress={handleCancel}
                            style={styles.cancelButton}
                        >
                            Cancelar
                        </Button>
                    </Dialog.Content>
                </Dialog>
            </Portal>

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

            <FAB
                style={styles.fab}
                icon="plus"
                onPress={handleNavigateToCreateNewItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
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

    title: {
        fontWeight: "bold",
        fontSize: 19,
        marginVertical: "5%",
    },

    button: {
        marginVertical: "5%",
        width: "80%",
    },

    card: {
        marginHorizontal: "10%",
        marginBottom: "2%",
        width: "80%",
        backgroundColor: "#ffd731"
    },

    cardTitle: {
        fontSize: 28,
        color: "#000000",
        marginVertical: "2%"
    },

    cardParagraph: {
        fontSize: 16,
        color: "#000000"
    }, 

    dialogText: {
        marginBottom: 30,
        fontSize: 15
    },

    dialogTextBold: {
        fontWeight: "bold"
    },

    cancelButton: {
        marginTop: 10,
        backgroundColor: "#FF3838"
    }

});