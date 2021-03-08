import * as React from "react";
import { Image, Text, View  } from "react-native";
import styles from "./styles";
import { Icon, Avatar } from 'react-native-elements';

export default class ProfileTop extends React.Component {
  render() {
    return (
      <View style={styles.headerProfile}>
        <View style={styles.topHeaderBar}>
            <Icon name='dehaze' />
            <View style={[styles.topHeaderBar,styles.rightTopbarHeader]}>
                <Icon name='notifications' />
                <Icon name='settings' />
                <Image
                style={styles.topHeaderAvatar}
                source={require("../assets/img/author/humayun.png")}
                />  
          </View>            
        </View>
      </View>
    );
  }
}
