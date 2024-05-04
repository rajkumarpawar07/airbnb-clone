import { View, Text, SafeAreaView ,StyleSheet} from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'
import { FontAwesome6, Ionicons } from '@expo/vector-icons'

const Inbox = () => {
  return (
    <SafeAreaView style={defaultStyles.container}>
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Inbox</Text>
    </View>
    <View style={styles.mainContainer}>
    <FontAwesome6 name="message" size={24} color="black" />
      <Text style={{fontFamily:'mon-sb', marginBottom:20, marginTop:20,fontSize:24}}>
        No new message
      </Text>
      <Text style={{fontFamily:'mon', alignContent:'center',textAlign:'center'}}>
        When you contact a Host or send a revervation request, you'll see your messages here.
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
  header: {
    fontFamily: 'mon-b',
    fontSize: 24,
  },
  mainContainer:{
    
    padding:16,
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default Inbox