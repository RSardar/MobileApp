import * as React from "react";
import { Image, Text, View } from "react-native";
import styles from "./styles";

export default class HeaderMain extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerLogoText}>shuttertaps</Text>
      </View>
    );
  }
}
