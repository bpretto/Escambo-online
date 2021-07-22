import React from "react";
import { DefaultTheme, Provider as PaperProvider, Button, IconButton } from 'react-native-paper';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import Login from "./pages/Login"
import Register from "./pages/Register/Register"
import MapView from "./pages/Register/MapView"
import Range from "./pages/Register/Range"


const { Navigator, Screen } = createStackNavigator();

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#ffd731',
        accent: '#000',
        background: '#ffd731',
        text: '#fff',
        placeholder: '#737373',
    },
};

export default function Routes() {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
                <Navigator
                    // initialRouteName="MapView"
                    screenOptions={{
                        title: "Informe sua localização",
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
                        options={({ navigation, route })=> ({
                            
                        })}
                    />
                    <Screen name="Range" component={Range} options={{ headerShown: false }} />
                </Navigator>
            </NavigationContainer>
        </PaperProvider >
    )
}