import { View, TouchableOpacity, Image } from "react-native";

interface Props {
  icon: any;
  styles?: any;
  onPress?: any;
}

const Icon = ({ icon, styles, onPress }: Props) => {
  return (
    <View style={{ flexDirection: "row", height: 50 }}>
      <TouchableOpacity
        style={{
          width: 50,
          justifyContent: "center",
          ...styles,
        }}
        onPress={() => (onPress ? onPress() : null)}
      >
        <Image
          source={icon}
          resizeMode={"contain"}
          style={{
            width: 25,
            height: 25,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Icon;
