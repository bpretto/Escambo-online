import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { IconButton } from 'react-native-paper';


export default function ImageList({image}) {

    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image}/>
            <IconButton icon="delete-empty" color="#ffd731" style={styles.icon}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center"
    },

    image: {
        height: 75,
        width: 75
    },

    icon: {
        backgroundColor: "#fff",
        position: 'absolute',
    },
})