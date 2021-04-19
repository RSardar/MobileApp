import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
// import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from "./styles";

export default class ButtonTouchable extends React.Component {
  render() {
    const {
      text,
      onClickHere,
      customDesign,
      customBtnDesign,
      increasedByOne,
      onClick,
      imageIcon,
      iconsSource,
      iconNameLeft,
      iconNameRight,
      iconStyle,
    } = this.props;
    return (
      <TouchableOpacity
        style={[styles.touchableBtn, customDesign]}
        onPress={(text) => onClick(text)}
      >
        <Image style={[styles.buttonIconImg, imageIcon]} source={iconsSource} />
        <Icon style={iconStyle} name={iconNameLeft} />
        <Text style={[styles.touchableBtnTxt, customBtnDesign]}>{text}</Text>
        <Icon style={iconStyle} name={iconNameRight} />
      </TouchableOpacity>
    );
  }
}
