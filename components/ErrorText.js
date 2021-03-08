import React from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Image, Button,TouchableOpacity, ImageBackground } from 'react-native';
import styles from "./styles";

export default class ErrorText extends React.Component {

  render() {
    const { msg } = this.props;
    return (
      <View>
        <Text style={styles.errorText}>{msg}</Text>
      </View>
    );
  }
}