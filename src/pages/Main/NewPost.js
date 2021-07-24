import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, IconButton, Paragraph, Searchbar, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Homepage({ route, navigation }) {

    return (
        <View style={styles.container}>
            
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
    
    safeAreaView: {
        marginTop: "-5%",
        alignItems: "flex-end",
        justifyContent: "center"
    },
    
    scrollView: {
        width: '100%',
        height: "100%",
    },
    
    searchBar: {   
        width: "80%",
        marginBottom: "2%",
        alignSelf: "center"
    },

    card: {
        marginHorizontal: "10%",
        marginBottom: 10,
        width: "80%",
        backgroundColor: "#ffd731"
    },

    cardTitle: {
        fontSize: 28,
        color: "#000000",
        marginVertical: 10
    },

    cardParagraph: {
        fontSize: 16,
        color: "#000000"
    }
});