import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import ErrorText from "../../components/ErrorText";
import SocialLogin from "../../components/SocialLogin";
import Icon from "react-native-vector-icons/FontAwesome5";
import ButtonTouchable from "../../components/ButtonTouchable";
import FooterMenu from "../../components/FooterMenu";
import styles from "./styles";
const serverIp = `192.168.0.113`;
const fileFolder = `jsonClasses`;
const serverUrl = `http://${serverIp}/${fileFolder}/`;
export default class SingleImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageDetails: "",
      isMainImgLoading: true,
      imageId: this.props.route.params.id,
      // imageId: 46,
      like: false,
      love: false,
      currentLike: 0,
      currentLove: 0,
      // landingFrom: this.props.route.params.fromPage,
      counter: 0,
      loggedInUserId: 15,
      imageSocial: "",
      socialLoad: false,
      allTags: "",
      tagLoad: true,
    };
  }
  componentDidMount() {
    this.SingleImageShow(this.props.route.params.id);
    this.CheckUserReact(this.props.route.params.id);
    // this.TotalNumber("like");
    console.log("----------------------");
    console.log(this.props.route.params.id);
  }

  downloadFile = (uri) => {
    let filename = uri.split("/");
    filename = filename[filename.length - 1];
    let fileUri = FileSystem.documentDirectory + filename;
    FileSystem.downloadAsync(uri, fileUri)
      .then(({ uri }) => {
        this.saveImageToGallary(uri);
      })
      .catch((error) => {
        Alert.alert("Error", "Couldn't download photo");
        console.error(error);
      });
  };

  saveImageToGallary = async (fileUri) => {
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    // console.log(cameraStatus);
    if (cameraStatus.granted === true) {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
      alert("Success");
    } else {
      console.log("failed");
    }
  };

  SingleImageShow = (imageId) => {
    let self = this;
    const url = `${serverUrl}imageDetails.php?imageId=${imageId}`;
    // console.log(url);
    axios(url)
      .then(function (response) {
        self.setState({
          imageDetails: response.data,
          isMainImgLoading: false,
        });
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  };

  //Check If Current Logged In User Liked or Loved this image
  CheckUserReact = (id) => {
    const self = this;
    const socialUpdateUrl = `${serverUrl}userSocial.php?userId=${this.state.loggedInUserId}&imageId=${id}`;
    console.log(socialUpdateUrl);
    axios(socialUpdateUrl)
      .then(function (response) {
        let alreadyLiked = response.data[0].like;
        let alreadyLoved = response.data[0].love;
        // console.log(response.data[0]);

        if (
          alreadyLiked == NaN ||
          alreadyLiked == 0 ||
          alreadyLiked == "0" ||
          alreadyLiked == undefined ||
          alreadyLiked.length == undefined ||
          alreadyLiked.length == 0
        ) {
          alreadyLiked = false;
        } else {
          alreadyLiked = true;
        }
        if (
          alreadyLoved == NaN ||
          alreadyLoved == 0 ||
          alreadyLoved == "0" ||
          alreadyLoved == undefined ||
          alreadyLoved.length == 0 ||
          alreadyLoved.length == undefined
        ) {
          alreadyLoved = false;
        } else {
          alreadyLoved = true;
        }
        if (response.data) {
          self.setState({
            imageSocial: response.data[0],
            like: alreadyLiked,
            love: alreadyLoved,
            socialLoad: true,
          });
        } else {
          console.log("No data");
        }
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  };

  UpdateImageSocialDB = (id, actionType) => {
    const socialUpdateUrl = `${serverUrl}imageSocial.php?imageId=${id}&actionType=${actionType}&userId=${this.state.loggedInUserId}`;
    axios(socialUpdateUrl)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  };

  counterStartFunc = () => {
    let increase = setInterval(function () {
      this.insertUpdateLikeLove();
    }, 1000);
    return increase;
  };

  commonLikeLove = (actionReact) => {
    this.UpdateImageSocialDB(this.state.imageId, actionReact);
    let likeExist = this.state.like;
    let loveExist = this.state.love;
    if (actionReact == "like") {
      if (likeExist) {
        this.setState({
          like: false,
        });
      } else {
        this.setState({
          like: true,
        });
      }

      if (!this.state.currentLike) {
        this.setState({
          currentLike: 0,
        });
      } else {
        this.setState({
          currentLike: 1,
        });
      }
    } else if (actionReact == "love") {
      if (loveExist) {
        this.setState({
          love: false,
        });
      } else {
        this.setState({
          love: true,
        });
      }
      if (!this.state.currentLove) {
        this.setState({
          currentLove: 0,
        });
      } else {
        this.setState({
          currentLove: 1,
        });
      }
    }

    console.log(likeExist, loveExist);
  };

  TypeChecking = (para) => {
    if (
      para == 0 ||
      para == NaN ||
      para == undefined ||
      para == null ||
      para == "" ||
      para == " " ||
      para == "0" ||
      para.length == 0
    ) {
      return 0;
    } else {
      return para;
    }
  };
  // currenLike: 0,
  // currenLove: 0,
  TotalNumber = (action) => {
    let total, liked, loved, oldLikes, oldLoves, alreadyLiked, alreadyLoved;
    oldLikes = this.state.currentLike;
    oldLoves = this.state.currentLove;
    alreadyLiked = this.state.imageSocial.liked;
    alreadyLoved = this.state.imageSocial.loved;
    if (action == "like") {
      if (!this.TypeChecking(alreadyLiked)) {
        // Already Liked
        liked = 1;
      } else {
        // Not In the Db
        liked = 0;
      }
      if (!this.TypeChecking(oldLikes)) {
        oldLikes = 0;
      } else {
        oldLikes = parseInt(oldLikes);
      }
      total = liked + oldLikes;
      console.log(liked, oldLikes);
    } else if (action == "love") {
      if (!this.TypeChecking(alreadyLoved)) {
        loved = 0;
      } else {
        loved = 1;
      }
      if (!this.TypeChecking(oldLoves)) {
        oldLoves = 0;
      } else {
        oldLoves = parseInt(oldLoves);
      }
      total = loved + oldLoves;
      console.log(loved, oldLoves);
    }

    if (total) {
      return (
        <View>
          <Text>{total}</Text>
        </View>
      );
    }
  };

  openComment = () => {
    this.props.navigation.navigate("Comment", {
      id: this.state.imageId,
      userId: this.state.loggedInUserId,
    });
  };

  BookThisPhotographer = () => {
    // this.props.navigation.navigate('');
    // console.log(this.state.landingFrom);
  };
  returnPage = () => {
    // this.props.navigation.navigate(`${this.state.landingFrom}`);
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.mainBody}>
        {/* <HeaderMain /> */}
        <View style={[styles.singleImageTopBar, styles.commonFelx]}>
          <TouchableOpacity onPress={() => this.returnPage()}>
            <View style={styles.commonFelx}>
              <Icon style={styles.topBackIcon} name="long-arrow-alt-left" />
              <Text style={styles.topBackText}>
                {/* {this.props.route.params.fromPage} */}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ marginLeft: "auto" }}>
            <Icon style={styles.topBackIcon} name="ellipsis-v" />
          </View>
        </View>

        {!this.state.isMainImgLoading ? (
          <View>
            <View style={[styles.commonFelx, styles.uploadedByImgSec]}>
              <View style={styles.topPhotographerImgBox}>
                <Image
                  style={styles.topPhotographerImg}
                  source={{
                    uri: `${serverUrl}img/author/${this.state.imageDetails[0].profile_pic}`,
                  }}
                />
              </View>

              <Text style={styles.userTopNameText}>
                {this.state.imageDetails[0].user}
              </Text>
              <View style={[{ marginLeft: "auto" }]}>
                <TouchableOpacity
                  style={[
                    styles.bookingBox,
                    styles.commonFelx,
                    styles.socialEachBtn,
                  ]}
                  onPress={() => this.BookThisPhotographer()}
                >
                  <Icon
                    style={[styles.topBackIcon]}
                    name={"calendar-alt"}
                    regular
                  />
                  <Text style={styles.bookingText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}

        {!this.state.isMainImgLoading ? (
          <View style={styles.mainImgSec}>
            <View style={{ position: "relative" }}>
              <View style={{ position: "relative" }}>
                <TouchableWithoutFeedback onLongPress={() => alert("hello")}>
                  <Image
                    style={styles.photographerImg}
                    source={{
                      uri: `${serverUrl}img/userGallary/${this.state.imageDetails[0].image_name}`,
                    }}
                  />
                </TouchableWithoutFeedback>
              </View>

              {this.state.socialLoad ? (
                <View style={[styles.socialEachBtn, styles.imageTotalView]}>
                  <View style={styles.commonFelx}>
                    <Icon style={[styles.topBackIcon]} name={"eye"} regular />
                    <Text style={{ marginLeft: 5 }}>
                      {this.state.imageDetails[0].photo_views}
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>
            {/* {!this.state.tagLoad ? (
              <View>
                <Text>
                  {this.ExploreTags(this.state.imageDetails[0].photo_tags)}
                </Text>
              </View>
            ) : null} */}

            <View style={[styles.commonFelx, styles.bottomMainImg]}>
              {this.state.socialLoad ? (
                <View>
                  <View style={styles.commonFelx}>
                    <TouchableOpacity
                      onPress={() => this.commonLikeLove("like")}
                      style={[styles.socialEachBtn]}
                    >
                      {!this.state.like ? (
                        <View>
                          <View style={styles.commonFelx}>
                            {/* {this.TotalNumber("like")} */}
                            {/* <Text> {this.state.imageDetails[0].like}</Text> */}
                            <Icon
                              style={[styles.topBackIcon]}
                              name={"thumbs-up"}
                              regular
                            />
                          </View>
                        </View>
                      ) : null}

                      {this.state.like ? (
                        <View style={styles.commonFelx}>
                          {/* {this.TotalNumber("like")} */}
                          {/* <Text> {this.state.imageDetails[0].like}</Text> */}
                          <Icon
                            style={[styles.topBackIcon]}
                            name={"thumbs-up"}
                            solid
                          />
                        </View>
                      ) : null}
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.commonLikeLove("love")}
                      style={[styles.socialEachBtn]}
                    >
                      {!this.state.love ? (
                        <View style={styles.commonFelx}>
                          {/* {this.TotalNumber("love")} */}
                          {/* <Text> {this.state.imageDetails[0].love}</Text> */}
                          <Icon
                            style={styles.topBackIcon}
                            name={"heart"}
                            regular
                          />
                        </View>
                      ) : null}

                      {this.state.love ? (
                        <View style={styles.commonFelx}>
                          {/* {this.TotalNumber("love")} */}
                          {/* <Text> {this.state.love}</Text> */}
                          <Icon
                            style={styles.topBackIcon}
                            name={"heart"}
                            solid
                          />
                        </View>
                      ) : null}
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}

              <TouchableOpacity
                style={[styles.socialEachBtn]}
                onPress={() => this.openComment()}
              >
                <View>
                  <Icon style={styles.topBackIcon} name={"comment"} regualr />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.socialEachBtn]}
                onPress={() =>
                  this.downloadFile(
                    `${serverUrl}img/userGallary/${this.state.imageDetails[0].image_name}`
                  )
                }
              >
                <View>
                  <Icon
                    style={styles.topBackIcon}
                    name={"arrow-alt-circle-down"}
                    solid
                  />
                </View>
              </TouchableOpacity>

              <View style={[styles.socialEachBtn, { marginRight: 0 }]}>
                <TouchableOpacity onPress={() => this.shareThisImg()}>
                  <Icon style={styles.topBackIcon} name={"share-alt"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}
        <FooterMenu />
      </View>
    );
  }
}
