import React, { useState, useRef, FC, useEffect } from 'react';
import {Platform,
  Animated, 
  FlatList, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  ViewStyle, 
  ImageStyle,
  NativeScrollEvent,
  Dimensions,
  TextStyle } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from "app/components"
import { observer } from 'mobx-react-lite';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { DemoTabParamList } from "app/navigators/DemoNavigator";
import { AppStackParamList } from "../navigators"
import { colors, spacing } from "../theme"
import { TxKeyPath } from "../i18n"

// get the height and width
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
  // array to manage the FlatList at the bottom of the component near line 205
  const citiesData = [
    {
      cityName: 'Denver',
      imageUrl: require('../../assets/images/Denver.jpg'), // For local images use require
      // If using network images, replace require with the URL string:
      // imageUrl: 'http://example.com/path/to/new_york_image.jpg',
    },
    {
      cityName: 'McAllen',
      imageUrl: require('../../assets/images/McAllen.jpg'), // Adjust path as necessary
    },
    {
      cityName: 'San Francisco',
      imageUrl: require('../../assets/images/SF.jpg'), // Adjust path as necessary
    },
    {
      cityName: 'Dallas',
      imageUrl: require('../../assets/images/Dallas.jpg'), // Adjust path as necessary
    },
  ];
 /**
 * DiscoverScreenProps combines props from both the bottom tab and stack navigators.
 * This allows Discover to be used within both navigational contexts while
 * maintaining type safety. It utilizes CompositeScreenProps to merge:
 * - BottomTabScreenProps: Props provided by the bottom tab navigator, specifying
 *   'Discover' as the route.
 * - NativeStackScreenProps: Props from any stack navigator within the app,
 *   allowing DiscoverScreen to access stack navigation actions and state.
 */
 type DiscoverScreenProps = CompositeScreenProps<BottomTabScreenProps<DemoTabParamList, 'DiscoverScreen'>, // Props from the tab navigator
  NativeStackScreenProps<AppStackParamList> // Props from the stack navigator
