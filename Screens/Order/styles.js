import { StyleSheet } from "react-native";
let blueColor = "#F54336";
export default StyleSheet.create({
  mainBody: {
    flex: 1,
  },
  singleOrderDetails: {
    position: "relative",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: "white",
    elevation: 3,
    marginVertical: 5,
    borderRadius: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    padding: 2,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: blueColor,
  },
  hiredAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  allUserOrders: {
    marginHorizontal: 20,
    marginVertical: 10,
    flex: 1,
  },
  headerDetails: {
    // display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 3,
  },
  hiredUserLeft: {
    // width: 90,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  hiredUserRight: {
    marginLeft: 10,
    // backgroundColor: "red",
    width: "90%",
    marginTop: 5,
  },
  orderPageIcon: {
    color: blueColor,
    marginRight: 5,
  },
  activeStatus: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    zIndex: 1,
    position: "absolute",
    right: 3,
    top: 3,
  },
  bookieName: {
    fontSize: 17,
    fontFamily: "ubuntu-medium",
  },
  daysLeft: {
    fontSize: 17,
  },
  expandDetails: {
    flex: 1,
    // justifyContent: "flex-start",
  },
  myContainer: {
    height: 200,
    width: 250,
  },

  distanceFromUser: {
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
  },
  topLocationGuide: {
    fontSize: 18,
    fontFamily: "roboto-bold",
  },
  clientDetailsOrderText: {
    fontFamily: "roboto-regular",
  },
  commonClass: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  actualDistanceBox: {
    // backgroundColor: blueColor,
  },
  actualDistanceBoxText: {
    color: "white",
    width: "100%",
    borderRadius: 4,
    maxWidth: 80,
    backgroundColor: blueColor,
    textAlign: "center",
  },
  eachCustomerDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    paddingVertical: 3,
  },
  clientOrderDetailsSection: {
    backgroundColor: "white",
    padding: 15,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
    marginTop: -50,
  },
  eachCustomerDetailsTop: {
    marginLeft: 10,
  },
  orderBoxEachText: {
    fontFamily: "roboto-regular",
  },
  orderEachBoxBottom: {
    marginVertical: 15,
    // justifyContent: "center",
  },
  projectProgressBar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: blueColor,
  },
  bottomRationSec: {
    marginVertical: 5,
  },
  ratingContainerBtn: {
    width: "30%",
    justifyContent: "flex-end",
    marginLeft: "auto",
  },
  ratingBtnText: {
    borderColor: blueColor,
    color: "white",
    backgroundColor: blueColor,
  },
  ratingCommentBox: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: "white",
    elevation: 3,
    height: 100,
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    textAlignVertical: "top",
  },
  eachOurCommentBox: {
    marginLeft: 20,
  },
  commentBoxBesign: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: "white",
    elevation: 3,
    padding: 7,
  },
});
