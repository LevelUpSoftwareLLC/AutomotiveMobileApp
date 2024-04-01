import React, { useState, useRef } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, ViewStyle } from 'react-native';
import { Trie } from '../utils/Trie';

export const Filter = ({ navigation }) => {
  // this codes from featureFilter in ZTFS
    const [searchQuery, setSearchQuery] = useState('');
  const trie = useRef(new Trie()); // Initialize your trie structure here or import it if it's defined elsewhere
  const [suggestions, setSuggestions] = useState([]);
  const [items, setItems] = useState(data);
  
  // Populate the trie with Data
//   useEffect(() => {
//       // console.log(cardData)
//       data.forEach(item => {
//           if (item.title) {
//               trie.current.insert(item.title.toLowerCase());
//           }
//       });
//   }, [data]);

    // Function to handle search
    const handleSearch = () => {
        const filteredItems = cardData.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setItems(filteredItems);
        setSuggestions([]); // Clear suggestions after search
    };

  const handleKeyDown = (e) => {
    // Implement functionality for key presses if needed
  };

  return (
    <View style={$searchContainer}>
      <TextInput
        placeholder="Search..."
        value={searchQuery}
        onChangeText={(query) => {

          setSearchQuery(query);
          if (query.trim() === '') {  
            setSuggestions([]);
          } else {
            // Assuming trie.findCompletions is an available method
            // You would need to implement this functionality in React Native
            const completions = trie.current.findCompletions(query.toLowerCase());
            setSuggestions(completions);
          }
        }}
        onSubmitEditing={handleSearch} // Usually in RN you use onSubmitEditing for search
        style={$searchInput}
        returnKeyType="search"
      />
      <TouchableOpacity onPress={handleSearch} style={$searchButton}>
        <Text>🔎</Text>
      </TouchableOpacity>
    </View>
  );
};


 const $searchContainer: ViewStyle = {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
  }
  const $searchInput: ViewStyle = {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  }
 const $searchButton: ViewStyle ={
    padding: 10,
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 5,
  }


