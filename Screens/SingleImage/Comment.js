import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
  TextInput,
} from "react-native";
import axios from "axios";
import ErrorText from "../../components/ErrorText";
import SocialLogin from "../../components/SocialLogin";
import Icon from "react-native-vector-icons/FontAwesome5";
import InputBox from "../../components/InputBox";
import ButtonTouchable from "../../components/ButtonTouchable";
import ActivityLoading from "../../components/ActivityLoading";
// import * as Sharing from "expo-sharing";
// import Share from "react-native-share";
import styles from "./styles";
const serverUrl = `http://192.168.0.116/jsonClasses/`;
export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // imageid: this.props.route.params.id,
      imageid: 19,
      // userId: this.props.route.params.userId,
      userId: 15,
      userDetails: "",
      imageDetails: "",
      userDataLoad: true,
      commentLoad: true,
      commentExist: false,
      commentData: "",
      like: false,
      love: false,
      reply: false,
      likes: "",
      loves: "",
      commentText: "",
      holdComment: "",
      holdCommentId: "",
      recentCommentPost: false,
      newCommentLoad: true,
      recentData: [],
    };
  }
  componentDidMount() {
    this.UserDetailsFetch(this.state.userId);
    this.LoadComments(this.state.imageid);
    console.log("-----------------");
    // console.log(this.props.route.params.id + "from here");
  }

  LoadComments = (id) => {
    let self = this;
    let commentUrl = `${serverUrl}comments.php?imageId=${id}`;
    console.log(commentUrl);
    axios(commentUrl)
      .then(function (response) {
        // console.log(response.data);
        if (response.data) {
          self.setState({
            commentData: response.data,
            commentLoad: false,
            commentExist: true,
          });
        } else {
          self.setState({
            commentExist: false,
          });
        }
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  };

  UserDetailsFetch = (userId) => {
    const self = this;
    let userDetailsUrl = `${serverUrl}user.php?singleId=${userId}`;
    // console.log(userDetailsUrl);
    axios(userDetailsUrl)
      .then(function (response) {
        // console.log(response.data[0]);
        self.setState({
          userDetails: response.data[0],
          userDataLoad: false,
        });
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  };

  SingleImageShow = (imageId) => {
    let self = this;
    const url = `${serverUrl}imageDetails.php?imageId=${imageId}`;
    // console.log(url);

    axios(url)
      .then(function (response) {
        // console.log(response.data[0]);
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

  SingleCommentSocialDetails = (id) => {
    let self = this;
    const url = `${serverUrl}singleCommentDetails.php?comment_id=${id}`;
    console.log(url);
    axios(url)
      .then(function (response) {
        // console.log(response.data[0]);
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

  UserSingleComment = (imageUrl, commented, currentId, like, love) => {
    // console.log(currentId);
    return (
      <View
        style={[
          styles.commonFelx,
          styles.eachComment,
          { alignItems: "flex-start" },
        ]}
      >
        <View style={[styles.currentUserProPicBox, { marginRight: 10 }]}>
          <Image
            style={styles.currentUserProPic}
            source={{
              uri: `${serverUrl}img/author/${imageUrl}`,
            }}
          />
        </View>
        <View>
          <Text>{commented}</Text>
          <View style={[styles.commonFelx, styles.reactionComment]}>
            <TouchableOpacity
              style={[styles.reactionCommon, styles.commentLikeReact]}
              onPress={() => this.reaction("like", currentId)}
            >
              {like ? (
                <Icon
                  style={styles.commentReactionType}
                  name="thumbs-up"
                  solid
                />
              ) : null}
              {!like ? (
                <Icon
                  style={styles.commentReactionType}
                  name="thumbs-up"
                  regular
                />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.reactionCommon, styles.bookNowBigBtn]}
              onPress={() => this.reaction("love", currentId)}
            >
              {love ? (
                <Icon style={styles.commentReactionType} name="heart" solid />
              ) : null}

              {!love ? (
                <Icon style={styles.commentReactionType} name="heart" regular />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.reactionCommon,
                styles.bookNowBigBtn,
                { marginRight: 0 },
              ]}
              onPress={() => this.reactionReplyComment()}
            >
              <Icon style={styles.commentReactionType} name="reply" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  testComment = (comment) => {
    alert(comment);
  };

  // AddNewItem = () => {
  //   this.setState({

  //   })
  // }

  //Post Comment
  PostComment = () => {
    const self = this;
    let comment = this.state.commentText;
    let userId = this.state.userId;
    const commentPostUrl = `${serverUrl}comments.php?imageId=${this.state.imageid}&userId=${userId}&comment=${comment}`;
    self.setState({ newCommentLoad: true });
    console.log(commentPostUrl);
    axios(commentPostUrl)
      .then(function (response) {
        self.setState({
          recentCommentPost: true,
          holdComment: comment,
          holdCommentId: response.data,
          commentText: "",
        });
        setTimeout(function () {
          self.setState({ newCommentLoad: false });
        }, 500);
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  };

  reactionReplyComment = (imageId, userId, commentId, actionType) => {
    let self = this;
    let socailType;
    if (actionType == "like" || actionType == "love") {
      socailType = `${actionType}=${actionType}`;
      console.log(actionType);
    } else if ((actionType = "reply")) {
      socailType = `reply=reply`;
    }
    const insertCommentUrl = `${serverUrl}commentDetails.php?imageId=${imageId}&user_id=${userId}&comment_id=${commentId}&${socailType}`;
    console.log(insertCommentUrl);
    axios(insertCommentUrl)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  };

  reaction = (action, id) => {
    let currentLike = this.state.like;
    let currentLove = this.state.love;
    // console.log(id);
    if (action == "like") {
      if (!currentLike) {
        this.setState({
          like: true,
        });
      } else {
        this.setState({
          like: false,
        });
      }
    }

    if (action == "love") {
      if (!currentLove) {
        this.setState({
          love: true,
        });
      } else {
        this.setState({
          love: false,
        });
      }
    }

    this.reactionReplyComment(
      this.state.imageid,
      this.state.userId,
      id,
      action
    );
  };

  render() {
    const { commentText } = this.props;
    return (
      <View>
        {this.state.commentLoad ? (
          <View style={styles.loading}>
            <ActivityLoading />
          </View>
        ) : null}
        {!this.state.commentLoad ? (
          <View style={styles.mainBody}>
            <View style={[styles.singleImageTopBar, styles.commonFelx]}>
              <View style={styles.commonFelx}>
                <Icon style={styles.topBackIcon} name="long-arrow-alt-left" />
                <Text style={styles.topBackText}>Comments</Text>
              </View>
              <View style={{ marginLeft: "auto" }}>
                <Icon style={styles.topBackIcon} name="ellipsis-v" />
              </View>
            </View>

            <View>
              <View style={styles.allcomment}>
                {this.state.commentExist ? (
                  <View>
                    {this.state.recentCommentPost ? (
                      <View
                        style={[
                          this.state.newCommentLoad
                            ? { backgroundColor: "#d2d2f699" }
                            : { backgroundColor: "transparent" },
                        ]}
                      >
                        {this.UserSingleComment(
                          this.state.userDetails.profile_pic,
                          this.state.holdComment,
                          this.state.holdCommentId,
                          0,
                          0
                        )}
                      </View>
                    ) : null}
                    <FlatList
                      data={this.state.commentData}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => {
                        // console.log(item);
                        let like = parseInt(item.like) > 0 ? 1 : 0;
                        let love = parseInt(item.love) > 0 ? 1 : 0;
                        return (
                          <View>
                            {this.UserSingleComment(
                              item.profile_pic,
                              item.comment,
                              item.id,
                              like,
                              love
                            )}
                          </View>
                        );
                      }}
                    ></FlatList>
                  </View>
                ) : null}

                {!this.state.holdComment ? (
                  <View>
                    {!this.state.commentExist ? (
                      <View>
                        <Text style={{ textAlign: "center" }}>
                          No Comment Yet
                        </Text>
                      </View>
                    ) : null}
                  </View>
                ) : null}
              </View>
            </View>

            <View style={styles.bottomCommentBox}>
              <View style={[styles.commonFelx, styles.imageCommentSec]}>
                {!this.state.userDataLoad ? (
                  <View style={styles.currentUserProPicBox}>
                    {/* {console.log(
                  `${serverUrl}img/author/${this.state.userDetails.profile_pic}`
                )} */}
                    <Image
                      style={styles.currentUserProPic}
                      source={{
                        uri: `${serverUrl}img/author/${this.state.userDetails.profile_pic}`,
                      }}
                    />
                  </View>
                ) : null}

                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(commentText) => this.setState({ commentText })}
                  value={this.state.commentText}
                  style={styles.custominputBox}
                  autoFocus
                />
                <TouchableOpacity
                  style={styles.postCommentSec}
                  onPress={() => this.PostComment()}
                >
                  <Text style={styles.postCommentText}>post</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
