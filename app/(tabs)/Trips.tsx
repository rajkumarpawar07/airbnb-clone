import { View, Text, SafeAreaView ,StyleSheet} from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles';

const Trips = () => {
  return (
    <SafeAreaView style={defaultStyles.container}>
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Trips</Text>
    </View>
    <View style={styles.separatorView}>
    <View style={{flex:1,borderBottomWidth:StyleSheet.hairlineWidth,backgroundColor:'#f2f2f2'}}/>
    </View>
    <View  style={{paddingHorizontal:24, gap:16}}>
    <Text style={{fontFamily:'mon-sb', fontSize:20, }}>
      No Trips Booked Yet
    </Text>
    <Text style={{fontFamily:'mon', fontSize:16}}>
      Time to dust off your bags and start planning your next adventure!
    </Text>
   
      <Text style={[styles.btnOutlineText, {width: 170}]}>
        Start Searching
      </Text>
    
    </View>
    <View style={[styles.separatorView, {marginTop:50}]}>
    <View style={{flex:1,borderBottomWidth:StyleSheet.hairlineWidth,backgroundColor:'#FFFFFF'}}/>
    </View>
    <View style={{paddingHorizontal:24}}>
    <Text style={{fontFamily:'mon'}}>
      Can't find your reservation here? 
    </Text>
    <Text style={{fontFamily:'mon-sb', textDecorationLine: 'underline'}}>
      Visit the Help Center
    </Text>
    </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:24,
    padding: 24,
  },
  separatorView:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:10,
    padding:24,
    gap:10,
},
  header: {
    fontFamily: 'mon-b',
    fontSize: 24,
  },
  separator:{
    fontFamily:'mon-sb',
    color:'grey',

},
btnOutlineText:{
  borderColor:'#000',
  borderRadius:10,
  padding:10,
  borderWidth:1,
  width:'auto',
  color:'#000',
  fontFamily:'mon-sb',
  fontSize:16,}
});

export default Trips