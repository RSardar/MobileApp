// import React from "react";
// import {
//   Image,
//   Text,
//   View,
//   TouchableOpacity,
//   ImageBackground,
//   ScrollView,
//   FlatList,
//   Animated,
//   TouchableHighlight,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";

// export default class CameraAccess extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

import * as React from "react";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class CameraAccess extends React.Component {
  allowCameraAccess = () => {
    takeAndUploadPhotoAsync = async () => {
      // Display the camera to the user and wait for them to take a photo or to cancel
      // the action
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (result.cancelled) {
        return;
      }

      // ImagePicker saves the taken photo to disk and returns a local URI to it
      let localUri = result.uri;
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      // Upload the image using the fetch and FormData APIs
      let formData = new FormData();
      // Assume "photo" is the name of the form field the server expects
      formData.append("photo", { uri: localUri, name: filename, type });

      return await fetch(YOUR_SERVER_URL, {
        method: "POST",
        body: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      });
    };
  };
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.allowCameraAccess()}>
          <Text>Click to Access Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
