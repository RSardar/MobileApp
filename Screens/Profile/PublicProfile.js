import React from "react";
import {
  // Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  Modal,
} from "react-native";
import HeaderMain from "../../components/HeaderMain";
import FooterMenu from "../../components/FooterMenu";
import InputBox from "../../components/InputBox";
import ButtonTouchable from "../../components/ButtonTouchable";
import LogoImage from "../../components/LogoImage";
import Icon from "react-native-vector-icons/FontAwesome5";
import Gallery from "../../components/Gallery";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import ActivityLoading from "../../components/ActivityLoading";
import { Image, Avatar } from "react-native-elements";
import styles from "./styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
// const serverIp = `betterpiping.com`;
const serverIp = `192.168.0.119`;
// const serverIp = `192.168.43.229`;
const fileFolder = `jsonClasses`;
const serverUrl = `http://${serverIp}/${fileFolder}/`;
export default class PublicProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getId: "",
      gotUser: false,
      clickedPhotographerId: this.props.route.params.photographer,
      photographerAllData: "",
      isLoading: true,
      allGalleryImg: "",
      userName: "Suhrita",
      userEmail: "s@gmail.com",
      userGallery: "",
      gallaryLoad: true,
      initial: 1,
      loadImg: 12,
      hasScrolled: false,
      popUpUpload: false,
      imageUploadLoading: false,
      secondCount: 0,
      numberOfPhoto: "",
      imageForm: false,
      imageTempName: "45953da1-5799-4830-9652-e2efa0b31147.jpg",
    };
  }

  componentDidMount() {
    console.log(this.props.route.params.photographer);
    this.storedData();
    console.log("PublicProfile");
    this.PhotographerData(this.props.route.params.photographer);
    this.UserGallary(this.props.route.params.photographer, 12);
  }

  // async componentDidMount() {}

  handleChange = (e, name) => {
    this.setState({ [name]: e });
  };

  PhotographerData = (id) => {
    var self = this;
    const url = `${serverUrl}showPhotographers.php?singleId=${id}`;
    // console.log(url);
    axios(url)
      .then(function (res) {
        self.setState({
          isLoading: false,
          photographerAllData: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  storedData = async () => {
    try {
      await AsyncStorage.getItem("userId").then((value) => {
        value = JSON.parse(value);

        this.setState({
          getId: value,
          gotUser: true,
        });
        // console.log(value);
      });
    } catch (e) {
      alert(e);
      console.log(e);
    }
  };

  goToProfile = () => {
    this.props.navigation.navigate("Profile", {
      loginInUserId: this.state.getId,
    });
  };

  everySecCount = () => {
    let result = this.state.secondCount + 1;
    this.setState({
      secondCount: result,
    });
    return result;
  };

  chooseUploadType = () => {
    this.setState({
      popUpUpload: true,
    });
  };

  closePopUp = () => {
    this.setState({
      popUpUpload: false,
    });
  };

  uploadImageActionType = async (actionType) => {
    this.setState({
      imageUploadLoading: true,
    });
    const self = this;
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let result;
    if (actionType == "cameraAction") {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        // aspect: [1, 1],
        quality: 1,
      });
    } else if (actionType == "galleryAction") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [1, 1],
        quality: 1,
      });
    }
    // console.log(result);
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
    this.setState({
      imageTempName: filename,
    });
    let imageUploadUrl = `${serverUrl}imageUpload.php?userId=${this.state.getId}`;
    // console.log(imageUploadUrl);

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
          console.log("image uploaded successfully"); //Here
          self.setState({
            imageUploadLoading: false,
            popUpUpload: false,
            imageForm: true,
          });
        })
        .then((responseJson) => {
          self.setState({
            imageUploadLoading: false,
            popUpUpload: false,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("hello from camera");
    }
  };

  //Open Single Image
  openSingleImg = (id) => {
    let self = this;
    const viewUrl = `${serverUrl}imageViews.php?imageId=${id}`;
    axios(viewUrl)
      .then(function (res) {
        console.log(res.data);
        self.props.navigation.navigate("SingleImage", {
          id: id,
          fromPage: "Gallery",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  longPressImg = (id) => {
    alert("long press");
  };

  UserGallary = (userId, loadImg) => {
    var self = this;
    const galleryUrl = `${serverUrl}photoGallary.php?userId=${userId}&limit=${loadImg}`;
    // console.log(galleryUrl);
    axios(galleryUrl)
      .then(function (res) {
        // console.log(res.data);
        self.setState({
          gallaryLoad: false,
          userGallery: res.data,
          numberOfPhoto: Object.keys(res.data).length,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  loadMoreImage = () => {
    console.log(this.state.loadImg);
    const load = this.state.loadImg + 12;
    this.UserGallary(this.state.getId, load);
    this.setState({
      loadImg: load + 12,
    });
  };

  bookThisPhotographer = () => {
    this.props.navigation.navigate("BookingForm", { id: this.state.getId });
  };

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  render() {
    const { searchBannerText, navigation } = this.state;

    return (
      <View style={styles.mainBody}>
        {!this.state.gotUser ? (
          <ActivityLoading />
        ) : (
          <View>
            {this.state.imageForm ? (
              <Modal
                animationType={"slide"}
                visibleModal={false}
                onRequestClose={() => {
                  this.visibleModal(false);
                }}
              >
                <View style={styles.justUploadedMainBox}>
                  <View style={styles.justUploadedImgBox}>
                    <Image
                      style={styles.justUploadedImg}
                      source={{
                        uri: `${serverUrl}img/userGallary/${this.state.imageTempName}`,
                      }}
                    />
                    <View>
                      <Text>Image Name: {this.state.imageTempName}</Text>
                    </View>
                  </View>

                  <View style={styles.imageBoxForm}>
                    <View
                      style={[
                        styles.imageBoxFormEachSection,
                        { marginBottom: 10 },
                      ]}
                    >
                      <View style={styles.labelEachDeg}>
                        <Text style={styles.labelName}>Image Name</Text>
                      </View>
                      <InputBox
                        // value={this.state.imageTempName}
                        name="phoneNumber"
                        placeholder={"Enter Image Name"}
                        customDesign={[
                          styles.imageboxFormInput,
                          styles.imagefromName,
                        ]}
                        // keyType={"numeric"}
                        // value={phoneNumber}
                        handleChange={this.handleChange}
                      />
                    </View>
                    <View
                      style={[
                        styles.imageBoxFormEachSection,
                        styles.formboxAfterFirst,
                      ]}
                    >
                      <View style={styles.labelEachDeg}>
                        <Text style={styles.labelName}>Image Title</Text>
                      </View>
                      <InputBox
                        // value={this.state.imageTempName}
                        name="phoneNumber"
                        placeholder={"Enter Image Name"}
                        customDesign={[
                          styles.imageboxFormInput,
                          styles.imagefromName,
                        ]}
                        // keyType={"numeric"}
                        // value={phoneNumber}
                        handleChange={this.handleChange}
                      />
                    </View>
                    <View
                      style={[
                        styles.imageBoxFormEachSection,
                        styles.formboxAfterFirst,
                      ]}
                    >
                      <View style={styles.labelEachDeg}>
                        <Text style={styles.labelName}>Image Tags</Text>
                      </View>
                      <InputBox
                        // value={this.state.imageTempName}
                        name="phoneNumber"
                        placeholder={"Enter Image Name"}
                        customDesign={[
                          styles.imageboxFormInput,
                          styles.imagefromName,
                        ]}
                        // keyType={"numeric"}
                        // value={phoneNumber}
                        handleChange={this.handleChange}
                      />
                    </View>
                    <View
                      style={[
                        styles.imageBoxFormEachSection,
                        styles.formboxAfterFirst,
                      ]}
                    >
                      <View style={styles.labelEachDeg}>
                        <Text style={styles.labelName}>Captured By</Text>
                      </View>
                      <InputBox
                        // value={this.state.imageTempName}
                        name="phoneNumber"
                        placeholder={"Enter Image Name"}
                        customDesign={[
                          styles.imageboxFormInput,
                          styles.imagefromName,
                        ]}
                        // keyType={"numeric"}
                        // value={phoneNumber}
                        handleChange={this.handleChange}
                      />
                    </View>
                    <View
                      style={[
                        styles.imageBoxFormEachSection,
                        styles.formboxAfterFirst,
                      ]}
                    >
                      <View style={styles.labelEachDeg}>
                        <Text style={styles.labelName}>Camera Model</Text>
                      </View>
                      <InputBox
                        // value={this.state.imageTempName}
                        name="phoneNumber"
                        placeholder={"Enter Image Name"}
                        customDesign={[
                          styles.imageboxFormInput,
                          styles.imagefromName,
                        ]}
                        // keyType={"numeric"}
                        // value={phoneNumber}
                        handleChange={this.handleChange}
                      />
                    </View>
                    <View
                      style={[
                        styles.imageBoxFormEachSection,
                        styles.formboxAfterFirst,
                      ]}
                    >
                      <View style={styles.labelEachDeg}>
                        <Text style={styles.labelName}>Aperture</Text>
                      </View>
                      <RNPickerSelect
                        style={this.pickerSelectStyles}
                        onValueChange={(value) => console.log(value)}
                        items={[
                          { label: "Football", value: "football" },
                          { label: "Baseball", value: "baseball" },
                          { label: "Hockey", value: "hockey" },
                        ]}
                      />
                    </View>
                    <View
                      style={[
                        styles.imageBoxFormEachSection,
                        styles.formboxAfterFirst,
                      ]}
                    >
                      <View style={styles.labelEachDeg}>
                        <Text style={styles.labelName}>ISO</Text>
                      </View>
                      <RNPickerSelect
                        style={this.pickerSelectStyles}
                        onValueChange={(value) => console.log(value)}
                        items={[
                          { label: "Football", value: "football" },
                          { label: "Baseball", value: "baseball" },
                          { label: "Hockey", value: "hockey" },
                        ]}
                      />
                    </View>
                    <View
                      style={[
                        styles.imageBoxFormEachSection,
                        styles.formboxAfterFirst,
                      ]}
                    >
                      <View style={styles.labelEachDeg}>
                        <Text style={styles.labelName}>Flash</Text>
                      </View>
                      <RNPickerSelect
                        style={this.pickerSelectStyles}
                        onValueChange={(value) => console.log(value)}
                        items={[
                          { label: "Football", value: "football" },
                          { label: "Baseball", value: "baseball" },
                          { label: "Hockey", value: "hockey" },
                        ]}
                      />
                    </View>
                    <View>
                      <TouchableOpacity style={styles.postImageSec}>
                        <Text style={styles.postImageBtnText}>Post</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            ) : null}

            {this.state.imageUploadLoading ? (
              <View style={styles.uploadImageType}>
                <View style={[styles.uploadAction, { flex: 1 }]}>
                  <View style={styles.actionAlert}>
                    <ActivityLoading />
                  </View>
                </View>
              </View>
            ) : null}

            {this.state.popUpUpload ? (
              <View style={styles.uploadImageType}>
                <View style={styles.uploadAction}>
                  <View style={styles.actionAlert}>
                    <View
                      style={[styles.eachActionSec, { position: "relative" }]}
                    >
                      <View
                        style={[
                          styles.topHeaderBar,
                          styles.actionUploadTopHeader,
                        ]}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 18,
                          }}
                        >
                          Add Photo
                        </Text>
                        <TouchableOpacity
                          style={styles.popUpClose}
                          onPress={() => this.closePopUp()}
                        >
                          <Icon
                            style={{
                              color: "#F54336",
                              fontSize: 17,
                            }}
                            name="times"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.eachActionSec,
                        {
                          padding: 15,
                          borderBottomWidth: 1,
                          borderBottomColor: "#f8f9fab0",
                        },
                      ]}
                      onPress={() => this.uploadImageActionType("cameraAction")}
                    >
                      <Text>Take a Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.eachActionSec, { padding: 15 }]}
                      onPress={() =>
                        this.uploadImageActionType("galleryAction")
                      }
                    >
                      <Text>Choose From Gallery</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : null}
            <Animated.ScrollView>
              {!this.state.isLoading ? (
                <View style={[styles.headerProfile]}>
                  <View style={styles.topHeaderBar}>
                    <Icon
                      style={styles.topHeaderIcons}
                      name="long-arrow-alt-left"
                    />
                    <View
                      style={[styles.topHeaderBar, styles.rightTopbarHeader]}
                    >
                      <TouchableOpacity
                        style={{ marginRight: 15 }}
                        onPress={() => this.chooseUploadType()}
                      >
                        <Text>
                          <Icon
                            style={styles.topHeaderIcons}
                            name="camera"
                            regular
                          />
                        </Text>
                      </TouchableOpacity>

                      <TouchableWithoutFeedback
                        onPress={() => this.goToProfile()}
                      >
                        <Image
                          style={[
                            styles.profileHeroImg,
                            styles.topHeaderAvatar,
                          ]}
                          source={{
                            uri: `${serverUrl}img/author/${this.state.photographerAllData[0].profile_pic}`,
                          }}
                        />
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                </View>
              ) : null}

              <View>
                {!this.state.isLoading ? (
                  <FlatList
                    data={this.state.photographerAllData}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => {
                      // console.log("helllllo----------------------------------------");
                      // console.log(item);
                      // if (item.user_id == this.state.getId) {
                      return (
                        <View>
                          <View style={styles.bannerProfile}>
                            <View style={styles.profileHero}>
                              <Image
                                style={styles.profileHeroImg}
                                source={{
                                  uri: `${serverUrl}img/author/${item.profile_pic}`,
                                }}
                              />
                            </View>
                            <View style={styles.smallProfileBox}>
                              <View style={styles.smallProfilePic}>
                                <Avatar
                                  size="large"
                                  rounded
                                  source={{
                                    uri: `${serverUrl}img/author/${item.profile_pic}`,
                                  }}
                                />
                              </View>

                              <View style={styles.profileDetails}>
                                <Text style={styles.userNameActualName}>
                                  {item.user}
                                </Text>
                                <Text>Wedding Photographer</Text>
                                <View style={styles.socialProfiles}>
                                  <Text>
                                    <Icon
                                      style={styles.socialIcon}
                                      name="facebook"
                                    />
                                  </Text>
                                  <Text>
                                    {" "}
                                    <Icon
                                      style={styles.socialIcon}
                                      name="twitter"
                                    />{" "}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <TouchableOpacity
                              style={styles.bookNowBigBtn}
                              onPress={this.bookThisPhotographer}
                            >
                              <Icon
                                style={styles.socialIconBookNow}
                                name="hashtag"
                              />
                              <Text style={[styles.showFilterText]}>
                                Book Now
                              </Text>
                            </TouchableOpacity>

                            <View style={styles.specialistIn}>
                              <Text style={styles.expertIn}>wedding</Text>
                              <Text style={styles.expertIn}>adventure</Text>
                              <Text
                                style={[styles.expertIn, { marginRight: 0 }]}
                              >
                                Event
                              </Text>
                            </View>

                            <View></View>
                            <Gallery allGalleryImg={this.state.allGalleryImg} />
                          </View>
                        </View>
                      );
                      // }
                    }}
                  ></FlatList>
                ) : null}
              </View>

              <View
                style={{
                  marginHorizontal: 5,
                }}
              >
                {/* {this.setState({
              initial: this.state.initial + 1,
            })} */}

                {!this.state.gallaryLoad ? (
                  <View>
                    <FlatList
                      onScroll={this.onScroll}
                      data={this.state.userGallery}
                      numColumns={3}
                      keyExtractor={(id, index) => id}
                      renderItem={({ item }) => {
                        return (
                          <TouchableOpacity
                            style={styles.eachImage}
                            onPress={() => this.openSingleImg(item.photo_id)}
                            // onLongPress={() => this.longPressImg(item.photo_id)}
                          >
                            <Image
                              style={{ width: "100%", height: 130 }}
                              source={{
                                uri: `${serverUrl}img/userGallary/${item.image_name}`,
                              }}
                            />
                          </TouchableOpacity>
                        );
                      }}
                    ></FlatList>
                    {this.state.numberOfPhoto > 11 ? (
                      <View>
                        <ButtonTouchable
                          text={"Load More"}
                          customDesign={styles.loadMore}
                          customBtnDesign={[styles.showFilterText]}
                          onClick={() => this.loadMoreImage()}
                        />
                      </View>
                    ) : null}
                  </View>
                ) : null}
              </View>
              <View style={{ height: 80 }}></View>
            </Animated.ScrollView>
          </View>
        )}
      </View>
    );
  }
}
