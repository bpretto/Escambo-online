import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, IconButton, Paragraph, Searchbar, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Homepage({ route, navigation }) {

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaView}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <Searchbar
                        style={styles.searchBar}
                        placeholder="Buscar"
                        placeholderTextColor= 'gray'
                        iconColor="#ffd731"
                    />
                    <Card style={styles.card} acessible={false}>
                        <Card.Content>
                            <Card.Cover source={{ uri: 'https://vitasuco.com.br/wp-content/uploads/2020/08/capa_blog_vita_suco.png' }} />
                            <Title style={styles.cardTitle} >test</Title>
                            <Paragraph style={styles.cardParagraph}>testsdfjhasojkdhfasljkdfhlsuaidfhjksdhflkjasdhfasdjkh</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card} acessible={false}>
                        <Card.Content>
                            <Title style={styles.cardTitle} >test</Title>
                            <Paragraph style={styles.cardParagraph}>test</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card} acessible={false}>
                        <Card.Content>
                            <Title style={styles.cardTitle} >test</Title>
                            <Paragraph style={styles.cardParagraph}>test</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card} acessible={false}>
                        <Card.Content>
                            <Title style={styles.cardTitle} >test</Title>
                            <Paragraph style={styles.cardParagraph}>test</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card} acessible={false}>
                        <Card.Content>
                            <Title style={styles.cardTitle} >test</Title>
                            <Paragraph style={styles.cardParagraph}>test</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card} acessible={false}>
                        <Card.Content>
                            <Title style={styles.cardTitle} >test</Title>
                            <Paragraph style={styles.cardParagraph}>test</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card} acessible={false}>
                        <Card.Content>
                            <Title style={styles.cardTitle} >test</Title>
                            <Paragraph style={styles.cardParagraph}>test</Paragraph>
                        </Card.Content>
                    </Card>
                </ScrollView>
            </SafeAreaView>
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
        marginTop: "-8%",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    
    scrollView: {
        width: '100%',
        height: "100%",
    },
    
    searchBar: {   
        width: "80%",
        marginVertical: "2%",
        alignSelf: "center"
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
    }
});