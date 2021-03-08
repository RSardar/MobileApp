import { StyleSheet } from "react-native";
let blueColor = "#F54336";
export default StyleSheet.create({
  mainBody: {
    height: "100%",
  },
  commonFelx: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  singleImageTopBar: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ced4da",
  },
  topBackIcon: {
    color: blueColor,
    fontSize: 22,
  },
  topBackText: {
    fontSize: 18,
    marginLeft: 5,
  },
  photographerImg: {
    width: "100%",
    height: 250,
    // maxHeight: 420,
  },
  mainImgSec: {
    position: "relative",
  },
  imageTotalView: {
    position: "absolute",
    zIndex: 1,
    top: 5,
    right: 0,
  },
  bottomMainImg: {
    justifyContent: "center",
    paddingVertical: 10,
  },
  uploadedByImgSec: {
    marginHorizontal: 15,
    paddingVertical: 10,
  },
  topPhotographerImgBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: blueColor,
    padding: 2,
  },
  topPhotographerImg: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    borderWidth: 0.5,
  },
  socialNumber: {
    marginHorizontal: 15,
  },
  socialEachBtn: {
    // width: 50,
    // backgroundColor: "#ced4da",
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 4,
    shadowColor: blueColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  countSocial: {
    fontSize: 16,
    opacity: 0.7,
    marginRight: 5,
    // color: "white",
  },
  bookingBox: {
    // borderColor: blueColor,
    // borderWidth: 0.3,
  },
  bookingText: {
    marginLeft: 10,
    color: "black",
    textAlign: "center",
    fontSize: 15,
    letterSpacing: 0.2,
  },
  userTopNameText: {
    fontSize: 18,
    marginLeft: 5,
  },
  imageAllDetails: {
    position: "absolute",
    bottom: 0,
    // backgroundColor: "#0000001f",
    width: "100%",
    paddingHorizontal: 15,
    height: 50,
  },
  imageDeailsEach: {
    color: blueColor,
  },
  custominputBox: {
    width: 250,
    backgroundColor: "#dedbdb2b",
  },
  imageCommentSec: {
    width: "100%",
  },
  bottomCommentBox: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#cdd4da82",
    paddingHorizontal: 15,
    zIndex: 1,
    paddingVertical: 7,
    backgroundColor: "white",
    marginTop: 50,
  },
  postCommentSec: {
    height: 35,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    marginLeft: "auto",
    elevation: 2,
    backgroundColor: "white",
  },
  postCommentText: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    lineHeight: 35,
    color: blueColor,
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  custominputBox: {
    height: 35,
    // backgroundColor: "red",
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
    width: "50%",
    paddingHorizontal: 5,
  },
  currentUserProPicBox: {
    width: 40,
    height: 40,
    padding: 2,
    borderRadius: 20,
    marginRight: 5,
    borderWidth: 2,
    borderColor: blueColor,
    overflow: "hidden",
  },
  currentUserProPic: {
    width: "100%",
    height: "100%",
  },
  allcomment: {
    marginHorizontal: 15,
    marginBottom: 120,
  },
  eachComment: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: "#d2d2f64a",
    // backgroundColor: "white",
  },
  reactionCommon: {
    marginRight: 10,
  },
  commentReactionType: {
    fontSize: 18,
    color: blueColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    backgroundColor: "transparent",
  },
  reactionComment: {
    marginTop: 5,
  },
  loading: {
    height: "100%",
  },
});
