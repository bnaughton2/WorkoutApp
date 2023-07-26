import React, { useEffect, useState }  from 'react';
import {View, Text, StyleSheet,Button,TextInput, ImageBackground,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Firebase from "../firebase.js";
import SignUp from './SignUp.js';
import * as SQLite from "expo-sqlite";

////This line is used to prevent yellow errors caused by the firebase in application.
console.disableYellowBox = true;

async function setStorageItem(key, item){
    try{
        await AsyncStorage.setItem(key, item, () => { 
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
        .then(() => onSuccess())
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
      .then(() => onSuccess())
      .catch(error => alert(error))
   }
};

function onSuccess(){
  setUserID();
  navigation.navigate('Tabs');
}

function setUserID(){
  const time = new Date().getDate();
  const db = SQLite.openDatabase("workout.db");
  setStorageItem('email', JSON.stringify(email));
  setStorageItem('pw', JSON.stringify(password));
  db.transaction(tx => {
    tx.executeSql(
      "select * from user WHERE email=? AND password=?",[email,password],
      (_, { rows: { _array } }) => {
        setStorageItem('userID', JSON.stringify(_array[0].userID));
        setStorageItem('firstName', JSON.stringify(_array[0].firstName));
        setStorageItem('lastName', JSON.stringify(_array[0].lastName));
        setStorageItem('username', JSON.stringify(_array[0].username));
      },
      () => console.log("error fetching")
    );
  });
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#08125d',
        alignItems: 'center',
        justifyContent: 'top',
        padding: '5%',
        },
    title:{
        fontWeight: "bold",
        fontSize:30,
        color:"#F4F5FB",
        marginBottom: '10%',
        marginTop: '25%'
        },
    inputView:{
        width:"80%",
        backgroundColor:"#0C668D",
        borderRadius:15,
        height:40,
        marginBottom:10,
        justifyContent:"center",
        padding:20
        },
    inputText:{
        height:50,
        color:"#F4F5FB"
        },
    loginText:{
        color:"#F4F5FB",
        fontSize: 16,
    },
    loginButton:{
      marginTop: 10,
      width: 150,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 40,
      backgroundColor: '#0C668D',
      marginBottom: '5%',
    },
    signUpButton: {
      color: "#F4F5FB",
      fontSize: 12,
      fontWeight: 'bold',
      textDecorationLine: 'underline'
    }
});

return (

  <View style={styles.container}>
  <Text style={styles.title}>Sign in to continue</Text>
  <View style={styles.inputView} >
    <TextInput  
      style={styles.inputText}
      placeholder="Email..." 
      placeholderTextColor="#F4F5FB"
      onChangeText={email => setemail(email)}
      defaultValue={email}
      keyboardType='email-address'/>
  </View>
  <View style={styles.inputView} >
    <TextInput  
      style={styles.inputText}
      placeholder="Password..." 
      placeholderTextColor="#F4F5FB"
      onChangeText={password => setpassword(password)}
        defaultValue={password}/>
  </View>
  <TouchableOpacity
    style={styles.loginButton}
      onPress={()=>saveValueFunction()}>
    <Text style={styles.loginText}>Login</Text>
  </TouchableOpacity>
  <TouchableOpacity 
  onPress={() => navigation.navigate('Sign Up')}>
    <Text style={styles.signUpButton}>No account? Click here to sign up.</Text>
  </TouchableOpacity>
</View>
);
}

export default Login;