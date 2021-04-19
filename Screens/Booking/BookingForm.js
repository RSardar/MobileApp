import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Picker,
  Linking,
} from "react-native";
import HeaderMain from "../../components/HeaderMain";
import InputBox from "../../components/InputBox";
import ErrorText from "../../components/ErrorText";
import ButtonTouchable from "../../components/ButtonTouchable";
import SocialLogin from "../../components/SocialLogin";
import LogoImage from "../../components/LogoImage";
import FooterMenu from "../../components/FooterMenu";
import DatePicker from "react-native-datepicker";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./styles";
const serverIp = `192.168.0.119`;
// const serverIp = `192.168.43.229`;
const fileFolder = `jsonClasses`;
const serverUrl = `http://${serverIp}/${fileFolder}/`;
export default class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      usersData: "",
      userid: "",
      gotUser: false,
      clientId: this.props.route.params.id,
      states: "",
      dists: "",
      hasDist: true,
      selectSingleState: "",
      selectDist: "",
      startDate: new Date(),
      endDate: "",
      photographerType: "",
      bookName: "",
      photographerAllData: "",
      specialization: this.props.route.params.splzId,
      selectSplz: "",
      userSplzns: "",
      userCity: "Barasat",
      startTime: new Date(),
      endTime: new Date(),
      paymentType: "0",
      splzId: this.props.route.params.splzId,
      bookSplzId: "",
      initial: 1,
      totalTimeInDays: 1,
      totalPrice: 0,
      afterProceedDetails: "",
      showBanner: true,
    };
  }

  componentDidMount() {
    console.log("BookingForm");
    this.storedData();
    this.currentDate();
    this.getPhotographerAllData(this.props.route.params.id);
    this.getAllStates();
  }

  storedData = async () => {
    try {
      await AsyncStorage.getItem("userId").then((value) => {
        value = JSON.parse(value);

        this.setState({
          userid: value,
          gotUser: true,
        });
      });
    } catch (e) {
      alert(e);
      console.log(e);
    }
  };

  handleChange = (e, name) => {
    this.setState({ [name]: e });
  };

  MoneyConvert = (value) => {
    var x = value;
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != "") lastThree = "," + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

    return res;
    // return res;
  };

  navigateData = () => {
    this.props.navigation.navigate("PublicProfile", {
      userId: this.state.userid,
      photographer: this.state.clientId,
    });
  };

  photographerPublicProfile = () => {
    this.navigateData();
  };

  userPhotos = (id) => {
    // console.log(id);
    this.navigateData();
  };

  userSplecialization = () => {
    let self = this;
    const allType = `${serverUrl}specialization.php`;
    axios(allType)
      .then(function (res) {
        self.setState({
          isLoading: false,
          specialization: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getPhotographerAllData = (id) => {
    let self = this;
    const photographerTypeUrl = `${serverUrl}showPhotographers.php?singleId=${id}`;
    // console.log(photographerTypeUrl);
    axios(photographerTypeUrl)
      .then(function (res) {
        self.setState({
          isLoading: false,
          photographerAllData: res.data[0],
          userSplzns: res.data[0].userSplz,
        });
        // console.log(res.data[0].userSplz);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getAllStates = () => {
    let self = this;
    const stateUrl = `${serverUrl}states.php`;
    axios(stateUrl)
      .then(function (res) {
        self.setState({
          isLoading: false,
          states: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  filterSplz = (id) => {
    let objLength = Object.keys(this.state.userSplzns).length;
    let name;
    for (let i = 0; i < objLength; i++) {
      if (parseInt(id) == parseInt(this.state.userSplzns[i].id)) {
        name = this.state.userSplzns[i].type;
      }
    }
    return name;
  };

  singleSplzClicked = (value) => {
    this.setState({
      splzId: value,
    });
    // alert(value);
  };

  currentDate = () => {
    var current = new Date();
    var dd = String(current.getDate()).padStart(2, "0");
    var mm = String(current.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = current.getFullYear();

    current = yyyy + "-" + mm + "-" + dd;
    this.setState({
      startDate: current,
    });
  };

  getData = () => {
    var self = this;
    setTimeout(() => {
      let cityId = this.state.photographerAllData[0].city;
      const cities = `${serverUrl}city.php?cityId=${cityId}`;

      axios(cities)
        .then(function (res) {
          self.setState({
            isLoading: false,
            userCity: res.data,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }, 3000);
  };

  SelectState = (value) => {
    // alert(value);
    var self = this;
    this.setState({ selectSingleState: value });
    let stateId = value;
    const distUrl = `${serverUrl}districts.php?stateId=${stateId}`;
    // alert(stateId);
    axios(distUrl)
      .then(function (res) {
        //   const userDatabase = JSON.stringify(res.data);
        //   alert(res.data[2].username);
        if (stateId) {
          // alert(stateId);
          self.setState({
            hasDist: false,
            dists: res.data,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  SelectDist = (value) => {
    if (value) {
      this.setState({ selectDist: value });
      // alert(value);
    }
  };

  UserSplz = (value) => {
    // alert("hello");
  };

  orderNow = () => {
    let date1 = new Date(this.state.startDate);
    let date2 = new Date(this.state.endDate);
    let Difference_In_Time = date2.getTime() - date1.getTime();

    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24) + 1;
    // alert(Difference_In_Days);

    let inserUrl = `${serverUrl}newOrder.php`;
    fetch(inserUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: this.state.userid, //0
        clientId: this.state.clientId, //1
        type: this.state.bookSplzId, //2
        name: this.state.bookName, //3
        contact: this.state.phoneNumber, //4
        stateId: this.state.selectSingleState, //5
        distId: this.state.selectDist, //6
        destination: this.state.destination, //7
        nearLocation: this.state.nearDestination, //8
        message: this.state.message, //9
        photoShootDate: this.state.startDate, //10
        photoShootEndDate: this.state.endDate, //11
        startTime: this.state.startTime, //12
        endTime: this.state.endTime, //13
        paymentType: this.state.paymentType, //14
      }),
    })
      .then((response) => response.text())
      .then((responseJson) => {
        alert(responseJson);
        const tid = new Date().getTime();
        let redirectUrl = `${serverUrl}payment.php?appId=${responseJson}`;
        Linking.openURL(redirectUrl);
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  };

  TotalDays = (startDate, endDate) => {
    let date1 = new Date(startDate);
    let date2 = new Date(endDate);
    let Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24) + 1;
    // console.log(this.state.totalTimeInDays);

    if (Difference_In_Days < 0) {
      this.setState({
        endDate: startDate,
        totalTimeInDays: 1,
      });
    } else if (Difference_In_Days > 0) {
      this.setState({
        totalTimeInDays: Difference_In_Days,
      });
    } else {
      Difference_In_Days = 1;
      this.setState({
        totalTimeInDays: Difference_In_Days,
      });
    }

    console.log(Difference_In_Days + "days left");
    return Math.round(Difference_In_Days);
  };
  proceed = () => {
    let splId;
    this.setState({
      showBanner: false,
    });
    let self = this;
    if (this.state.bookSplzId) {
      splId = this.state.bookSplzId;
    } else {
      splId = this.state.splzId;
    }
    const afterProceed = `${serverUrl}photographerType.php?userId=${this.state.userid}&splzId=${splId}`;
    axios(afterProceed)
      .then(function (res) {
        self.setState({
          afterProceedDetails: res.data[0],
          totalPrice: res.data[0].price,
          bookSplzId: self.state.splzId,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  backBtnSplz = () => {
    this.setState({ showBanner: true, bookSplzId: "" });
  };

  dateAdded = (value, type) => {
    if (type == "start") {
      if (!this.state.endDate) {
        this.TotalDays(value, this.state.startDate);
      } else {
        this.TotalDays(value, this.state.endDate);
      }

      this.setState({ startDate: value });
    } else if (type == "end") {
      this.TotalDays(this.state.startDate, value);
      this.setState({
        endDate: value,
      });
    }
  };

  TotalPayableAmount = () => {
    let amount = this.state.totalTimeInDays * this.state.totalPrice;
    if (amount < 0) {
      amount = amount * -1;
    }
    amount = this.MoneyConvert(amount);
    // console.log(this.state.totalTimeInDays);
    return <Text style={styles.amountDesign}>{amount}</Text>;
  };

  render() {
    const { usersData, isLoading, firstName } = this.state;

    return (
      <View style={styles.mainBody}>
        {/* <LogoImage /> */}
        {/* <HeaderMain /> */}
        {this.state.showBanner ? (
          <View style={styles.bannerBg}>
            <Image
              resizeMode="cover"
              style={styles.bannerBgImg}
              source={require("../../assets/img/userGallary/banner.jpg")}
            />
          </View>
        ) : null}

        <ScrollView style={{ height: "auto" }}>
          {!this.state.isLoading ? (
            <View style={styles.bookFormDesigns}>
              <TouchableOpacity
                onPress={() => this.photographerPublicProfile()}
              >
                <View style={[styles.topPhotographersSelected]}>
                  <View style={styles.imageBoxForm}>
                    <Image
                      style={[
                        styles.photographerImg,
                        styles.photographerAvatar,
                      ]}
                      source={{
                        uri: `${serverUrl}img/author/${this.state.photographerAllData.profile_pic}`,
                      }}
                    />
                    <Text style={styles.userProfileName}>
                      {this.state.photographerAllData.user}
                    </Text>
                  </View>
                  <View style={styles.photographerSocial}>
                    <TouchableOpacity style={styles.socialView}>
                      <Icon style={styles.socialBtn} name="facebook-f" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.socialView, { marginRight: 0 }]}
                    >
                      <Icon style={[styles.socialBtn]} name="twitter" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>

              {/*End of Top User Book Details  */}

              <View style={styles.currentUserPhotoes}>
                <ButtonTouchable
                  text={"photos"}
                  customDesign={[styles.usersGallary]}
                  customBtnDesign={[styles.usersGallaryText]}
                  onClick={() => this.userPhotos(this.state.userid)}
                  iconNameLeft={"images"}
                  iconStyle={styles.socialBtn}
                />
                <ButtonTouchable
                  text={"videos"}
                  customDesign={[styles.usersGallary]}
                  customBtnDesign={[styles.usersGallaryText]}
                  // onClick={this.proceed}
                  iconNameLeft={"film"}
                  iconStyle={styles.socialBtn}
                />
              </View>
              <View>
                {!this.state.bookSplzId ? (
                  <ScrollView
                    style={{ maxHeight: 300 }}
                    nestedScrollEnabled={true}
                  >
                    {this.state.specialization ? (
                      <View>
                        <FlatList
                          style={styles.splzFlat}
                          numColumns={2}
                          data={this.state.userSplzns}
                          keyExtractor={({ id }, index) => id}
                          renderItem={({ item }) => {
                            return (
                              <TouchableOpacity
                                key={item.id}
                                style={[
                                  styles.customSplzBtn,
                                  this.state.splzId == item.specialization
                                    ? [styles.selectItem]
                                    : styles.customSplzBtn,
                                ]}
                                onPress={() =>
                                  this.singleSplzClicked(item.specialization)
                                }
                              >
                                <Icon
                                  style={[
                                    styles.cameraIcon,
                                    this.state.splzId == item.specialization
                                      ? { color: "white" }
                                      : styles.cameraIcon,
                                  ]}
                                  name="camera-retro"
                                />
                                <Text
                                  style={[
                                    { textAlign: "center", fontSize: 17 },
                                    this.state.splzId == item.specialization
                                      ? { color: "white" }
                                      : { color: "black" },
                                  ]}
                                >
                                  {item.type}
                                </Text>
                                {item.rating != 0 ? (
                                  <View
                                    style={[
                                      styles.rating,
                                      this.state.splzId == item.specialization
                                        ? { backgroundColor: "white" }
                                        : { backgroundColor: "#F54336" },
                                    ]}
                                  >
                                    <Text>
                                      <Icon
                                        style={[
                                          { fontSize: 12 },
                                          this.state.splzId ==
                                          item.specialization
                                            ? { color: "#F54336" }
                                            : { color: "white" },
                                        ]}
                                        name="star"
                                      />
                                    </Text>
                                    <Text
                                      style={[
                                        styles.ratingText,
                                        this.state.splzId == item.specialization
                                          ? { color: "#F54336" }
                                          : { color: "white" },
                                      ]}
                                    >
                                      {item.rating}
                                    </Text>
                                  </View>
                                ) : null}

                                <View
                                  style={[
                                    styles.orderPriceBox,
                                    { marginTop: 10 },
                                  ]}
                                >
                                  <View style={styles.orderPriceBox}>
                                    <Text>
                                      <Icon
                                        style={[
                                          styles.socialIcon,
                                          this.state.splzId ==
                                          item.specialization
                                            ? { color: "white" }
                                            : { color: "#F54336" },
                                        ]}
                                        name="clock"
                                      />
                                    </Text>
                                    <Text
                                      style={[
                                        { marginLeft: 2 },
                                        this.state.splzId == item.specialization
                                          ? { color: "white" }
                                          : { color: "#F54336" },
                                      ]}
                                    >
                                      {item.timeing} hours
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.orderPriceBox,
                                      { marginLeft: "auto" },
                                    ]}
                                  >
                                    <Text>
                                      <Icon
                                        style={[
                                          styles.socialIcon,
                                          this.state.splzId ==
                                          item.specialization
                                            ? { color: "white" }
                                            : { color: "#F54336" },
                                        ]}
                                        name="rupee-sign"
                                      />
                                    </Text>
                                    <Text
                                      style={[
                                        { marginLeft: 2 },
                                        this.state.splzId == item.specialization
                                          ? { color: "white" }
                                          : { color: "#F54336" },
                                      ]}
                                    >
                                      {item.price}
                                    </Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                            );
                          }}
                        ></FlatList>
                      </View>
                    ) : null}
                  </ScrollView>
                ) : null}
              </View>

              {this.state.bookSplzId ? (
                <View style={styles.bookFormBox}>
                  <View style={styles.backSectionBox}>
                    <Text style={styles.backBtnTouch}>
                      {this.filterSplz(this.state.bookSplzId)}
                    </Text>

                    <View style={styles.backRightBox}>
                      <TouchableOpacity
                        style={styles.backBtnTouch}
                        onPress={this.backBtnSplz}
                      >
                        <Text style={{ marginTop: 1 }}>
                          <Icon
                            style={styles.socialIconBack}
                            name="angle-left"
                          />
                        </Text>
                        <Text style={styles.backSplzBtn}>Back</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <InputBox
                    name="bookName"
                    placeholder={"Enter Your First Name"}
                    customDesign={[styles.custominputBox, styles.destination]}
                    // value={bookName}
                    handleChange={this.handleChange}
                  />
                  <InputBox
                    name="destination"
                    placeholder={"Enter Your place of photoshoot"}
                    customDesign={[styles.custominputBox, styles.destination]}
                    // value={destination}
                    handleChange={this.handleChange}
                  />
                  <InputBox
                    name="nearDestination"
                    placeholder={"Nearest Photoshoot Destination"}
                    customDesign={[styles.custominputBox, styles.destination]}
                    // value={nearDestination}
                    handleChange={this.handleChange}
                  />
                  <InputBox
                    name="phoneNumber"
                    placeholder={"Enter Your Phone Number"}
                    customDesign={[styles.custominputBox, styles.destination]}
                    keyType={"numeric"}
                    // value={phoneNumber}
                    handleChange={this.handleChange}
                  />
                  <InputBox
                    name="message"
                    placeholder={"Type your Message"}
                    customDesign={[styles.custominputBox, styles.messageBox]}
                    // value={message}
                    handleChange={this.handleChange}
                  />
                  <Picker
                    selectedValue={this.state.selectSingleState}
                    onValueChange={this.SelectState.bind()}
                  >
                    <Picker.Item label={"Select a State"} value={0} key={0} />
                    {this.state.states.map((item, key) => (
                      <Picker.Item
                        label={item.states_name}
                        value={item.id}
                        key={key}
                      />
                    ))}
                  </Picker>

                  {!this.state.hasDist ? (
                    <View>
                      <Picker
                        selectedValue={this.state.selectDist}
                        onValueChange={this.SelectDist.bind()}
                        // onValueChange={(itemValue, itemIndex) => this.setState({selectSingleState: itemValue})}
                      >
                        <Picker.Item
                          label={"Select a District"}
                          value={0}
                          key={0}
                        />
                        {this.state.dists.map((item, key) => (
                          <Picker.Item
                            label={item.district_name}
                            value={item.id}
                            key={key}
                          />
                        ))}
                      </Picker>
                    </View>
                  ) : null}

                  <View style={styles.selectDateBox}>
                    <View style={styles.dateDesign}>
                      <DatePicker
                        date={this.state.startDate}
                        minDate={new Date()}
                        onDateChange={(date) => {
                          this.dateAdded(date, "start");
                        }}
                      />
                    </View>
                    <View style={styles.dateDesign}>
                      <DatePicker
                        minDate={this.state.startDate}
                        date={this.state.endDate}
                        // mode="datetime"
                        onDateChange={(date) => {
                          this.dateAdded(date, "end");
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ height: 50 }}></View>
                </View>
              ) : null}
            </View>
          ) : null}
          <View style={{ height: 50 }}></View>
        </ScrollView>

        {!this.state.bookSplzId ? (
          <View style={styles.bottomProceed}>
            <ButtonTouchable
              text={"proceed "}
              customDesign={[styles.proceedBtn]}
              customBtnDesign={[styles.bookNowBtnText]}
              onClick={this.proceed}
              iconNameRight={"long-arrow-alt-right"}
              iconStyle={styles.proceesIconStyle}
            />
          </View>
        ) : null}

        {this.state.bookSplzId ? (
          <View style={[styles.bottomProceed, styles.submitOrder]}>
            <View style={styles.bottomAmount}>
              <Text style={styles.amountDesign}>
                <Icon
                  style={{ color: "white", fontSize: 17 }}
                  name="rupee-sign"
                />
                {this.TotalPayableAmount()}
              </Text>
            </View>
            <ButtonTouchable
              text={"submit order"}
              customDesign={[styles.proceedBtn, styles.orderNowBox]}
              customBtnDesign={[styles.bookNowBtnText]}
              onClick={this.orderNow}
            />
          </View>
        ) : null}

        {/* <FooterMenu /> */}
      </View>
    );
  }
}
