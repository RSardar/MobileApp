import { StyleSheet } from "react-native";
let blueColor = "#F54336";
export default StyleSheet.create({
  mainBody: {
    
  },
  container: {
    flex: 1,
    position: "relative",
    fontFamily: 'space-mono' 
  },
  loginHeadingText: {
    textAlign: "center",
    fontSize: 20,
  },
  bodySection: {
    display: "flex",
    // flex: 1,
    justifyContent: "center",
    // marginTop: -50,
    marginHorizontal: 20,
  },
  loginBoxes: {
    marginBottom: 20,
  },
  loginHeadingText: {
    // marginBottom: 20,
    fontSize: 20,
    textAlign: "center",
  },
  custominputBox: {
    borderWidth: 1,
    padding: 6,
    fontSize: 18,
    borderRadius: 5,
    borderColor: "#13191d42",
    marginBottom: 10,
  },
  loginPass: {
  },
  loginRegBox: {},
  loginRegSection: {},
  loginBtnDesign: {
    backgroundColor: blueColor,
    width: "100%",
    color: "white",
    paddingVertical: 8,
    textAlign: "center",
    fontSize: 20,
  },

  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#bac8d3",
    marginVertical: 20,
  },

  registerNForget: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
  },
  registerBtnDesignText: {
    marginLeft: "auto",
  },
  customBtn: {
    width: "50%",
  },
  customBtnText: {
    color: "#F54336",
  },
});
