import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import * as Location from 'expo-location';
import { IconButton } from "react-native-paper";

export default function mapView({ route, navigation }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton
                    title="Info"
                    color="#fff"
                    icon="arrow-right"
                    onPress={() => {
                        if (!marker) {
                            Alert.alert("Erro", "Selecione uma localização no mapa!");        
                        } else {
                            navigation.navigate("Range", {
                                username,
                                password,
                                name,
                                email,
                                tel,
                                lat,
                                lng
                            })
                        };
                    }}
                />
            ),
        });
    }, [navigation]);

    const { username, password, name, email, tel } = route.params;
    const [marker, setMarker] = React.useState({latitude : 0, longitude : 0});
    let lat, lng = null
    var error = false
    
    React.useEffect(() => {
        if(!error) {
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    error = true;
                    return; 
                }
                let deviceLocation = await Location.getCurrentPositionAsync({});
                setMarker(deviceLocation.coords);
                lat = deviceLocation.coords.latitude
                lng = deviceLocation.coords.longitude
            })();
        }
    }, []);

    if (error) {
        Alert.alert ("Permissão negada", "Por favor, indique sua localização no mapa.");
    }
    
    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: -26.8754117,
                    longitude: -52.402652,
                    latitudeDelta: 0.028,
                    longitudeDelta:0.028
                }}
                onPress={(e) => {
                    setMarker(e.nativeEvent.coordinate)               
                    lat = e.nativeEvent.coordinate.latitude;
                    lng = e.nativeEvent.coordinate.longitude;
                }}
            >
                {
                      marker &&
                      <MapView.Marker coordinate={marker} />
                }
                    <Marker
                        coordinate={marker}
                    >
                    </Marker>
                </MapView>
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
    
    map: {
        width: "100%",
        height: "100%",
    },
});