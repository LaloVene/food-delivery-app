import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { COLORS, icons, SIZES, FONTS } from "../constants";
import { categoryData, restaurantData } from "../assets/data";

const initialCurrentLocation = {
  streetName: "Kuching",
  gps: {
    latitude: 1.5496614931250685,
    longitude: 110.36381866919922,
  },
};

const Header = () => {
  return (
    <View style={{ flexDirection: "row", height: 50 }}>
      <TouchableOpacity
        style={{
          width: 50,
          paddingLeft: SIZES.padding * 2,
          justifyContent: "center",
        }}
      >
        <Image
          source={icons.nearby}
          resizeMode={"contain"}
          style={{
            width: 30,
            height: 30,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "70%",
            height: "100%",
            backgroundColor: COLORS.lightGray3,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: SIZES.radius,
          }}
        >
          <Text style={{ ...FONTS.h3 }}>
            {initialCurrentLocation.streetName}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: 50,
          paddingRight: SIZES.padding * 2,
          justifyContent: "center",
        }}
      >
        <Image
          source={icons.basket}
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

function MainCategories({ selectedCategory, onSelectCategory }: any) {
  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={{
          padding: SIZES.padding,
          paddingBottom: SIZES.padding * 2,
          backgroundColor:
            selectedCategory?.id == item.id ? COLORS.primary : COLORS.white,
          borderRadius: SIZES.radius,
          alignItems: "center",
          justifyContent: "center",
          marginRight: SIZES.padding,
          ...styles.shadow,
        }}
        onPress={() => onSelectCategory(item)}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
              selectedCategory?.id == item.id ? COLORS.white : COLORS.lightGray,
          }}
        >
          <Image
            source={item.icon}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </View>
        <Text
          style={{
            maxHeight: 30,
            margin: SIZES.padding,
            color:
              selectedCategory?.id == item.id ? COLORS.white : COLORS.black,
            ...FONTS.body5,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ padding: SIZES.padding * 2 }}>
      <Text style={{ ...FONTS.h1, fontWeight: "bold" }}>Main</Text>
      <Text style={{ ...FONTS.h1 }}>Categories</Text>

      <FlatList
        data={categoryData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
      />
    </View>
  );
}

const RestaurantList = ({
  restaurants,
  navigation,
  currentLocation,
  getCategoryNameById,
}: any) => {
  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={{ marginBottom: SIZES.padding * 2 }}
        onPress={() =>
          navigation.navigate("Restaurant", {
            item,
            currentLocation,
          })
        }
      >
        {/* image */}
        <View style={{ marginBottom: SIZES.padding }}>
          <Image
            source={item.photo}
            resizeMode="cover"
            style={{
              width: "100%",
              height: 200,
              borderRadius: SIZES.radius,
            }}
          />

          {/* duration */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              height: 50,
              width: SIZES.width * 0.3,
              backgroundColor: COLORS.white,
              borderTopRightRadius: SIZES.radius,
              borderBottomLeftRadius: SIZES.radius,
              alignItems: "center",
              justifyContent: "center",
              ...styles.shadow,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
          </View>
        </View>

        {/* name */}

        <Text style={{ ...FONTS.body2 }}> {item.name} </Text>

        {/* rating */}
        <View
          style={{
            marginTop: SIZES.padding,
            flexDirection: "row",
          }}
        >
          <Image
            source={icons.star}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.primary,
              marginRight: 10,
            }}
          />
          <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>

          {/* Categories */}
          <View
            style={{
              flexDirection: "row",
              marginLeft: 10,
            }}
          >
            {item.categories.map((categoryId: number) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                  }}
                  key={categoryId}
                >
                  <Text
                    style={{
                      ...FONTS.body3,
                    }}
                  >
                    {getCategoryNameById(categoryId)}
                  </Text>
                  <Text style={{ ...FONTS.h4, color: COLORS.darkgray }}>
                    {" "}
                    .{" "}
                  </Text>
                </View>
              );
            })}

            {/* price */}
            {[1, 2, 3].map((priceRating) => (
              <Text
                key={priceRating}
                style={{
                  ...FONTS.body3,
                  color:
                    priceRating <= item.priceRating
                      ? COLORS.black
                      : COLORS.darkgray,
                }}
              >
                $
              </Text>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={restaurants}
      keyExtractor={(item) => `${item.id}`}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingHorizontal: SIZES.padding * 2,
        paddingBottom: 30,
      }}
    />
  );
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
      <Header />
      <MainCategories
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
      <RestaurantList
        restaurants={restaurants}
        getCategoryNameById={getCategoryNameById}
        navigation={navigation}
        currentLocation={currentLocation}
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
