import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Listing from '@/components/Listing'
import listingData from '@/assets/data/airbnb-listings.json'
import listingDataGeo from '@/assets/data/airbnb-listings.geo.json'
import ListingMaps from '@/components/ListingMaps'
import ListingBottomSheet from '@/components/ListingBottomSheet'


const Explore = () => {
  const [category,setCategory]=useState('Tiny homes');
  const  items = useMemo(() => listingData as any, [])
  const onDataChanged = (category: string) => {
    console.log(category)
    setCategory(category)
  }
  return (
    <View style={{flex:1, marginTop:80}}>
      <Stack.Screen options={
        {header : () => <ExploreHeader onCategoryChanged={onDataChanged}/>}
      }>
      </Stack.Screen>
    <ListingMaps listings={listingDataGeo}/>
    {/* <Listing listings={items} category={category}/> */}
    <ListingBottomSheet listings={items} category={category}/>
    
    </View>
  )
}

export default Explore