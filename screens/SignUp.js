import React, { useState }  from 'react';
import {View, Text, StyleSheet,Button,TextInput, ImageBackground,TouchableOpacity,Picker } from 'react-native';
import Firebase from '../firebase.js';



//This line is used to prevent yellow errors caused by the firebase in application.
console.disableYellowBox = true;

const SignUp = props => {

  
  const {navigation} = props;

//   const dbh = Firebase.firestore();

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [username, setUsername] = useState('');

function handleSignUp(){
  
    Firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => navigation.navigate('Tabs'))
        .catch(error => alert(error))
}

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
        placeholder="User Name:" 
        placeholderTextColor="#003f5c"
        onChangeText={username => setUsername(username)}
        defaultValue=""/>
    </View>
    <View style={styles.inputView} >
      <TextInput  
        style={styles.inputText}
        placeholder="E-mail:" 
        placeholderTextColor="#003f5c"
        onChangeText={email => setemail(email)}
        defaultValue={email}/>
    </View>
    <View style={styles.inputView} >
      <TextInput  
        style={styles.inputText}
        placeholder="Password:" 
        placeholderTextColor="#003f5c"
        onChangeText={password => setpassword(password)}
        defaultValue={password}/>
    </View>
   
     <TouchableOpacity  onPress={handleSignUp}>
      <Text>Sign Up</Text>
    </TouchableOpacity>
   
    </View>
 
  );
  }
  
  export default SignUp;