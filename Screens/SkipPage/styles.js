import { StyleSheet } from "react-native";
let blueColor = "#F54336";
export default StyleSheet.create({
  mainBody: {
    height: "100%"
  },
  mobileRegister:{
    marginHorizontal: 15,
    display: "flex",
    justifyContent: "center",
    // flex: 1,
    // alignItems: 'center' 
    // backgroundColor: "red",
    height: "70%"
    
  },
  custominputBox:{
    borderWidth: 1,
    borderColor: "#13191d42",
    padding: 7,
    borderRadius: 4,
    paddingLeft: 100,
    fontSize:16
  },
  countryCode:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: 'absolute',
    left: 10,
    top: 10,
    borderRightWidth: 1,
    borderColor: "#13191d42",
  },
  countryIcon: {
    marginHorizontal: 10,
    width: 18,
    height: 18
  },
  topText:{
    textAlign: "center",
    marginVertical: 15,
    fontSize: 18
  },
  mobileNumberBox:{
    position: "relative",
  },
  countryCodeNumber:{
    marginRight: 15,
    fontSize: 16
  },
  customBtn:{
    backgroundColor: blueColor,
    paddingVertical: 12,
    marginTop: 15,
    borderRadius: 4
  },
  customBtnText:{
    color: "white",
    textAlign: "center",
    fontSize: 17,
  },


});
