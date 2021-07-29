import React from "react";
import { StyleSheet, View, TextInput, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Card, Dialog, IconButton, Paragraph, Portal, Searchbar, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RTRSpecifiedItemList({ route, navigation }) {

    // const { id } = route.params;
    const [cancelVisible, setCancelVisible] = React.useState(false);

    function handleShowContact() {

    }

    function handleRefuse() {
        setCancelVisible(true)
    }

    function handleCancel() {
        setCancelVisible(false)
        //firebase
    }

    function handleHideCancel() {
        setCancelVisible(false)
    }

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
                            <Button
                                icon="phone"
                                mode="contained"
                                dark={true}
                                onPress={handleShowContact}>
                                Contatar
                            </Button>
                            <Button
                                icon="cancel"
                                mode="contained"
                                style={styles.buttonRefuse}
                                dark={true}
                                onPress={handleRefuse}>
                                Recusar
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

            <Portal>
                <Dialog visible={cancelVisible} dismissable={true} onDismiss={handleHideCancel}>
                    <Dialog.Title>Você tem certeza?</Dialog.Title>
                    <Dialog.Content>
                        <Text style={styles.dialogText}>
                            Deseja mesmo recusar a proposta?
                        </Text>
                        <Button
                            icon="check"
                            mode="contained"
                            dark={true}
                            onPress={handleCancel}
                        >
                            Sim
                        </Button>
                        <Button
                            icon="cancel"
                            mode="contained"
                            dark={true}
                            onPress={handleHideCancel}
                            style={styles.buttonRefuse}
                        >
                            Não
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
        marginTop: 15,
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

    dialogText: {
        marginBottom: 30,
        fontSize: 15
    },

    buttonRefuse: {
        backgroundColor: "#FF3838",
        marginTop: 5
    },

});