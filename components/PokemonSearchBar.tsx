import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

type PokemonSearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
};

export default function PokemonSearchBar({
  value,
  onChangeText,
  onClear,
}: PokemonSearchBarProps) {
  return (
    <View style={styles.outer}>
      <View style={styles.iconCircle}>
        <Ionicons name="search" size={19} color="#FFFFFF" />
      </View>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="ค้นหาชื่อโปเกมอน..."
        placeholderTextColor="#979AA3"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        style={styles.input}
      />

      {value.length > 0 && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="ล้างข้อความค้นหา"
          onPress={onClear}
          hitSlop={10}
        >
          <Ionicons name="close-circle" size={22} color="#9A9DA6" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    height: 54,
    paddingLeft: 7,
    paddingRight: 14,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: "#ECE8DD",
    backgroundColor: "#FAFAF8",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#D62828",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    color: "#252832",
    fontSize: 15,
    fontWeight: "600",
  },
});
