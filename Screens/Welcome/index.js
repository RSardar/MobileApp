import React from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import InputBox from "../../components/InputBox";
import FooterMenu from "../../components/FooterMenu";
import CurrentPosition from "../../components/CurrentPosition";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./styles";

const imageSource = require("../../assets/img/icons/search.png");

const photographersTypes = [
  {
    id: 1,
    icon: require("../../assets/img/icons/wedding.png"),
    type: "wedding",
  },
  {
    id: 2,
    icon: require("../../assets/img/icons/party.png"),
    type: "event",
  },
  {
    id: 3,
    icon: require("../../assets/img/icons/fashion.png"),
    type: "fashion",
  },
  {
    id: 4,
    icon: require("../../assets/img/icons/adventurer.png"),
    type: "adventure",
  },
  {
    id: 5,
    icon: require("../../assets/img/icons/portrait.png"),
    type: "potrait",
  },
  {
    id: 6,
    icon: require("../../assets/img/icons/travel-photography.png"),
    type: "travel",
  },
  {
    id: 7,
    icon: require("../../assets/img/icons/money.png"),
    type: "wedding",
  },
  {
    id: 8,
    icon: require("../../assets/img/icons/money.png"),
    type: "wedding",
  },
  {
    id: 8,
    icon: require("../../assets/img/icons/money.png"),
    type: "wedding",
  },
  {
    id: 8,
    icon: require("../../assets/img/icons/money.png"),
    type: "wedding",
  },
  {
    id: 8,
    icon: require("../../assets/img/icons/money.png"),
    type: "wedding",
  },
  {
    id: 8,
    icon: require("../../assets/img/icons/money.png"),
    type: "wedding",
  },
];

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchBannerText: "" };
  }

  async componentDidMount() {
    let allSplzUrl = `http://shuttertaps.com/jsonClasses/specialization.php`;
    let self = this;
    axios(allSplzUrl)
      .then(function (res) {
        // alert(res.data);
        // console.log(res.data);
        self.setState({
          currentLocation: res.data,
        });
      })
      .catch(function (error) {
        // alert(error);
        console.log(error);
      });
    this.storedData();
  }

  //Local Storage
  storeData = async (value) => {
    let self = this;
    try {
      //Use Always Object
      // await AsyncStorage.removeItem("splzId");
      const jsonValue = JSON.stringify(value);
      let insert = await AsyncStorage.setItem("splzId", jsonValue);
      this.setState({ loggedIn: true });
      // console.log(jsonValue);
      this.props.navigation.navigate("Booking", { splzId: jsonValue });
    } catch (e) {
      // saving error
      alert(e);
    }
  };

  Delay = (action, time) => {
    setTimeout(function () {
      action;
    }, time);
  };

  //Pre Stored Data
  storedData = async () => {
    try {
      const value = await AsyncStorage.getItem("loggedIn");
      if (value !== null) {
        // value previously stored
        let getValue = JSON.parse(value);
        // console.log(getValue);
      } else {
        this.props.navigation.navigate("Login");
      }
    } catch (e) {
      // error reading value
      alert("error");
    }
  };

  callFun = () => {
    alert("Image Clicked!!!");
  };
  handleChange = (e, name) => {
    this.setState({ [name]: e });
  };
  photographerTypes = async (e) => {
    this.setState({ ["type"]: e });
    this.storeData(e);
  };

  render() {
    const { navigate } = this.props.navigation;
    const { searchBannerText } = this.state;
    return (
      <View style={styles.mainBody}>
        {/* <HeaderMain /> */}
        <View style={styles.headerMainTop}>
          <View style={styles.homeLocation}>
            <Image
              style={styles.locationIcons}
              source={require("../../assets/img/icons/locationPin.png")}
            />
            <Text style={styles.locationName} numberOfLines={1}>
              <CurrentPosition customDesign={{ color: "white" }} />
            </Text>
            <Image
              style={styles.locationIconsDown}
              source={require("../../assets/img/icons/downArrow.png")}
            />
          </View>
          <View style={styles.topSearchBar}>
            <Image
              style={styles.searchIcons}
              source={require("../../assets/img/icons/search.png")}
            />
            <InputBox
              name="userEmail"
              // secureTextEntry={true}
              placeholder={"Search for Photos and Top Photographer"}
              customDesign={[styles.custominputBox, styles.loginEmail]}
              value={searchBannerText}
              handleChange={(searchBannerText) =>
                this.setState({ searchBannerText })
              }
            />
          </View>
        </View>
        <ScrollView styles={{ flex: 1 }}>
          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.heroBannerUl}
            >
              <View style={styles.heroBannerList}>
                <Image
                  style={styles.bannerImage}
                  source={require("../../assets/img/userGallary/2.jpg")}
                />
              </View>
              <View style={styles.heroBannerList}>
                <Image
                  style={styles.bannerImage}
                  source={require("../../assets/img/userGallary/2.jpg")}
                />
              </View>
              <View style={styles.heroBannerList}>
                <Image
                  style={styles.bannerImage}
                  source={require("../../assets/img/userGallary/2.jpg")}
                />
              </View>
            </ScrollView>
          </View>
          <SafeAreaView style={{ flex: 1 }}>
            <FlatList
              numColumns={4}
              keyExtractor={(item) => item.id.toString()}
              style={styles.photographerTypes}
              data={photographersTypes}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    name={item.type}
                    style={styles.photographerTypeLi}
                    onPress={() => this.photographerTypes(item.id)}
                  >
                    <Image style={styles.typesOfIcon} source={item.icon} />
                    <Text style={styles.typesText}>{item.type}</Text>
                    <Text style={[styles.typesText, { marginTop: 0 }]}>
                      Photography
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </SafeAreaView>
        </ScrollView>
        {/* <FooterMenu /> */}
      </View>
    );
  }
}
