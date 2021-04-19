import React, { useState, Component } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Linking,
} from "react-native";
import HeaderMain from "../../components/HeaderMain";
import InputBox from "../../components/InputBox";
import ErrorText from "../../components/ErrorText";
import ButtonTouchable from "../../components/ButtonTouchable";
import SocialLogin from "../../components/SocialLogin";
import LogoImage from "../../components/LogoImage";
import axios from "axios";
// import { PaymentsStripe as Stripe } from "expo-payments-stripe";

import styles from "./styles";

export default class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  successCallback = (data) => {
    console.log(data);
  };
  failureCallback = (error) => {
    console.log(error);
  };
  async componentDidMount() {}
  CallPayment = () => {
    const tid = new Date().getTime();
    // const url = `https://www.google.com/`;
    // Linking.openURL(url);
    let paymentUrl =
      "http://shuttertaps.com/jsonClasses/ccavRequestHandler.php";
    fetch(paymentUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert(responseJson);
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  };

  render() {
    const {} = this.state;
    return (
      <View style={styles.mainBody}>
        <TouchableOpacity
          style={{ backgroundColor: "red", borderRadius: 4 }}
          onPress={() => this.CallPayment()}
        >
          <Text
            style={{
              color: "white",
              paddingVertical: 15,
              paddingHorizontal: 35,
            }}
          >
            Click to Pay
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
