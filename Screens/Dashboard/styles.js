import { StyleSheet } from "react-native";

export default StyleSheet.create({
  mainBody: {
    // marginVertical: 30,
  },
  imageGallary: {
    maxWidth: "100%",
    marginHorizontal: 20,
    marginVertical: 30,
  },
  commonBanner: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",

    alignSelf: "stretch",
  },

  singleImage: {
    maxHeight: 180,
    width: "100%",
    maxWidth: "50%",
    padding: 2,
    display: "flex",
    backgroundColor: "red",
  },
  eachImage: {
    width: "100%",
    height: "100%",
  },
  alternativeImg: {
    // maxHeight: 250,
  },
});
