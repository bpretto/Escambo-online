import React from "react";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import Login from "./pages/Login"
import Register from "./pages/Register/Register"
import MapView from "./pages/Register/MapView"
import Range from "./pages/Register/Range"
import MainScreen from "./pages/Main/MainScreen"
import Profile from "./pages/Profile/Profile"
import EditProfile from "./pages/Profile/EditProfile"
import OwnItemList from "./pages/Profile/OwnItemList"
import EditOwnItem from "./pages/Profile/EditOwnItem"

const { Navigator, Screen } = createStackNavigator();

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#ffd731',
        accent: '#000',
        background: '#ffd731',
        text: '#000',
        placeholder: '#737373',
    },
};



export default function Routes() {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
                <Navigator
                    initialRouteName="Login"
                    screenOptions={{
                        headerTintColor: 'white',
                        headerTitleAlign: "center",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                >
                    <Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Screen name="Register" component={Register} options={{ headerShown: false }} />
                    <Screen
                        name="MapView"
                        component={MapView}
                        options={({ navigation, route })=> ({})}
                    />
                    <Screen name="Range" component={Range} options={{ headerShown: false }} />
                    <Screen name="MainScreen" component={MainScreen} />
                    <Screen
                        name="Profile"
                        component={Profile}
                        options={({ navigation, route })=> ({})}
                    />
                    <Screen
                        name="EditProfile"
                        component={EditProfile}
                        options={({ navigation, route })=> ({})}
                    />
                    <Screen
                        name="OwnItemList"
                        component={OwnItemList}
                        options={({ navigation, route })=> ({})}
                    />
                    <Screen
                        name="EditOwnItem"
                        component={EditOwnItem}
                        options={({ navigation, route })=> ({})}
                    />
                </Navigator>
            </NavigationContainer>
        </PaperProvider >
    )
}