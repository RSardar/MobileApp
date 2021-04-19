import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import HeaderMain from "../../components/HeaderMain";
import InputBox from "../../components/InputBox";
import ErrorText from "../../components/ErrorText";
import ButtonTouchable from "../../components/ButtonTouchable";
import SocialLogin from "../../components/SocialLogin";
import LogoImage from "../../components/LogoImage";
import styles from "./styles";
export default class SingleService extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { navigation } = this.props;
    return (
     <View>
         <HeaderMain />
         <LogoImage />
         <View style={styles.typeOfPhotographer}>
           <Text style={styles.topTypeText}>select top {this.props.route.params.title} photographer</Text> 
         </View>
          
     </View>
    );
  }
}
