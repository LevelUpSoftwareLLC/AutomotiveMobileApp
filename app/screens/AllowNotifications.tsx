import React, { FC, useRef, useState } from 'react';
import { View, 
    ScrollView, 
    ViewStyle, 
    TextStyle,
    TouchableOpacity,
    Platform, 
    Dimensions } from 'react-native';
import { observer } from "mobx-react-lite"
import { useStores } from 'app/models';
import { AppStackScreenProps } from "../navigators"
import PushNotification from 'react-native-push-notification/';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { useHeader } from "../utils/useHeader"
import { Icon, iconRegistry, IconTypes, Text } from "../components"
import { colors, spacing } from "../theme"

// get the height and width
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
// controls the size of the circular shadow
const circleDiameter = screenWidth * 0.12;

interface AllowNotificationsScreenProps extends AppStackScreenProps<"AllowNotifications"> {}

export const AllowNotifications: FC<AllowNotificationsScreenProps> = observer(function AllowNotifications(_props) {
    
    const scrollViewRef = useRef<ScrollView>(null);
    const [allowedScrollY, setAllowedScrollY] = useState(0);
    
    const { navigation } = _props

    
    // this is connected to the Root Store export of your model and its has functions
    const { userSettings } = useStores()
    
    const { notificationsAllowed } = userSettings;

    const goNext = () => {
        navigation.navigate("AllowTracking")
    }
    // to setup push notifications you need to build a server
    const handleAllowNotifications = () => {
      if (Platform.OS === 'ios') {
          userSettings.setNotificationsAllowed(false)

        // For iOS
        // PushNotificationIOS.requestPermissions().then((permissions) => {
        //   console.log('iOS permissions:', permissions);
        //   userSettingsStore.setNotificationsAllowed(true);
        // }).catch((error) => {
        //   console.error('iOS permissions error:', error);
        // });
      } else if(Platform.OS === 'android'){
          userSettings.setNotificationsAllowed(false);
        
        // For Android
        // PushNotification.requestPermissions().then((response) => {
        //   console.log('Android permission response:', response);
        //   userSettingsStore.setNotificationsAllowed(true);
        // }).catch((error) => {
        //   console.error('Android permissions error:', error);
        // });
      }
    };
    
const onLayout = () => {
    setTimeout(() => {
      const targetY = screenHeight - (screenHeight * .15);
      scrollViewRef.current?.scrollTo({ y: targetY, animated: true });
      setAllowedScrollY(targetY - screenHeight * Number.MIN_VALUE); // Update the allowed scroll position
    }, 500);
  };

  const handleScroll = (event: { nativeEvent: { contentOffset: { y: any; }; }; }) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    // if the curent posistion is less than the allowed scroll position, allow the user to scroll
    if (currentScrollY < allowedScrollY) {
      // If user tries to scroll up beyond the limit, reset the scroll position
      scrollViewRef.current?.scrollTo({ y: screenHeight * .85, animated: false });
    }else{
        scrollViewRef.current?.scrollTo({ y: screenHeight * .85, animated: false });
    }
  };

  return (
    <ScrollView 
    style={$scrollViewStyle}
    nestedScrollEnabled={true}
    ref={scrollViewRef}
    onLayout={onLayout} 
    scrollEventThrottle={16}
    onScroll={handleScroll}>
    <View style={$containerWrapper}> 
    <View style={$emptyView} />
    <View style={$container}>
      {/* This container now has the border and rounded corners at the top */}
      <View style={$headerRow}>
        <TouchableOpacity style={[$closeButton, $textShadow]} onPress={goNext}>
          <Text tx={"common.later"} style={$x}></Text>
        </TouchableOpacity>

      </View>
      <View style={[$iconsContainer, $iconShadow]}>
       
        <Icon icon="stayInformed" containerStyle={{ zIndex: 1 }} size={190} />
        <View style={$androidShadow1}>
        </View>
        <Icon icon="notification" size={190} />
        <View style={$androidShadow2}/>
            <View style={$shadow1} />
            <View style={$shadow2} />
            <View style={$shadow3} />
            <View style={$shadow4} />
      </View>

      <Text style={$descriptionText}>
        Allow notifications to improve experience—this is the easiest way to help you stay on top of your subscriptions
      </Text>
      <Text style={$subDescriptionText}>
        By allowing notifications, you'll be updated with:
      </Text>
     
      <View style={$line}>
            <Icon icon="check" size={60} />
              <Text style={$lineText}>
                <Text weight="bold" style={$headline}>Important</Text>:{' '}<Text size="xs">Maintenance updates</Text>
              </Text>
        </View>

        <View style={$line}>
            <Icon icon="bell" size={60} />
              <Text style={$lineText}>
                <Text weight="bold" style={$headline}>Notifications</Text>{' '}<Text size="xs">when you receive a message</Text>
              </Text>
        </View>
    
        <View style={$line}>
            <Icon icon="clap" size={60} />
              <Text style={$lineText}>
                <Text weight="bold" style={$headline}>Important</Text>:{' '}<Text size="xs">Vehicle updates</Text>
              </Text>
        </View>

        <View style={$line}>
            <Icon icon="heart" size={60} />
              <Text style={$lineText}>
                <Text weight="bold" style={$headline}>Discounts</Text>{' '}<Text size="xs">and helpful information</Text>
              </Text>
        </View>
      
      <TouchableOpacity style={$allowButton} 
      onPress={()=>{
        handleAllowNotifications()
        setTimeout(() => {
          goNext()
          
        }, 250);
      }}
      >
        <Text style={$allowButtonText}>Allow Notifications<Text>Notifications Allowed: {notificationsAllowed ? 'Yes' : 'No'}</Text></Text>
      </TouchableOpacity>
    </View>
    </View>

  </ScrollView>
  );
});

