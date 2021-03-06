import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import firebase from "firebase"


export default function SpecifiedItemList({ route, navigation }) {

    const { item } = route.params;
    const [images, setImages] = React.useState([]);
    const [name, setName] = React.useState([]);
    const [refreshPage, setRefreshPage] = React.useState(0);

    useEffect(() => {
        imageStorage()
        getName()
    }, [])

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

    async function getName() {
        var ref = firebase.database().ref("users");      
        ref.on("value", function (snapshot) {
            snapshot.forEach((user) => {
                if (user.val().id == item.user_id) {
                    setName(user.val().name)
                } 
            })
        })
    }
    
    function handleNavigateToSelectItemToTrade() {
        navigation.navigate("SelectItemToTrade", { item })
    }

    return (
        <View style={styles.container}>

            <SafeAreaView style={styles.safeAreaView}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} style={styles.scrollView} showsVerticalScrollIndicator={false}>

                    <View style={styles.head}>
                        <View style={styles.column}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text>{name}</Text>
                        </View>
                        <View style={styles.column}>
                            <Button
                                icon="swap-horizontal-bold"
                                mode="contained"
                                dark={true}
                                onPress={handleNavigateToSelectItemToTrade}>
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
                            {images.map((image) => (
                                    <View key={image} >
                                        <Image
                                        source={{
                                            uri: image,
                                            cache: "default",
                                            width: 300, height: 300
                                        }}
                                        />
                                    </View>
                                ))
                            }
                        </ScrollView>
                    </SafeAreaView>

            
                    <View style={styles.divider}>
                        <Text style={styles.fieldTitle}>Descri????o</Text>
                        <Text style={styles.fieldText}>{item.description}</Text>                        
                    </View>
                    
                    <View style={styles.divider}>
                        <Text style={styles.fieldTitle}>O que quero em troca?</Text>
                        <Text style={styles.fieldText}>{item.inTradeItems}</Text>
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
});