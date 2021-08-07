import React, { useEffect } from "react";
import { StyleSheet, View, TextInput, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Dialog, Portal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import firebase from "firebase";
import Fire from "../../../components/Fire";

export default function RTRSpecifiedItemList({ route, navigation }) {

    const { one: trade } = route.params;
    const [contactVisible, setContactVisible] = React.useState(false);
    const [cancelVisible, setCancelVisible] = React.useState(false);
    const [item, setItem] = React.useState({
        id: null,
        title: null,
        description: null,
        imageNames: null,
        inTradeones: null,
        user_id: null,
        location: null,
    });
    const [user, setUser] = React.useState("");
    const [images, setImages] = React.useState([]);

    useEffect(() => {
        getItem()
        getUser()
    }, [])

    async function getItem() {
        firebase.database().ref("items").on("value", function (snapshot) {
            snapshot.forEach((one) => {
                if (one.val().id == trade.requesting_item_id) {
                    let images = []
                    one.val().imageNames.map((image) => {
                        images.push(image)
                    })
                    const itemInterface = {
                        id: one.val().id,
                        title: one.val().title,
                        description: one.val().description,
                        imageNames: images,
                        inTradeones: one.val().inTradeItems,
                        user_id: one.val().user_id,
                        location: one.val().location,
                    }
                    imageStorage(itemInterface)
                    setItem(itemInterface);
                } 
            })
        })
    }

    async function getUser() {   
        firebase.database().ref("users").on("value", function (snapshot) {
            snapshot.forEach((one) => {
                if (one.val().id == trade.requesting_user_id) {
                    
                    setUser({
                        name: one.val().name,
                        tel: one.val().tel
                    });
                } 
            })
        })
    }

    function imageStorage(itemInterface) {    
        try {
            console.log("aqui", itemInterface)
            itemInterface.imageNames.map(async (imageName) => {
                const image = await firebase.storage().ref("images").child(imageName).getDownloadURL();
                setImages((oldArray) => [...oldArray, image])
            })
        } catch (error) {
            console.log(error);
        }
    }

    function handleShowContact() {
        setContactVisible(true)
    }

    function handleRefuse() {
        setCancelVisible(true)
    }

    function handleConfirm() {
        setCancelVisible(false)
        try {
            Fire.remove("trades", trade.id);
            navigation.goBack()
        } catch (error) {
            console.log(error)
        }
        
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
                            <Text style={styles.title}>{item.title}</Text>
                            <Text>{user.name}</Text>
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
                            {images.length > 2 
                                ? images.map((image) => (
                                    <View key={image}>
                                        <Image 
                                        style={styles.image}
                                        source={{
                                            uri: image,
                                            cache: "default",
                                            width: 300, height: 300
                                        }}
                                        />
                                    </View>
                                ))
                                :   <View>
                                        <Image
                                        source={{
                                            uri: images[0],
                                            cache: "default",
                                            width: 300, height: 300
                                        }}
                                        />
                                    </View>
                            }
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
                            onPress={handleConfirm}
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

            <Portal>
                <Dialog visible={contactVisible} dismissable={true} onDismiss={() => setContactVisible(false)}>
                    <Dialog.Title>Contato</Dialog.Title>
                    <Dialog.Content>
                        <Text style={styles.dialogText}>
                            {user.tel}
                        </Text>
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