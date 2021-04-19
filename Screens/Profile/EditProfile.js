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
import { Icon, Divider, Button, Badge, Image } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import { FlatList } from "react-native-gesture-handler";
// const serverIp = `betterpiping.com`;
// const fileFolder = `jsonClasses`;
const serverIp = `192.168.0.119`;
// const serverIp = `192.168.43.229`;
const fileFolder = `jsonClasses`;
const serverUrl = `http://${serverIp}/${fileFolder}/`;
export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      getStoredValue: false,
      photographerDetails: "",
      userDataLoad: false,
      nameEditType: true,
      modelVisible: false,
      btnTypeChange: "outline",
      editeduser: "",
      actionEditType: "",
      inputValue: "",
      actionDob: "",
      holdOTP: "",
      districts: "",
      stateId: "",
      districtsLoad: false,
      editInputStarted: false,
      swipeColor: "#F54336",
      showErrorMsg: false,
      imageUploadLoading: false,
      imageTempName: "",
      progressStatus: 0,
      refreshing: false,
      keyBoardType: "default",
      updateMobileModal: false,
      otpBoxFocusOtp1: true,
      otpBoxFocusOtp2: false,
      otpBoxFocusOtp3: false,
      otpBoxFocusOtp4: false,
      otpLoad: true,
      holdMobile: "",
      currentyEditing: "",
      pinCodeDetails: "",
      pinCodeDataLoaded: false,
    };
  }
  anim = new Animated.Value(0);
  componentDidMount() {
    console.log("-------------------");
    this.userIdStored();
    this.FndPinCode(743286);
    // this.onAnimate(2000);
  }

  OnRefresh = () => {
    this.setState({
      refreshing: true,
    });
    this.userIdStored();
  };

  onAnimate = (timeing) => {
    this.anim.addListener(({ value }) => {
      console.log(value);
      this.setState({ progressStatus: parseInt(value, 0) });
    });
    Animated.timing(this.anim, {
      toValue: 100,
      duration: timeing,
    }).start(() => {
      console.log("Animation DONE");
    });
  };

  handleChange = (e, name) => {
    if (!e) {
      this.setState({
        btnTypeChange: "outline",
        swipeColor: "#F54336",
        [name]: e,
        inputValue: e,
        showErrorMsg: true,
      });
    } else {
      this.setState({
        btnTypeChange: "solid",
        swipeColor: "white",
        [name]: e,
        inputValue: e,
        editInputStarted: true,
        showErrorMsg: false,
      });
    }
  };

  userIdStored = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      // value previously stored
      let getValue = JSON.parse(value);
      this.CurrentPhotographerDetails(parseInt(getValue));
      this.setState({
        userId: getValue,
        getStoredValue: true,
      });
      // console.log(getValue);
    } catch (e) {
      // error reading value
      console.log("error");
    }
  };

  CurrentPhotographerDetails = (id) => {
    let self = this;
    const photographerUrl = `${serverUrl}showPhotographers.php?singleId=${id}`;
    // console.log(photographerUrl);
    axios(photographerUrl)
      .then(function (res) {
        self.setState({
          photographerDetails: res.data[0],
          actionDob: res.data[0].dob,
          stateId: res.data[0].state_id,
          imageTempName: res.data[0].profile_pic,
          userDataLoad: true,
          refreshing: false,
        });
        // console.log(res.data[0].user);
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  Districts = (state) => {
    let self = this;
    let url = `${serverUrl}districts.php?stateId=${state}`;
    // console.log(url);
    axios(url).then((res) => {
      // console.log(res.data);
      self.setState({
        districts: res.data,
        districtsLoad: true,
      });
    });
  };

  EditUserProfileDetails = (e, t, n) => {
    // console.log(e, t);
    this.setState({
      currentyEditing: n,
    });
    let value = this.state.photographerDetails[t];

    if (e == "editedUserDist") {
      this.Districts(this.state.stateId);
    }
    this.setState({
      actionEditType: e,
      inputValue: value,
    });
    this.OpenModalBox();
  };

  OpenModalBox = () => {
    this.setState({
      modelVisible: true,
    });
  };

  CloseModalBox = () => {
    this.setState({
      modelVisible: false,
      editInputStarted: false,
    });
  };

  UpdateDatabase = (e, v) => {
    let self = this;
    let url = `${serverUrl}updateUserDetails.php?${e}=${v}&userId=${this.state.userId}`;
    // console.log(url);
    axios(url)
      .then((res) => {
        self.CurrentPhotographerDetails(self.state.userId);
        self.CloseModalBox();
        self.setState({
          updateMobileModal: false,
        });
      })
      .catch((error) => console.log(error));
  };

  UpdateDetails = (e, v) => {
    let self = this;
    v = v.trim();
    // console.log(e, v);
    if (v) {
      if (e == "editedUserMobile") {
        this.setState({
          keyBoardType: "number-pad",
        });
        // console.log(v);
        this.UpdateMobile(v);
      } else {
        this.UpdateDatabase(e, v);
      }
    }
  };

  ChangeDob = (e) => {
    this.setState({
      actionDob: e,
    });
  };

  UpdateMobile = (e) => {
    let self = this;
    this.setState({
      updateMobileModal: true,
      holdMobile: e,
    });

    if (e.length == 10) {
      let userMobile = parseInt(e);
      const otp = Math.floor(1000 + Math.random() * 9000);
      const api = "55632cf8-cce7-11ea-9fa5-0200cd936042";
      let url = `https://2factor.in/API/V1/${api}/SMS/${userMobile}/${otp}`;
      // console.log(url);
      axios(url).then((res) => {
        let result = res.data.Status;
        // console.log(res.data.Status);
        if (result == "Success") {
          self.setState({
            holdOTP: otp,
          });
        }
      });
    } else {
      alert("User 10 digits mobile number");
    }
  };

  UpdateProfilePic = async () => {
    let self = this;
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [1, 1],
      quality: 1,
    });
    if (result.cancelled) {
      return;
    }
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();

    // Assume "photo" is the name of the form field the server expects
    formData.append("photo", { uri: localUri, name: filename, type });

    self.setState({
      imageUploadLoading: true,
    });

    let imageUploadUrl = `${serverUrl}updateUserDetails.php?userId=${this.state.userId}&editedProfilePic=editedProfilePic`;
    if (imageUploadUrl) {
      return await fetch(imageUploadUrl, {
        method: "POST",
        body: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      })
        .then((response) => {
          response.json();
          // console.log(response);
        })

        .catch(function (error) {
          console.log(error);
        })
        .then((responseJson) => {
          self.onAnimate();
          setTimeout(() => {
            self.setState({
              imageTempName: filename,
              imageUploadLoading: false,
            });
          }, 1000);
        });
    }
  };

  CheckOTP = (e, name) => {
    // console.log(name);
    let newVal = name.slice(-1);
    let increase = parseInt(newVal) + 1;
    // console.log(newVal);
    let currentVal = `otpBoxFocusOtp${newVal}`;
    let changeFocus = `otpBoxFocusOtp${increase}`;
    // console.log(currentVal);
    this.setState({
      [currentVal]: false,
      [changeFocus]: true,
      [name]: e,
    });
  };

  CheckOTPBtn = () => {
    let otp1 = this.state.otp1;
    let otp2 = this.state.otp2;
    let otp3 = this.state.otp3;
    let otp4 = this.state.otp4;

    let mainOTP = `${otp1}${otp2}${otp3}${otp4}`;
    mainOTP = mainOTP.trim();
    mainOTP = parseInt(mainOTP);
    if (mainOTP == parseInt(this.state.holdOTP)) {
      this.UpdateDatabase("editedUserMobile", this.state.holdMobile);
    }
  };

  FndPinCode = (pin) => {
    let self = this;
    let url = `https://api.postalpincode.in/pincode/${pin}`;
    axios(url).then((res) => {
      // console.log(res.data[0].PostOffice);
      self.setState({
        pinCodeDetails: res.data[0].PostOffice,
        pinCodeDataLoaded: true,
      });
    });
  };

  render() {
    const { otp1, otp2, otp3, otp4 } = this.state;

    return (
      <View style={styles.mainBody}>
        {!this.state.getStoredValue ? (
          <ActivityLoading />
        ) : (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.OnRefresh}
              />
            }
          >
            <Modal
              animationType="slide"
              visible={this.state.updateMobileModal}
              transparent={true}
            >
              <View style={styles.otpModal}>
                <View style={styles.otpDesignBox}>
                  <Text
                    style={[styles.verificationMainText, styles.enterOTPText]}
                  >
                    enter verification code
                  </Text>
                  <Text style={styles.verificationNormalText}>
                    we have sent you a 4 digit verification code on
                  </Text>
                  <Text style={styles.recendNumber}>
                    +91 {this.state.holdMobile}
                  </Text>
                  <View style={styles.otpBox}>
                    <InputBox
                      name="otp1"
                      customDesign={[styles.otpBoxEach]}
                      max={1}
                      focus={this.state.otpBoxFocusOtp1}
                      keyType="number-pad"
                      value={otp1}
                      handleChange={this.CheckOTP}
                    />
                    <InputBox
                      name="otp2"
                      customDesign={[styles.otpBoxEach]}
                      value={otp2}
                      keyType="number-pad"
                      max={1}
                      focus={this.state.otpBoxFocusOtp2}
                      handleChange={this.CheckOTP}
                    />
                    <InputBox
                      name="otp3"
                      customDesign={[styles.otpBoxEach]}
                      value={otp3}
                      keyType="number-pad"
                      max={1}
                      focus={this.state.otpBoxFocusOtp3}
                      handleChange={this.CheckOTP}
                    />
                    <InputBox
                      name="otp4"
                      customDesign={[styles.otpBoxEach, { marginRight: 0 }]}
                      value={otp4}
                      keyType="number-pad"
                      max={1}
                      focus={this.state.otpBoxFocusOtp4}
                      handleChange={this.CheckOTP}
                    />
                  </View>

                  <View style={{ marginTop: 15 }}>
                    <Button
                      icon={
                        <Icon
                          name="checkmark-circle-outline"
                          size={20}
                          type="ionicon"
                          color={this.state.swipeColor}
                          iconStyle={{ paddingLeft: 5 }}
                        />
                      }
                      iconRight
                      raised
                      title="Submit OTP"
                      type={this.state.btnTypeChange}
                      buttonStyle={styles.updateBtnStyles}
                      containerStyle={styles.btnContainerUpdate}
                      onPress={() => this.CheckOTPBtn()}
                    />
                  </View>
                </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              visible={this.state.imageUploadLoading}
              transparent={true}
            >
              {/* <View style={styles.animationProgressSection}>
                <View style={styles.activityProgressBox}>
                  <Animated.View
                    style={[
                      styles.inner,
                      { width: this.state.progressStatus + "%" },
                      styles.activityBoxDesign,
                    ]}
                  >
                    <View style={styles.activityBoxType}>
                      <Animated.Text style={styles.label}>
                          <Text>{this.state.progressStatus}%</Text>
                      </Animated.Text>
                    </View>
                  </Animated.View>
                </View>
              </View> */}
              <View style={styles.animationProgressSection}>
                <View style={styles.ifActivitiShow}>
                  <View style={styles.activitiBoxWIthShadow}>
                    <ActivityLoading />
                  </View>
                  <Text style={styles.uploadingText}>Uploading...</Text>
                </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              visible={this.state.modelVisible}
              transparent={true}
            >
              <View style={styles.customModelBox}>
                <View style={styles.editModalBox}>
                  <View style={styles.modalBoxTopHader}>
                    <Text style={styles.editActonText}>
                      {this.state.currentyEditing}
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.CloseModalBox()}
                      style={styles.closeModalIcon}
                    >
                      <View>
                        <Icon
                          name="close-circle-outline"
                          size={20}
                          type="ionicon"
                          color="#F54336"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>

                  <Divider style={{ backgroundColor: "#F54336" }} />
                  <View style={styles.editChangesBox}>
                    <View style={styles.dateDesign}>
                      {this.state.actionEditType == "editedUserDob" ? (
                        <DatePicker
                          style={styles.datePickerColor}
                          date={this.state.actionDob}
                          format="DD-MM-YYYY"
                          onDateChange={(date) => {
                            this.ChangeDob(date, "start");
                          }}
                        />
                      ) : this.state.actionEditType == "editedUserDist" ? (
                        <View>
                          {this.state.districtsLoad ? (
                            <RNPickerSelect
                              onValueChange={(value) => console.log(value)}
                              items={this.state.districts.map((item) => [
                                {
                                  label: item.district_name,
                                  value: item.district_name,
                                },
                              ])}
                            />
                          ) : null}
                        </View>
                      ) : (
                        <View>
                          {this.state.actionEditType == "editedUserMobile" ||
                          this.state.actionEditType == "editedUserPin" ? (
                            <InputBox
                              name={this.state.actionEditType}
                              placeholder={this.state.currentyEditing}
                              customDesign={[styles.custominputBox]}
                              value={this.state.inputValue}
                              handleChange={this.handleChange}
                              keyType="number-pad"
                            />
                          ) : (
                            <InputBox
                              name={this.state.actionEditType}
                              placeholder={this.state.currentyEditing}
                              customDesign={[styles.custominputBox]}
                              value={this.state.inputValue}
                              handleChange={this.handleChange}
                              keyType={this.state.keyBoardType}
                            />
                          )}

                          {/* <View>
                              <FlatList
                                data={this.state.pinCodeDetails}
                                keyExtractor={({ id }, index) => id}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => {
                                  console.log(item.Name);
                                  // console.log("----");
                                  return (
                                    <TouchableOpacity>
                                      <Text>{item.Name}</Text>
                                    </TouchableOpacity>
                                  );
                                }}
                              ></FlatList>
                            </View> */}
                        </View>
                      )}
                    </View>
                    {this.state.showErrorMsg ? (
                      <View style={[styles.commonFlex, { marginLeft: 5 }]}>
                        <Badge status="error" />
                        <Text style={{ paddingLeft: 3, color: "#F54336" }}>
                          Please Input Some Data
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.updateBoxBtnBottom}>
                    <Button
                      icon={
                        <Icon
                          name="checkmark-circle-outline"
                          size={20}
                          type="ionicon"
                          color={this.state.swipeColor}
                          iconStyle={{ paddingLeft: 5 }}
                        />
                      }
                      iconRight
                      raised
                      title="Update"
                      type={this.state.btnTypeChange}
                      buttonStyle={styles.updateBtnStyles}
                      containerStyle={styles.btnContainerUpdate}
                      onPress={() =>
                        this.UpdateDetails(
                          this.state.actionEditType,
                          this.state.inputValue
                        )
                      }
                    />
                  </View>
                </View>
              </View>
            </Modal>

            {this.state.userDataLoad ? (
              <ScrollView style={{ paddingHorizontal: 10, marginTop: 10 }}>
                <View style={styles.profileDetailsBox}>
                  <View
                    style={[styles.profileImgBox, { position: "relative" }]}
                  >
                    <Image
                      style={styles.userDetailsImg}
                      source={{
                        uri: `${serverUrl}img/author/${this.state.imageTempName}`,
                      }}
                    />
                    <View style={styles.editIcon}>
                      <Icon
                        name={"pencil"}
                        type="simple-line-icon"
                        color="#f50"
                        size={15}
                        onPress={() => this.UpdateProfilePic()}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.editUserProfileInfo}>
                  <Text style={styles.editDetailsText}>Edit Details</Text>
                  <View style={styles.editProfileBox}>
                    <View
                      style={[styles.commonFlex, styles.editProfileBoxEach]}
                    >
                      <Icon
                        name={"person-circle-outline"}
                        type="ionicon"
                        // color="#f50"
                        size={25}
                        containerStyle={styles.iconContainerEdit}
                      />
                      <Text style={styles.userNameEdit}>
                        {this.state.photographerDetails.user}
                      </Text>
                      <Icon
                        name={"pencil"}
                        type="simple-line-icon"
                        color="#f50"
                        size={17}
                        containerStyle={[
                          styles.iconContainerEdit,
                          { marginLeft: "auto" },
                        ]}
                        onPress={() =>
                          this.EditUserProfileDetails(
                            "editeduser",
                            "user",
                            "Edit Your Name"
                          )
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.editProfileBox}>
                    <View
                      style={[styles.commonFlex, styles.editProfileBoxEach]}
                    >
                      <Icon
                        name={"person-circle-outline"}
                        type="ionicon"
                        // color="#f50"
                        size={25}
                        containerStyle={styles.iconContainerEdit}
                      />
                      <Text style={styles.userNameEdit}>
                        {this.state.photographerDetails.username}
                      </Text>
                      <Icon
                        name={"pencil"}
                        type="simple-line-icon"
                        color="#f50"
                        size={17}
                        containerStyle={[
                          styles.iconContainerEdit,
                          { marginLeft: "auto" },
                        ]}
                        onPress={() =>
                          this.EditUserProfileDetails(
                            "editedUserName",
                            "username",
                            "Edit Your User Name"
                          )
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.editProfileBox}>
                    <View
                      style={[styles.commonFlex, styles.editProfileBoxEach]}
                    >
                      <Icon
                        name={"heart-outline"}
                        type="ionicon"
                        // color="#f50"
                        size={25}
                        containerStyle={styles.iconContainerEdit}
                      />
                      <Text style={styles.userNameEdit}>
                        {this.state.photographerDetails.dob}
                      </Text>
                      <Icon
                        name={"pencil"}
                        type="simple-line-icon"
                        color="#f50"
                        size={17}
                        containerStyle={[
                          styles.iconContainerEdit,
                          { marginLeft: "auto" },
                        ]}
                        onPress={() =>
                          this.EditUserProfileDetails(
                            "editedUserDob",
                            "dob",
                            "Edit Date of Birth"
                          )
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.editProfileBox}>
                    <View
                      style={[styles.commonFlex, styles.editProfileBoxEach]}
                    >
                      <Icon
                        name={"call-outline"}
                        type="ionicon"
                        // color="#f50"
                        size={25}
                        containerStyle={styles.iconContainerEdit}
                      />
                      <Text style={styles.userNameEdit}>
                        {this.state.photographerDetails.mobile_number}
                      </Text>
                      <Icon
                        name={"pencil"}
                        type="simple-line-icon"
                        color="#f50"
                        size={17}
                        containerStyle={[
                          styles.iconContainerEdit,
                          { marginLeft: "auto" },
                        ]}
                        onPress={() =>
                          this.EditUserProfileDetails(
                            "editedUserMobile",
                            "mobile_number",
                            "Update Mobile Number"
                          )
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.editProfileBox}>
                    <View
                      style={[styles.commonFlex, styles.editProfileBoxEach]}
                    >
                      <Icon
                        name={"location-outline"}
                        type="ionicon"
                        // color="#f50"
                        size={25}
                        containerStyle={styles.iconContainerEdit}
                      />
                      <Text style={styles.userNameEdit}>
                        {this.state.photographerDetails.city_name}
                      </Text>
                      <Icon
                        name={"pencil"}
                        type="simple-line-icon"
                        color="#f50"
                        size={17}
                        containerStyle={[
                          styles.iconContainerEdit,
                          { marginLeft: "auto" },
                        ]}
                        onPress={() =>
                          this.EditUserProfileDetails(
                            "editedUserCity",
                            "city_name",
                            "Update Your City"
                          )
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.editProfileBox}>
                    <View
                      style={[styles.commonFlex, styles.editProfileBoxEach]}
                    >
                      <Icon
                        name={"locate-outline"}
                        type="ionicon"
                        // color="#f50"
                        size={25}
                        containerStyle={styles.iconContainerEdit}
                      />
                      <Text style={styles.userNameEdit}>
                        {this.state.photographerDetails.district_name}
                      </Text>
                      <Icon
                        name={"pencil"}
                        type="simple-line-icon"
                        color="#f50"
                        size={17}
                        containerStyle={[
                          styles.iconContainerEdit,
                          { marginLeft: "auto" },
                        ]}
                        onPress={() =>
                          this.EditUserProfileDetails(
                            "editedUserDist",
                            "district_name",
                            "Choose Your District"
                          )
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.editProfileBox}>
                    <View
                      style={[styles.commonFlex, styles.editProfileBoxEach]}
                    >
                      <Icon
                        name={"navigate-circle-outline"}
                        type="ionicon"
                        // color="#f50"
                        size={25}
                        containerStyle={styles.iconContainerEdit}
                      />
                      <Text style={styles.userNameEdit}>
                        {this.state.photographerDetails.pin_code}
                      </Text>
                      <Icon
                        name={"pencil"}
                        type="simple-line-icon"
                        color="#f50"
                        size={17}
                        containerStyle={[
                          styles.iconContainerEdit,
                          { marginLeft: "auto" },
                        ]}
                        onPress={() =>
                          this.EditUserProfileDetails(
                            "editedUserPin",
                            "pin_code",
                            "Type Your Pin Code"
                          )
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.editProfileBox}>
                    <View
                      style={[styles.commonFlex, styles.editProfileBoxEach]}
                    >
                      <Icon
                        name={"compass-outline"}
                        type="ionicon"
                        // color="#f50"
                        size={25}
                        containerStyle={styles.iconContainerEdit}
                      />
                      <Text style={styles.userNameEdit}>
                        {this.state.photographerDetails.states_name}
                      </Text>
                      <Icon
                        name={"pencil"}
                        type="simple-line-icon"
                        color="#f50"
                        size={17}
                        containerStyle={[
                          styles.iconContainerEdit,
                          { marginLeft: "auto" },
                        ]}
                        onPress={() =>
                          this.EditUserProfileDetails(
                            "editedUserStateId",
                            "states_name",
                            "Choose Your State"
                          )
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.editProfileBox}>
                    <View
                      style={[styles.commonFlex, styles.editProfileBoxEach]}
                    >
                      <Icon
                        name={"earth-outline"}
                        type="ionicon"
                        // color="#f50"
                        size={25}
                        containerStyle={styles.iconContainerEdit}
                      />
                      <Text style={styles.userNameEdit}>
                        {this.state.photographerDetails.country}
                      </Text>
                      <Icon
                        name={"pencil"}
                        type="simple-line-icon"
                        color="#f50"
                        size={17}
                        containerStyle={[
                          styles.iconContainerEdit,
                          { marginLeft: "auto" },
                        ]}
                        onPress={() =>
                          this.EditUserProfileDetails(
                            "editedUserCountry",
                            "country",
                            "Find Your Country"
                          )
                        }
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
            ) : null}
          </ScrollView>
        )}
      </View>
    );
  }
}
