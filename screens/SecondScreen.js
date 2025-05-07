import React, { useState } from "react";
import { View,Text,FlatList,Image,TouchableOpacity,StyleSheet,TextInput} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const SecondScreen = ({ navigation }) => {
  const items = [
    { id: "1", Name: "Milk",Description: "1 litre", Price: "£6", Category: "Dairy", image: require("../assets/milk-bottle.png") },
    { id: "2", Name: "Eggs",Description: "1 Dozen", Price: "£4", Category: "Dairy", image: require("../assets/Eggs.jpg") },
    { id: "3", Name: "Bread",Description: "6 Pieces", Price: "£6", Category: "Bakery", image: require("../assets/bread.jpg") },
    { id: "4", Name: "Jam", Description: "250ml", Price: "£3", Category: "Bakery", image: require("../assets/jam.jpg") },
    { id: "5", Name: "Butter",Description: "Small", Price: "£5", Category: "Dairy", image: require("../assets/butter.jpg") },
    { id: "6", Name: "Yougurt",Description: "Small", Price: "£5", Category: "Dairy", image: require("../assets/Yougurt.jpg") },
    { id: "7", Name: "Cookies",Description: "6 Pieces", Price: "£10", Category: "Bakery", image: require("../assets/cookies.jpg") },
    { id: "8", Name: "Pastries",Description: "6 Pieces", Price: "£12", Category: "Bakery", image: require("../assets/pastries.jpg") },
    { id: "9", Name: "Apple",Description: "1 Dozen", Price: "£4", Category: "Fruit", image: require("../assets/apple.jpg") },
    { id: "10",Name: "Banana", Description: "1 Dozen", Price: "£4", Category: "Fruit", image: require("../assets/banana.jpg") },
    { id: "11",Name: "Oranges",Description: "1 Dozen", Price: "£3", Category: "Fruit", image: require("../assets/oranges.jpg") },
    { id: "12",Name: "Mango", Description: "1 Dozen", Price: "£6", Category: "Fruit", image: require("../assets/mango.jpg") },
    { id: "13",Name: "Bear", Description: "500ml", Price: "£10", Category: "Beverages", image: require("../assets/bear.jpg") },
    { id: "14",Name: "Juice",Description: "500ml", Price: "£3", Category: "Beverages", image: require("../assets/juice.jpg") },
    { id: "15",Name: "Water",Description: "500ml", Price: "£2", Category: "Beverages", image: require("../assets/water.jpg") },
    { id: "16",Name: "Coke", Description: "500ml", Price: "£5", Category: "Beverages", image: require("../assets/coke.jpg") },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); 

  const filteredItems = items
    .filter(
      (item) =>
        (selectedCategory === "All" || item.Category === selectedCategory) &&
        item.Name.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      const priceA = parseFloat(a.Price.replace("£", ""));
      const priceB = parseFloat(b.Price.replace("£", ""));
      return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    });

  const categories = ["All", ...new Set(items.map((item) => item.Category))];

  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSelectItem = (item) => {
    const isSelected = selectedItems.some((selected) => selected.id === item.id);
    if (isSelected) {
      setSelectedItems(selectedItems.filter((selected) => selected.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.Name}</Text>
        <Text style={styles.itemDescription}>{item.Description}</Text>
        <Text style={styles.itemPrice}>{item.Price}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleSelectItem(item)}
        style={styles.checkbox}
      >
        <Icon
          name={selectedItems.some((selected) => selected.id === item.id) ? "check-circle" : "circle-o"}
          size={28}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search items..."
        placeholderTextColor="grey"
        value={searchText}
        onChangeText={setSearchText}
      />
      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item && styles.selectedCategoryButton,
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === item && styles.selectedCategoryButtonText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity
        style={styles.sortButton}
        onPress={handleSortToggle}
      >
        <Text style={styles.sortButtonText}>
          Sort by Price ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </Text>
      </TouchableOpacity>
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (selectedItems.length === 0) {
            alert("Please select at least one item before proceeding to the basket.");
          } else {
            navigation.navigate("Basket", { selectedItems });
          }
        }
        }
>
        <Text style={styles.buttonText}>Proceed to Basket</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: "rgb(210,180,157)",
    padding: 10,
  },
  searchBar: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    shadowColor: "grey",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  categoryContainer: {
    marginBottom: 20, 
  },
  categoryButton: {
    backgroundColor: "white",
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginHorizontal: 5,
    borderColor: "grey",
    borderWidth: 1,
    shadowColor: "grey",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCategoryButton: {
    backgroundColor: "blue",
    borderColor: "blue",
  },
  categoryButtonText: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
   selectedCategoryButtonText: {
    color: "white",
  },
 
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    shadowColor: "grey",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    
  },
  itemDescription: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  checkbox: {
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    alignSelf:'center',
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  sortButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    alignSelf:'center',
    
  },
  sortButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  
  },
});

export default SecondScreen;