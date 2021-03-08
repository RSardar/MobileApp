import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Picker,
  BackHandler,
  Modal,
} from "react-native";
// import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderMain from "../../components/HeaderMain";
import InputBox from "../../components/InputBox";
import ErrorText from "../../components/ErrorText";
import ButtonTouchable from "../../components/ButtonTouchable";
import SocialLogin from "../../components/SocialLogin";
import LogoImage from "../../components/LogoImage";
import FooterMenu from "../../components/FooterMenu";
import DatePicker from "react-native-datepicker";
import axios from "axios";
import MapLocation from "../../components/MapLocation";
import ActivityLoading from "../../components/ActivityLoading";
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RadioButton } from "react-native-paper";
// import Picker from "@react-native-picker/picker";
// import GoogleLocationSearch from "../../components/GoogleLocationSearch";

import styles from "./styles";

navigator.geolocation.getCurrentPosition(
  (position) => {
    const location = JSON.stringify(position);

    this.setState({ location });
  },
  (error) => Alert.alert(error.message),
  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
);
const serverIp = `192.168.0.115`;
const fileFolder = `jsonClasses`;
const serverUrl = `http://${serverIp}/${fileFolder}/`;
export default class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // splzId: this.props.route.params.splzId,
      splzId: "",
      showFilter: false,
      photographerType: "",
      destination: "",
      eventDate: "",
      startDate: new Date(),
      endDate: "",
      ready: false,
      where: { lat: null, lng: null },
      error: null,
      currentLocation: "",
      longAddress: "",
      mapLoaded: false,
      photographerAllData: "",
      isLoading: true,
      searchLoad: true,
      userSearch: "",
      usersCities: "",
      allSplz: [],
      selectedSplz: "",
      clickedFilter: false,
      singleCity: "",
      cityLoaded: true,
      noPhotographer: false,
      searchLocationLoad: true,
      searchLocationResult: "",
      userSpecLocationLoad: true,
      userSpecLocation: "",
      ditanceUserToPhotographer: "",
      userCurrentPostionName: "",
      ultimateLoad: true,
      initial: 1,
      api: "AIzaSyCY2PpfkHShZyLPe698-WefukZa6kKR7o0",
      distanceLoad: true,
      filteredByDistance: false,
      customDistance: 50,
      changeStyle: "grey",
      filterLoad: true,
      ifNearByActive: false,
      priceFilter: true,
      searchInputBox: "",
      sortPhotographer: false,
      checked: "first",
    };
  }

  componentDidMount() {
    this.UserLatLan();
    this.storedData();
  }

  disableGoBack = () => {
    BackHandler.exitApp();
    return true;
  };

  storedData = async () => {
    try {
      const value = await AsyncStorage.getItem("splzId");
      if (value !== null) {
        // value previously stored
        let getValue = JSON.parse(value);
        console.log(getValue + " from Booking Page");
        this.setState({
          splzId: getValue,
        });
        this.allSortedPhotographer(getValue);

        // alert(getValue);
      }
    } catch (e) {
      // error reading value
      alert(e);
      console.log(e);
    }
    return getValue;
  };

  customStyle = (type) => {
    if (type == "price") {
      return {
        backgroundColor: "white",
        color: "#F54336",
      };
    }
  };

  changeStyle = (self) => {
    this.setState({
      priceFilter: false,
      splzFilter: false,
      dateFilter: false,
    });
    if (self == "price") {
      this.setState({
        priceFilter: true,
      });
      this.customStyle();
    } else if (self == "splz") {
      this.setState({
        splzFilter: true,
      });
      this.customStyle();
    } else if (self == "date") {
      this.setState({
        dateFilter: true,
      });
      this.customStyle();
    }

    // console.log(self + "hello");
    // this.setState({
    //   changeStyle: "white",
    // });
  };

  UserLatLan = () => {
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24,
    };
    this.setState({ ready: false, error: null });
    navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions
    );
  };
  geoSuccess = (position) => {
    this.setState({
      ready: true,
      where: { lat: position.coords.latitude, lng: position.coords.longitude },
    });
    let exactPosition = [position.coords.latitude, position.coords.longitude];

    // console.log(exactPosition);
  };
  geoFailure = (err) => {
    this.setState({ error: err.message });
  };
  UserCurrentPostion = (lat, lon) => {
    let self = this;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${this.state.api}`;

    axios(url)
      .then(function (response) {
        self.setState({
          userCurrentPostionName: response.data.results[0].address_components,
        });
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  };

  findAsPerThisLocation = (value) => {
    this.setState({
      searchLocationLoad: true,
      searchInputBox: value,
    });

    this.SearchSortedPhotographer(this.state.searchInputBox);
  };

  // PlaceDetails = (address) => {
  //   let self = this;
  //   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.state.api}`;

  //   axios(url)
  //     .then(function (response) {
  //       return (
  //         <Text>{response.data.results[0].geometry.location.lat}</Text>
  //       )

  //     })
  //     .catch(function (error) {
  //       alert(error);
  //       console.log(error);
  //     });
  // }

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

  ClickToFindPhotographer = () => {
    this.setState({
      filteredByDistance: true,
      ifNearByActive: true,
    });
  };

  clearFilter = () => {
    this.setState({
      filteredByDistance: false,
    });
  };
  clearNearPhotographer = () => {
    this.setState({
      ifNearByActive: false,
      filteredByDistance: false,
    });
  };

  UserToPhotographerDistance = (userCurrentCity, photographerCity) => {
    console.log(
      `User city ${userCurrentCity}`,
      `photogrpaher city ${photographerCity}`
    );
    // if (this.state.initial < 2) {
    //   let self = this;
    //  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userCurrentCity}&destinations=${photographerCity}&key=${this.state.api}&components=country:IN`;

    //   axios(url)
    //     .then(function (response) {
    //       console.log("hello");
    //       // alert("hello");
    //       self.setState({
    //         ultimateLoad: false,
    //         ditanceUserToPhotographer: response.data,
    //         distanceLoad: false,
    //       });
    //       // alert(response.data.rows[0].elements[0].distance.text);
    //       // console.log(self.state.initial);
    //       return (
    //         <View>
    //           <Text>hello</Text>
    //         </View>
    //       );
    //     })
    //     .catch(function (error) {
    //       alert(error + "from here");
    //       console.log(error);
    //     });
    // }
    this.setState({
      initial: this.state.initial + 1,
    });
    //    console.log("Maximum Call");
  };

  UserExactLocation = (value) => {
    let self = this;

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${value}&radius=2000&key=${this.state.api}&components=country:IN`;
    axios(url)
      .then(function (response) {
        self.setState({
          userSpecLocationLoad: true,
          userSpecLocation: response.data,
        });
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  };

  AutoCompleteLocation = (value) => {
    let self = this;
    this.setState({
      searchInputBox: value,
    });
    setTimeout(function () {
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&types=geocode&language=fr&key=${self.state.api}&components=country:IN`;
      console.log(url);
      if (value.length >= 3) {
        axios(url)
          .then(function (response) {
            self.setState({
              searchLocationLoad: false,
              searchLocationResult: response.data.predictions,
            });
          })
          .catch(function (error) {
            alert(error);
            console.log(error);
          });
      } else {
        self.setState({
          searchLocationLoad: true,
          searchLocationResult: "",
        });
      }
    }, 1000);
  };

  MoneyConvert = (value) => {
    var x = value;
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != "") lastThree = "," + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

    return (
      <View>
        <Text>{res}</Text>
      </View>
    );
    // return res;
  };

  largeDistance = (length) => {
    if (length <= 1) {
      return <Text>{length} km</Text>;
    } else {
      return <Text>{length} kms</Text>;
    }
  };

  SelectedSplzSection = (value) => {
    if (value) {
      // alert(value);
      var self = this;
      self.setState({ searchLoad: false });
      let url = `${serverUrl}showPhotographers.php?splzId=${value}`;
      // alert(url);
      axios(url)
        .then(function (response) {
          if (response.data != "no") {
            self.setState({
              photographerAllData: response.data,
            });
          } else {
            self.setState({
              // searchLoad: false,
              // noPhotographer: true,
            });
          }
          // console.log(response.data);
        })
        .catch(function (error) {
          alert(error);
          console.log(error);
        });
      this.setState({ selectedSplz: value });
      // alert(value);
    }
  };

  allPhotographerSplz = () => {
    const splzUrl = `${serverUrl}specialization.php`;
    let self = this;
    axios(splzUrl)
      .then(function (res) {
        // console.log(res);
        // console.log("hello");
        self.setState({
          // clickedFilter: false,
          allSplz: res.data,
        });
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  };

  allSortedPhotographer = (splz) => {
    var self = this;
    const url = `${serverUrl}showPhotographers.php?splzId=${splz}`;
    console.log(url);
    axios(url)
      .then(function (res) {
        self.setState({
          noPhotographer: false,
          searchLoad: false,
          photographerAllData: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  alertMe = () => {
    return (
      <View>
        <Text>Alert</Text>
      </View>
    );
  };
  SearchSortedPhotographer = (value) => {
    var self = this;
    self.setState({ searchLoad: true });
    let url = `${serverUrl}showPhotographers.php?search=${value}&splz=${this.state.splzId}`;
    // console.log(url);
    axios(url)
      .then(function (response) {
        console.log(response.data);
        self.setState({
          searchLoad: false,
          photographerAllData: response.data,
        });
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  };

  bookNowForm = () => {
    this.props.navigation.navigate("Profile");
  };

  sortPhotographer = (event) => {
    if (this.state.sortPhotographer) {
      this.setState({
        sortPhotographer: false,
      });
    } else {
      this.setState({
        sortPhotographer: true,
      });
    }

    console.log(event);
  };

  filterIcons = () => {
    if (this.state.filterLoad == true) {
      this.setState({
        filterLoad: false,
      });
    } else {
      this.setState({
        filterLoad: true,
      });
    }

    if (this.state.showFilter == true) {
      this.setState({ ["showFilter"]: false });
    } else {
      this.setState({ ["showFilter"]: true });
    }
  };
  handleChange = (e, name) => {
    this.setState({ [name]: e });
  };
  filterPhotographer = () => {
    this.allPhotographerSplz();
    let date1 = new Date(this.state.startDate);
    let date2 = new Date(this.state.endDate);
    let Difference_In_Time = date2.getTime() - date1.getTime();

    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24) + 1;
    let typeOfPhotographer = this.state.photographerType;
    let location = this.state.destination;
    if (this.state.showFilter == true) {
      this.setState({ ["showFilter"]: false });
    } else {
      this.setState({ ["showFilter"]: true });
    }
  };
  currentDateChange = () => {
    alert(this.state.endDate);
  };
  singlePhographerData = (id) => {
    this.props.navigation.navigate("BookingForm", {
      id: id,
      splzId: this.state.splzId,
    });
    console.log(this.state.splzId);
  };

  SearchPhotographer = (value) => {
    // alert(value);
    if (value.length >= 3) {
      this.SearchSortedPhotographer(value);
    } else {
      // this.allSortedPhotographer();
    }
  };

  render() {
    const {
      userSearch,
      photographerType,
      destination,
      eventDate,
      locationSearch,
      navigation,
    } = this.props;
    // const { navigate } = this.props.navigation;
    // console.log(this.props.navigate);
    // console.log(splzId);
    const { checked } = this.state;
    return (
      <View style={styles.mainBody}>
        <View style={styles.topSearchBar}>
          {/* <InputBox
            name="search"
            placeholder={"Search Photographer"}
            customDesign={[
              styles.custominputBoxTop,
              styles.photogrpaherTypeTop,
            ]}
            value={userSearch}
            handleChange={(userSearch) => this.SearchPhotographer(userSearch)}
          /> */}
          <InputBox
            name="search"
            placeholder={"Search Location"}
            customDesign={[
              styles.custominputBoxTop,
              styles.photogrpaherTypeTop,
            ]}
            value={locationSearch}
            handleChange={(locationSearch) =>
              this.AutoCompleteLocation(locationSearch)
            }
          />
          {!this.state.searchLocationLoad ? (
            <View style={styles.topSearchBarResult}>
              <FlatList
                style={{ zIndex: 1 }}
                data={this.state.searchLocationResult}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={styles.eachLocation}
                      onPress={() =>
                        this.findAsPerThisLocation(item.terms[0].value)
                      }
                    >
                      <Text style={styles.singleLocationName}>
                        {item.terms[0].value}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              ></FlatList>
            </View>
          ) : null}
        </View>
        <View style={styles.topFilter}>
          <TouchableOpacity
            onPress={this.sortPhotographer}
            style={styles.filterBoxDesign}
          >
            <Icon
              style={{ fontSize: 15, marginRight: 5 }}
              name="sort-amount-down-alt"
            />
            <Text style={styles.sortText}>sort</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.filterIcons}
            style={styles.filterBoxDesign}
          >
            <Icon style={{ fontSize: 15, marginRight: 5 }} name="sliders-h" />
            <Text style={styles.sortText}>Filter</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.topFilderSection}>
          {this.state.showFilter ? (
            <View style={styles.filterBox}>
              <View style={styles.leftMenu}>
                <TouchableOpacity
                  style={[styles.leftMenuProp, this.customStyle("price")]}
                  onPress={() => this.changeStyle("price")}
                >
                  <Text>price bar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.leftMenuProp, this.customStyle("splz")]}
                  onPress={() => this.changeStyle("splz")}
                >
                  <Text>Specialization</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={[
                    styles.leftMenuProp,
                    { backgroundColor: this.state.changeStyle },
                  ]}
                  onPress={() => this.changeStyle(1)}
                >
                  <Text>price bar</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={[styles.leftMenuProp, this.customStyle("date")]}
                  onPress={() => this.changeStyle("date")}
                >
                  <Text>price bar</Text>
                </TouchableOpacity>
              </View>
              <View>
                <View style={styles.rightMenuProp}>
                  {this.state.priceFilter ? (
                    <View>
                      <Text>Price 1</Text>
                      <Text>Price 1</Text>
                      <Text>Price 1</Text>
                      <Text>Price 1</Text>
                    </View>
                  ) : null}

                  {this.state.splzFilter ? (
                    <Picker
                      selectedValue={this.state.selectedSplz}
                      onValueChange={this.SelectedSplzSection.bind()}
                    >
                      <Picker.Item
                        label={"Select Specialization"}
                        value={0}
                        key={0}
                      />
                      {this.state.allSplz.map((item, key) => (
                        <Picker.Item
                          label={item.type}
                          value={item.id}
                          key={key}
                        />
                      ))}
                    </Picker>
                  ) : null}
                </View>

                {this.state.dateFilter ? (
                  <View style={styles.selectDateBox}>
                    <View style={styles.dateDesign}>
                      <DatePicker
                        date={this.state.startDate}
                        onDateChange={(date) => {
                          this.setState({ startDate: date });
                        }}
                      />
                    </View>
                    <View style={styles.dateDesign}>
                      <DatePicker
                        minDate={this.state.startDate}
                        date={this.state.endDate}
                        onDateChange={(date) => {
                          this.setState({ endDate: date });
                        }}
                      />
                    </View>
                  </View>
                ) : null}

                <Text>Starting Date</Text>
              </View>

              <View style={styles.footerFilterAction}>
                <ButtonTouchable
                  text={"Clear All Filter"}
                  customDesign={styles.hiddenClearBox}
                  customBtnDesign={[styles.showFilterText]}
                  onClick={() => this.clearFilter()}
                />
                <ButtonTouchable
                  text={"filters"}
                  customDesign={styles.hiddenFilterBox}
                  customBtnDesign={[styles.showFilterText]}
                  onClick={this.filterPhotographer}
                />
              </View>
            </View>
          ) : null}
        </View>

        <MapLocation />

        <View style={styles.filderHiddenBox}>
          <View>{/* <Text>{this.props.route.params.title}</Text> */}</View>
        </View>

        {this.state.filterLoad ? (
          <View>
            {this.state.searchLoad ? (
              <View>
                <ActivityLoading />
              </View>
            ) : null}

            {this.state.noPhotographer ? (
              <View style={styles.noPhotographerAvail}>
                <Text style={styles.noPhotographerText}>
                  No Photographer Available
                </Text>
              </View>
            ) : null}
            <View>
              {!this.state.noPhotographer ? (
                <View style={{ marginBottom: 90 }}>
                  {!this.state.searchLoad ? (
                    <View>
                      {this.state.ifNearByActive ? (
                        <TouchableOpacity
                          style={[
                            styles.topFindNearBox,
                            { backgroundColor: "white" },
                          ]}
                          onPress={() => this.clearNearPhotographer()}
                        >
                          <Icon
                            style={[
                              styles.nearPhotoGrapherIcon,
                              { color: "#F54336" },
                            ]}
                            name="times"
                          />
                          <Text
                            style={[
                              styles.showFilterText,
                              { color: "#F54336" },
                            ]}
                          >
                            Clear All Field
                          </Text>
                        </TouchableOpacity>
                      ) : null}

                      {!this.state.ifNearByActive ? (
                        <TouchableOpacity
                          style={styles.topFindNearBox}
                          onPress={() => this.ClickToFindPhotographer()}
                        >
                          <Icon
                            style={styles.nearPhotoGrapherIcon}
                            name="dot-circle"
                          />
                          <Text style={styles.showFilterText}>
                            Find Nearest Photographer
                          </Text>
                        </TouchableOpacity>
                      ) : null}

                      <ScrollView
                        style={{ height: "100%" }}
                        // contentContainerStyle={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                      >
                        <View>
                          {/* {console.log("primary" + this.state.initial)} */}
                          {this.state.initial <=
                          Object.keys(this.state.photographerAllData).length ? (
                            <View>
                              <View>
                                <FlatList
                                  data={this.state.photographerAllData}
                                  // keyExtractor={({ id }, index) => id}
                                  renderItem={({ item }) => {
                                    // {
                                    // console.log(this.state.where.lat + "hello");
                                    // }
                                    const awayFrom = this.DistanceMapUsingJs(
                                      this.state.where.lat,
                                      this.state.where.lng,
                                      item.latitude,
                                      item.longitude
                                    );
                                    let filteredDistance;

                                    if (!this.state.filteredByDistance) {
                                      filteredDistance = 500;
                                    } else {
                                      filteredDistance = 50;
                                    }

                                    if (awayFrom < filteredDistance) {
                                      return (
                                        <TouchableOpacity
                                          onPress={() =>
                                            this.singlePhographerData(
                                              item.user_id
                                            )
                                          }
                                        >
                                          <View style={styles.topPhotographers}>
                                            <View
                                              style={
                                                styles.singlePhotographerBox
                                              }
                                            >
                                              <View
                                                style={
                                                  styles.photographerImgBox
                                                }
                                              >
                                                <View style={styles.imageBox}>
                                                  {item.profile_pic ? (
                                                    <Image
                                                      style={
                                                        styles.photographerImg
                                                      }
                                                      source={{
                                                        uri: `http://shuttertaps.com/img/author/convert/${item.profile_pic}`,
                                                      }}
                                                    />
                                                  ) : null}
                                                  {!item.profile_pic ? (
                                                    <Image
                                                      style={
                                                        styles.photographerImg
                                                      }
                                                      source={{
                                                        uri: `http://shuttertaps.com/img/author/blank-author.jpg`,
                                                      }}
                                                    />
                                                  ) : null}
                                                </View>
                                                <View
                                                  style={styles.userDetailsBox}
                                                >
                                                  <Text
                                                    style={
                                                      styles.photographerName
                                                    }
                                                  >
                                                    {item.user}
                                                  </Text>
                                                  <View
                                                    style={
                                                      styles.userDetailsSec
                                                    }
                                                  >
                                                    <View
                                                      style={[
                                                        styles.detailsBox,
                                                      ]}
                                                    >
                                                      <Icon
                                                        style={
                                                          styles.nearPhotoGrapherIcon
                                                        }
                                                        name="map-marker"
                                                      />
                                                      <Text>
                                                        {item.city_name}
                                                      </Text>
                                                    </View>

                                                    <View
                                                      style={styles.detailsBox}
                                                    >
                                                      <Icon
                                                        style={
                                                          styles.nearPhotoGrapherIcon
                                                        }
                                                        name="clock"
                                                      />
                                                      <Text
                                                        style={
                                                          styles.ratingNumber
                                                        }
                                                      >
                                                        {item.timeing} hours
                                                      </Text>
                                                    </View>

                                                    <View
                                                      style={styles.detailsBox}
                                                    >
                                                      <Icon
                                                        style={
                                                          styles.nearPhotoGrapherIcon
                                                        }
                                                        name="star"
                                                      />
                                                      <Text
                                                        style={
                                                          styles.ratingNumber
                                                        }
                                                      >
                                                        {item.rating}
                                                      </Text>
                                                    </View>

                                                    <View
                                                      style={styles.detailsBox}
                                                    >
                                                      <Icon
                                                        style={
                                                          styles.nearPhotoGrapherIcon
                                                        }
                                                        name="rupee-sign"
                                                      />
                                                      <Text
                                                        style={
                                                          styles.ratingNumber
                                                        }
                                                      >
                                                        {this.MoneyConvert(
                                                          item.price
                                                        )}
                                                      </Text>
                                                    </View>
                                                  </View>
                                                </View>
                                              </View>
                                            </View>
                                            <View
                                              style={
                                                styles.photographerBookSection
                                              }
                                            >
                                              <View
                                                style={styles.startingPrice}
                                              >
                                                <Image
                                                  style={styles.ratigIconImg}
                                                  source={require("../../assets/img/icons/money-bag.png")}
                                                />
                                                <Text
                                                  style={
                                                    styles.startingPriceNumber
                                                  }
                                                >
                                                  {item.startingPrice}
                                                </Text>

                                                {/* <Text> </Text> */}
                                                <View>
                                                  {/* {
                                                      awayFrom = 1 ?
                                                        <Text>{awayFrom} </Text>:null
                                                    } */}
                                                  {this.largeDistance(awayFrom)}
                                                </View>
                                              </View>
                                              <ButtonTouchable
                                                text={"book now"}
                                                customDesign={styles.btnBox}
                                                customBtnDesign={[
                                                  styles.customBtn,
                                                ]}
                                                onClick={this.bookNowForm}
                                              />
                                            </View>
                                          </View>
                                        </TouchableOpacity>
                                      );
                                    }
                                  }}
                                ></FlatList>
                              </View>
                            </View>
                          ) : null}
                        </View>
                        <View
                          style={{
                            height: 60,
                          }}
                        ></View>
                      </ScrollView>
                    </View>
                  ) : null}
                </View>
              ) : null}
            </View>
          </View>
        ) : null}

        {this.state.sortPhotographer ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.sortPhotographerBox}>
              <View style={styles.sortPopUpBox}>
                <View style={styles.sortPhotographer}>
                  <View style={styles.sortHead}>
                    <Text style={styles.sortText}>sort by</Text>
                  </View>
                  <View style={styles.commonSortSec}>
                    <Text>Nearest</Text>
                    <View style={styles.radioBtn}>
                      <RadioButton
                        value="first"
                        status={checked === "first" ? "checked" : "unchecked"}
                        onPress={() => {
                          this.setState({ checked: "first" });
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.commonSortSec}>
                    <Text>Popular</Text>
                    <View style={styles.radioBtn}>
                      <RadioButton
                        value="second"
                        status={checked === "second" ? "checked" : "unchecked"}
                        onPress={() => {
                          this.setState({ checked: "second" });
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.commonSortSec}>
                    <Text>Price -- Low to High</Text>
                    <View style={styles.radioBtn}>
                      <RadioButton
                        value="third"
                        status={checked === "third" ? "checked" : "unchecked"}
                        onPress={() => {
                          this.setState({ checked: "third" });
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.commonSortSec}>
                    <Text>Price -- High to Low</Text>
                    <View style={styles.radioBtn}>
                      <RadioButton
                        value="fourth"
                        status={checked === "fourth" ? "checked" : "unchecked"}
                        onPress={() => {
                          this.setState({ checked: "fourth" });
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        ) : null}
      </View>
    );
  }
}
