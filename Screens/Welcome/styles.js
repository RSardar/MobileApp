import { StyleSheet } from "react-native";
let blueColor = "#F54336";
export default StyleSheet.create({
  mainBody: {
    flex: 1,
  },
  homePageBody: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  indexPageIndicator: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  eachIndexImgBox: {
    marginBottom: 10,
    paddingVertical: 15,
    maxHeight: 350,
    // overflow: "hidden",
    // backgroundColor: "red",
  },
  indexAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: blueColor,
    padding: 1,
    marginRight: 10,
    marginVertical: 5,
  },
  eachIndexImg: {
    height: "100%",
    width: "100%",
  },
  indexAvatarSec: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  commonFelx: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  topBackIcon: {
    color: blueColor,
    fontSize: 22,
  },
  socialEachBtn: {
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
  },
  allSpecialization: {
    padding: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  eachSplz: {
    width: 60,
    height: 60,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: blueColor,
    padding: 2,
    alignSelf: "center",
  },
  eachSplzText: {
    textAlign: "center",
  },
  eachSplzBottom: {
    justifyContent: "center",
  },
  eachSplzBottomText: {
    textAlign: "center",
  },
  touchSingleImg: {
    position: "relative",
  },
  doubeClickHeart: {
    alignItems: "center",
  },
  animationHeart: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#00000040",
  },
  appearHeart: {
    color: blueColor,
    fontSize: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});
