import { StyleSheet, SafeAreaView, Animated } from "react-native";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { icons, COLORS } from "../constants";
import FoodInfo from "../components/FoodInfo";
import Order from "../components/Order";

const Restaurant = ({ route, navigation }: any) => {
  const scrollX = new Animated.Value(0);
  const [restaurant, setRestaurant]: any = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    let item = route.params?.item;
    let currentLocation = route.params?.currentLocation;
    setRestaurant(item);
    setCurrentLocation(currentLocation);
  }, [route.params]);

  const editOrder = (action: any, menuId: number, price: number) => {
    let orderList: any = orderItems.slice();
    let item: any = orderList.filter((a: any) => a.menuId == menuId);

    if (action == "+") {
      if (item.length > 0) {
        let newQty = item[0].qty + 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price;
      } else {
        const newItem = {
          menuId: menuId,
          qty: 1,
          price: price,
          total: price,
        };
        orderList.push(newItem);
      }

      setOrderItems(orderList);
    } else {
      if (item.length > 0) {
        if (item[0]?.qty > 0) {
          let newQty = item[0].qty - 1;
          item[0].qty = newQty;
          item[0].total = newQty * price;
        }
      }
      setOrderItems(orderList);
    }
  };

  const getOrderQty = (menuId: number) => {
    let orderItem: { qty: number }[] = orderItems.filter(
      (a: { menuId: number }) => a.menuId == menuId
    );

    if (orderItem.length > 0) {
      return orderItem[0].qty;
    }

    return 0;
  };

  const getBasketItemCount = () => {
    let itemCount = orderItems.reduce(
      (acc, cur: any) => acc + (cur.qty || 0),
      0
    );
    return itemCount;
  };

  const sumOrder = () => {
    let total = orderItems.reduce((acc, cur: any) => acc + (cur.total || 0), 0);
    return total.toFixed(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        text={restaurant?.name}
        iconLeft={icons.back}
        iconRight={icons.list}
        onPressLeft={() => navigation.goBack()}
      />
      <FoodInfo
        restaurant={restaurant}
        getOrderQty={getOrderQty}
        editOrder={editOrder}
        scrollX={scrollX}
      />
      <Order
        restaurant={restaurant}
        navigation={navigation}
        currentLocation={currentLocation}
        getBasketItemCount={getBasketItemCount}
        sumOrder={sumOrder}
        scrollX={scrollX}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGray2,
  },
});

export default Restaurant;