const $scrollViewStyle: ViewStyle = {
  flex: 1,
};

const $emptyView: ViewStyle = Platform.select<ViewStyle>({
    ios: {
        height: screenHeight * 0.91, 
        backgroundColor: colors.palette.neutral200,
        },
    android: {
        height: screenHeight * 0.04, // Adjusted as per your setup
        backgroundColor: colors.palette.neutral200,
        },
    })as ViewStyle;

const $containerWrapper:ViewStyle = Platform.select<ViewStyle>({
    ios: {
        backgroundColor: colors.palette.neutral200, // Ensure it matches the $container's background
        },
    android: {
        backgroundColor: colors.palette.neutral200, // Ensure it matches the $container's background
        
        },
})as ViewStyle;


  
const $container: ViewStyle = Platform.select<ViewStyle>({
    ios: {
        backgroundColor: colors.palette.neutral600,
        paddingHorizontal: spacing.md, // Adjusted to 0 to ensure border spans full width
        paddingTop:spacing.lg,
        borderTopLeftRadius: spacing.lg,
        borderTopRightRadius: spacing.lg,
        borderWidth: 1,
        borderColor: 'black',
        height: screenHeight,
    },
    android: {
        backgroundColor: colors.palette.neutral600,
        paddingTop: spacing.md,
        paddingHorizontal: spacing.sm, // Adjusted to 0 to ensure border spans full width
        borderTopLeftRadius: spacing.lg,
        borderTopRightRadius: spacing.lg,
        borderWidth: 1,
        borderColor: 'black',
        height: screenHeight,
    },
})as ViewStyle;


const $headerRow: ViewStyle = Platform.select<ViewStyle>({
    ios: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.xs, // Padding moved here from $container for content
        paddingBottom: spacing.sm,
    },
    android: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.xs, // Padding moved here from $container for content
        paddingBottom: spacing.xxs,
        
    },
})as ViewStyle;
    

const $closeButton: ViewStyle = {
  alignSelf: 'flex-start',
  
};

const $iconsContainer: ViewStyle = Platform.select<ViewStyle>({
    ios: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
        
    },
    android: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
        
        
    },
})as ViewStyle;

