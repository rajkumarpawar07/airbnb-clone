import { View, Text, StyleSheet, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

enum Strategy{
    Google = 'oauth_google',
    Apple = 'oauth_apple',
    Facebook= 'oauth_facebook'
}


const Login = () => {
    useWarmUpBrowser();
    const router = useRouter()
    const {startOAuthFlow: googleAuth} = useOAuth({strategy:'oauth_google'})
    const {startOAuthFlow: appleAuth} = useOAuth({strategy:'oauth_apple'})
    const {startOAuthFlow: facebookAuth} = useOAuth({strategy:'oauth_facebook'})


    const onSelectAuth = async(strategy : Strategy)=>{
        const selectedAuth = {
            [Strategy.Google]:googleAuth,
            [Strategy.Apple]: appleAuth,
            [Strategy.Facebook]: facebookAuth,
        }[strategy];

        try{
            const { createdSessionId, setActive} = await selectedAuth();

            if(createdSessionId){
                setActive!({session:createdSessionId})
                router.back()
            }
        }catch(e){
            console.error('Oauth arror ', e)

        }

    }


  return (
    <View style={styles.container}>
      <View style={styles.textFieldContainer}>
      <Text style={{
        fontFamily:'mon',
        margin:10
      }} >Enter Your Email</Text>
      <TextInput  autoCapitalize='none' placeholder='Email' style={[defaultStyles.inputField]}/>
    
      </View>
      <View style={{marginBottom:30}}></View>
      
      <TouchableOpacity style={[defaultStyles.btn,{marginBottom:30}]} onPress={()=>{}}>
        <Text style={defaultStyles.btnText}>Login</Text>
    </TouchableOpacity>
    <View style={styles.separatorView}>
        <View style={{flex:1,borderBottomWidth:StyleSheet.hairlineWidth,backgroundColor:'grey'}}/>
        <Text style={styles.separator}>or</Text>
        <View style={{flex:1,borderBottomWidth:StyleSheet.hairlineWidth,backgroundColor:'grey'}}/>
    </View>

    <View style={{gap:20}}>
        <TouchableOpacity style={[styles.btnOutline]} onPress={()=>{}}>
           <Ionicons name='call-outline' size={24} style={defaultStyles.btnIcon}color='black'/>
            <Text style={styles.btnOutlineText}>Continue with Phone</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnOutline]} onPress={()=>onSelectAuth(Strategy.Apple)}>
           <FontAwesome6 name='apple' size={24} style={defaultStyles.btnIcon}color='black'/>
            <Text style={styles.btnOutlineText}>Continue with Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnOutline]} onPress={()=>onSelectAuth(Strategy.Facebook)}>
           <FontAwesome6 name='facebook' size={24} style={defaultStyles.btnIcon}color='black'/>
            <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnOutline]} onPress={()=>onSelectAuth(Strategy.Google)}>
           <FontAwesome6 name='google' size={24} style={defaultStyles.btnIcon}color='black'/>
            <Text style={styles.btnOutlineText}>Continue with Google</Text>
            </TouchableOpacity>

    </View>
     
    
    
    </View>
  )
}

const styles = StyleSheet.create({
container:{
    backgroundColor:'white',
    flex:1,
    padding:26,
},
textFieldContainer:{
    flexDirection:'column',
    borderWidth:0,
    borderColor:Colors.grey,
     borderRadius:10,
},
separatorView:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:30,
    gap:10,
},
separator:{
    fontFamily:'mon-sb',
    color:'grey',

},
btnOutline:{
    backgroundColor:'white',
    borderWidth:1,
    borderColor:Colors.grey,
    height:52,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    paddingHorizontal:10,
},
btnOutlineText:{
    color:'black',
    fontFamily:'mon-sb',
    fontSize:16,
}

})

export default Login