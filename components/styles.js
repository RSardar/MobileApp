import { StyleSheet } from "react-native";
let blueColor = "#F54336";
export default StyleSheet.create({
  header: {
    backgroundColor: "#F54336",
    zIndex: 1,
    // marginBottom: 15,
  },
  headerProfile: {
    margin: 15,
  },
  topHeaderBar: {
    marginHorizontal: 15,
    backgroundColor: "red",
  },
  topHeaderBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  rightTopbarHeader: {
    marginLeft: "auto",
  },

  headerLogoText: {
    fontSize: 25,
    textTransform: "uppercase",
    textAlign: "center",
    fontFamily: "sans-serif",
    fontWeight: "bold",
    letterSpacing: 0.2,
    paddingVertical: 10,
    color: "white",
  },
  touchableBtnTxt: {
    textTransform: "capitalize",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    marginVertical: 10,
  },
  logoImage: {},
  socialLogin: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  socialLoginBox: {
    borderWidth: 1,
    width: "50%",
    padding: 5,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  socialGooglelogin: {
    marginRight: 10,
    borderColor: blueColor,
  },
  socaialFbLogin: {
    borderColor: "#3C5A99",
  },
  googleLoginText: {
    // marginLeft: "auto",
    marginLeft: 10,
    fontWeight: "600",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    marginVertical: 10,
    // position: "absolute"
  },
  buttonIconImg: {
    display: "none",
  },
  footer: {
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#bac8d3",
    position: "absolute",
    bottom: 0,
    // marginHorizontal: 10,
    zIndex: 1,
    backgroundColor: "white",
    // elevation:5,
    shadowColor: "blue",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 5,
    marginTop: -48,
  },
  footerIconBox: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
    alignSelf: "center",
  },
  footerEachIcon: {
    marginRight: 5,
    // backgroundColor: "red",
    opacity: 0.7,
    alignSelf: "center",
    width: "25%",
  },
  footerEachIconBox: {
    alignSelf: "center",
  },
  footerIcon: {
    alignSelf: "center",
  },
  footerIconText: {
    textTransform: "capitalize",
    opacity: 0.7,
  },
  mapStyle: {
    // width: "100%",
    // height: "100%",
    // display: "flex",
  },
  imageFlow: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  eachImage: {
    width: 120,
    height: 120,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingStyle: {
    color: "white",
    display: "flex",
    justifyContent: "center",
  },
});
