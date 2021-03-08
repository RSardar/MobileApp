import { StyleSheet } from "react-native";
let blueColor = "#F54336";
export default StyleSheet.create({
  mainBody: {
    height: "100%",
  },
  headerMainTop:{
    backgroundColor:"green",
  },
  homeLocation:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingBottom: 0
  },
  locationName:{
    color: "white",
    marginLeft: 5,
    width: "70%"
  },
  locationIconsDown:{
    marginLeft: 10
  },
  topSearchBar:{
    margin: 10,
    position: "relative"
  },
  custominputBox:{
    borderColor: "red",
    height: 45,
    backgroundColor: "white",
    borderRadius: 4,
    paddingLeft: 45,
    paddingRight: 5
  },
  searchIcons:{
    position: "absolute",
    zIndex: 1,
    top: "35%",
    width: 15,
    height: 15,
    left: 15
  },
  heroBannerUl:{
    display: "flex",
    flexDirection: "row",
    margin: 15
  },
  heroBannerList:{
    height: 180,
    width: 275,
    marginRight: 15,
    backgroundColor: "red",
    borderRadius: 4
  },
  bannerImage:{
    width: "100%",
    height: "100%"
  },
  photographerTypes:{
    marginHorizontal: 10,
  },
  photographerTypeLi:{
    marginHorizontal: 5,
    marginBottom: 15,
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'column',
  },
  typesOfIcon:{
    justifyContent: "center",
    alignSelf: "center",
    minHeight: 32
  },
  typesText:{
    textAlign: "center",
    textTransform: "capitalize",
    marginTop: 5
  }
  
});
