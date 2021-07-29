import React from "react";
import { StyleSheet, View, Text, TextInput, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import trade from "../../../images/logoredonda.png"

export default function ReceivedTradeRequests({ route, navigation }) {

    function handleNavigateToSpecifiedItemList() {
        navigation.navigate("RTRSpecifiedItemList")
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaView}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <Text style={styles.pageTitle}>Propostas de troca com seus itens</Text>
                    <View style={styles.card}>
                        <View style={styles.line}>
                            <Text style={styles.leftText}>Você dá:</Text>
                            <Text style={styles.rightText}>Em troca de:</Text>
                        </View>
                        <View style={styles.line}>
                            <Text style={styles.leftDynamicText}>Relógio Couro</Text>
                            <Image source={trade} style={styles.trade} />
                            <Text style={styles.rightDynamicText}>Porco Vivo</Text>
                        </View>
                        <View style={styles.line}>
                            <View/>
                            <Button
                                icon="eye"
                                mode="contained"
                                dark={true}
                                onPress={handleNavigateToSpecifiedItemList}
                            >
                                Vizualizar
                            </Button>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.line}>
                            <Text style={styles.leftText}>Você dá:</Text>
                            <Text style={styles.rightText}>Em troca de:</Text>
                        </View>
                        <View style={styles.line}>
                            <Text style={styles.leftDynamicText}>Relógio Couro</Text>
                            <Image source={trade} style={styles.trade} />
                            <Text style={styles.rightDynamicText}>Porco Vivo</Text>
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