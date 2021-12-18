import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./navigation/tabs";
import { Home, Restaurant, OrderDelivery } from "./screens";
import * as Font from "expo-font";
// import useFonts hook
import { useFonts } from "@use-expo/font";

const Stack = createStackNavigator();

const customFonts = {
  RobotoBlack: require("./assets/fonts/Roboto-Black.ttf"),
  RobotoBlackItalic: require("./assets/fonts/Roboto-BlackItalic.ttf"),
  RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  RobotoBoldItalic: require("./assets/fonts/Roboto-BoldItalic.ttf"),
  RobotoItalic: require("./assets/fonts/Roboto-Italic.ttf"),
  RobotoLight: require("./assets/fonts/Roboto-Light.ttf"),
  RobotoLightItalic: require("./assets/fonts/Roboto-LightItalic.ttf"),
  RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
  RobotoMediumItalic: require("./assets/fonts/Roboto-MediumItalic.ttf"),
  RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
  RobotoThin: require("./assets/fonts/Roboto-Thin.ttf"),
  RobotoThinItalic: require("./assets/fonts/Roboto-ThinItalic.ttf"),
  RobotoCondensedBold: require("./assets/fonts/RobotoCondensed-Bold.ttf"),
  RobotoCondensedBoldItalic: require("./assets/fonts/RobotoCondensed-BoldItalic.ttf"),
  RobotoCondensedItalic: require("./assets/fonts/RobotoCondensed-Italic.ttf"),
  RobotoCondensedLight: require("./assets/fonts/RobotoCondensed-Light.ttf"),
  RobotoCondensedLightItalic: require("./assets/fonts/RobotoCondensed-LightItalic.ttf"),
  RobotoCondensedRegular: require("./assets/fonts/RobotoCondensed-Regular.ttf"),
};

const App = () => {
  const [isLoaded] = useFonts(customFonts);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Restaurant" component={Restaurant} />
        <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
