import { View, Text } from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import Icon from "./atoms/Icon";

interface Props {
  text: string;
  iconLeft: any;
  iconRight: any;
  onPressLeft?: any;
  onPressRight?: any;
}

const Header = ({
  text,
  iconLeft,
  iconRight,
  onPressLeft,
  onPressRight,
}: Props) => {
  return (
    <View style={{ flexDirection: "row", height: 50 }}>
      <Icon
        onPress={onPressLeft}
        styles={{ paddingLeft: SIZES.padding * 2 }}
        icon={iconLeft}
      />
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
          <Text style={{ ...FONTS.h3 }}>{text}</Text>
        </View>
      </View>
      <Icon
        onPress={onPressRight}
        styles={{ paddingRight: SIZES.padding * 2 }}
        icon={iconRight}
      />
    </View>
  );
};

export default Header;
