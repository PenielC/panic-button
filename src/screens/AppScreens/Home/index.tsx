import React, { Component } from "react";
import { View, Text } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import { Header } from "../../../components";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import { AvatarItem } from "../../../components";
import { logoutUserService } from "../../../redux/services/api";
import {
  fetchImageData,
  fetchMoreImageData
} from "../../../redux/actions/fetch";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  fetchImageData: (page?: number, limit?: number) => void;
  fetchMoreImageData: (page?: number, limit?: number) => void;
  imageData: any;
  loading: boolean;
}

interface itemProp {
  item: any;
}

interface State {
  page: number;
  limit: number;
}

class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      page: 1,
      limit: 20
    };
  }

  componentDidMount() {
    const { fetchImageData } = this.props;
    const { page, limit } = this.state;
    fetchImageData(page, limit);
  }

  handleLogout = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AuthStack");
    });
  };

  render() {
    const { navigation, imageData, fetchMoreImageData, loading } = this.props;
    const { page, limit } = this.state;
    return (
      <View style={styles.container}>
        <Header
          title="Home"
          leftButtonPress={() => navigation.openDrawer()}
          rightButtonPress={() => this.handleLogout()}
        />
       <View>
         <View style={styles.panicButton}><Icon name="call-sharp" size={100}/></View>
       </View>
       <View>
         <Text style={styles.headText}>Send a panic Alert!</Text>
       </View>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  imageData: state.data,
  loading: state.loading
});

function bindToAction(dispatch: any) {
  return {
    fetchImageData: (page?: number, limit?: number) =>
      dispatch(fetchImageData(page, limit)),
    fetchMoreImageData: (page?: number, limit?: number) =>
      dispatch(fetchMoreImageData(page, limit))
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(Home);
