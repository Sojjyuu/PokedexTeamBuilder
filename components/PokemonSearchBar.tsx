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
    <View style={styles.container}>
      <Ionicons name="search-outline" size={21} color="#7B7F8A" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="ค้นหาโปเกมอนจากชื่อ..."
        placeholderTextColor="#A0A3AC"
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
          <Ionicons name="close-circle" size={21} color="#9A9DA6" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 54,
    paddingHorizontal: 16,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  input: {
    flex: 1,
    color: "#20222A",
    fontSize: 15,
  },
});
