import React from "react";
import MapView from "react-native-maps";
// import { Marker } from 'react-native-maps';
import { Text, View, ActivityIndicator } from "react-native";
import GetLocation from "react-native-get-location";
import Geocoder from "react-native-geocoding";
import styles from "./styles";

export default class MapLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      where: { lat: null, lng: null },
      error: null,
      currentLocation: "",
      longAddress: "",
      mapLoaded: false,
    };
  }
  componentDidMount() {
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24,
    };
    this.setState({ ready: false, error: null });
    navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions
    );
  }
  geoSuccess = (position) => {
    // console.log(position.coords.latitude);

    this.setState({
      ready: true,
      where: { lat: position.coords.latitude, lng: position.coords.longitude },
    });
    // alert()
  };
  geoFailure = (err) => {
    this.setState({ error: err.message });
  };
  render() {
    if(!this.state.mapLoaded){
      return (
        <View>
          <MapView
            style={styles.mapStyle}
            region={{
              latitude: this.state.where.lat,
              longitude: this.state.where.lng,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421,
            }}
          ></MapView>
        </View>
      );
  }
  }
}
