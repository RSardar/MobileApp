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
const serverIp = `192.168.0.104`;
const fileFolder = `jsonClasses`;
const serverUrl = `http://${serverIp}/${fileFolder}/`;
export default class ClientOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      gotUser: false,
      orderDataLoaded: false,
      showOrderDetails: false,
      expandOrder: false,
      allOrdersData: "",
      showDetailsId: 0,
      GOOGLE_MAPS_APIKEY: "AIzaSyCY2PpfkHShZyLPe698-WefukZa6kKR7o0",
      fontLoad: false,
      distanceBetween: "",
      currentPosition: 1,
      ratingText: "",
      ratingNumber: "",
      ratingSubmitted: false,
      refreshing: false,
      photographerAllData: "",
      singleOrderDetls: "",
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
      // this.PhotographerData(getValue);
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
      // console.log(res.data[1]);
      self.setState({
        allOrdersData: res.data[0],
        photographerAllData: res.data[1][0],
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

  ExpandOrder = (id, index) => {
    // console.log(this.state.allOrdersData[index]);
    let awayFrom = this.DistanceMapUsingJs(
      this.state.where.lat,
      this.state.where.lng,
      22.726156,
      88.47496
    );
    this.setState({
      distanceBetween: awayFrom,
      showDetailsId: index,
      singleOrderDetls: this.state.allOrdersData[index],
      expandOrder: true,
    });
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
    self.setState({
      gotUser: false,
    });
    let url = `${serverUrl}rating.php?orderId=${id}&rate=${this.state.ratingNumber}&cComment=${this.state.ratingText}&submit`;
    // console.log(url);
    axios(url).then((res) => {
      console.log(res.data);
      // self.userIdStored();
      self.setState({
        ratingSubmitted: true,
      });
    });
  };

  render() {
    let showData = this.state.allOrdersData;
    let tempId = this.state.showDetailsId;
    let showModalData = showData[tempId];

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
            {this.state.expandOrder ? (
              <Modal animationType="slide" visible={this.state.expandOrder}>
                {console.log(this.state.singleOrderDetls)}
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
                      {/* <MapViewDirections
                      origin={{
                        latitude: this.state.where.lat,
                        longitude: this.state.where.lng,
                      }}
                      destination={{
                        latitude: 22.726156,
                        longitude: 88.47496,
                      }}
                      apikey={this.state.GOOGLE_MAPS_APIKEY}
                      strokeColor="#F54336"
                      strokeWidth={3}
                    /> */}
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
                        style={[
                          styles.eachCustomerDetails,
                          { width: "90%", alignItems: "flex-start" },
                        ]}
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
                      <View style={styles.orderEachBoxBottom}>
                        <View style={styles.bottomRationSec}>
                          {!this.state.ratingSubmitted ? (
                            <View>
                              <Rating
                                imageSize={30}
                                type="heart"
                                ratingColor="#F54336"
                                isDisabled={true}
                                startingValue={this.state.ratingNumber}
                              />
                              <Text>{this.state.ratingText}</Text>
                            </View>
                          ) : (
                            <View>
                              <Rating
                                imageSize={30}
                                type="heart"
                                ratingColor="#F54336"
                                onFinishRating={this.RatingCompleted}
                                onStartRating={this.StartRating}
                                isDisabled={true}
                                startingValue={0}
                              />
                              <InputBox
                                name={"ratingText"}
                                placeholder="Type your Experiences"
                                value={ratingText}
                                handleChange={this.handleRatingComment}
                                multi={true}
                                customDesign={styles.ratingCommentBox}
                              />
                              <Button
                                title="Submit"
                                // type="outline"
                                containerStyle={styles.ratingContainerBtn}
                                titleStyle={styles.ratingBtnText}
                                buttonStyle={styles.ratingBtnText}
                                raised
                                onPress={() =>
                                  this.SubmitRatingWithComment(item.orderId)
                                }
                              />
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            ) : null}
            {this.state.orderDataLoaded ? (
              <FlatList
                data={showData}
                keyExtractor={({ id }) => id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  // console.log(item);
                  let badgeColor, activeOrder;
                  activeOrder = item.active_order;
                  activeOrder = parseInt(activeOrder);
                  let dateLeft = this.TimeLeft(
                    item.photoshoot_date,
                    activeOrder
                  );
                  // console.log(dateLeft);
                  let customPosition;
                  if (dateLeft == "Complete" || dateLeft == "Open") {
                    dateLeft;
                    if (dateLeft == "Complete") {
                      customPosition = 3;
                      if (item.vkey) {
                        customPosition += 1;
                      } else {
                        customPosition += 0;
                      }
                      if (item.ratingId) {
                        customPosition += 1;
                      }
                    } else if (dateLeft == "Open") {
                      customPosition = 2;
                    }
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
                  return (
                    <View style={styles.singleOrderDetails}>
                      <TouchableOpacity
                        onPress={() => this.ExpandOrder(item.id, index)}
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
                            <Text style={styles.bookieName}>{item.user}</Text>
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

                      <StepIndicator
                        customStyles={customStyles}
                        currentPosition={customPosition}
                        labels={labels}
                      />
                      {!item.ratingId ? (
                        <View style={styles.orderEachBoxBottom}>
                          {customPosition == 4 ? (
                            <View style={styles.bottomRationSec}>
                              <View>
                                <Rating
                                  imageSize={30}
                                  type="heart"
                                  ratingColor="#F54336"
                                  onFinishRating={this.RatingCompleted}
                                  onStartRating={this.StartRating}
                                  isDisabled={true}
                                  startingValue={0}
                                />
                                <InputBox
                                  name={"ratingText"}
                                  placeholder="Type your Experiences"
                                  value={ratingText}
                                  handleChange={this.handleRatingComment}
                                  multi={true}
                                  customDesign={styles.ratingCommentBox}
                                />
                                <Button
                                  title="Submit"
                                  // type="outline"
                                  containerStyle={styles.ratingContainerBtn}
                                  titleStyle={styles.ratingBtnText}
                                  buttonStyle={styles.ratingBtnText}
                                  raised
                                  onPress={() =>
                                    this.SubmitRatingWithComment(item.orderId)
                                  }
                                />
                              </View>
                            </View>
                          ) : null}
                        </View>
                      ) : (
                        <View
                          style={[
                            styles.eachOurCommentBox,
                            styles.commentBoxBesign,
                          ]}
                        >
                          <View>
                            <View
                              style={[
                                styles.commonClass,
                                { alignItems: "flex-start" },
                              ]}
                            >
                              <Avatar
                                rounded
                                source={{
                                  uri: `${serverUrl}img/author/${this.state.photographerAllData.profile_pic}`,
                                }}
                                size="small"
                              />
                              <View style={{ marginLeft: 10 }}>
                                <View>
                                  <Text>My Reply</Text>
                                  <View style={styles.commonClass}>
                                    <Text>{item.client_rating}</Text>
                                    <Rating
                                      imageSize={20}
                                      type="heart"
                                      ratingColor="#F54336"
                                      isDisabled="true"
                                      ratingCount={1}
                                      startingValue={1}
                                    />
                                  </View>
                                  <Text>{item.customer_comment}</Text>
                                </View>
                                <View
                                  style={[
                                    styles.commonClass,
                                    { alignItems: "flex-start" },
                                  ]}
                                >
                                  <Avatar
                                    rounded
                                    source={{
                                      uri: `${serverUrl}img/author/${item.profile_pic}`,
                                    }}
                                    size="small"
                                  />
                                  <View style={{ marginLeft: 10 }}>
                                    <Text>
                                      {this.state.photographerAllData.user}
                                    </Text>
                                    <View style={[styles.commonClass]}>
                                      <Text>{item.photographer_rating}</Text>
                                      <Rating
                                        imageSize={20}
                                        type="heart"
                                        ratingColor="#F54336"
                                        isDisabled={true}
                                        ratingCount={1}
                                        startingValue={1}
                                      />
                                    </View>
                                    <Text>{item.photographer_comment}</Text>
                                  </View>
                                </View>
                                <View>
                                  <View style={{ marginVertical: 10 }} />
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  );
                }}
              ></FlatList>
            ) : (
              <ActivityLoading />
            )}
          </View>
        )}
      </View>
    );
  }
}
