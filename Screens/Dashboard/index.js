import React from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import HeaderMain from "../../components/HeaderMain";
import styles from "./styles";

export default class Dashboard extends React.Component {
  callFun = () => {
    alert("Image Clicked!!!");
  };

  render() {
    return (
      <View style={styles.mainBody}>
        <HeaderMain />
        <ScrollView>
          <View style={styles.imageGallary}>
            <View style={[styles.commonBanner, styles.imageFlow]}>
              <View style={styles.singleImage}>
                <TouchableOpacity>
                  <Image
                    style={styles.eachImage}
                    source={require("../../assets/img/userGallary/1.png")}
                  />
                </TouchableOpacity>
                <View style={styles.singleImageBottom}></View>
              </View>
              <View style={[styles.singleImage, styles.alternativeImg]}>
                <TouchableOpacity>
                  <Image
                    style={styles.eachImage}
                    source={require("../../assets/img/userGallary/2.jpg")}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.singleImage, styles.alternativeImg]}>
                <TouchableOpacity>
                  <Image
                    style={styles.eachImage}
                    source={require("../../assets/img/userGallary/3.jpeg")}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.singleImage}>
                <TouchableOpacity>
                  <Image
                    style={styles.eachImage}
                    source={require("../../assets/img/userGallary/4.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.singleImage, styles.alternativeImg]}>
                <TouchableOpacity>
                  <Image
                    style={styles.eachImage}
                    source={require("../../assets/img/userGallary/5.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.singleImage}>
                <TouchableOpacity>
                  <Image
                    style={styles.eachImage}
                    source={require("../../assets/img/userGallary/1.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
