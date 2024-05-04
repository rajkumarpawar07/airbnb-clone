import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ModalHeaderText from '@/components/ModalHeaderText';
import Colors from '@/constants/Colors';

const CERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (e) {
      return null;
    }
  },
  async saveToken(key: string, token: string) {
    try {
      await SecureStore.setItemAsync(key, token);
    } catch (e) {
return;}
  },
};

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'mon': require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (<ClerkProvider publishableKey={CERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
    <GestureHandlerRootView style={{ flex: 1 }}>
    <RootLayoutNav />
</GestureHandlerRootView>
  </ClerkProvider>);``
}

function RootLayoutNav() {
  console.log('RootLayoutNav');

const router = useRouter();
const {isLoaded, isSignedIn} = useAuth();


useEffect(() => {
  if(isLoaded && !isSignedIn){
    router.push('/(modals)/Login')
  }
}, [isLoaded]);

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={ {headerShown: false,}}/>
        <Stack.Screen name="(modals)/Login" 
        options={{  
          title: 'Log in or sign up to Airbnb',
          presentation: 'modal', 
          headerTitleStyle: { fontFamily: 'mon-sb' },
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'white', },
          headerLeft: () => (
            <TouchableOpacity onPress={() => 
              router.back()
              }>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          ),
        }} />

        <Stack.Screen name="listing/[id]" options={{headerTitle:'',}}/>
        <Stack.Screen name="(modals)/Bookings" options={{ 
          headerBackButtonMenuEnabled: false,
          headerBackVisible: false,
          presentation: 'transparentModal', 
          headerTitle: ()=> <ModalHeaderText/>,
          headerTransparent: true,
          headerTitleStyle: { fontFamily: 'mon-sb' },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity 
            style={{padding:4,
              borderColor:Colors.grey,
              borderRadius:20,
              borderWidth:1,
              backgroundColor:'#fff',
              justifyContent:'center',
              alignContent:'center',
            }}
            onPress={() => {
              router.back()
              }}>
              <Ionicons name="close-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
          animation:'fade'
        }} />
      </Stack>
  );
}
