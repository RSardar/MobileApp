import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  Modal,
  Animated,
  RefreshControl,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActivityLoading from "../../components/ActivityLoading";
import DatePicker from "react-native-datepicker";
import InputBox from "../../components/InputBox";
import * as ImagePicker from "expo-image-picker";
import styles from "./styles";
import {
  Icon,
  Avatar,
  Divider,
  Button,
  Badge,
  Image,
} from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import { FlatList } from "react-native-gesture-handler";
import * as Font from "expo-font";
// const serverIp = `betterpiping.com`;
// const fileFolder = `jsonClasses`;
const serverIp = `192.168.0.102`;
// const serverIp = `192.168.43.229`;
const fileFolder = `jsonClasses`;
const serverUrl = `http://${serverIp}/${fileFolder}/`;
export default class ClientProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      gotUser: false,
      allOrdersData: "",
      orderDataLoaded: false,
    };
  }
  anim = new Animated.Value(0);
  componentDidMount() {
    this.FetchFonts();
    this.userIdStored();
    console.log("-------------------");
    console.log("Client Profile");
    console.log("-----");
  }
  FetchFonts = () => {
    return Font.loadAsync({
      "roboto-bold": require("./../../fonts/Roboto-Bold.ttf"),
      "roboto-light": require("./../../fonts/Roboto-Light.ttf"),
      "roboto-regular": require("./../../fonts/Roboto-Regular.ttf"),
      "ubuntu-bold": require("./../../fonts/Ubuntu-Bold.ttf"),
      "ubuntu-medium": require("./../../fonts/Ubuntu-Medium.ttf"),
      "ubuntu-light": require("./../../fonts/Ubuntu-Light.ttf"),
    });
  };
  userIdStored = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      // value previously stored
      let getValue = JSON.parse(value);
      this.setState({
        userId: getValue,
        gotUser: true,
      });
      // console.log(getValue);
      this.AllOrders(getValue);
    } catch (e) {
      // error reading value
      console.log("error");
    }
  };

  OnRefresh = () => {
    this.setState({
      refreshing: true,
    });
  };

  AllOrders = (id, user) => {
    let self = this;
    let url = `${serverUrl}order.php?userId=${id}&client`;
    // console.log(url);
    axios(url).then((res) => {
      //   console.log(res.data);
      self.setState({
        allOrdersData: res.data,
        orderDataLoaded: true,
      });
    });
  };

  TimeLeft = (date, action) => {
    var nowDate = new Date();
    var myDate =
      nowDate.getFullYear() +
      "-" +
      (nowDate.getMonth() + 1) +
      "-" +
      nowDate.getDate();
    let date1 = new Date(myDate);
    let date2 = new Date(date);
    let Difference_In_Time = date2 - date1;

    var Difference_In_Days = Math.ceil(
      Difference_In_Time / (1000 * 60 * 60 * 24)
    );
    let prjectTimeLeft, daysLeft, prjectTime;

    if (Difference_In_Days >= 365) {
      prjectTimeLeft = Math.floor(Difference_In_Days / 365);
      prjectTimeLeft =
        prjectTimeLeft > 1
          ? prjectTimeLeft + " years"
          : prjectTimeLeft + " year";
    } else if (Difference_In_Days < 365 && Difference_In_Days >= 24) {
      prjectTime = Math.floor(Difference_In_Days / 30);
      daysLeft = Math.floor(Difference_In_Days % 30);

      prjectTime =
        prjectTime > 1 ? prjectTime + " Months" : prjectTime + " Month";

      prjectTimeLeft =
        daysLeft > 1 ? prjectTime + " " + daysLeft + " Days" : prjectTime;
    } else if (Difference_In_Days < 24 && Difference_In_Days > 0) {
      prjectTimeLeft =
        Difference_In_Days < 24 && Difference_In_Days > 1
          ? Difference_In_Days + " Days"
          : Difference_In_Days + " Day";
    } else {
      prjectTimeLeft = action == 1 ? "Complete" : "Open";
    }

    // console.log(prjectTimeLeft);

    return prjectTimeLeft;
  };
  render() {
    let showData = this.state.allOrdersData;
    return (
      <View style={styles.mainBody}>
        {this.state.orderDataLoaded ? (
          <FlatList
            data={showData}
            keyExtractor={({ id }) => id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              console.log(item);
              let badgeColor, activeOrder;
              activeOrder = item.active_order;
              activeOrder = parseInt(activeOrder);
              let dateLeft = this.TimeLeft(item.photoshoot_date, activeOrder);

              if (dateLeft == "Complete" || dateLeft == "Open") {
                dateLeft;
              } else {
                dateLeft = `In ${dateLeft}`;
              }
              if (dateLeft > 0) {
                badgeColor = "#F54336";
              } else {
                if (activeOrder) {
                  badgeColor = "#F54336";
                } else {
                  badgeColor = "#53c41a";
                }
              }
              let blank = [];

              return (
                <View>
                  <TouchableOpacity
                    onPress={() => this.ExpandOrder(item.id, index)}
                    style={styles.singleOrderDetails}
                  >
                    <View
                      style={[
                        styles.activeStatus,
                        { backgroundColor: badgeColor },
                      ]}
                    ></View>

                    <View style={styles.hiredUserLeft}>
                      <View style={styles.avatar}>
                        <Avatar
                          rounded
                          style={styles.hiredAvatar}
                          source={{
                            uri: `${serverUrl}img/author/${item.profile_pic}`,
                          }}
                          size="large"
                        />
                      </View>
                      <View style={{ marginLeft: 15 }}>
                        <Text style={styles.bookieName}>
                          {item.book_in_name}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.hiredUserRight}>
                      <View style={styles.hiredUserRightDetails}>
                        <View style={styles.headerDetails}>
                          <Icon
                            iconStyle={styles.orderPageIcon}
                            name={"location-outline"}
                            type="ionicon"
                          />
                          <Text style={styles.orderBoxEachText}>
                            {item.nearest_location},
                          </Text>
                          <Text style={styles.orderBoxEachText}>
                            {item.destination}
                          </Text>
                        </View>

                        <View style={styles.headerDetails}>
                          <Icon
                            iconStyle={styles.orderPageIcon}
                            name={"calendar-outline"}
                            type="ionicon"
                          />
                          <Text style={styles.orderBoxEachText}>
                            {item.photoshoot_date}
                          </Text>
                        </View>
                        <View style={styles.headerDetails}>
                          <Icon
                            iconStyle={styles.orderPageIcon}
                            name={"call-outline"}
                            type="ionicon"
                          />
                          <Text style={styles.orderBoxEachText}>
                            {item.book_contact}
                          </Text>
                          <View style={{ marginLeft: "auto" }}>
                            <Text style={styles.daysLeft}>{dateLeft}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          ></FlatList>
        ) : (
          <ActivityLoading />
        )}
      </View>
    );
  }
}
