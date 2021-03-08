import * as React from "react";
import { Image, Text, View, TouchableOpacity,FlatList  } from "react-native";
import styles from "./styles";

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  

  render() {
    const {imageGallary, allGalleryImg} = this.props;
    return (
      <View style={styles.userUploadedGallary}>
        <View style={styles.imageGallary}>
            <View style={[styles.commonBanner, styles.imageFlow]}>
              <FlatList data={allGalleryImg} returnItem={({item})=>{
                return (
                  <View style={styles.singleImage}>
                    <TouchableOpacity>
                      <Image
                        style={styles.eachImage}
                        source={{uri: 'http://shuttertaps.com/img/userGallary/delivery.jpeg'}}
                      />
                    </TouchableOpacity>
                    <View style={styles.singleImageBottom}></View>
                  </View>
                )
              }}>
                
              </FlatList>
            </View>
          </View>
      </View>
    );
  }
}
