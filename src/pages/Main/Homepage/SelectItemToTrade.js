import React, { useEffect } from "react";
import { StyleSheet, View, TextInput, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Card, IconButton, Paragraph, Searchbar, Title, FAB, Portal, Dialog } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import firebase from "firebase";
import Fire from "../../../components/Fire";

export default function SpecifiedItemList({ route, navigation }) {

    const { item } = route.params;
    const [itemArray, setItemArray] = React.useState([]);
    const [confirmVisible, setConfirmVisible] = React.useState(false);
    const [confirmationVisible, setConfirmationVisible] = React.useState(false);
    const user = firebase.auth().currentUser;
    
    useEffect(() => {
        getUserItems()
    })

    async function getUserItems() {
        setItemArray([])
        var ref = firebase.database().ref("items");      
        ref.on("value", function (snapshot) {
            snapshot.forEach((item) => {
                if (item.val().user_id == user.uid) {
                    const itemInterface = {
                        id: item.val().id,
                        title: item.val().title,
                        description: item.val().description
                    }

                    setItemArray((oldArray) => [...oldArray, itemInterface])
                } 
            })
        })
    }

    function handleNavigateToCreateNewItem() {
        navigation.navigate("CreateNewItem")
    }

    function handleShowConfirmationDialog(id) {
        setConfirmVisible(true)
    }

    function handleSendTrade(one) {
        try {
            Fire.save("trades", {
                requested_item_id: item.id,
                requested_user_id: item.user_id,
                requesting_item_id: one.id,
                requesting_user_id: user.uid
            })
            setConfirmationVisible(true)
        } catch (error) {
            console.log(error)
        }
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

                    {itemArray.map((one) => (
                        <Card key={one.id} style={styles.card} acessible={false} onPress={() => handleSendTrade(one)}>
                            <Card.Content>
                                <Title style={styles.cardTitle}>{item.title}</Title>
                                <Paragraph style={styles.cardParagraph}>{item.description}</Paragraph>
                            </Card.Content>
                        </Card>
                    ))}
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