import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import firebase from "firebase";
import Fire from "../../components/Fire";

export default function Profile({ route, navigation }) {
    
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: "Perfil",
        });
    }, [navigation]);

    
    const [deleteVisible, setDeleteVisible] = React.useState(false);
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [inputValue, setInputValue] = React.useState("");
    const user = firebase.auth().currentUser
    console.log(user)
    let username, name, email, tel, range, lat, lng
    let itemArray = [];

    var ref = firebase.database().ref("users");
      
    ref.on("value", function (snapshot) {
    snapshot.forEach((users) => {
        if (user.email == users.val().email) {
            username = users.val().username;
            name = users.val().name;
            email = users.val().email
            tel = users.val().tel;
            range = users.val().range;
            lat = users.val().location.lat;
            lng = users.val().location.lng;
        }
    })
    }, function (error) {
    console.log("Error: " + error.code);
    });

    ref = firebase.database().ref("items");
      
    ref.on("value", function (snapshot) {
    snapshot.forEach((item) => {
        if (user.uid == item.val().user_id) {
            let card = {
                id: item.val().id,
                title: item.val().title,
                description: item.val().description,
                images: item.val().images,
                inTradeItems: item.val().inTradeItems,
                sent: item.val().sent,
                received: item.val().received,
                username: item.val().username
            };

            itemArray.push(card)
        }
    })
    }, function (error) {
    console.log("Error: " + error.code);
    });

    function handleLogOut() {
        navigation.navigate("Login")
        firebase.auth().signOut()
    }

    function handleNavigateToEditProfile() {
        navigation.navigate("EditProfile", {
            username,
            name,
            email,
            tel,
            range,
            lat,
            lng
        })
    }

    function handleNavigateToOwnItemList(id) {
        itemArray.map((item) => {
            if (item.id == id) {
                console.log(item)
                navigation.navigate("OwnItemList", { item })
            }
        })
    }

    function handleShowDialogDeleteAccount() {
        setDeleteVisible(true)
    }

    function disabledButton(inputValue) {
        console.log(inputValue)

        if (inputValue == "excluir perfil") {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }

    function handleDeleteAccount() {
        setDeleteVisible(false)
        user.delete().then(() => {
            setDeleteVisible(false)
            navigation.navigate("Login")
        }).catch((error) => {

        });
        console.log("excluido!")
    }

    return (
        <View style={styles.container}>
            <View style={styles.userCard}>
                <View>
                    <Text style={styles.labelText}>Username</Text>
                    <Text style={styles.text}>{username}</Text>   

                    <Text style={styles.labelText}>Nome</Text>
                    <Text style={styles.text}>{name}</Text>
                    
                    <Text style={styles.labelText}>Whatsapp</Text>
                    <Text style={styles.text}>{tel}</Text>

                    <Text style={styles.labelText}>Raio do radar de escambo</Text>
                    <Text style={styles.text}>{range}km</Text>
                </View>

                <View>
                    <Button icon="logout" mode="contained" style={styles.buttonLogOut} dark={true} onPress={handleLogOut}>
                            Sair
                    </Button>

                    <Button icon="account-edit" mode="contained" style={styles.buttonEdit} dark={true} onPress={handleNavigateToEditProfile}>
                            Editar
                    </Button>

                    <Button icon="delete-empty" mode="contained" style={styles.buttonDelete} dark={true} onPress={handleShowDialogDeleteAccount}>
                            Excluir
                    </Button>
                </View>
            </View>

            <Text style={styles.title}>Meus itens</Text>

            {itemArray.map((item) => (
                    <TouchableOpacity style={styles.card} onPress={() => handleNavigateToOwnItemList(item.id)}>
                    <View style={styles.columnLeft}>
                        <Text style={styles.leftText}>{item.title}</Text>
                    </View>
                    <View style={styles.columnRight}>
                        <Text style={styles.proposals}>Propostas</Text>
                        <View style={styles.proposalsContainer}>
                            <View style={styles.proposalsCards}>
                                <Text style={styles.proposalsNumber}>{item.sent}</Text>
                                <Text style={styles.proposalsText}>Enviadas</Text>
                            </View>
                            <View style={styles.proposalsCards}>
                                <Text style={styles.proposalsNumber}>{item.received}</Text>
                                <Text style={styles.proposalsText}>Recebidas</Text>
                            </View>
                        </View>                    
                    </View>
                </TouchableOpacity>
            ))}

            <Portal>
                <Dialog visible={deleteVisible} dismissable={true} onDismiss={()=>setDeleteVisible(false)}>
                    <Dialog.Title>Você tem certeza?</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            style={styles.inputDialog}
                            value={inputValue}
                            onChangeText={(inputValue) => {setInputValue(inputValue); disabledButton(inputValue)}}
                            placeholder='Digite "excluir perfil"'
                        />
                        <Button
                            icon="delete-empty"
                            disabled={buttonDisabled}
                            mode="contained"
                            style={styles.buttonDeleteDialog}
                            dark={true}
                            onPress={handleDeleteAccount}
                        >
                            Excluir
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
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    
    userCard: {
        marginHorizontal:"10%",
        flexDirection: "row",
        justifyContent:"space-between",
        padding: 10,
        borderRadius: 2,
        backgroundColor: "#ffd731",
        marginTop:"5%",
        width: "80%",
    },

    labelText: {
        marginTop: "1%"
    },

    text: {
        marginBottom: "1%",
        fontWeight: "bold",
        fontSize: 18,
        color: "#fff"
    },

    buttonLogOut : {
        backgroundColor:"cornflowerblue",
        marginBottom: "5%"
    },

    buttonEdit : {
        backgroundColor:"#FF9F38",
        marginBottom: "5%"
    },

    buttonDelete : {
        backgroundColor:"#FF3838",
    },

    
    title: {
        marginLeft:"10%",
        fontWeight: "bold",
        fontSize: 19,
        marginTop: "5%",
        marginBottom:"2%"
    },
    
    card: {
        marginHorizontal:"10%",
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        borderColor: "#ffd731",
        marginBottom:"5%",
        width: "80%",
        flexDirection: "row",
        justifyContent:"space-between",
    },
    
    columnLeft: {
        justifyContent:"center"
    },
    
    leftText: {
        fontSize: 18,
        fontWeight: "bold"
    },
    
    columnRight: {
        alignItems: "center"
    },
    
    proposals: {
        marginBottom: "4%",
        alignSelf:"center",
        fontSize: 18,
        fontWeight: "bold"
    },
    
    proposalsContainer: {
        flexDirection: "row",
        justifyContent:"space-between",
    },
    
    proposalsCards: {
        marginHorizontal:"2%",
        padding: 10,
        alignItems:"center"
    },
    
    proposalsNumber: {
        fontSize: 26,
        fontWeight:"bold"
    },

    buttonDeleteDialog: {
        alignSelf:"flex-end",
        marginTop:10,
        backgroundColor:"#FF3838",
    },

    inputDialog: {
        backgroundColor:"ghostwhite",
        marginBottom: 10
    }

});