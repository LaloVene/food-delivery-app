import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { COLORS, icons } from "../constants";
import { categoryData, restaurantData } from "../assets/data";
import Header from "../components/Header";
import MainCategories from "../components/MainCategories";
import RestaurantList from "../components/RestaurantList";

const initialCurrentLocation = {
  streetName: "Kuching",
  gps: {
    latitude: 1.5496614931250685,
    longitude: 110.36381866919922,
  },
};

const Home = ({ navigation }: any) => {
  const [categories, setCategories] = useState(categoryData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [restaurants, setRestaurants] = useState(restaurantData);
  const [currentLocation, setCurrentLocation] = useState(
    initialCurrentLocation
  );
  function onSelectCategory(category: any) {
    //filter restaurant list data
    let restaurantList = restaurantData.filter((a) =>
      a.categories.includes(category.id)
    );
    setRestaurants(restaurantList);
    setSelectedCategory(category);
  }

  function getCategoryNameById(id: number) {
    let category = categories.filter((a) => a.id == id);

    if (category.length > 0) {
      return category[0].name;
    }
    return "";
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header
        text={initialCurrentLocation.streetName}
        iconLeft={icons.nearby}
        iconRight={icons.basket}
      />
      <MainCategories
        categoryData={categoryData}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        styles={styles}
      />
      <RestaurantList
        restaurants={restaurants}
        getCategoryNameById={getCategoryNameById}
        navigation={navigation}
        currentLocation={currentLocation}
        styles={styles}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
});

export default Home;
