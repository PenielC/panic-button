import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Linking
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {login} from "../../../redux/actions/auth";
import { Input, Button } from "../../../components";
import {connect} from "react-redux";
import styles from "./styles";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  login(model:userData): Promise<any>;
}
interface userData {
  username: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .min(4)
    .max(16)
    .required(),
  password: Yup.string()
    .matches(/^[a-zA-Z]+(\s?[a-zA-z]+)*$/)
    .min(6)
    .max(16)
    .required()
});

class Login extends Component<Props, {}> {
  handleLogin = (values: userData) => {
    const { navigation, login } = this.props;
    /*login(values)
    .then((respo)=>{
      console.log("login response", respo);
    }).catch((err)=>{
      console.log("login response error", err);
    })*/

    navigation.navigate("AppStack");
   
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false}>
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={values => this.handleLogin(values)}
            >
              {props => {
                console.log(props, "fdsfsdfdsf");
                return (
                  <View>
                    <View style={styles.headStyle}>                   
                      <Icon name="account-key" size={100}/>
                      <Text style={styles.headText}>
                        Please Login
                      </Text>
                    </View>
                    <View style={styles.inputContainer}>
                      <Input
                        placeholder="Username"
                        value={props.values.username}
                        onChangeText={props.handleChange("username")}
                        onBlur={props.handleBlur("username")}
                        error={props.touched.username && props.errors.username}
                      />
                      <Input
                        placeholder="Password"
                        value={props.values.password}
                        onChangeText={props.handleChange("password")}
                        onBlur={props.handleBlur("password")}
                        secureTextEntry
                        error={props.touched.password && props.errors.password}
                      />
                      <Button text="Login" onPress={props.handleSubmit} />
                      <Text style={{color: 'blue'}}
                          onPress={() => this.props.navigation.navigate("Register")}>
                        Register to login.
                     </Text>
                    </View>
                  </View>
                );
              }}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loginState:state
});

const mapDispatchToProps = (dispatch:any) => {
  return {
      login:(credent:any) => dispatch(login(credent))
  }    
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
