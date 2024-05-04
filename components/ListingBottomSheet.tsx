import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { listing } from '@/interfaces/listing';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Listing from './Listing';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface Props{
    listings: listing[];
    category : string;
}

const ListingBottomSheet = ({listings, category}:Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(()=> ['10%','100%'],[]);
  const [refresh, setRefresh] = useState(0);

  const onShowMap = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh+1);
  };
  
    return (
      <BottomSheet
        handleIndicatorStyle={{backgroundColor:Colors.grey}}
        enablePanDownToClose={false}
        style={styles.sheetContainer}
        index={1}
        ref={bottomSheetRef} snapPoints={snapPoints}>
        <View style={{flex:1}}>
          <Listing listings={listings} category={category} refresh={refresh}/>
          <View style={styles.absoluteView}>
          <TouchableOpacity onPress={onShowMap}  style={styles.btn}>
            <Text style={{ fontFamily: 'mon-sb', color: '#fff' }}>Map</Text>
            <Ionicons name="map" size={20} style={{ marginLeft: 10 }} color={'#fff'} />
          </TouchableOpacity>
        </View>
        </View>
      </BottomSheet>
  )
}


const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  absoluteView: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 12,
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  sheetContainer: {
    borderRadius : 20,
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
export default ListingBottomSheet