import React from "react";
import { StyleSheet, View, Dimensions, Alert } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import * as Location from 'expo-location';
import { IconButton } from "react-native-paper";

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

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffd731",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});