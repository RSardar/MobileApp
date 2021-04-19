import * as React from "react";
import { Image, Text, View,TouchableOpacity } from "react-native";
import styles from "./styles";

export default class LogoImage extends React.Component {
 
  render() {
    const {
      text,
      onClickHere,
    } = this.props;
    return (
      <TouchableOpacity  onPress={(text) => onClickHere(text)}>
      <View style={styles.logo}>
        <Image
          style={styles.logoImage}
          source={require("../assets/img/icons/logo.png")}
        />
      </View>
      </TouchableOpacity>
    );
  }
}