>;

  export const DiscoverScreen: FC<DiscoverScreenProps> = observer(function DiscoverScreen(_props){
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [searchBarBottom, setSearchBarBottom] = useState(0);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    //AppParamsList props for routing
    const { navigation } = _props

    // navigation control for 'Learn More"
    const openSearchScreen = () => {
      navigation.navigate('Welcome'); // Make sure 'SearchScreen' is the correct name of your search screen route
      };
    // unsures the searchbar is visible on load
    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }, []); 
    // Calculates if the ScrollView's scroll position is past the search bar.
    const onScroll = ({ nativeEvent }: { nativeEvent: NativeScrollEvent }) => {
      const platformAdjustment = Platform.OS === 'android' ? 60 : 0;
    // `searchBarBottom` represents the Y position of the search bar's bottom edge.
    // Subtracting `(screenHeight * -.39)` means you're triggering the effect slightly before
    // reaching the actual bottom of the search bar, based on a percentage of the screen height.
    const isPastSearchBar = nativeEvent.contentOffset.y >= searchBarBottom - (screenHeight * -.38) + platformAdjustment;
    if (isPastSearchBar) {
      Animated.timing(fadeAnim, {
        toValue: 1, // Animate opaqucity
        duration: 350, // Duration of the animation
        useNativeDriver: false,
      }).start();
    } 
    setIsAtBottom(isPastSearchBar); // Assuming setIsAtBottom is now more like setIsPastSearchBar for clarity
  };

    return (
      <View style={$mainViewStyle}>
      {/* Search Bar at the top */}
      <TouchableOpacity onPress={openSearchScreen} 
      style={[isAtBottom ? $searchBarContainerScroll : $searchBarContainer]} 
      onLayout={(event) => {
          const {y, height} = event.nativeEvent.layout; // controls when the background of the searchbar is triggered
          setSearchBarBottom(y + height); // Calculate the bottom position of the search bar
        }}>
      {/* for the animation of the search bar */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={[isAtBottom ? $searchBarWrapperScroll : $searchBarWrapper]}>
          <View pointerEvents="none" style={$searchBar}>
            <TextInput 
              placeholder="Search by Vehicle or Location"
              editable={false}  // Non-editable, just for show
              style={{flex: 1}} // Ensure it fills the container but leaves room for the icon
            />
          </View>
          <Icon name="search" size={20} color="#000" style={$searchIcon} />
        </View>
      </Animated.View>
      </TouchableOpacity>
      {/* Main Image */}
      <View style={$image_text}>
        <Image
          source={{ uri: 'https://imgur.com/EFe4spv.jpg' }}
          style={$imageStyle}
        />
        {/* Text under the image */}
        <View style={$headerText}>
          <Text> Discover what moves you...</Text>
        </View>
      </View>
      {/* Scrollable Content The Collapsable header starts here*/}
      <ScrollView style={$scrollViewStyle}
          nestedScrollEnabled={true}
          onScroll={onScroll} 
          scrollEventThrottle={16}>
          {/* This empty view is used to push the content down so it starts after the image */}
          <View style={$emptyView} />
        {/* Content Container */}
        <View style={$contentContainer}>
         {/* first line */}
        <View style={$line}>
        <Image source={{ uri: 'https://imgur.com/blNg8sm.png' }} style={$lineImage}/>
            <Text style={$lineText}>
            <Text weight="bold" style={$headline}>We're your 24/7</Text>:{'\n'}
            <Text size='xs'>
              We offer a wide range of services, including vehicle maintenance, roadside assistance, and more.
              There's peace of mind knowing that everyone on Seraph is screened, and we are here for you 24/7 with roadside coverage, maintenance, and account support.
            </Text>
            </Text>
        </View>
          {/* Second line */}
        <View style={$line}>
        <Image source={{ uri: 'https://imgur.com/uVVHn54.png' }} style={$lineImage} />
            <Text style={$lineText}><Text weight="bold" style={$headline}>Drive with assurance</Text>:{'\n'}
            <Text size='xs'>
              With a wide selection of subscription options, not only will you be able to access flexible vehicle options but you’ll be fully covered in the event of an emergency.</Text>
            </Text>
        </View>
          {/* Third line */}
        <View style={$line}>
          <Image source={{ uri: 'https://imgur.com/BTAeSuX.jpg' }}
            style={$lineImage}
            />
            <Text style={$lineText}><Text weight="bold" style={$headline}>Preserve Wealth</Text>:{'\n'}
              <Text size='xs'>
              The American Automobile Association (AAA) reported that the average annual cost to own and operate a new vehicle was $9,666 in 2021, translating to approximately $805 per month and within 5 years a vehicle can depreciates up to 60%.
              </Text>
            </Text>
        </View>
          {/* Fourth line */}
        <View style={$line}>
          <Image source={{ uri: 'https://imgur.com/Ib5LXDK.jpg' }}
            style={$lineImage}
            />
              <Text style={$lineText}>
                <Text weight="bold" style={$headline}>Give the gift of drive</Text>:{'\n'}<Text size="xs">
                  Move someone you care about, explore our gift cards for a great way to make someones next drive extra memorable.
                </Text>
              </Text>
        </View>

        {/* Featured Autoblog */}
        <View style={$blogContainer}>
          <View style={$blogTextContainer}>
                <Text style={$blogText}> Featured AutoBlog: </Text>
          </View>
          <View style={$featuredAutoblogContainer}>
            <Image
              source={{ uri: 'https://imgur.com/xfqsUt1.jpg' }}
              style={$featuredAutoblogImage}
            />
            <View style={$descriptionContainer}>
              <Text style={$featuredAutoblogText}> <Text weight="bold" style={$headline} >This week</Text>:{'\n'}“Auto suscription is the future”<Text style={$learnMore}>{'\n'}Learn More</Text></Text>
            </View>
          </View>
        </View>

        {/* Browse by City */}
        <View style={$browseByCity}>
                <Text weight="bold" style={$city}> Browse by City: </Text>
          </View>
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={citiesData} // You'll need to define this array
          renderItem={({ item }) => (
            <View style={$shadowWrapper}>
            <View style={$cityContainer}>
              <Image source={item.imageUrl} style={$cityImage} />
              <Text style={$cityText}>{item.cityName}</Text>
            </View>
            </View>
          )}
        />
        </View>
      </ScrollView>
    </View>
    );
  });

  const $mainViewStyle: ViewStyle = {
    flex: 1,
    backgroundColor: 'white',
  };
 
  const $searchBarContainer: ViewStyle =Platform.select<ViewStyle>({
    ios: {
      paddingVertical: spacing.xs,
      top: spacing.xxl, 
      width: '100%',
      paddingHorizontal: spacing.md, 
    },
    android: {
      paddingBottom: spacing.xs,
      paddingTop: spacing.lg,
      width: '100%',
    },
  })!; // Adding ! 

  const $searchBarContainerScroll: ViewStyle=Platform.select<ViewStyle>({
    ios: {
      paddingVertical: spacing.xs,
      zIndex: 3, 
      top: spacing.xxl, 
      width: '100%', 
      paddingHorizontal: spacing.md,
      borderBottomWidth: 2,
      borderColor: 'black',
      borderStyle: 'solid',
      backgroundColor:colors.palette.secondary300,
    },
    android: {
      paddingTop: spacing.lg,
      paddingBottom: spacing.xs,
      width: '100%',
      paddingHorizontal: spacing.md,
      borderBottomWidth: 2,
      backgroundColor:colors.palette.secondary300
    },
  })!; // Adding !

  const $searchBarWrapper: ViewStyle = Platform.select<ViewStyle>({
    ios: {
      marginTop:spacing.xxxs,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white', 
      borderRadius: spacing.sm, 
      borderWidth: 1,
      borderColor: '#000',
    },
    android: {
      marginTop:spacing.xxs,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white', 
      borderRadius: spacing.sm, 
      borderWidth: 1, 
      borderColor: '#000', 
    },
  })!; // !

  const $searchBarWrapperScroll: ViewStyle = Platform.select<ViewStyle>({
    ios: {
      marginTop:spacing.xxxs,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white', 
      borderRadius: spacing.sm, 
    },
    android: {
      marginTop:spacing.xxs,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white', 
      borderRadius: spacing.sm, 
    },
  })!;

  const $searchBar: TextStyle = Platform.select<ViewStyle>({
    ios: {
      flex: 1,
      backgroundColor: 'white',
      borderRadius: spacing.sm, 
      height: screenHeight * 0.055, 
      paddingLeft: spacing.md, 
    },
    android: {
      flex: 1,
      backgroundColor: 'white',
      borderRadius: spacing.sm, 
      height: screenHeight * 0.055, 
      paddingLeft: spacing.md, 
    },
  })!; // Adding ! at the end of the Platform.select call tells TypeScript that you are sure the result will not be undefined
  // the magnifying glass in the search bar
  const $searchIcon: ViewStyle = {
    position: 'absolute',
    right: 10, // Adjust the left value as needed to position the icon inside the search bar
    zIndex: 1,
  };
  // set the image the header will scroll above
  const $imageStyle: ImageStyle = {
    width: '100%',
    aspectRatio: 1.2,
    height: screenHeight - (screenHeight * 0.55), // Adjust to the height of your image
    position:'absolute', // position absolute is important
    ...Platform.select({
      ios: { top: 48 },
      android: {}, // No additional padding for Android
    }),
  };
  
  const $scrollViewStyle: ViewStyle = {
    flex: 1,
  };
  
  const $contentContainer: ViewStyle = {
    padding: 20,
    backgroundColor: '#ffffff', // Use a background color to cover the image as you scroll
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  };
  // empty view that pushes down the scroll tab making the collapsable header
  const $emptyView: ViewStyle = {
    height: screenHeight * 0.55, // creates the collapsable header
  }
  // controls the text beneith the image
  const $headerText: ViewStyle = Platform.select<ViewStyle>({
    ios: {
      backgroundColor: '#e8f5e9', // Example light green color, replace with colors.palette.overlay20 if you have it defined
      padding: 8,
      top: screenHeight - (screenHeight*.498),
      width:screenWidth,
      borderRadius: 8,
      alignItems: 'center', // Center child components horizontally
      justifyContent: 'center'
    },
    android: {
      backgroundColor: '#e8f5e9', // Example light green color, replace with colors.palette.overlay20 if you have it defined
      padding: 8,
      position:'absolute',
      width:screenWidth,
      top: screenHeight - (screenHeight*.549),
      borderRadius: 8,
      alignItems: 'center', // Center child components horizontally
      justifyContent: 'center'
    },
  })!; // Adding ! at the end of the Platform.select

  const $headline: TextStyle = {
    fontWeight: 'bold',
  }
  // layout of the images in line with the text
  const $line: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center', // Aligns items vertically within the container
    paddingVertical: spacing.xl, // padding between items
  };

  const $lineImage: ImageStyle = {
    width: 40, 
    height: 40, 
    marginRight: 10, 
    paddingBottom: 1, 
    
  };
  // controls the lines with the image on the left
  const $lineText: TextStyle = {
    flex: 1, 
  };

  const $featuredAutoblogContainer: ViewStyle = {
    // ... featured autoblog container styles
    alignItems: 'center',
  };
  // controls the blog section
  const $featuredAutoblogImage: ImageStyle = {
    width: 250,
    height: 200, 
    marginRight: 10, 
    paddingBottom: 1,
    borderRadius: 8,
    right: 45,
  };
  
  const $blogTextContainer: ViewStyle = {
    backgroundColor: '#e8f5e9', // Example light green color
    paddingVertical: spacing.lg,
    borderRadius: 8,
    alignItems: 'baseline', 
    justifyContent: 'center',
    marginBottom:spacing.lg,
  }

  const $blogText: TextStyle = {
    position:'absolute',
    left:10,
    bottom:-10,
    fontSize:22,
  }

  const $featuredAutoblogText: TextStyle = {
    margin:spacing.sm,
  };

  const $descriptionContainer: ViewStyle = {
    width: screenWidth - (screenWidth *.6), 
    position: 'absolute',
    backgroundColor: '#e8f5e9', // Example light green color
    borderRadius:8,
    left: screenWidth - (screenWidth *.55),
    top: 100,
  }

  const $learnMore: TextStyle ={
    color:'#009688',
    textDecorationLine:'underline',
    fontWeight:'bold',
    fontSize:14,
  }
  
  const $browseByCity: ViewStyle = {
    paddingVertical: spacing.md,
  }

  // controls the city card
  const $cityContainer: ViewStyle = {
    width: screenWidth * 0.4, 
    height: screenHeight * 0.3, 
    marginHorizontal: screenWidth * 0.02, 
    marginVertical: screenHeight * 0.02, // Add some space between the cards
    borderRadius: 10, // Rounded corners for the card
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 4 }, // Shadow direction and distance
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 10, // Blur radius
    elevation: 7, // Elevation for Android
    alignItems: 'center', // Center items horizontally in the container
    justifyContent: 'center', // Center items vertically in the container
  };

  const $cityImage: ImageStyle = {
    width: '100%', 
    height: '80%', 
    resizeMode: 'cover',
  };

  // this wraper helps enforce shadow styling for iOS
  const $shadowWrapper: ViewStyle = Platform.select<ViewStyle>({
    ios: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      marginHorizontal: screenWidth * 0.02,
      borderRadius: 10,
    },
    android: {

    },
  })!;

  const $image_text: ViewStyle = Platform.select<ViewStyle>({
    ios: {
      width: '100%', 
      alignItems: 'center',
    },
    android: {
      width: '100%',
    },
  })!; // Adding ! at the end of the Platform.select call tells TypeScript that you are sure the result will not be undefined

  const $city: TextStyle = {

  }

  const $blogContainer: ViewStyle = {

  }
  
  const $cityText: TextStyle = {
    
  };
  

  
