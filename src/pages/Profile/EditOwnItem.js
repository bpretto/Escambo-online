import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Dialog, IconButton, Portal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import ImageList from '../../components/ImageList';
import firebase from "firebase";
import Fire from "../../components/Fire";


export default function EditOwnItem({ route, navigation }) {

    const { item } = route.params;
    console.log(item)

    const [refreshPage, setRefreshPage] = useState(0);
    const [confirmationVisible, setConfirmationVisible] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [maxImages, setMaxImages] = React.useState(false);
    const [title, setTitle] = React.useState(item.title);
    const [description, setDescription] = React.useState(item.description);
    const [inTradeItems, setInTradeItems] = React.useState(item.inTradeItems);
    const [images, setImages] = React.useState([]);
    const [upLoading, setUpLoading] = useState(null);
    let imageState;

    useEffect(() => {}, [refreshPage]);

    function handleRemoveImage(image) {
        console.log(images)
        const index = images.indexOf(image)
        images.splice(index, 1)
        setRefreshPage(refreshPage+1)
    }

    async function handleAddImage() {
        if (images.length > 2) {
            setMaxImages(true)      
        }
         else {
            await ImagePicker.requestMediaLibraryPermissionsAsync()
            let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        })

            if(!image.cancelled) {
                console.log(image)
                imageState = image.uri
                setImages(images.concat(imageState))
            }
        }
    }

    function handleCreateNewItem() {
        if (!title || !description || !inTradeItems || !images) {
            setError(true)
        } else {
            try {
                images.map(async (image) => {
                    console.log(image)
                    var randomString = '';
                    const possibleLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    for (var i = 0; i < 15; i++) {
                        randomString += possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length));
                    }
                    
                    var storageRef = firebase.storage().ref();
                    var imageRef = storageRef.child("images/" + randomString)
                    
                    const file = await new Promise((resolve, reject) => {
                        const xhr = new XMLHttpRequest();
                        xhr.onload = function () {
                            resolve(xhr.response);            
                        };

                        xhr.onerror = function () {
                            reject(new Error("Erro!"));
                        };

                        xhr.responseType = 'blob';
                        xhr.open('GET', image, true);
                        xhr.send(null);
                    });
                    
                    var metadata = {
                        contentType: 'image/jpeg'
                    };
                    
                    console.log(metadata, randomString)

                    var uploadTask = await imageRef.put(file, metadata)

                    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
                        setUpLoading(true)
                    }, (error) => {
                        setUpLoading(false)
                        console.log(error)
                        blob.close();
                        return
                    }, () => {
                        snapshot.ref.getDonwloadURl().then((url) => {
                            setUpLoading(false)
                            console.log('download', url);
                            blob.close();
                            return url;
                        })
                    });
                }) 
                const user = firebase.auth().currentUser;
                var ref = firebase.database().ref("users");
                let location = null;
      
                ref.on("value", function (snapshot) {
                    snapshot.forEach((users) => {
                        if (user.uid == users.val().id) {
                            location = users.val().location
                        }
                    })
                })

                Fire.save("items", {
                    user_id: user.uid,                   
                    title,
                    description,
                    inTradeItems,
                    images,
                    location
                });
                setConfirmationVisible(true)
            } catch (error) {
                console.log(error.code, error.message);
            }
        }
    }
        

    function handleHideConfirmation() {
        setConfirmationVisible(false)
    }


    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaView}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <Text style={styles.pageTitle}>Cadastrar novo item</Text>

                    <View style={styles.divider}>
                        <Text style={styles.labelText}>Título</Text>
                        <TextInput
                            maxLength={18}
                            value={title}
                            onChangeText={(title) => setTitle(title)}
                            style={styles.titleInput}
                        />
                    </View>

                    <View style={styles.divider}>
                        <Text style={styles.labelText}>Descrição</Text>
                        <TextInput
                            maxLength={500}
                            value={description}
                            onChangeText={(description) => setDescription(description)}
                            multiline={true}
                            numberOfLines={25}
                            style={styles.descriptionInput}
                        />
                    </View>

                    <View style={styles.divider}>
                        <Text style={styles.labelText}>O que você quer em troca?</Text>
                        <TextInput
                            maxLength={400}
                            value={inTradeItems}
                            onChangeText={(inTradeItems) => setInTradeItems(inTradeItems)}
                            multiline={true}
                            numberOfLines={15}
                            style={styles.exchangeInput}
                        />
                    </View>

                    <View style={styles.dividerImages}>
                        <View style={styles.column}>
                            <Text style={styles.labelText}>Imagens</Text>
                            <IconButton
                                icon="plus"
                                color="#fff"
                                size={40}
                                style={styles.imageButton}
                                onPress={handleAddImage}
                            />
                        </View>
                            {images.map((image) => (
                                <View style={styles.column}>
                                    <TouchableOpacity style={styles.imageContainer} onPress={() => handleRemoveImage(image)} >
                                        <ImageList image={image} key={image} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                    </View>

                    <View style={styles.divider}>
                        <Button icon="content-save" mode="contained" style={styles.button} dark={true} onPress={handleCreateNewItem}>
                            Salvar
                        </Button>
                    </View>
                </ScrollView>
            </SafeAreaView>

            <Portal>
                <Dialog visible={error} dismissable={true} onDismiss={() => setError(false)}>
                    <Dialog.Title>Preencha todos os campos!</Dialog.Title>
                    <Dialog.Content>
                        <Button
                            icon="check"
                            mode="contained"
                            dark={true}
                            onPress={() => setError(false)}
                        >
                            Ok!
                        </Button>
                    </Dialog.Content>
                </Dialog>
            </Portal>

            <Portal>
                <Dialog visible={maxImages} dismissable={true} onDismiss={() => setMaxImages(false)}>
                    <Dialog.Title>Selecione no máximo 3 imagens!</Dialog.Title>
                    <Dialog.Content>
                        <Button
                            icon="check"
                            mode="contained"
                            dark={true}
                            onPress={() => setMaxImages(false)}
                        >
                            Ok!
                        </Button>
                    </Dialog.Content>
                </Dialog>
            </Portal>


            <Portal>
                <Dialog visible={confirmationVisible} dismissable={true} onDismiss={handleHideConfirmation}>
                    <Dialog.Title>Item cadastrado!</Dialog.Title>
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
    
    divider: {
        marginTop:"5%",
        width: "80%",
    },

    dividerImages: {
        flexDirection: "row",
        alignItems: "center",
        marginTop:"5%",
        width: "80%",
    },

    imageScrollContainer: {
        flex: 1,
        maxHeight: 265,
    },

    imageScrollView: {
        padding: 10,
        backgroundColor: "#ffd731",
    },

    imageContainer: {
        marginLeft: 10    
    },

    pageTitle: {
        fontWeight: "bold",
        fontSize: 19,
        marginTop: "2%"
    },

    labelText: {
        marginBottom: "2%",
    },
    
    titleInput: {
        padding: 10,
        color: "#000",
        backgroundColor: "ghostwhite",
        width: "100%",
        height: 40,
        textAlignVertical: "center",
        justifyContent: "center"
    },

    descriptionInput: {
        backgroundColor: "ghostwhite",
        padding: 10,
        width: "100%",
        height: 300,
        textAlignVertical: "center",
        justifyContent: "center",
        textAlignVertical: "top"
    },

    exchangeInput: {
        padding: 10,
        backgroundColor: "ghostwhite",
        width: "100%",
        height: 150,
        textAlignVertical: "center",
        justifyContent: "center",
        textAlignVertical: "top"
    },

    imageButton: {
        backgroundColor: "#ffd731",        
    },

    button: {
        width: "100%",
        marginBottom: "5%"
    },
});