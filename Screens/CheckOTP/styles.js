import { StyleSheet } from "react-native";
let blueColor = "#F54336";
export default StyleSheet.create({
  mainBody: {
    height: "100%"
  },
  verificationMainText:{
    fontSize: 25,
    textAlign: "center",
    textTransform: "capitalize",
    fontWeight: "600",
  },
  verificationNormalText:{
    textAlign: "center",
   
  },
  custominputBox:{
    borderWidth: 1,
    marginRight: 15,
    width: 40,
    height: 40,
    borderRadius: 4,
    borderColor: "#13191d42",
    textAlign: "center",
    fontSize: 18
  },
  fourOtps:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15
  },
  customBtn:{
    backgroundColor: blueColor,
    marginTop: 15,
    paddingVertical: 10,
    width: 200,
    justifyContent: "center",
    display: "flex",
    alignSelf: "center"
  },
  customBtnText:{
    color: "white",
    fontSize: 18,
    textAlign: "center"
  },
  recendBtn:{
    borderWidth: 1,
    borderColor: blueColor,
    paddingVertical: 12,
    backgroundColor: "transparent",
    paddingVertical: 7,
    borderRadius: 4
  },
  recendBtnText:{
    color: blueColor,
    textAlign: "center",
    fontSize: 17,
  },
  counterDesignBox:{
    backgroundColor: "transparent",
    borderWidth:1,
    marginTop: 15,
    borderColor: blueColor,
    width: 60,
  },
  counterDesignText:{
    color: blueColor
  },
  recendNumber:{
    textAlign: "center",
    marginTop: 10,
    fontSize: 18
  }

});
