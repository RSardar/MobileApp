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
export default class SkipPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mobileNumber: '' };
  };
  
  //Example Name is like userFullName and e is value of the box
  handleChange = (e, name) => { 
    this.setState({ [name]: e });
  };

  registerMobile = () => {
    let userMobile = this.state.mobileNumber;
    if(userMobile.length == 10){
        // this.props.navigation.navigate("CheckOTP");

          const otp = Math.floor(1000 + Math.random() * 9000);
          
          const api = "55632cf8-cce7-11ea-9fa5-0200cd936042";
          var url = `https://2factor.in/API/V1/${api}/SMS/${userMobile}/${otp}`;
          // this.props.navigation.navigate("CheckOTP",{
          //   userMobileNumber: userMobile
          // });
          this.props.navigation.navigate('CheckOTP', {'mobileNumber':userMobile}) ;
          // return fetch(url)
          // .then((response) => response.json())
          // .then((json) => {
          //   // alert( json.Details);
          //   if(json.Status == 'Success'){
          //     this.props.navigation.navigate("CheckOTP");
          //   }
          // })

    }
    else{
        alert("User 10 digits mobile number");
    }
  }
  

  render() {
    const { mobileNumber} = this.state;
    // const { navigate } = this.props.navigation;
    return (
     <View>
         <HeaderMain />
         <View style={styles.mobileRegister}>
         <LogoImage />
         
         <Text style={styles.topText}>Make Your Moment Memorable, Hire Photogrpaher</Text>
             <View style={styles.mobileNumberBox}>
              
                <View style={styles.countryCode}>
                    <View>
                        <Image
                        style={[styles.countryIcon,styles.indianFlag]}
                        source={require("../../assets/img/icons/india.png")}
                        />
                    </View>
                  <Text style={styles.countryCodeNumber}>+91</Text>
                    {/* <View>
                    <Image
                        style={[styles.countryIcon,styles.downArrow]}
                        source={require("../../assets/img/icons/down-arrow.png")}
                        />
                    </View> */}
                </View>
                <InputBox
                    name="mobileNumber"
                    placeholder={"Mobile Number"}
                    customDesign={[styles.custominputBox]}
                    value={mobileNumber}
                    handleChange={this.handleChange}
                    keyType={'numeric'}
                />
             </View>
             <ButtonTouchable
                customDesign={styles.customBtn}
                customBtnDesign={[
                    styles.customBtnText
                  ]}
                text={"login / register"}
                onClick={this.registerMobile}
             />
            
         </View>
     </View>
    );
  }
}


