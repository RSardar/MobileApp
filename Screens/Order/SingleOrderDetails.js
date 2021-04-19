import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Share,
  Animated,
  Modal,
} from "react-native";
import InputBox from "../../components/InputBox";
import FooterMenu from "../../components/FooterMenu";
import HeaderMain from "../../components/HeaderMain";
import CurrentPosition from "../../components/CurrentPosition";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActivityLoading from "../../components/ActivityLoading";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import {
  Icon,
  Avatar,
  withBadge,
  Badge,
  Image,
  Rating,
  AirbnbRating,
  Button,
  Divider,
} from "react-native-elements";
import MapViewDirections from "react-native-maps-directions";
import MapView, { Marker } from "react-native-maps";
import StepIndicator from "react-native-step-indicator";
import * as Font from "expo-font";
import styles from "./styles";
import { ActivityIndicator } from "react-native";
const serverIp = `192.168.0.119`;
// const serverIp = `192.168.0.101`;
// const serverIp = `192.168.43.229`;
const fileFolder = `jsonClasses`;
const serverUrl = `http://${serverIp}/${fileFolder}/`;
export default class SingleOrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      gotUser: false,
      orderId: this.props.route.params.orderId,
    };
  }

  componentDidMount() {
    this.FetchFonts();
    console.log("--------------");
    this.userIdStored();
    this.UserLatLan();
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

  AllOrders = (id) => {
    let self = this;
    let url = `${serverUrl}order.php?userId=${id}&client`;
    console.log(url);
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

  UserLatLan = () => {
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24,
    };
    this.setState({ ready: false, error: null });
    navigator.geolocation.getCurrentPosition(
      this.GeoSuccess,
      this.GeoFailure,
      geoOptions
    );
  };

  GeoSuccess = async (position) => {
    this.setState({
      ready: true,
      where: { lat: position.coords.latitude, lng: position.coords.longitude },
    });
    let exactPosition = [position.coords.latitude, position.coords.longitude];

    // console.log(exactPosition);
  };

  GeoFailure = (err) => {
    this.setState({ error: err.message });
  };
  toRad = (Value) => {
    return (Value * Math.PI) / 180;
  };
  DistanceMapUsingJs = (lat1, lon1, lat2, lon2) => {
    // this.geoSuccess()
    var R = 6371; // km
    var dLat = this.toRad(lat2 - lat1);
    var dLon = this.toRad(lon2 - lon1);
    var lat1 = this.toRad(lat1);
    var lat2 = this.toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d.toFixed(2);
  };

  RatingCompleted = (e) => {
    this.setState({
      ratingNumber: e,
    });
  };

  handleRatingComment = (e, name) => {
    this.setState({ [name]: e });
  };
  SubmitRatingWithComment = (id) => {
    let self = this;
    let url = `${serverUrl}rating.php?orderId=${id}&rate=${this.state.ratingNumber}&cComment=${this.state.ratingText}&submit`;
    console.log(url);
    axios(url).then((res) => {
      console.log(res.data);
      self.setState({
        ratingSubmitted: true,
      });
    });
  };

  render() {
    let showData = this.state.allOrdersData;
    // let tempId = this.state.showDetailsId;
    // let showModalData = showData[tempId];

    const labels = ["Placed", "Start", "End", "Payment", "Complete"];
    const { ratingText } = this.state;
    const customStyles = {
      stepIndicatorSize: 25,
      currentStepIndicatorSize: 30,
      separatorStrokeWidth: 2,
      currentStepStrokeWidth: 3,
      stepStrokeCurrentColor: "#fe7013",
      stepStrokeWidth: 3,
      stepStrokeFinishedColor: "#fe7013",
      stepStrokeUnFinishedColor: "#aaaaaa",
      separatorFinishedColor: "#fe7013",
      separatorUnFinishedColor: "#aaaaaa",
      stepIndicatorFinishedColor: "#fe7013",
      stepIndicatorUnFinishedColor: "#ffffff",
      stepIndicatorCurrentColor: "#ffffff",
      stepIndicatorLabelFontSize: 13,
      currentStepIndicatorLabelFontSize: 16,
      stepIndicatorLabelCurrentColor: "#fe7013",
      stepIndicatorLabelFinishedColor: "#ffffff",
      stepIndicatorLabelUnFinishedColor: "#aaaaaa",
      labelColor: "#999999",
      labelSize: 13,
      currentStepLabelColor: "#fe7013",
    };

    const { rating } = this.props;

    return (
      <View style={styles.mainBody}>
        {!this.state.gotUser ? (
          <ActivityLoading />
        ) : (
          <View style={styles.allUserOrders}>
            {this.state.orderDataLoaded ? (
              <Modal animationType="slide" visible={this.state.expandOrder}>
                <View style={{ flex: 1 }}>
                  <View style={[styles.expandDetails, { flex: 1 }]}>
                    <MapView
                      style={{ flex: 1 }}
                      initialRegion={{
                        latitude: this.state.where.lat,
                        longitude: this.state.where.lng,
                        latitudeDelta: 0.03,
                        longitudeDelta: 0.2,
                      }}
                    >
                      <Marker
                        coordinate={{
                          latitude: this.state.where.lat,
                          longitude: this.state.where.lng,
                        }}
                      >
                        <Icon
                          color={"#F54336"}
                          name={"location"}
                          type="ionicon"
                        />
                      </Marker>
                      <Marker
                        coordinate={{
                          latitude: 22.726156,
                          longitude: 88.47496,
                        }}
                      />
                    </MapView>
                  </View>
                  <View style={styles.clientOrderDetailsSection}>
                    <Icon color={"#F54336"} name={"location"} type="ionicon" />
                    <View style={styles.distanceFromUser}>
                      <Avatar
                        rounded
                        source={{
                          uri: `${serverUrl}img/author/${showData[tempId].profile_pic}`,
                        }}
                        size="large"
                      />
                      <View style={[styles.eachCustomerDetailsTop]}>
                        <View style={[styles.commonClass]}>
                          <Text style={[styles.topLocationGuide]}>
                            {showData[tempId].destination} ,
                          </Text>
                          <Text
                            style={[styles.topLocationGuide, { marginLeft: 5 }]}
                          >
                            {showData[tempId].photoshoot_date}
                          </Text>
                        </View>
                        <View
                          style={[styles.actualDistanceBox, styles.commonClass]}
                        >
                          <Text style={styles.actualDistanceBoxText}>
                            {this.state.distanceBetween} km
                          </Text>
                          <Text
                            style={[
                              styles.clientDetailsOrderText,
                              { marginLeft: 5 },
                            ]}
                          >
                            {showData[tempId].payment_type}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={{ marginHorizontal: 15 }}>
                      <View style={styles.commonClass}>
                        <View style={styles.eachCustomerDetails}>
                          <Icon
                            iconStyle={styles.orderPageIcon}
                            name={"person-outline"}
                            type="ionicon"
                          />
                          <Text style={styles.clientDetailsOrderText}>
                            {showData[tempId].book_in_name}
                          </Text>
                        </View>
                        <View style={styles.eachCustomerDetails}>
                          <Icon
                            iconStyle={styles.orderPageIcon}
                            name={"camera-outline"}
                            type="ionicon"
                          />
                          <Text style={styles.clientDetailsOrderText}>
                            {showData[tempId].type}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.commonClass}>
                        <View style={styles.eachCustomerDetails}>
                          <Icon
                            iconStyle={styles.orderPageIcon}
                            name={"locate-outline"}
                            type="ionicon"
                          />
                          <Text style={styles.clientDetailsOrderText}>
                            {showData[tempId].nearest_location}
                          </Text>
                        </View>
                        <View style={styles.eachCustomerDetails}>
                          <Icon
                            iconStyle={styles.orderPageIcon}
                            name={"location-outline"}
                            type="ionicon"
                          />
                          <Text style={styles.clientDetailsOrderText}>
                            {showData[tempId].destination}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.commonClass}>
                        <View style={styles.eachCustomerDetails}>
                          <Icon
                            iconStyle={styles.orderPageIcon}
                            name={"call-outline"}
                            type="ionicon"
                          />
                          <Text style={styles.clientDetailsOrderText}>
                            {showData[tempId].book_contact}
                          </Text>
                        </View>
                        <View style={styles.eachCustomerDetails}>
                          <Icon
                            iconStyle={styles.orderPageIcon}
                            name={"mail-outline"}
                            type="ionicon"
                          />
                          <Text style={styles.clientDetailsOrderText}>
                            {showData[tempId].email}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.commonClass}>
                        <View style={styles.eachCustomerDetails}>
                          <Icon
                            iconStyle={styles.orderPageIcon}
                            name={"calendar-outline"}
                            type="ionicon"
                          />
                          <Text style={styles.clientDetailsOrderText}>
                            {showData[tempId].photoshoot_date}
                          </Text>
                        </View>
                        <View style={styles.eachCustomerDetails}>
                          <Icon
                            iconStyle={styles.orderPageIcon}
                            name={"calendar-outline"}
                            type="ionicon"
                          />
                          <Text style={styles.clientDetailsOrderText}>
                            {showData[tempId].phtoshoot_end_date}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={[styles.eachCustomerDetails, { width: "90%" }]}
                      >
                        <Icon
                          iconStyle={styles.orderPageIcon}
                          name={"chatbox-outline"}
                          type="ionicon"
                        />
                        <Text style={styles.clientDetailsOrderText}>
                          {showData[tempId].any_message}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            ) : (
              <ActivityLoading />
            )}
          </View>
        )}
      </View>
    );
  }
}
