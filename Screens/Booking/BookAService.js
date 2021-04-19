import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  FlatList,
} from "react-native";
import HeaderMain from "../../components/HeaderMain";
import InputBox from "../../components/InputBox";
import ErrorText from "../../components/ErrorText";
import ButtonTouchable from "../../components/ButtonTouchable";
import SocialLogin from "../../components/SocialLogin";
import LogoImage from "../../components/LogoImage";
import FooterMenu from "../../components/FooterMenu";

import styles from "./styles";

export default class BookAService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false,
      photographerType: "",
      destination: "",
      eventDate: "",
    };
  }

  bookNowForm = () => {
    // this.props.navigation.navigate('CheckOTP', {'mobileNumber':userMobile}) ;
    this.props.navigation.navigate("Profile");
  };

  filterIcons = () => {
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
    let speciality = this.state.photographerType;
    let place = this.state.destination;
    let gigDate = this.state.eventDate;
  };

  render() {
    const { photographerType, destination, eventDate } = this.props;
    return (
      <View>
        <View style={styles.mainBody}>
          <View style={styles.topFilter}>
            <TouchableOpacity>
              <Image
                style={[styles.topFilterSec, styles.sort]}
                source={require("../../assets/img/icons/sort.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.filterIcons}
              style={{ marginLeft: "auto" }}
            >
              <Image
                style={[styles.topFilterSec, styles.filter]}
                source={require("../../assets/img/icons/filter.png")}
              />
            </TouchableOpacity>
          </View>
          <View>
            {this.state.showFilter ? (
              <View style={styles.filterBox}>
                <InputBox
                  name="photographerType"
                  placeholder={"Enter Photographer Type"}
                  customDesign={[
                    styles.custominputBox,
                    styles.photogrpaherType,
                  ]}
                  // value={userName}
                  handleChange={this.handleChange}
                />
                <InputBox
                  name="destination"
                  placeholder={"Enter Your Destination"}
                  customDesign={[styles.custominputBox, styles.destination]}
                  // value={userName}
                  handleChange={this.handleChange}
                />
                <InputBox
                  name="eventDate"
                  placeholder={"Select A Date"}
                  customDesign={[styles.custominputBox, styles.eventType]}
                  // value={userName}
                  handleChange={this.handleChange}
                />

                <ButtonTouchable
                  text={"filter"}
                  customDesign={styles.showFilterResultBox}
                  customBtnDesign={[styles.showFilterText]}
                  onClick={this.filterPhotographer}
                />
              </View>
            ) : null}
          </View>

          <View style={styles.filderHiddenBox}>
            <View>
              <Text>{this.props.route.params.title} efef</Text>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginHorizontal: 20 }}>
              <FlatList
                data={photographers}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.topPhotographers}>
                      <View style={styles.singlePhotographerBox}>
                        <View style={styles.photographerImgBox}>
                          <View style={styles.imageBox}>
                            <Image
                              style={styles.photographerImg}
                              source={require("../../assets/img/author/rakesh.png")}
                            />
                            <Text>efefef</Text>
                          </View>
                          <View style={styles.userDetailsBox}>
                            <Text style={styles.photographerName}>
                              {item.name}
                            </Text>
                            <View style={styles.userDetailsSec}>
                              <View style={[styles.detailsBox]}>
                                <Image
                                  style={styles.ratigIconImg}
                                  source={require("../../assets/img/icons/pin.png")}
                                />
                                <Text style={styles.ratingNumber}>
                                  {item.location}
                                </Text>
                              </View>

                              <View style={styles.detailsBox}>
                                <Image
                                  style={styles.ratigIconImg}
                                  source={require("../../assets/img/icons/hourglass.png")}
                                />
                                <Text style={styles.ratingNumber}>
                                  {item.time}
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
                                  {item.earning}
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
                        </View>
                        <ButtonTouchable
                          text={"book now"}
                          customDesign={styles.btnBox}
                          customBtnDesign={[styles.customBtn]}
                          onClick={this.bookNowForm}
                        />
                      </View>
                    </View>
                  );
                }}
              ></FlatList>
            </View>
            <View style={{ height: 65 }}></View>
          </ScrollView>
        </View>
        <FooterMenu />
      </View>
    );
  }
}
