import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import { icons, COLORS, SIZES, FONTS } from "../constants";

const Dots = ({ restaurant, scrollX }: { restaurant: any; scrollX: any }) => {
  const dotPosition = Animated.divide(scrollX, SIZES.width);
  return (
    <View style={{ height: 30 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: SIZES.padding,
        }}
      >
        {restaurant?.menu.map((item: any, index: number) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
            extrapolate: "clamp",
          });

          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              style={{
                opacity: opacity,
                borderRadius: SIZES.radius,
                marginHorizontal: 6,
                width: dotSize,
                height: dotSize,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

interface Props {
  restaurant: any;
  navigation: any;
  currentLocation: any;
  getBasketItemCount: any;
  sumOrder: any;
  scrollX: any;
}

function Order({
  restaurant,
  navigation,
  currentLocation,
  getBasketItemCount,
  sumOrder,
  scrollX,
}: Props) {
  return (
    <View>
      <Dots restaurant={restaurant} scrollX={scrollX} />
      <View
        style={{
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding * 3,
            borderBottomColor: COLORS.lightGray2,
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ ...FONTS.h3 }}>
            Items in Cart: {getBasketItemCount()}
          </Text>
          <Text style={{ ...FONTS.h3 }}>$ {sumOrder()}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding * 3,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={icons.location}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.darkgray,
              }}
            />
            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>
              Location
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={icons.master_card}
              resizeMode={"contain"}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.darkgray,
              }}
            />
            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>
              99999
            </Text>
          </View>
        </View>

        {/* Order Button */}
        <View
          style={{
            padding: SIZES.padding * 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: SIZES.width * 0.9,
              padding: SIZES.padding,
              backgroundColor: COLORS.primary,
              alignItems: "center",
              borderRadius: SIZES.radius,
            }}
            onPress={() =>
              navigation.navigate("OrderDelivery", {
                restaurant: restaurant,
                currentLocation: currentLocation,
              })
            }
          >
            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Order</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Iphone x - GAP */}
      <View
        style={{
          position: "absolute",
          bottom: -34,
          left: 0,
          right: 0,
          height: 34,
          backgroundColor: COLORS.white,
        }}
      ></View>
    </View>
  );
}

export default Order;
