import { View, Image, TouchableOpacity } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
// import Svg, { Path } from "react-native-svg";

import { Home } from "../screens";
import { COLORS, icons } from "../constants";

const Tab = createBottomTabNavigator();

interface Props {
  accessibilityState: { selected: boolean };
  children: string;
  onPress: any;
}

const TabBarCustomButton = ({
  accessibilityState,
  children,
  onPress,
}: Props) => {
  let isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <View
        style={{ flex: 1, alignItems: "center", backgroundColor: COLORS.white }}
      >
        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: "center",
            alignItems: "center",
            width: 60,
            height: 60,
            borderRadius: 20,
            backgroundColor: COLORS.white,
            borderColor: COLORS.lightGray,
            borderWidth: 5,
          }}
          onPress={onPress}
        >
          {children}
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        // height: 60,
        backgroundColor: COLORS.white,
      }}
      activeOpacity={1}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

const CustomTabBar = (props: any) => {
  return (
    <View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 30,
          backgroundColor: COLORS.white,
        }}
      ></View>
      <BottomTabBar {...props.props} />
    </View>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            borderTopWidth: 0,
            backgroundColor: "transparent",
            elevation: 0,
          },
          null,
        ],
      }}
      tabBar={(props) => <CustomTabBar props={props} />}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.cutlery}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: (props: any) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.search}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: (props: any) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Like"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.like}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: (props: any) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="User"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.user}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: (props: any) => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
