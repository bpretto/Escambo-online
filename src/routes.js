import React from "react";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import Login from "./pages/Login"
import Register from "./pages/Register/Register"
import MapView from "./pages/Register/MapView"
import Range from "./pages/Register/Range"
import MainScreen from "./pages/MainScreen"
import Profile from "./pages/Profile/Profile"
import EditProfile from "./pages/Profile/EditProfile"

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
                    initialRouteName="MainScreen"
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
                </Navigator>
            </NavigationContainer>
        </PaperProvider >
    )
}

// function HomeScreen() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Home!</Text>
//       </View>
//     );
//   }
  
//   function SettingsScreen() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Settings!</Text>
//       </View>
//     );
//   }
  
  
//   export default function App() {
//     return (
//     <PaperProvider theme={theme}>
//         <NavigationContainer>
//             <Tab.Navigator>
//             <Tab.Screen name="Home" component={HomeScreen} />
//             <Tab.Screen name="Settings" component={SettingsScreen} />
//             </Tab.Navigator>
//         </NavigationContainer>
//       </PaperProvider>
//     );
//   }