const $textShadow: ViewStyle = Platform.select({
  ios: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    marginHorizontal: screenWidth * 0.02,
  },
  android: {
    shadowOffset: { width: 0, height: 4 }, // Shadow direction and distance
    shadowOpacity: 0.9, // Shadow opacity
    shadowRadius: 3, // Blur radius
    elevation: 3, // Elevation for Android
    
  },
  
}) as ViewStyle;

const $iconShadow: ViewStyle = Platform.select({
    ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        marginHorizontal: screenWidth * 0.02,
    },
    android: {
        // see custom shadow below
    },
  }) as ViewStyle;

const $descriptionText: TextStyle = {
  color: 'white',
};

const $subDescriptionText: TextStyle = {
  color: 'white',
};

const $allowButton: ViewStyle = {
  backgroundColor: colors.palette.primary500,
  paddingVertical: 15,
  borderRadius: 30,
  alignItems: 'center',
};

const $allowButtonText: TextStyle = {
  color: 'white',
  fontWeight: 'bold',
};


  const $x: TextStyle = {
    color: colors.background,
    backgroundColor: colors.palette.neutral600,
    paddingHorizontal: spacing.xxs, // Adjusted to 0 to ensure border spans full width
    paddingVertical: spacing.xxxs,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    textAlign: 'center',

  };
  // layout of the images in line with the text
  const $line: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center', // Aligns items vertically within the container
    paddingVertical: spacing.xs, // padding between items
  };

  const $headline: TextStyle = {
    fontWeight: 'bold',
  }
  // controls the lines with the image on the left
  const $lineText: TextStyle = {
    flex: 1, 
  };

  const $androidShadow1: ViewStyle = Platform.select({
    android: {
        position: 'absolute',
        flexDirection: 'column-reverse',
        right: screenWidth-(screenWidth*.273),
        top: screenHeight-(screenHeight*.909),
        borderRadius: (screenWidth * 0.22) / 2,
        borderBottomLeftRadius: 5, // Optional: adjust to match your design
        borderBottomRightRadius: 5,
        height: screenWidth * 0.22,
        width: '22%'

    },
    // Add iOS or other platform styles as needed.
  }) as ViewStyle;

  const $androidShadow2: ViewStyle = Platform.select({
    android: {
        position: 'absolute',
        flexDirection: 'column-reverse',
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Adjust color and opacity to mimic shadow
        left: screenWidth-(screenWidth*.4),
        top: screenHeight-(screenHeight*.757),
        borderBottomLeftRadius: 5, // Optional: adjust to match your design
        borderBottomRightRadius: 5,
        height: 4,
        width: '23%'
    },
    // Add iOS or other platform styles as needed.
  }) as ViewStyle;

  const $shadow1: ViewStyle = {
    ...$androidShadow2,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    top: screenHeight - (screenHeight * 0.757) - 1, // Slightly offset from the base layer
  };
  
  const $shadow2: ViewStyle = {
    ...$androidShadow2,
    backgroundColor: 'rgba(0, 0, 0, 0.10)',
    top: screenHeight - (screenHeight * 0.757) - 2, // Further offset from the first layer
    width: '24%', // Slightly wider to simulate diffusing shadow
    left: screenWidth - (screenWidth * 0.405), // Adjust left position to center the shadow effect
  };
  
  const $shadow3: ViewStyle = {
    ...$androidShadow2,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    top: screenHeight - (screenHeight * 0.757) - 3, // Further offset
    width: '25%', // Even wider
    left: screenWidth - (screenWidth * 0.410),
  };
  
  const $shadow4: ViewStyle = {
    ...$androidShadow2,
    backgroundColor: 'rgba(0, 0, 0, 0.025)',
    top: screenHeight - (screenHeight * 0.757) - 4, // Max offset
    width: '26%',  // Max width to simulate the outermost shadow
    left: screenWidth - (screenWidth * 0.415),
  };