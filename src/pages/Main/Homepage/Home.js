import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Paragraph, Searchbar, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import firebase from "firebase"

export default function Home({ route, navigation }) {
    
    const [itemArray, setItemArray] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState("");
    const user = firebase.auth().currentUser
    // let userRange, userLat, userLng, itemLat, itemLng

    useEffect(() => {
        loadItems()
    }, [])

    function loadItems() {
        setItemArray([])
        var ref = firebase.database().ref("items");      
        ref.on("value", function (snapshot) {
            snapshot.forEach((item) => {
                if (item.val().user_id != user.uid) {
                    let images = []
                    item.val().imageNames.map((image) => {
                        images.push(image)
                    })
                    const itemInterface = {
                        id: item.val().id,
                        title: item.val().title,
                        description: item.val().description,
                        imageNames: images,
                        inTradeItems: item.val().inTradeItems,
                        user_id: item.val().user_id,
                        location: item.val().location,
                        sent: item.val().sent,
                        received: item.val().received
                    }
                    
                        setItemArray((oldArray) => [...oldArray, itemInterface])
                }
            })
        })
    }

    // async function distance(lat1, lon1, lat2, lon2) {
    //     var p = 0.017453292519943295;    // Math.PI / 180
    //     var c = Math.cos;
    //     var a = 0.5 - c((lat2 - lat1) * p)/2 + 
    //             c(lat1 * p) * c(lat2 * p) * 
    //             (1 - c((lon2 - lon1) * p))/2;
      
    //     return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    // }


    async function handleSearch() {
        loadItems()
        if (searchValue !== '') {
            setItemArray(itemArray.filter((one) => {
                return one.title == searchValue
            }))
        }
    }


    function handleNavigateToSpecifiedItemList(item) {
        navigation.navigate("SpecifiedItemList", {item})
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaView}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <Searchbar
                        style={styles.searchBar}
                        placeholder="Buscar"
                        placeholderTextColor= 'gray'
                        iconColor="#ffd731"
                        onChangeText={searchValue => {setSearchValue(searchValue)}}
                        value={searchValue}
                        onIconPress={handleSearch}
                    />
                    {itemArray.map((item) => (
                        <Card key={item.id} style={styles.card} acessible={false} onPress={() => handleNavigateToSpecifiedItemList(item)}>
                            <Card.Content>
                                <Title style={styles.cardTitle}>{item.title}</Title>
                                <Paragraph style={styles.cardParagraph}>{item.description}</Paragraph>
                            </Card.Content>
                        </Card>
                    ))}
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