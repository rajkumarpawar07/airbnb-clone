import { View, Text ,StyleSheet, Dimensions, Image, TouchableOpacity, Share} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import listingData from '@/assets/data/airbnb-listings.json'
import Animated, { SlideInDown, interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'
import { listing } from '@/interfaces/listing'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { defaultStyles } from '@/constants/Styles'

const IMG_HEIGHT = 300;
const {width} = Dimensions.get('window');
const Page = () => {
    const { id }= useLocalSearchParams<{ id: string }>();
    const listing : listing= (listingData as any[]).find((item) => item.id === id);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const navigation = useNavigation();
  const shareListing = async () => {
    try {
      await Share.share({
        title: listing.name,
        url: listing.listing_url,
      });
    } catch (err) {
      console.log(err);
    }
  };
useLayoutEffect(() => { 
navigation.setOptions({
  headerTitle: '',
  headerTransparent: true,
  headerBackground: () => (
    <Animated.View style={[headerAnimatedStyle, styles.header]}></Animated.View>
  ),
  headerRight: () => (
    <View style={styles.bar}>
      <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
        <Ionicons name="share-outline" size={22} color={'#000'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.roundButton}>
        <Ionicons name="heart-outline" size={22} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  ),
  headerLeft: () => (
    <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back" size={24} color={'#000'} />
    </TouchableOpacity>
  ),
});

}, []);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  }, []);
    return (
    <View style={styles.container}>
      <Animated.ScrollView
      ref={scrollRef}
      contentContainerStyle={{paddingBottom: 100}}
      scrollEventThrottle={16}
      alwaysBounceVertical={true} 
      >
        <Animated.Image source={{uri: listing.xl_picture_url}} 
        style={[styles.image,imageAnimatedStyle ]}/>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{listing.name}</Text>
          <Text style={styles.location}>
            {listing.room_type} in {listing.smart_location}
          </Text>
          <Text style={styles.rooms}>
            {listing.guests_included} guests · {listing.bedrooms} bedrooms · {listing.beds} bed ·{' '}
            {listing.bathrooms} bathrooms
          </Text>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Ionicons name="star" size={16} />
            <View style={{flexDirection:'row', gap:10}}>
              <Text style={[styles.ratings,{}]}>
                {listing.review_scores_rating / 20} · 
              </Text >
              <Text style={[{fontSize: 14,fontFamily: 'mon-sb',textDecorationLine:"underline"}]}>{listing.number_of_reviews} reviews
              </Text>
            </View>
          </View>
          <View style={styles.divider} />

          <View style={styles.hostView}>
            <Image source={{ uri: listing.host_picture_url }} style={styles.host} />

            <View>
              <Text style={{ fontSize: 16, fontFamily:'mon-sb' }}>Hosted by {listing.host_name}</Text>
              <Text style={{ fontSize: 14, fontFamily:'mon', color:Colors.grey}}>Host since {listing.host_since}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>{listing.description}</Text>
        </View>
      </Animated.ScrollView>
      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(150)}>
      <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice}>€{listing.price}</Text>
            <Text style={{fontFamily:'mon'}}>night</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]}>
            <Text style={defaultStyles.btnText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  backgroundColor: '#fff',
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 26,
    // fontWeight: 'bold',
    fontFamily: 'mon-sb',
  },
  location: {
    fontSize: 14,
    marginTop: 10,
    fontFamily: 'mon-sb',
  },
  rooms: {
    fontSize: 14,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: 'mon',
  },
  ratings: {
    fontSize: 14,
    fontFamily: 'mon-sb',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerText: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerPrice: {
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },

  description: {
    fontSize: 14,
    marginTop: 10,
    fontFamily: 'mon',
  },
});



export default Page