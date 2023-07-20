import React, { useEffect, useState }  from 'react';
import {View, Text, StyleSheet,Button,TextInput, ImageBackground,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Firebase from "../firebase.js"
import SignUp from './SignUp.js';

////This line is used to prevent yellow errors caused by the firebase in application.
console.disableYellowBox = true;

async function setStorageItem(key, item){
    try{
        await AsyncStorage.setItem(key, item, () => { AsyncStorage.getItem(key, (err, result) => {
            console.log(result)
        });
    });
     }catch(e){
        console.log("Error ", e);
     }     
}

const Login = props => {

  const {navigation} = props;
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [getValue, setGetValue] = useState('');

  handleLogin = () => {

    Firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => navigation.navigate('Tabs'))
        .catch(error => alert(error))
}

const saveValueFunction = () => {
  if (email) {
    setStorageItem('email', email);
    setemail('');
  } 

  if (password) {
    setStorageItem('pw', password);
    setpassword('');
  }
  getValueFunction();
};


const getValueFunction = () => {

  if(email==null && password==null)
  {
    handleLogin();
  }
  else{

      if (email) {
        setStorageItem('email', email);
        setemail('');
      } 

      if (password) {
        setStorageItem('pw', password);
        setpassword('');
      }

      Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigation.navigate('Tabs'))
      .catch(error => alert(error))
   }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4FD3DA',
        alignItems: 'center',
        justifyContent: 'center',
        },
    title:{
        fontWeight: "bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom: 40,
        },
    inputView:{
        width:"80%",
        backgroundColor:"#3AB4BA",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
        },
    inputText:{
        height:50,
        color:"white"
        },
    loginText:{
        color:"white",
        fontSize: 14
    }
});

return (

  <View style={styles.container}>
  <Text style={styles.title}>Welcome</Text>
  <View style={styles.inputView} >
    <TextInput  
      style={styles.inputText}
      placeholder="Email..." 
      placeholderTextColor="#003f5c"
      onChangeText={email => setemail(email)}
      defaultValue={email}/>
  </View>
  <View style={styles.inputView} >
    <TextInput  
      style={styles.inputText}
      placeholder="Password..." 
      placeholderTextColor="#003f5c"
      onChangeText={password => setpassword(password)}
        defaultValue={password}/>
  </View>
  {/* <TouchableOpacity  onPress={() => navigation.navigate('ForgotPassword')}>
    <Text style={styles.forgot}>Forgot Password?</Text>
  </TouchableOpacity> */}
  <TouchableOpacity
      onPress={()=>saveValueFunction()}>
    <Text style={styles.loginText}>Login</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
    <Text
     style={styles.loginText}>Sign Up</Text>
  </TouchableOpacity>
</View>
);
}

export default Login;