import React, { useState } from "react";
import { TextInput, Text, View } from "react-native";
import styles from "./styles";

// const activities = () => {};

export default class HeaderMain extends React.Component {
  // fetchData() {
  //   alert(`the Value is: ${this.props.value}`);
  // }
  render() {
    const {
      value,
      placeholder,
      customDesign,
      customDesignInput,
      secure,
      name,
      keyType,
      handleChange,
      focus,
      textType
    } = this.props;

    return (
      <View style={styles.inputBox}>
        <TextInput
          autoCapitalize = {textType}
          autoFocus={focus}
          secureTextEntry={secure}
          name={name}
          placeholder={placeholder}
          style={customDesign}
          value={value}
          onChangeText={(text) => handleChange(text,name)}
          keyboardType={keyType}
        />
      </View>
    );
  }
}
