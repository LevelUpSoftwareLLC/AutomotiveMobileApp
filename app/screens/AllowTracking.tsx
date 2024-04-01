import React, { FC }  from 'react';
import { View, Text, ViewStyle, TextStyle, Dimensions, TouchableOpacity, Platform } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Circle } from 'react-native-svg';
import { useStores } from "../models"; // Assuming path
import { observer } from "mobx-react-lite";
import { colors, spacing } from "../theme"; // Assuming path
import { AppStackScreenProps } from 'app/navigators';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

interface AllowTrackingScreenProps extends AppStackScreenProps<"AllowTracking">{}

export const AllowTracking: FC<AllowTrackingScreenProps> = observer(function TrackingComponent(_props) {
  
  const { navigation } = _props

  //store actions here
  const { userSettings } = useStores();
  const {trackingAllowed} = userSettings;

  const handleAllow = () => {
    console.log('Tracking permission granted');
    if (Platform.OS === 'ios') {
      userSettings.setTrackingAllowed(true);
      navigation.navigate("Discover")
    
    // For iOS
    // PushNotificationIOS.requestPermissions().then((permissions) => {
    //   console.log('iOS permissions:', permissions);
    //   userSettingsStore.setNotificationsAllowed(true);
    // }).catch((error) => {
    //   console.error('iOS permissions error:', error);
    // });
  } else if(Platform.OS === 'android'){
      userSettings.setTrackingAllowed(true);
    
    // For Android
    // PushNotification.requestPermissions().then((response) => {
    //   console.log('Android permission response:', response);
    //   userSettingsStore.setNotificationsAllowed(true);
    // }).catch((error) => {
    //   console.error('Android permissions error:', error);
    // });
  }
  };

  const handleDeny = () => {
    console.log('Tracking permission denied');
    userSettings.setTrackingAllowed(false);
    // navigation.navigate("Discover")
  };


  return (
    <View style={$container}>
      {/* Circular gradient shadow */}
      <Svg height="200" width="200" style={$shadow}>
        <Defs>
          <RadialGradient id="grad" cx="50%" cy="50%" rx="50%" ry="50%" fx="50%" fy="50%">
            <Stop offset="0%" stopColor="#000" stopOpacity="0.2" />
            <Stop offset="100%" stopColor="#000" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Circle cx="100" cy="100" r="90" fill="url(#grad)" />
      </Svg>

      <View style={$messageContainer}>
        <Text style={$header}>We value your privacy</Text>
        <Text style={$message}>
          To provide a personalized experience, we track your activity across apps. This data helps us offer content tailored just for you. Do you allow us to track your activity?
        </Text>
        <TouchableOpacity style={[$button, $allowButton]} onPress={handleAllow}>
        <Text style={$buttonText}>Allow Notifications<Text>Allow: {trackingAllowed ? 'Yes' : 'No'}</Text></Text>
        </TouchableOpacity>
        <TouchableOpacity style={[$button, $denyButton]} onPress={handleDeny}>
          <Text style={$buttonText}>Don't Allow</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const $container: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFF',
};

const $shadow: ViewStyle = {
  position: 'absolute',
  left: (screenWidth - 200) / 2,
  top: (screenHeight - 200) / 2,
};

const $messageContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
};

const $header: TextStyle = {
  fontSize: 22,
  fontWeight: 'bold',
  marginBottom: spacing.md,
};

const $message: TextStyle = {
  fontSize: 16,
  marginBottom: spacing.lg,
};

const $button: ViewStyle = {
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.lg,
  borderRadius: 5,
  marginBottom: spacing.sm,
  width: screenWidth * 0.8, // 80% of screen width
  alignItems: 'center',
};

const $allowButton: ViewStyle = {
  backgroundColor: colors.palette.primary500, // Assuming color exists
};

const $denyButton: ViewStyle = {
  backgroundColor: colors.palette.angry100, // Assuming color exists
};

const $buttonText: TextStyle = {
  color: colors.palette.accent500,
  fontSize: 16,
};

/**
 * 
 * const AppStack = observer(function AppStack() {
  const {
    authenticationStore: { isAuthenticated },
    // Add the necessary stores or state variables to check notification and tracking permissions
    notificationStore: { isNotificationAllowed },
    trackingStore: { isTrackingAllowed },
  } = useStores()

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName={isAuthenticated ? "Welcome" : "AllowNotifications"}
    >
      {isAuthenticated ? (
        <>
          {isNotificationAllowed && isTrackingAllowed ? (
            <Stack.Screen name="Discover" component={DemoNavigator} />
          ) : (
            <>
              {!isNotificationAllowed && (
                <Stack.Screen name="AllowNotifications" component={Screens.AllowNotifications} />
              )}
              {!isTrackingAllowed && (
                <Stack.Screen name="AllowTracking" component={Screens.AllowTracking} />
              )}
            </>
          )}
        </>
      ) : (
        <>
          <Stack.Screen name="AllowNotifications" component={Screens.AllowNotifications} />
          <Stack.Screen name="AllowTracking" component={Screens.AllowTracking} />
        </>
      )}
      <Stack.Screen name="Login" component={Screens.LoginScreen} />

      //</Stack.Navigator>
     // )
    //})
 //*/