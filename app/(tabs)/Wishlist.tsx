import { View, Text, SafeAreaView, StyleSheet,Image } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'

const Wishlist = () => {
  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Wishlists</Text>
      </View>
      <View style={styles.gridContainer}>
        <View style={styles.cardContainer}>
          <Image
            source={require('@/assets/images/wishlist_image_1.jpg')}
            style={styles.image}
          />
          <Text style={{marginTop:10, fontFamily:'mon-sb', paddingHorizontal:5 , fontSize:16}}>
            Favorites
          </Text>
          <Text style={{marginTop:5, marginBottom:5,fontFamily:'mon', paddingHorizontal:5, fontSize:12}}>
            10 Saved
          </Text>
        </View>
        <View style={styles.cardContainer}>
        <Image
            source={require('@/assets/images/wishlist_image_2.jpg')}
            style={styles.image}
          />
          <Text style={{marginTop:10, fontFamily:'mon-sb', paddingHorizontal:5 , fontSize:16}}>
            Home Places
          </Text>
          <Text style={{marginTop:5, marginBottom:5,fontFamily:'mon', paddingHorizontal:5, fontSize:12}}>
            5 Saved
          </Text>
        </View>
        <View style={styles.cardContainer}>
        <Image
            source={require('@/assets/images/wishlist_image_3.jpg')}
            style={styles.image}
          />
          <Text style={{marginTop:10, fontFamily:'mon-sb', paddingHorizontal:5 , fontSize:16}}>
            Resorts
          </Text>
          <Text style={{marginTop:5, marginBottom:5,fontFamily:'mon', paddingHorizontal:5, fontSize:12}}>
            2 Saved
          </Text>
        </View>
        <View style={styles.cardContainer}>
        <Image
            source={require('@/assets/images/wishlist_image_4.jpg')}
            style={styles.image}
          />
          <Text style={{marginTop:10, fontFamily:'mon-sb', paddingHorizontal:5 , fontSize:16}}>
            Close to nature Homes
          </Text>
          <Text style={{marginTop:5, marginBottom:5,fontFamily:'mon', paddingHorizontal:5, fontSize:12}}>
            1 Saved
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  gridContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',

  },
  cardContainer: {
    width:160,
    backgroundColor: 'white',
    padding: 5,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    padding: 24,
  },
  header: {
    fontFamily: 'mon-b',
    fontSize: 24,
  },

  image: {
    borderRadius: 10,
    height: 150,
    width: 150,
  },
});
export default Wishlist