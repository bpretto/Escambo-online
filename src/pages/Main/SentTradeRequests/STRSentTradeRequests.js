import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Fire from "../../../components/Fire"
import firebase from "firebase"

import trade from "../../../images/logoredonda.png"

export default function SentTradeRequests({ route, navigation }) {

    const [itemArray, setItemArray] = React.useState([]);
    const user = firebase.auth().currentUser;

    useEffect(() => {
        getReceivedTradeRequests()
    }, [])

    async function getReceivedTradeRequests() {   
        firebase.database().ref("trades").on("value", function (snapshot) {
            setItemArray([])
            snapshot.forEach((one) => {
                if (one.val().requesting_user_id == user.uid) {
                    const itemInterface = {
                        id: one.val().id,
                        requested_item_id: one.val().requested_item_id,
                        requested_item_title: one.val().requested_item_title,
                        requested_user_id: one.val().requested_user_id,
                        requesting_item_title: one.val().requesting_item_title,
                        requesting_item_id: one.val().requesting_item_id,
                        requesting_user_id: one.val().requesting_user_id,
                    }

                    console.log(itemInterface)

                    setItemArray((oldArray) => [...oldArray, itemInterface])
                } 
            })
        })
    }

    function handleNavigateToSelectItemToTrade(one) {
        navigation.navigate("STRSelectItemToTrade", {one})
    }

    function handleDeleteTradeRequest(one) {
        Fire.remove("trades", one.id)
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaView}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <Text style={styles.pageTitle}>Meus pedidos de troca</Text>
                    
                    {itemArray.map((one) => (
                        <View key={one.id} style={styles.card}>
                            <View style={styles.line}>
                                <Text style={styles.leftText}>Você recebe:</Text>
                                <Text style={styles.rightText}>Pelo seu:</Text>
                            </View>
                            <View style={styles.line}>
                                <Text style={styles.leftDynamicText}>{one.requested_item_title}</Text>
                                <Image source={trade} style={styles.trade} />
                                <Text style={styles.rightDynamicText}>{one.requesting_item_title}</Text>
                            </View>
                            <View style={styles.line}>
                                <Button
                                    icon="pencil"
                                    mode="contained"
                                    style={styles.buttonEdit}
                                    dark={true}
                                    onPress={() => handleNavigateToSelectItemToTrade(one)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    icon="delete-empty"
                                    mode="contained"
                                    style={styles.buttonCancel}
                                    dark={true}
                                    onPress={() => handleDeleteTradeRequest(one)}
                                >
                                    Apagar
                                </Button>
                            </View>
                        </View>
                    ))}

                </ScrollView>
            </SafeAreaView>
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
    
    pageTitle: {
        fontWeight: "bold",
        fontSize: 19,
        marginTop: "2%"
    },

    card: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        borderColor: "#ffd731",
        marginTop:"5%",
        width: "80%",
    },

    line: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    leftText: {
        fontSize: 18,
        color: "#ffd731",
        fontWeight: "bold"
    },

    rightText: {
        fontSize: 18,
        color: "#ffd731",
        fontWeight: "bold",
        textAlign: "right"
    },
    
    trade: {
        width: "20%",
        maxHeight: 50
    },

    leftDynamicText: {
        fontWeight: "bold",
        marginTop: "2%",
        maxWidth: "20%"
    },
    
    rightDynamicText: {
        fontWeight: "bold",
        marginTop: "2%",
        textAlign: "right",
        maxWidth: "20%"
    },

    buttonEdit: {
        backgroundColor: "#FF9F38",
    },

    buttonCancel: {
        backgroundColor: "#FF3838"
    },
});