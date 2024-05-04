

import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Iconicons from '@expo/vector-icons/Ionicons'
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

const Layout = () => {
  return (
    <Tabs screenOptions={
      {
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: {
          paddingBottom:5,
          fontFamily: 'mon-sb',
        },
        tabBarStyle: {
          height:60,
          padding:5,
        },
      }
    }>
      <Tabs.Screen
        name="Explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color,size }) => <Iconicons name="search" size={size} color={color} />,
        }}/>
       <Tabs.Screen
        name="Wishlist"
        options={{
          headerShown: false,
          title: 'Wishlist',
          tabBarIcon: ({ color,size }) => <Iconicons name="heart" size={size} color={color} />,
        }}/>
      <Tabs.Screen
        name="Trips"
        options={{
          headerShown: false,
          title: 'Trips',
          tabBarIcon: ({ color ,size}) => <FontAwesome5 name="airbnb" size={size} color={color} />,
        }}/>
      <Tabs.Screen
        name="Inbox"
        options={{
          headerShown: false,
          title: 'Inbox',
          tabBarIcon: ({ color ,size}) => <MaterialCommunityIcons name="message-outline" size={size} color={color} />,
        }}/>
      <Tabs.Screen
        name="Profile"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ color,size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}/>
    </Tabs>
  )
}

export default Layout
