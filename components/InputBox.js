import React from "react";
import { TextInput, View } from "react-native";
import styles from "./styles";

export default class HeaderMain extends React.Component {
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
      textType,
      max,
      multi,
    } = this.props;

    return (
      <View style={styles.inputBox}>
        <TextInput
          autoCapitalize={textType}
          autoFocus={focus}
          secureTextEntry={secure}
          name={name}
          placeholder={placeholder}
          style={customDesign}
          value={value}
          onChangeText={(text) => handleChange(text, name)}
          keyboardType={keyType}
          maxLength={max}
          multiline={multi}
        />
      </View>
    );
  }
}
