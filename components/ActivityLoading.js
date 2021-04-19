import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styles from "./styles";

export default class ActivityLoading extends React.Component {
  render() {
    const { size, loadingColor, loadingBox } = this.props;
    return (
      <View style={[styles.loading, loadingBox]}>
        <ActivityIndicator
          size="large"
          color="#F54336"
          style={styles.loadingStyle}
        />
      </View>
    );
  }
}
