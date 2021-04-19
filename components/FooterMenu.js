import React from 'react';
import { Image, Text, View,TouchableOpacity } from "react-native";
import styles from "./styles";

export default class FooterMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  redirect= ()=>{
    this.props.navigation.navigate("Profile");
  }
  render() {
    const { text,homeClick,onClick,navigation} = this.props;

    return (
    <View style={styles.footer}>
      <View style={styles.footerIconBox}>

        <TouchableOpacity style={styles.footerEachIcon}  onPress={(text) => homeClick(text)} > 
          <View style={styles.footerEachIconBox}>
            <Image
              style={styles.footerIcon}
              source={require("../assets/img/icons/home.png")}
            />
            <Text style={styles.footerIconText}>home</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerEachIcon}>
          <View style={styles.footerEachIconBox}>
            <Image
              style={styles.footerIcon}
              source={require("../assets/img/icons/calendar.png")}
            />
            <Text style={styles.footerIconText}>booking</Text>
          </View> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerEachIcon}>
          <View style={styles.footerEachIconBox}>
          <Image
            style={styles.footerIcon}
            source={require("../assets/img/icons/notifications.png")}
          />
          <Text style={styles.footerIconText}>notification</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerEachIcon} 
        onPress={this.redirect} >
          <View  style={styles.footerEachIconBox}>
            <Image
              style={styles.footerIcon}
              source={require("../assets/img/icons/man.png")}
            />
          <Text style={styles.footerIconText}>Profile</Text>  
        </View>
        </TouchableOpacity>

      </View>
    </View>
    );
  }
}
