import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import * as WebBrower from 'expo-web-browser'

export const  useWarmUpBrowser = ()=> {
  useEffect(() => {
    void WebBrower.warmUpAsync();
    return () => {
        void WebBrower.coolDownAsync();
    };

  },[])
}