import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, IconButton } from "react-native-paper";

export default function mapView({ route, navigation }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: "Perfil",
            headerRight: () => (
                <IconButton
                    title="Info"
                    color="#fff"
                    icon="account"
                    onPress={() => {
                            navigation.navigate("Profile");
                    }}
                />
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.userCard}>
                <View style={styles.column}>
                    <Text style={styles.labelText}>Username</Text>
                    <Text style={styles.text}>bpretto</Text>   

                    <Text style={styles.labelText}>Nome</Text>
                    <Text style={styles.text}>Bernardo Pretto</Text>
                    
                    <Text style={styles.labelText}>Whatsapp</Text>
                    <Text style={styles.text}>(49)99936-6685</Text>

                    <Text style={styles.labelText}>Raio do radar de escambo</Text>
                    <Text style={styles.text}>200km</Text>
                </View>

                <View style={styles.column}>
                    <Button icon="account-edit" mode="contained" style={styles.buttonEdit} dark={true} onPress={console.log("pressed")}>
                            Editar
                    </Button>

                    <Button icon="delete-empty" mode="contained" style={styles.buttonDelete} dark={true} onPress={console.log("pressed")}>
                            Excluir
                    </Button>
                </View>
            </View>

            <Text style={styles.title}>Meus pedidos de troca</Text>

            <View style={styles.card}>
                <View style={styles.columnLeft}>
                    <Text style={styles.leftText}>Relógio Couro</Text>
                </View>
                <View style={styles.columnRight}>
                    <Text style={styles.proposals}>Propostas</Text>
                    <View style={styles.proposalsContainer}>
                        <View style={styles.proposalsCards}>
                            <Text style={styles.proposalsNumber}>4</Text>
                            <Text style={styles.proposalsText}>Enviadas</Text>
                        </View>
                        <View style={styles.proposalsCards}>
                            <Text style={styles.proposalsNumber}>45</Text>
                            <Text style={styles.proposalsText}>Recebidas</Text>
                        </View>
                    </View>                    
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.columnLeft}>
                    <Text style={styles.leftText}>Relógio Couro</Text>
                </View>
                <View style={styles.columnRight}>
                    <Text style={styles.proposals}>Propostas</Text>
                    <View style={styles.proposalsContainer}>
                        <View style={styles.proposalsCards}>
                            <Text style={styles.proposalsNumber}>4</Text>
                            <Text style={styles.proposalsText}>Enviadas</Text>
                        </View>
                        <View style={styles.proposalsCards}>
                            <Text style={styles.proposalsNumber}>45</Text>
                            <Text style={styles.proposalsText}>Recebidas</Text>
                        </View>
                    </View>                    
                </View>
            </View>
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
        marginTop:"5%",
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
    }
});