
import React, {useState, FC} from "react";
import { AppStackScreenProps } from "../navigators"
import { TouchableOpacity, FlatList, View, Image, ListRenderItemInfo, TextStyle, ViewStyle, ImageStyle } from "react-native";
import { colors, spacing } from "../theme"
import { Dimensions } from 'react-native';
import { TxKeyPath } from "../i18n"
import { Text } from "app/components"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const images = [
  require('../../assets/images/walkthrough-header.png'),
  require('../../assets/images/walkthrough-header1.png'),
  require('../../assets/images/walkthrough-header2.png'),
];

const WalkthroughPageText = [
  { key: '1', title:'', description: '', image: require('') },
  { key: '2', title: '', description: '', image: require('') },
  { key: '3', title: '', description: '', image: require('') },
];

interface WalkthroughItem {
    key: string;
    title?: string;
    description?: string;
    image?: NodeRequire; // Use 'NodeRequire' if you're requiring images, or 'ImageSourcePropType' if using ImageSourcePropType from 'react-native'
  }
  
  interface WalkthroughScreenProps extends AppStackScreenProps<"Walkthrough"> {}
  
  export const WalkthroughScreen: FC<WalkthroughScreenProps> = function WalkthroughScreen(_props) {
    const { navigation } = _props // we have to bring in the route we declared in this object
    const [currentIndex, setCurrentIndex] = useState(0);
    const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
    const handleSkip = () => {
      navigation.navigate("Login"); // Navigate to Login or Welcome based on auth status
    };
    
    const getTxKeyForSlide = (index: number, t: string) => `walkthroughScreen.slides.slide${index + 1}.${t}`;
    const renderItem = ({ index }: ListRenderItemInfo<WalkthroughItem>) => (

    <View style={$slide}>
      <View style={$container}>
        <TouchableOpacity onPress={handleSkip} style={$skipButtonStyle}>
          <Text style={$skipText} tx="common.skip" />
        </TouchableOpacity>
        <Image style={$img} source={images[index]} />
        <Text style={$title} tx={getTxKeyForSlide(index, 'title') as TxKeyPath } />
        <Text style={$description} tx={getTxKeyForSlide(index, 'description') as TxKeyPath} />
        
        <View style={$radioContainer}>
          {WalkthroughPageText.map((_, index) => (
            <TouchableOpacity  key={index} onPress={() => setCurrentIndex(index)}>
              <View style={[ 
                  $radioButton, 
                  currentIndex === index ? $radioButtonActive : {}
              ]}/>
            </TouchableOpacity>
          ))}
        </View>
          <TouchableOpacity style={[$getStartedButton,$bottomContainer, $bottomContainerInsets]} onPress={() => navigation.navigate("Login")}>
            <Text style={$getStartedButtonText}>Get Started</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
    
  return (
    <FlatList
      data={WalkthroughPageText} // Assuming 3 slides for demonstration
      renderItem={renderItem}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={(e) => {
        const index = Math.floor(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
        setCurrentIndex(index);
      }}
    />
        
  );
};    

  const $slide: ViewStyle = {
    flex: 1,
    backgroundColor: colors.palette.neutral900,
  };

  const $container: ViewStyle = {
    flexShrink: 2,

    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    alignItems:'center',
    width:screenWidth * 1,
  };

  const $skipButtonStyle: ViewStyle = {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: "10%",
    right: spacing.md,
    padding: spacing.sm,
    zIndex:2,
  };

  const $skipText: TextStyle = {
    color: 'white',
    fontSize: 16,
  };

  const $img: ImageStyle = {
    width: screenWidth * 1, 
    height: screenHeight * .58, 
    marginBottom: spacing.lg,
  };
  
  const $radioContainer: ViewStyle = {
    flexDirection: 'row',
  };

  const $title: TextStyle = {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign:'center',
  };
  
  const $description: TextStyle = {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
    textAlign:'center',
    
  };

  const $radioButton: ViewStyle = {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    margin: 4,
  };
  
  const $radioButtonActive: ViewStyle = {
    backgroundColor: 'white',
  };

  const $getStartedButton: ViewStyle = {
    backgroundColor: colors.button, 
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: spacing.sm,
    marginTop: spacing.md,
  };

  const $getStartedButtonText: TextStyle = {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  };


const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
}