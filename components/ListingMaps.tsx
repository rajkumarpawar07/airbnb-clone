import { View, Text,StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import MapView,  { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { defaultStyles } from '@/constants/Styles';
import { ListingGeo } from '@/interfaces/ListingGeo';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
// import MapView from 'react-native-map-clustering';

interface Props {
    listings:any;
}
const INITIAL_REGION = {
    latitude: 52.52063389742892, 
    longitude: 13.40275909461157,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
};
const ListingMaps = ({listings}:Props) => {
    const router = useRouter();
    const superClusterRef = useRef();

    const onMarkerSelected = (item: ListingGeo) => {
        console.log('Selected item:', item.properties.id);
        router.push(`/listing/${item.properties.id}`);
    };

    // Overwrite the renderCluster function to customize the cluster markers
//   const renderCluster = (cluster: any) => {
//     const { id, geometry, onPress, properties } = cluster;

//     const points = properties.point_count;
//     return (
//       <Marker
//         key={`cluster-${id}`}
//         coordinate={{
//           longitude: geometry.coordinates[0],
//           latitude: geometry.coordinates[1],
//         }}
//         onPress={onPress}>
//         <View style={styles.marker}>
//           <Text
//             style={{
//               color: '#000',
//               textAlign: 'center',
//               fontFamily: 'mon-sb',
//             }}>
//             {points}
//           </Text>
//         </View>
//       </Marker>
//     );
//   };

    

  return (
    <View style={defaultStyles.container}>
    <MapView 
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        showsUserLocation 
        showsMyLocationButton 
        initialRegion={INITIAL_REGION}
        // clusterColor='#fff'
        // clusterTextColor='#000'
        // clusterFontFamily='mon-sb'
        // renderCluster={renderCluster}
        // superClusterRef={superClusterRef } // Add the missing superClusterRef property
        >
        {listings.features.map((listing:ListingGeo) => (
            <Marker
            key={listing.properties.id}
            onPress={()=>onMarkerSelected(listing)}
            coordinate={{
                latitude: +listing.properties.latitude,
                longitude: +listing.properties.longitude,
            }}
      >
            {/* <View style={styles.marker}> */}
              {/* <Text style={styles.markerText}>€ {listing.properties.price}</Text> */}
            {/* </View> */}
            </Marker>
        ))}
     </MapView>
  </View>
  )
}
const styles = StyleSheet.create({
    marker: {
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        // borderWidth:1,
        // borderColor: Colors.grey,
        elevation: 5,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
          width: 1,
          height: 10,
        },
      },
      markerText: {
        fontSize: 14,
        fontFamily: 'mon-sb',
      },
  });
export default ListingMaps