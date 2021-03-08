import React from "react";
import { Image, Text, View, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import HeaderMain from "../../components/HeaderMain";
import FooterMenu from "../../components/FooterMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
const serverIp = `192.168.0.113`;
const fileFolder = `jsonClasses`;
const serverUrl = `http://${serverIp}/${fileFolder}/`;
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      searchBannerText: "",
      singlePhotographer: "",
      photographerGallery: "",
      photographerDetails: "",
    };
  }
  componentWillMount() {
    this.userIdStored();
  }
  componentDidMount() {
    var self = this;
    const urlUsers = `${serverUrl}showPhotographers.php`;
    const urlPhotoGallery = "https://jsonplaceholder.typicode.com/posts";
    axios(urlUsers)
      .then(function (res) {
        //   const userDatabase = JSON.stringify(res.data);
        //   alert(res.data[2].username);
        self.setState({
          isLoading: false,
          singlePhotographer: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios(urlPhotoGallery)
      .then(function (res) {
        //   const userDatabase = JSON.stringify(res.data);
        //   alert(res.data[2].username);
        self.setState({
          // isLoading: false,
          photographerGallery: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  LogOut = async (action) => {
    await AsyncStorage.removeItem("userId");
    this.storedData(action);
  };

  userIdStored = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      // value previously stored
      let getValue = JSON.parse(value);
      this.setState({
        userId: getValue,
      });
      this.currentPhotographerDetails(getValue);
      // console.log(getValue);
    } catch (e) {
      // error reading value
      alert("error");
    }
  };

  storedData = async (action) => {
    try {
      const value = await AsyncStorage.getItem("loggedIn");
      if (value !== null) {
        // value previously stored
        let getValue = JSON.parse(value);
        const jsonValue = JSON.stringify(action);
        let insert = await AsyncStorage.setItem("loggedIn", jsonValue);
        this.props.navigation.navigate("Login");

        // console.log(getValue);
      }
    } catch (e) {
      // error reading value
      alert(e);
      console.log(e);
    }
  };

  currentPhotographerDetails = (id) => {
    let self = this;
    const photographerUrl = `${serverUrl}showPhotographers.php?singleId=${id}`;
    console.log(photographerUrl);
    axios(photographerUrl)
      .then(function (res) {
        self.setState({
          photographerDetails: res.data[0],
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  callFun = () => {
    alert("Image Clicked!!!");
  };
  handleChange = (e, name) => {
    this.setState({ [name]: e });
  };
  searchPhotos = () => {
    alert("just clicked");
  };
  redirectLoginPage = () => {
    this.props.navigation.navigate("Login");
  };

  profileClick = () => {
    this.props.navigation.navigate("Welcom");
  };
  render() {
    const { searchBannerText, navigation } = this.state;
    return (
      <View style={styles.mainBody}>
        <HeaderMain />
        <View style={styles.profileDetails}>
          <View style={styles.profileDetailsBox}>
            <View style={styles.profileImgBox}>
              <Image
                style={styles.userDetailsImg}
                source={{
                  uri: `http://192.168.0.116/shuttertaps/img/author/${this.state.photographerDetails.profile_pic}`,
                }}
              />
              <Text style={styles.userName}>
                {this.state.photographerDetails.user}
              </Text>
            </View>
          </View>
          <View style={styles.userPhotoDetails}>
            <View style={[styles.userBottom, styles.userLeftDetails]}>
              <View>
                <Image
                  style={styles.rupee}
                  source={require("../../assets/img/icons/rupee.png")}
                />
              </View>
              <Text style={styles.userEarningMoney}>30,000</Text>
            </View>
            <View style={[styles.userBottom, styles.userLeftDetails]}></View>
          </View>
        </View>
        <ScrollView>
          <View style={styles.userOrderDetails}>
            <View style={styles.userOrderDetailsUl}>
              <Text style={styles.myDashboard}>My Dashboard</Text>
              <TouchableOpacity
                style={styles.userDetailsLi}
                onPress={this.searchPhotos}
              >
                <View style={styles.userIconBox}>
                  <Image
                    style={styles.userIcon}
                    source={require("../../assets/img/icons/photographer.png")}
                  />
                </View>
                <Text style={styles.userTypeText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.userDetailsLi}>
                <View style={styles.userIconBox}>
                  <Image
                    style={styles.userIcon}
                    source={require("../../assets/img/icons/money.png")}
                  />
                </View>
                <Text style={styles.userTypeText}>Earning</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.userDetailsLi}>
                <View style={styles.userIconBox}>
                  <Image
                    style={styles.userIcon}
                    source={require("../../assets/img/icons/specialization.png")}
                  />
                </View>
                <Text style={styles.userTypeText}>Specialization</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.userDetailsLi}>
                <View style={styles.userIconBox}>
                  <Image
                    style={styles.userIcon}
                    source={require("../../assets/img/icons/loud-speaker.png")}
                  />
                </View>
                <Text style={styles.userTypeText}>Active Order</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.userDetailsLi}>
                <View style={styles.userIconBox}>
                  <Image
                    style={styles.userIcon}
                    source={require("../../assets/img/icons/credit-card.png")}
                  />
                </View>
                <Text style={styles.userTypeText}>Payment</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.userOrderDetailsUl}>
              <Text style={styles.myDashboard}>General</Text>
              <TouchableOpacity
                style={styles.userDetailsLi}
                onPress={() => this.props.navigation.navigate("Dashboard")}
              >
                <View style={styles.userIconBox}>
                  <Image
                    style={styles.userIcon}
                    source={require("../../assets/img/icons/gallery.png")}
                  />
                </View>
                <Text style={styles.userTypeText}>Gallary</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userDetailsLi}>
                <View style={styles.userIconBox}>
                  <Image
                    style={styles.userIcon}
                    source={require("../../assets/img/icons/settings.png")}
                  />
                </View>
                <Text style={styles.userTypeText}>Setting</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.userDetailsLi}>
                <View style={styles.userIconBox}>
                  <Image
                    style={styles.userIcon}
                    source={require("../../assets/img/icons/technical-support.png")}
                  />
                </View>
                <Text style={styles.userTypeText}>Help</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.userDetailsLi}
                onPress={() => this.LogOut("no")}
              >
                <View style={styles.userIconBox}>
                  <Image
                    style={styles.userIcon}
                    source={require("../../assets/img/icons/settings.png")}
                  />
                </View>
                <Text style={styles.userTypeText}>Log Out</Text>
              </TouchableOpacity>
              {/* <View style={{ height: 65 }}></View> */}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
