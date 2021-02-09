import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
//import { loginUserService } from "../../../redux/services/api";
import { Input, Button } from "../../../components";
import {register} from "../../../redux/actions/auth";
import { connect } from "react-redux";
import styles from "./styles";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  register: (model:userData) => void;
  imageData: any;
  loading: boolean;
  regState:any;

}
interface userData {
  mobile: string;
  password: string;
  repassword:string;
}

const loginSchema = Yup.object().shape({
  mobile: Yup.string()
    .matches(/^\d+$/)
    .min(10)
    .max(16)
    .required(),
  password: Yup.string()
    .matches(/^[a-zA-Z]+(\s?[a-zA-z]+)*$/)
    .min(6)
    .max(16)
    .required(),
  repassword: Yup.string()
    .matches(/^[a-zA-Z]+(\s?[a-zA-z]+)*$/)
    .min(6)
    .max(16)
    .required(),

});

class Register extends Component<Props, {}> {
  handleLogin = (values: userData) => {
    const { navigation, register } = this.props;
    console.log("response in reg", values);
    //register(values);
    let response = register(values)  
    console.log("response in reg", response);
      //navigation.navigate("AppStack");  
  };

  render() {

    let {regState} = this.props;
    console.log("test register", regState);

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false}>
            <Formik
              initialValues={{ mobile: "", password: "", repassword:"" }}
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
                        Please Register
                      </Text>
                    </View>
                    <View style={styles.inputContainer}>
                      <Input
                        placeholder="Mobile number"
                        value={props.values.mobile}
                        onChangeText={props.handleChange("mobile")}
                        onBlur={props.handleBlur("mobile")}
                        error={props.touched.mobile && props.errors.mobile}
                      />
                      <Input
                        placeholder="Password"
                        value={props.values.password}
                        onChangeText={props.handleChange("password")}
                        onBlur={props.handleBlur("password")}
                        secureTextEntry
                        error={props.touched.password && props.errors.password}
                      />
                      <Input
                        placeholder="Retype password"
                        value={props.values.repassword}
                        onChangeText={props.handleChange("repassword")}
                        onBlur={props.handleBlur("repassword")}
                        secureTextEntry
                        error={props.touched.repassword && props.errors.repassword}
                      />
                      <Button text="Register" onPress={props.handleSubmit} />
                      <Button text="Cancel" onPress={()=>this.props.navigation.navigate("Login")} />
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
  regState:state
});

function bindToAction(dispatch: any) {
  return {
    register: (registerModel : userData) =>
      dispatch(register(registerModel))
  };
}

export default connect(mapStateToProps, bindToAction)(Register);
