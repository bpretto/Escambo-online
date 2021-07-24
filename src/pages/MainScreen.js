import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from "react-native-elements"
import { StyleSheet, View, Image } from "react-native";
import { IconButton, TextInput } from "react-native-paper";

import Homepage from "./Main/Homepage"
import NewPost from "./Main/NewPost"

import Logo from "../images/logo.png"

const Tab = createMaterialBottomTabNavigator();

export default function MainScreen({ route, navigation }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Image style={styles.headerImage} source={Logo} />
            ),
            title: null,
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
        <Tab.Navigator
            initialRouteName="Homepage"
            activeColor="#fff"
            inactiveColor="#000"
        >
            <Tab.Screen
                name="Homepage"
                component={Homepage}
                options={({ navigation, route })=> ({
                    tabBarLabel: "Feed",
                    tabBarIcon: ({color}) => (
                        <Icon name="home" color={color} size={26} />
                    )
                })}
            />
            <Tab.Screen
                name="NewPost"
                component={NewPost}
                options={({ navigation, route })=> ({
                    tabBarLabel: "Novo Item",
                    tabBarIcon: ({color}) => (
                        <Icon name="add" color={color} size={26} />
                    )
                })}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        width: 200
    },

    headerImage: {
        width: 150,
        height: 40,
        marginLeft: 10
    },

});