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
import { Image } from "react-native-elements";
// import { Drawer } from "react-native-paper";
// import * as Sharing from "expo-sharing";
import { Icon } from "react-native-elements";
import { FileSystem } from "expo";

const serverIp = `192.168.0.104`;
const fileFolder = `jsonClasses`;
const serverUrl = `http://${serverIp}/${fileFolder}/`;
import styles from "./styles";

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUserId: 15,
      indexGalleryImgs: null,
      imagesLoad: false,
      currentActions: [],
      allSplz: null,
      splzLoad: true,
      refreshing: false,
      firstClick: 1,
      imgLike: 0,
      imgLove: 0,
      opacity: new Animated.Value(0),
      socialArr: [],
      heart: "heart",
      heartOut: "heart-outline",
      socialLoad: true,
    };
  }

  componentDidMount() {
    console.log("Welcome");
    this.storedData();
    this.IndexGallery();
    this.ImageSplzs();
    console.log("------------------");
  }

  AnimationAppear = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      during: 100,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(this.state.opacity, {
        toValue: 0,
        during: 100,
        useNativeDriver: true,
      }).start();
    }, 1000);
  };

  IndexGallery = () => {
    let self = this;
    let url = `${serverUrl}homepageGallery.php`;
    console.log(url);
    axios(url).then((res) => {
      self.setState({
        indexGalleryImgs: res.data,
        imagesLoad: true,
      });
    });
  };

  ImageSplzs = () => {
    let self = this;
    let url = `${serverUrl}specialization.php`;
    axios(url).then((res) => {
      // console.log(res.data);
      self.setState({
        allSplz: res.data,
        splzLoad: false,
      });
    });
  };

  //Local Storage
  storeData = async (value) => {
    let self = this;
    try {
      //Use Always Object
      // await AsyncStorage.removeItem("splzId");
      const jsonValue = JSON.stringify(value);
      // self.setState({ loggedIn: true });
      // console.log(jsonValue);
      self.props.navigation.navigate("Booking", { splzId: jsonValue });
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  //Pre Stored Data
  storedData = async () => {
    let self = this;
    try {
      const value = await AsyncStorage.getItem("userId");
      console.log(value);
      if (value !== null) {
        // value previously stored
        let getValue = JSON.parse(value);
        // console.log(getValue);
      } else {
        self.props.navigation.navigate("Login");
      }
    } catch (e) {
      // error reading value
      console.log("from storeddata error");
    }
  };

  SingleImage = (e, i) => {
    this.props.navigation.navigate("SingleImage", { id: e });
    // this.props.navigation.jumpTo("SingleImage", { id: e });
  };

  CommonLikeLove = (e) => {};

  SplzImages = (id) => {
    this.setState({
      imagesLoad: false,
    });

    let url = `${serverUrl}homepageGallery.php?splz=${id}`;
    // console.log(url);
    axios(url).then((res) => {
      self.setState({
        indexGalleryImgs: res.data,
        imagesLoad: true,
      });
    });
  };

  onRefresh = () => {
    let self = this;
    self.setState({
      refreshing: true,
    });
    self.wait(1).then(() => {
      self.IndexGallery();
      self.setState({ refreshing: false });
    });
  };
  wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  SocialAction = (actionType, id) => {
    let stateVal = actionType + id;
    if (this.state.stateVal) {
      if (this.state.stateVal.actionType) {
        return <Icon style={[styles.topBackIcon]} name={"thumbs-up"} solid />;
      } else {
        return <Icon style={[styles.topBackIcon]} name={"thumbs-up"} regular />;
      }
    } else {
      return <Icon style={[styles.topBackIcon]} name={"thumbs-up"} regular />;
    }
  };

  ShareThisImg = (url) => {
    const shareOptions = {
      title: "Title",
      message: `data:${url};base64,<base64_data>`,
      url: `data:${url};base64,<base64_data>`,
      subject: "Subject",
    };
    Share.share(shareOptions);
    // .then((res) => console.log(res))
    // .catch((err) => console.log(err));
  };

  SwapTab = (e) => {
    this.props.navigation.navigate("PublicProfile", {
      photographer: this.state.getId,
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { onRefresh } = this.props;
    const { searchBannerText, customHeart } = this.state;
    return (
      <View style={styles.mainBody}>
        <HeaderMain />
        {!this.state.splzLoad ? (
          <View style={styles.allSpecialization}>
            <FlatList
              horizontal={true}
              data={this.state.allSplz}
              keyExtractor={({ id }, index) => id}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                // console.log(item);
                return (
                  <TouchableWithoutFeedback
                    onPress={() => this.SplzImages(item.id)}
                  >
                    <View style={styles.eachSplz}>
                      <Text style={styles.eachSplzText}>{item.id}</Text>
                    </View>
                    <View style={styles.eachSplzBottom}>
                      <Text style={styles.eachSplzBottomText}>{item.type}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              }}
            ></FlatList>
          </View>
        ) : null}
        <View></View>
        <View style={styles.homePageBody}>
          {!this.state.imagesLoad ? (
            <Modal visible={!this.state.imagesLoad}>
              <View style={styles.indexPageIndicator}>
                <ActivityLoading loadingBox={styles.homeIndicator} />
              </View>
            </Modal>
          ) : (
            <View>
              <FlatList
                style={{ marginBottom: 25 }}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                  />
                }
                data={this.state.indexGalleryImgs}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item, index, separators }) => {
                  let profilePic;
                  if (item.profile_pic) {
                    profilePic = `${serverUrl}img/author/${item.profile_pic}`;
                  } else {
                    profilePic = `${serverUrl}img/author/blank-author.jpg`;
                  }
                  // console.log(profilePic);

                  let imageUrl = `${serverUrl}img/userGallary/${item.image_name}`;
                  return (
                    <View>
                      <View style={[styles.eachIndexImgBox]}>
                        <TouchableWithoutFeedback
                          onPress={() => this.SwapTab(item.user_id)}
                          style={styles.indexAvatarSec}
                        >
                          <View style={styles.indexAvatar}>
                            <Image
                              style={[
                                styles.eachIndexImg,
                                { borderRadius: 20 },
                              ]}
                              source={{ uri: profilePic }}
                            />
                          </View>
                          <Text>{item.username}</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                          onPress={() => this.SingleImage(item.photo_id, index)}
                          style={styles.touchSingleImg}
                        >
                          <Animated.View
                            style={[
                              styles.animationHeart,
                              { opacity: this.state.opacity },
                            ]}
                          >
                            <View style={styles.doubeClickHeart}>
                              <Icon
                                style={styles.appearHeart}
                                name={"heart"}
                                solid
                              />
                            </View>
                          </Animated.View>

                          <Image
                            style={[styles.eachIndexImg]}
                            source={{
                              uri: imageUrl,
                            }}
                          />
                          {/* {console.log(item)} */}
                        </TouchableWithoutFeedback>
                      </View>
                      <View
                        style={[styles.commonFelx, { marginHorizontal: 15 }]}
                      >
                        <View style={[styles.socialEachBtn]}>
                          <View style={styles.commonFelx}>
                            <Icon
                              style={[styles.topBackIcon]}
                              name={"happy-outline"}
                              type="ionicon"
                              color="#f50"
                              onPress={() =>
                                this.CommonLikeLove(this.state.heartOut)
                              }
                            />
                          </View>
                        </View>
                        <View style={[styles.socialEachBtn]}>
                          <View style={styles.commonFelx}>
                            <Icon
                              style={styles.topBackIcon}
                              name={this.state.heartOut}
                              type="ionicon"
                              color="#f50"
                              onPress={() =>
                                this.CommonLikeLove(this.state.heartOut)
                              }
                            />
                          </View>
                        </View>

                        <View
                          style={[styles.socialEachBtn, { marginRight: 0 }]}
                        >
                          <TouchableOpacity
                            onPress={() => this.ShareThisImg(imageUrl)}
                          >
                            <Icon
                              style={styles.topBackIcon}
                              name={"share-alt"}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                }}
              ></FlatList>
            </View>
          )}
        </View>
      </View>
    );
  }
}
