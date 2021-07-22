import React from "react";
import { StyleSheet, View, Dimensions, Alert } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import * as Location from 'expo-location';
import { IconButton } from "react-native-paper";

export default function Homepage({ route, navigation }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton
                onPress={() => navigation.navigate("Range")}
                title="Info"
                color="#fff"
                icon="arrow-right"
                />
            ),
        });
    }, [navigation]);

    const [marker, setMarker] = React.useState({latitude : 0, longitude : 0});
    const [location, setLocation] = React.useState({ latitude: -26.8754117, longitude: -52.402652});
    const [error, setError] = React.useState(null);

    function handleNavigateToRange() {
        navigation.navigate('Range')
    }


    React.useEffect(() => {
        if(!marker.latitude && !marker.longitude) {
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setError(true);
                    return;
                }

                let deviceLocation = await Location.getCurrentPositionAsync({});
                setMarker(deviceLocation.coords);
                setLocation(deviceLocation.coords)
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
                region={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.028,
                    longitudeDelta: 0.028,
                }}
                onPress={(e) => setMarker(e.nativeEvent.coordinate)}>
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