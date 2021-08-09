import React, { useEffect } from "react";
import { StyleSheet, View, Text, } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Card, Paragraph, Title, FAB, Portal, Dialog } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import firebase from "firebase";
import Fire from "../../../components/Fire";

export default function SpecifiedItemList({ route, navigation }) {

    const { item } = route.params;
    const [itemArray, setItemArray] = React.useState([]);
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
                        description: item.val().description,
                        imageNames: item.val().imageNames,
                        inTradeItems: item.val().inTradeItems,
                        user_id: item.val().user_id,
                        location: item.val().location,
                        sent: item.val().sent,
                        received: item.val().received
                    }

                    setItemArray((oldArray) => [...oldArray, itemInterface])
                } 
            })
        })
    }

    function handleNavigateToCreateNewItem() {
        navigation.navigate("CreateNewItem")
    }

    function handleSendTrade(one) {
        try {
            Fire.save("trades", {
                requested_item_title: item.title,
                requested_item_id: item.id,
                requested_user_id: item.user_id,
                requesting_item_title: one.title,
                requesting_item_id: one.id,
                requesting_user_id: user.uid
            })

            Fire.update("items", {
                id: item.id,
                title: item.title,
                description: item.description,
                imageNames: item.imageNames,
                inTradeItems: item.inTradeItems,
                user_id: item.user_id,
                location: item.location,
                sent: item.sent,
                received: (item.received + 1)
            })

            Fire.update("items", {
                id: one.id,
                title: one.title,
                description: one.description,
                imageNames: one.imageNames,
                inTradeItems: one.inTradeItems,
                user_id: one.user_id,
                location: one.location,
                sent: (one.sent + 1),
                received: one.received
            })



            setConfirmationVisible(true)
        } catch (error) {
            console.log(error)
        }
    }

    function handleHideConfirmation() {
        setConfirmationVisible(false)
        navigation.goBack()
    }

    return (
        <View style={styles.container}>

            <SafeAreaView style={styles.safeAreaView}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>Selecione um item para oferecer na troca</Text>

                    {itemArray.map((one) => (
                        <Card key={one.id} style={styles.card} acessible={false} onPress={() => handleSendTrade(one)}>
                            <Card.Content>
                                <Title style={styles.cardTitle}>{one.title}</Title>
                                <Paragraph style={styles.cardParagraph}>{one.description}</Paragraph>
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