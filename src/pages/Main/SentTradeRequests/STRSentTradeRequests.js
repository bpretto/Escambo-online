import React from "react";
import { StyleSheet, View, Text, TextInput, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import trade from "../../../images/logoredonda.png"

export default function SentTradeRequests({ route, navigation }) {

    function handleNavigateToSelectItemToTrade() {
        navigation.navigate("STRSelectItemToTrade")
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaView}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <Text style={styles.pageTitle}>Meus pedidos de troca</Text>
                    <View style={styles.card} onClick={() => console.log("pressed")}>
                        <View style={styles.line}>
                            <Text style={styles.leftText}>Você recebe:</Text>
                            <Text style={styles.rightText}>Pelo seu:</Text>
                        </View>
                        <View style={styles.line}>
                            <Text style={styles.leftDynamicText}>Porco Vivo</Text>
                            <Image source={trade} style={styles.trade} />
                            <Text style={styles.rightDynamicText}>Relógio Couro</Text>
                        </View>
                        <View style={styles.line}>
                            <Button
                                icon="pencil"
                                mode="contained"
                                style={styles.buttonEdit}
                                dark={true}
                                // onPress={handleNavigateToSelectItemToTrade}
                            >
                                Editar
                            </Button>
                            <Button
                                icon="delete-empty"
                                mode="contained"
                                style={styles.buttonCancel}
                                dark={true}
                                // onPress={handleNavigateToSelectItemToTrade}
                            >
                                Apagar
                            </Button>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.line}>
                            <Text style={styles.leftText}>Você recebe:</Text>
                            <Text style={styles.rightText}>Pelo seu:</Text>
                        </View>
                        <View style={styles.line}>
                            <Text style={styles.leftDynamicText}>Porco Vivo</Text>
                            <Image source={trade} style={styles.trade} />
                            <Text style={styles.rightDynamicText}>Relógio Couro</Text>
                        </View>
                        <View style={styles.line}>
                            <Button
                                icon="pencil"
                                mode="contained"
                                style={styles.buttonEdit}
                                dark={true}
                                onPress={handleNavigateToSelectItemToTrade}
                            >
                                Editar
                            </Button>
                            <Button
                                icon="delete-empty"
                                mode="contained"
                                style={styles.buttonCancel}
                                dark={true}
                                // onPress={handleNavigateToSelectItemToTrade}
                            >
                                Apagar
                            </Button>
                        </View>
                    </View>
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