import React from "react";
import MapView from "react-native-maps";
// import { Marker } from 'react-native-maps';
import { Text, View, ActivityIndicator } from "react-native";
import axios from "axios";

import styles from "./styles";

export default class CurrentPosition extends React.Component {
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
    let self = this;
    this.setState({
      ready: false,
      where: { lat: position.coords.latitude, lng: position.coords.longitude },
    });

    let apiKey = "10523a679a285d227eac8d116ab000c3";

    // let locationUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`;

    let locationUrl = `http://api.positionstack.com/v1/reverse?access_key=${apiKey}&query=${position.coords.latitude},${position.coords.longitude}`;

    // alert(position.coords.latitude);
    axios(locationUrl)
      .then(function (res) {
        // alert(res.data);
        // console.log(res.data.data[0]);
        self.setState({
          isLoading: false,
          currentLocation: res.data.data[0],
        });
      })
      .catch(function (error) {
        // alert(error);
        console.log(error);
      });
  };
  geoFailure = (err) => {
    this.setState({ error: err.message });
  };
  render() {
    const { customDesign, customBox } = this.props;
    if (!this.state.mapLoaded) {
      // console.log(this.state.currentLocation);
      return (
        <View style={customBox}>
          <Text style={customDesign}>
            {this.state.currentLocation.name},
            {this.state.currentLocation.region}
          </Text>
        </View>
      );
    }
  }
}
