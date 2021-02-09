import { StyleSheet } from "react-native";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
import { colors } from "../../../constants";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBg
  },
  loadingFooter: {
    justifyContent: "center",
    alignItems: "center"
  },
  panicButton:{
    paddingLeft:60,
    paddingTop:50,
    width:'60%',
    height:'40%',
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:'60%',
    borderRadius:200,
    backgroundColor:'red',
    borderColor:'red',
    borderWidth: 20,
  },
  headText: {
    fontSize: 28,
    fontWeight: "400",
    marginTop:'20%',
    textAlign:"center"
  },
});

export default styles;
