import React from "react";
import { StyleSheet, View, TextInput, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Card, IconButton, Paragraph, Searchbar, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SpecifiedItemList({ route, navigation }) {

    // const { id } = route.params; 

    return (
        <View style={styles.container}>

            <SafeAreaView style={styles.safeAreaView}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} style={styles.scrollView} showsVerticalScrollIndicator={false}>

                    <View style={styles.head}>
                        <View style={styles.column}>
                            <Text style={styles.title}>Iphone 6 32gb</Text>
                            <Text>Vitoria Carolina</Text>
                        </View>
                        <View style={styles.column}>
                            <Button icon="swap-horizontal-bold" mode="contained" style={styles.buttonEdit} dark={true} onPress={() => {console.log("pressed!")}}>
                                Vamos trocar!
                            </Button>
                        </View>
                    </View>

                    <SafeAreaView horizontal={true} vertical={false} style={styles.imageScrollContainer}>
                        <ScrollView
                            horizontal={true}
                            vertical={false}
                            style={styles.imageScrollView}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                        >
                            <Image 
                                style={styles.image}
                                source={{
                                    uri: "https://vitasuco.com.br/wp-content/uploads/2020/08/capa_blog_vita_suco.png",
                                    cache: "default",
                                    width:300
                                }}
                            />
                            <Image 
                                style={styles.image}
                                source={{
                                    uri: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/runningfeet-1446281102.jpg",
                                    cache: "default",
                                    width:300
                                }}
                            />
                        </ScrollView>
                    </SafeAreaView>

            
                    <View style={styles.divider}>
                        <Text style={styles.fieldTitle}>Descrição</Text>
                        <Text style={styles.fieldText}>vickxxxx</Text>
                        
                    </View>
                    <View style={styles.divider}>
                        <Text style={styles.fieldTitle}>O que quero em troca?</Text>
                        <Text style={styles.fieldText}>vickxxxx</Text>
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
        alignItems: 'center',
        justifyContent: 'flex-start',
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

    head: {
        width:"80%",
        flexDirection:"row",
        marginTop: "5%",
        justifyContent:"space-between"
    },

    title: {
        fontWeight: "bold",
        fontSize: 19,
    },

    imageScrollContainer: {
        flex: 1,
        maxHeight: 265,
    },

    imageScrollView: {
        padding: 10,
        backgroundColor: "#ffd731",
    },

    image: {
        marginRight: 20
    },

    divider: {
        marginTop:"5%",
        width: "80%",
    },

    fieldTitle: {
        fontWeight:"bold",
        fontSize:15
    },

});