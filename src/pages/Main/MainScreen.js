import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from "react-native-elements"
import { StyleSheet, View, Image } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack"; 

import Home from "./Homepage/Home"
import SpecifiedItemList from "./Homepage/SpecifiedItemList";
import SelectItemToTrade from "./Homepage/SelectItemToTrade";
import CreateNewItem from "./Homepage/CreateNewItem";
import NewPost from "./NewPost/NewPost"
import STRSentTradeRequests from "./SentTradeRequests/STRSentTradeRequests";
import STRSelectItemToTrade from "./SentTradeRequests/STRSelectItemToTrade";
import RTRReceivedTradeRequests from "./ReceivedTradeRequests/RTRReceivedTradeRequests";
import RTRSpecifiedItemList from "./ReceivedTradeRequests/RTRSpecifiedItemList";

import Logo from "../../images/logo.png"

const Tab = createMaterialBottomTabNavigator();
const { Navigator, Screen } = createStackNavigator();

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
                    color="#000"
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
            shifting={true}
        >
            <Tab.Screen
                name="Homepage"
                component={Homepage}
                options={({ navigation, route })=> ({
                    tabBarLabel: "Feed",
                    tabBarIcon: ({color}) => (
                        <Icon  name="home" color={color} size={26} />
                    )
                })}
            />

            <Tab.Screen
                name="NewPost"
                component={NewPost}
                options={({ navigation, route })=> ({
                    tabBarLabel: "Cadastrar Item",
                    tabBarIcon: ({color}) => (
                        <Icon name="add" color={color} size={26} />
                    )
                })}
            />

            <Tab.Screen
                name="STR"
                component={STR}
                options={({ navigation, route })=> ({
                    tabBarLabel: "Pedidos realizados",
                    tabBarIcon: ({color}) => (
                        <Icon name="list" color={color} size={26} />
                    )
                })}
            />

            <Tab.Screen
                name="RTR"
                component={RTR}
                options={({ navigation, route })=> ({
                    tabBarLabel: "Pedidos recebidos",
                    tabBarIcon: ({color}) => (
                        <Icon type="material-community" name="forum" color={color} size={24} />
                    )
                })}
            />
        </Tab.Navigator>
    )
}

function Homepage() {
    return (
        <Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: false}}
        >
            <Screen
                name="Home"
                component={Home}
            />
            <Screen
                name="SpecifiedItemList"
                component={SpecifiedItemList}
            />
            <Screen
                name="SelectItemToTrade"
                component={SelectItemToTrade}
            />
            <Screen
                name="CreateNewItem"
                component={CreateNewItem}
            />
        </Navigator>
    )
}

function STR() {
    return(
        <Navigator
        initialRouteName="STRSentTradeRequests"
        screenOptions={{headerShown: false}}
        >
            <Screen
                name="STRSentTradeRequests"
                component={STRSentTradeRequests}
            />
            <Screen
                name="STRSelectItemToTrade"
                component={STRSelectItemToTrade}
            />
        </Navigator>    
    )
}

function RTR() {
    return(
        <Navigator
        initialRouteName="RTRReceivedTradeRequests"
        screenOptions={{headerShown: false}}
        >
            <Screen
                name="RTRReceivedTradeRequests"
                component={RTRReceivedTradeRequests}
            />
            <Screen
                name="RTRSpecifiedItemList"
                component={RTRSpecifiedItemList}
            />
        </Navigator>    
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