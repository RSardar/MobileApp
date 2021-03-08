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
import MapLocation from "../../components/MapLocation";
import ActivityLoading from "../../components/ActivityLoading";
// import GoogleLocationSearch from "../../components/GoogleLocationSearch";
// import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "./styles";

navigator.geolocation.getCurrentPosition(
  (position) => {
    const location = JSON.stringify(position);

    this.setState({ location });
  },
  (error) => Alert.alert(error.message),
  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
);

export default class IndexTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      splzId: this.props.route.params.splzId,
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
      allSplz: "",
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
    };
  }
  componentDidMount() {
    this.allSortedPhotographer();
    // this.setState({
    //   initial: this.state.initial + 1
    // });
    // console.log(this.state.initial);
    // this.allPhotographerSplz();
    // this.UserLatLan();
  }

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
    // alert()
  };
  geoFailure = (err) => {
    this.setState({ error: err.message });
  };
  UserCurrentPostion = (lat, lon) => {
    let self = this;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${this.state.api}`;

    axios(url)
      .then(function (response) {
        // console.log(response.data);
        // console.log(lat);
        // console.log(lon);
        // console.log(response.data.results[0].address_components);
        self.setState({
          userCurrentPostionName: response.data.results[0].address_components,
        });
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  };

  ClickToFindPhotographer = () => {
    // this.UserCurrentPostion(this.state.where.lat, this.state.where.lng);
    // console.log(this.state.where.lat);
    // this.UserToPhotographerDistance("Taki Road Barasat", "barasat");

    console.log(this.state.initial);
  };

  UserToPhotographerDistance = (userCurrentCity, photographerCity) => {
    //this.UserCurrentPostion(this.state.where.lat, this.state.where.lng);
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
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&types=geocode&language=fr&key=${this.state.api}&components=country:IN`;
    if (value.length >= 3) {
      axios(url)
        .then(function (response) {
          // console.log(Object.keys(response.data.predictions).length);

          //   let numberOList = Object.keys(response.data.predictions).length;
          // console.log(response.data.predictions[0]place_id);
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
        searchLocationResult: "",
      });
    }
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

  SelectedSplzSection = (value) => {
    if (value) {
      // alert(value);
      var self = this;
      self.setState({ searchLoad: false });
      let url = `http://192.168.0.116/jsonClasses/showPhotographers.php?splzId=${value}`;
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
          console.log(response.data);
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
    // alert("hello");
    // alert(value);
    const splzUrl = "http://shuttertaps.com/jsonClasses/specialization.php";
    let self = this;
    axios(splzUrl)
      .then(function (res) {
        // console.log(res.data);
        self.setState({
          clickedFilter: false,
          allSplz: res.data,
        });
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  };

  allSortedPhotographer = () => {
    // alert(this.state.splzId);
    var self = this;
    const url = `http://192.168.0.116/jsonClasses/showPhotographers.php?splzId=${this.props.route.params.splzId}}`;
    // const url = 'https://jsonplaceholder.typicode.com/posts';
    let cityId = "";
    axios(url)
      .then(function (res) {
        // let arrayLength = Object.keys(res.data).length;
        // console.log(self.state.initial);
        self.setState({
          noPhotographer: false,
          searchLoad: false,
          initial: self.state.initial + 1,
          photographerAllData: res.data,
        });
      })
      .catch(function (error) {
        // alert(error);
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
    let url = `http://192.168.0.116/jsonClasses/showPhotographers.php?search=${value}`;
    // alert(url);
    axios(url)
      .then(function (response) {
        //   const userDatabase = JSON.stringify(res.data);
        // alert(response.data);
        console.log(response.data);
        self.setState({
          // photographerAllData: response.data,
        });
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  };

  bookNowForm = () => {
    // this.props.navigation.navigate('CheckOTP', {'mobileNumber':userMobile}) ;
    this.props.navigation.navigate("Profile");
  };

  filterIcons = () => {
    // this.allPhotographerSplz();
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
    // this.allPhotographerSplz();
    let date1 = new Date(this.state.startDate);
    let date2 = new Date(this.state.endDate);
    let Difference_In_Time = date2.getTime() - date1.getTime();

    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24) + 1;
    // alert(Difference_In_Days);
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
    // alert(id);
    // this.storeData(id);
    this.props.navigation.navigate("BookingForm", { id: id });
  };

  SearchPhotographer = (value) => {
    // let value = this.state.userSearch;
    // alert(value);
    if (value.length >= 3) {
      this.SearchSortedPhotographer(value);
    } else {
      // this.allSortedPhotographer();
    }
  };

  nearByPhotographer = () => {
    alert("hello");
  };

  render() {
    const {
      userSearch,
      photographerType,
      destination,
      eventDate,
      locationSearch,
    } = this.props;
    // const [date, setDate] = useState(new Date());
    return (
      <View>
        {/* {this.state.isLoading ? (
          <View>
            <ActivityIndicator />
          </View>
        ) : null} */}

        <View style={styles.mainBody}>
          {/* {this.state.isLoading ? <ActivityLoading /> : null} */}
          <View>
            <View style={styles.topSearchBar}>
              <InputBox
                name="search"
                placeholder={"Search Photographer"}
                customDesign={[
                  styles.custominputBoxTop,
                  styles.photogrpaherTypeTop,
                ]}
                value={userSearch}
                handleChange={(userSearch) =>
                  this.SearchPhotographer(userSearch)
                }
              />
            </View>
            <View style={styles.topFilter}>
              <TouchableOpacity style={styles.filterBoxDesign}>
                <Image
                  style={[styles.topFilterSec, styles.sort]}
                  source={require("../../assets/img/icons/sort.png")}
                />
                <Text style={styles.sortText}>sort</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.filterIcons}
                style={styles.filterBoxDesign}
              >
                <Image
                  style={[styles.topFilterSec, styles.filter]}
                  source={require("../../assets/img/icons/filter.png")}
                />
                <Text style={styles.sortText}>Filter</Text>
              </TouchableOpacity>
            </View>
            <View>
              {this.state.showFilter ? (
                <View style={styles.filterBox}>
                  {/* {!this.state.cityLoaded ? ( */}
                  <View>
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
                  </View>
                  {/* ) : null} */}

                  <InputBox
                    name="destination"
                    placeholder={"Enter Your Destination"}
                    customDesign={[styles.custominputBox, styles.destination]}
                    // value={userName}
                    handleChange={this.handleChange}
                  />
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

                  <Text>Starting Date</Text>
                  <ButtonTouchable
                    text={"filter"}
                    customDesign={styles.showFilterResultBox}
                    customBtnDesign={[styles.showFilterText]}
                    onClick={this.filterPhotographer}
                  />
                  <TouchableOpacity
                    style={styles.nearByPhotographer}
                    onPress={() => this.nearByPhotographer()}
                  >
                    <Text>Get the Address</Text>
                  </TouchableOpacity>

                  <Text>{this.state.longAddress}</Text>
                </View>
              ) : null}
            </View>

            <MapLocation />
            <View style={{ marginVertical: 50 }}>
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
                <View>
                  <TouchableOpacity>
                    <FlatList
                      data={this.state.searchLocationResult}
                      renderItem={({ item }) => {
                        console.log(item);
                        return (
                          <View>
                            {/* <Text>Hello</Text> */}
                            <Text>{item.terms[0].value}</Text>
                          </View>
                        );
                      }}
                    ></FlatList>
                  </TouchableOpacity>
                </View>
              ) : null}

              <ButtonTouchable
                text={"Find Nearby Photogrpaher"}
                customDesign={styles.showFilterResultBox}
                customBtnDesign={[styles.showFilterText]}
                onClick={() => this.ClickToFindPhotographer()}
              />
            </View>

            <View style={styles.filderHiddenBox}>
              <View>{/* <Text>{this.props.route.params.title}</Text> */}</View>
            </View>

            {this.state.searchLoad ? <ActivityLoading /> : null}

            {this.state.noPhotographer ? (
              <View style={styles.noPhotographerAvail}>
                <Text style={styles.noPhotographerText}>
                  No Photographer Available
                </Text>
              </View>
            ) : null}

            {!this.state.noPhotographer ? (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                  <View style={{ marginHorizontal: 20 }}>
                    {console.log("primary" + this.state.initial)}
                    {this.state.initial <=
                    Object.keys(this.state.photographerAllData).length ? (
                      <FlatList
                        data={this.state.photographerAllData}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => {
                          // {
                          //   console.log(this.state.initial);
                          // }

                          return (
                            <TouchableOpacity
                              onPress={() =>
                                this.singlePhographerData(item.user_id)
                              }
                              keyExtractor={({ id }, index) => id}
                            >
                              <View style={styles.topPhotographers}>
                                <View style={styles.singlePhotographerBox}>
                                  <View style={styles.photographerImgBox}>
                                    <View style={styles.imageBox}>
                                      {item.profile_pic ? (
                                        <Image
                                          style={styles.photographerImg}
                                          source={{
                                            uri: `http://shuttertaps.com/img/author/convert/${item.profile_pic}`,
                                          }}
                                        />
                                      ) : null}
                                      {!item.profile_pic ? (
                                        <Image
                                          style={styles.photographerImg}
                                          source={{
                                            uri: `http://shuttertaps.com/img/author/blank-author.jpg`,
                                          }}
                                        />
                                      ) : null}
                                    </View>
                                    <View style={styles.userDetailsBox}>
                                      <Text style={styles.photographerName}>
                                        {item.user}
                                      </Text>
                                      <View style={styles.userDetailsSec}>
                                        <View style={[styles.detailsBox]}>
                                          <Image
                                            style={styles.ratigIconImg}
                                            source={require("../../assets/img/icons/pin.png")}
                                          />
                                          <Text>{item.city_name}</Text>
                                        </View>

                                        <View style={styles.detailsBox}>
                                          <Image
                                            style={styles.ratigIconImg}
                                            source={require("../../assets/img/icons/hourglass.png")}
                                          />
                                          <Text style={styles.ratingNumber}>
                                            {item.timeing} hours
                                          </Text>
                                        </View>

                                        <View style={styles.detailsBox}>
                                          <Image
                                            style={styles.ratigIconImg}
                                            source={require("../../assets/img/icons/star.png")}
                                          />
                                          <Text style={styles.ratingNumber}>
                                            {item.rating}
                                          </Text>
                                        </View>

                                        <View style={styles.detailsBox}>
                                          <Image
                                            style={styles.ratigIconImg}
                                            source={require("../../assets/img/icons/money-bag.png")}
                                          />
                                          <Text style={styles.ratingNumber}>
                                            {/* {this.MoneyConvert(item.price)} */}
                                          </Text>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                                <View style={styles.photographerBookSection}>
                                  <View style={styles.startingPrice}>
                                    <Image
                                      style={styles.ratigIconImg}
                                      source={require("../../assets/img/icons/money-bag.png")}
                                    />
                                    <Text style={styles.startingPriceNumber}>
                                      {item.startingPrice}
                                    </Text>
                                    {/* {this.UserToPhotographerDistance(
                                        this.state.userCurrentPostionName,
                                        item.city_name
                                      )} */}
                                  </View>
                                  <ButtonTouchable
                                    text={"book now"}
                                    customDesign={styles.btnBox}
                                    customBtnDesign={[styles.customBtn]}
                                    onClick={this.bookNowForm}
                                  />
                                </View>
                              </View>
                            </TouchableOpacity>
                          );
                        }}
                      ></FlatList>
                    ) : null}
                  </View>
                  <View style={{ height: 65 }}></View>
                </View>
              </ScrollView>
            ) : null}
          </View>
          <FooterMenu />
        </View>
      </View>
    );
  }
}
