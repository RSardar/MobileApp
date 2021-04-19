import * as React from "react";
import { Image, Text, View, Platform } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableHighlight } from "react-native-gesture-handler";
// import { Appbar } from "react-native-paper";
// import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";

export default class HeaderMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }
  updateSearch = (search) => {
    this.setState({ search });
  };
  MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
  SearchHeader = () => {
    alert("hello");
  };
  render() {
    const { search } = this.state;
    return (
      <View style={styles.header}>
        <View style={styles.headerTopSection}>
          <View style={styles.headerLogoText}>
            {/* <Appbar.Header>
              <Appbar.Content title="Title" subtitle={"Subtitle"} />
              <Appbar.Action icon="magnify" onPress={() => {}} />
              <Appbar.Action icon={this.MORE_ICON} onPress={() => {}} />
            </Appbar.Header> */}
            <Text style={styles.headerLogoText}>Shuttertaps</Text>
          </View>
          <View style={styles.headerSearch}>
            {/* <SearchBar
              placeholder="Search..."
              onChangeText={this.updateSearch}
              value={this.state.search}
            /> */}
            <View style={{ marginRight: 15 }}>
              <Icon
                type="feather"
                name="search"
                onPress={() => this.SearchHeader()}
              />
            </View>

            <View style={{ marginRight: 5 }}>
              <Icon
                type="feather"
                name="more-vertical"
                onPress={() => this.SearchHeader()}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
