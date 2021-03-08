import React from "react";
import MapView from "react-native-maps";
import { Text, View, ActivityIndicator } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import styles from "./styles";

export default class GoogleLocationSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //   alert("hello")
    return (
      <View>
        <GooglePlacesAutocomplete
          placeholder="Search"
          returnKeyType={"default"}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: "AIzaSyCbNydsbLQHXzARdqRdKo6DB9BzUuiCiTs",
            language: "en",
            // components: "country:ind",
          }}
          onFail={(error) => console.error(error)}
        />
      </View>
    );
  }
}
