import { Image, View, Text, ListRenderItem, TouchableOpacity , StyleSheet} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { defaultStyles } from '@/constants/Styles';
import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';
import { Link } from 'expo-router';
import { listing } from '@/interfaces/listing';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';

interface Props {
  listings:any[];
  category:string;
  refresh:number
}

const Listing = ({listings:items,category, refresh}:Props) => 
{
    const [loading, setLoading] = useState(false);
    const listRef = useRef<BottomSheetFlatListMethods>(null);

    useEffect(()=>{
      if(refresh){
        listRef.current?.scrollToOffset({offset:0, animated:true})
      }

    },[refresh])

    const renderRow : ListRenderItem<listing>  = ({item}) => (
      <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
      <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
        <Image source={{uri:item.xl_picture_url}} style={styles.image} />
        <TouchableOpacity style={{position:'absolute',right:30,top:30}}>
        <Ionicons name="heart-outline" size={24} color="black" />
        </TouchableOpacity>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={{fontSize:14,fontFamily:'mon-sb'}}>{item.smart_location}</Text>
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', gap:5}}>
          <Ionicons name="star" size={14} color="black" />
          <Text style={{fontFamily:'mon-sb'}}>{item.review_scores_rating/20}</Text>
        </View>
        </View>
        <Text style={{fontFamily:'mon',color:Colors.grey}}>{item.room_type}</Text>
        <Text style={{fontFamily:'mon', color:Colors.grey}}>{item.host_location}</Text>
        <View style={{flexDirection:'row' , gap:4}}>
          <Text style={{fontFamily:'mon-sb'}}>€{item.price}</Text>
          <Text style={{fontFamily:'mon', textDecorationLine:"underline"}}>night</Text>
        </View>
      </Animated.View>
      </TouchableOpacity>
      </Link>
    )
  useEffect(() => {
    console.log('reload listing', items.length, category)
    setLoading(true);
    setTimeout(() => {  setLoading(false); },100);
  }, [category])
  return (
    <View style={defaultStyles.container}>
    <BottomSheetFlatList
    
      renderItem={renderRow}
      data={loading ? [] : items}
      ref={listRef}
      ListHeaderComponent={<Text style={styles.info}>{items.length} homes</Text>}
    />
  </View>
  )
}


const styles =  StyleSheet.create ({
  listing:{
    padding:20,
    gap:5,
    marginVertical:5,
  },
  image:{
    borderWidth:StyleSheet.hairlineWidth,
    borderColor:'#EDEADE',
    width:'100%',
    height:300,
    borderRadius:10,
  },
  info: {
    textAlign: 'center',
    fontFamily: 'mon-sb',
    fontSize: 16,
    marginTop: 4,
  },
});
export default Listing



