import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";

interface Props {
  categoryData: any;
  selectedCategory: any;
  onSelectCategory: any;
  styles: any;
}

const MainCategories = ({
  categoryData,
  selectedCategory,
  onSelectCategory,
  styles,
}: Props) => {
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
          width: 95,
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
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
      <Text style={{ ...FONTS.h1 }}>Main</Text>
      <Text style={{ ...FONTS.h2 }}>Categories</Text>

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
};

export default MainCategories;
