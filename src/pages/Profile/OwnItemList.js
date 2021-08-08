import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Dialog, Portal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Fire from "../../components/Fire";
import firebase from "firebase"


export default function OwnItemList({ route, navigation }) {

    const { item } = route.params;
    const [refreshPage, setRefreshPage] = React.useState(0);
    const [deleteVisible, setDeleteVisible] = React.useState(false);
    const [images, setImages] = React.useState([]);
    

    useEffect(() => {
        imageStorage()
    }, [refreshPage])
    async function imageStorage() {    
        try {
            item.imageNames.map(async (imageName) => {
                const image = await firebase.storage().ref("images").child(imageName).getDownloadURL();
                setImages((oldArray) => [...oldArray, image])
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    function handleNavigateToEditOwnItem() {
        navigation.navigate("EditOwnItem", { item })
    }

    function handleDelete() {
        setDeleteVisible(true)
    }

    function handleConfirm() {
        setDeleteVisible(false)
        Fire.remove("items", item.id)
        navigation.navigate("MainScreen")
    }

    function handleHideDelete() {
        setDeleteVisible(false)
    }

    return (
        <View style={styles.container}>

            <SafeAreaView style={styles.safeAreaView}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} style={styles.scrollView} showsVerticalScrollIndicator={false}>

                    <View style={styles.head}>
                        <View style={styles.column}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text>Você cadastrou esse item!</Text>
                        </View>
                        <View style={styles.column}>
                            <Button
                                icon="pencil"
                                mode="contained"
                                dark={true}
                                onPress={handleNavigateToEditOwnItem}>
                                Editar
                            </Button>
                            <Button
                                icon="delete-empty"
                                mode="contained"
                                style={styles.buttonDelete}
                                dark={true}
                                onPress={handleDelete}>
                                Excluir
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
                                    <View>
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
                        <Text style={styles.fieldText}>{item.description}</Text>                        
                    </View>
                    
                    <View style={styles.divider}>
                        <Text style={styles.fieldTitle}>O que quero em troca?</Text>
                        <Text style={styles.fieldText}>{item.inTradeItems}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>

            <Portal>
                <Dialog visible={deleteVisible} dismissable={true} onDismiss={handleHideDelete}>
                    <Dialog.Title>Você tem certeza?</Dialog.Title>
                    <Dialog.Content>
                        <Text style={styles.dialogText}>
                            Deseja mesmo excluir o item?
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
                            onPress={handleHideDelete}
                            style={styles.buttonDelete}
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

    imageContainer: {
        marginLeft: 10    
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
        marginRight: 20,
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

    buttonDelete: {
        backgroundColor: "#FF3838",
        marginTop: 5
    },

});