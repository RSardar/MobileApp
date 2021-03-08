import * as React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";

export default class SocialLogin extends React.Component {
  render() {
    return (
      <View style={styles.socialLogin}>
            <TouchableOpacity
              style={[styles.socialLoginBox, styles.socialGooglelogin]}
            >
              <Icon style={{fontSize:30,color: "#DB4437"}} name="google" />
              <Text style={styles.googleLoginText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialLoginBox, styles.socaialFbLogin]}
            >
              <Icon style={{fontSize:30,color: "#4267B2"}} name="facebook-f" />
              <Text style={styles.googleLoginText}>Facebook</Text>
            </TouchableOpacity>
          </View>
    );
  }
}
