import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { TYPE_COLORS } from "../constants/typeColors";

type TypeFilterProps = {
  types: string[];
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
};

export default function TypeFilter({
  types,
  selectedType,
  onSelectType,
}: TypeFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <Pressable
        onPress={() => onSelectType(null)}
        style={[
          styles.chip,
          selectedType === null && styles.allChipSelected,
        ]}
      >
        <View
          style={[
            styles.dot,
            { backgroundColor: selectedType === null ? "#FFFFFF" : "#252832" },
          ]}
        />
        <Text
          style={[
            styles.chipText,
            selectedType === null && styles.selectedText,
          ]}
        >
          All
        </Text>
      </Pressable>

      {types.map((type) => {
        const selected = selectedType === type;
        const color = TYPE_COLORS[type] ?? "#7B7F8C";

        return (
          <Pressable
            key={type}
            onPress={() => onSelectType(selected ? null : type)}
            style={[
              styles.chip,
              selected && {
                backgroundColor: color,
                borderColor: color,
              },
            ]}
          >
            <View
              style={[
                styles.dot,
                {
                  backgroundColor: selected ? "#FFFFFF" : color,
                },
              ]}
            />
            <Text style={[styles.chipText, selected && styles.selectedText]}>
              {type}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 2,
    gap: 8,
  },
  chip: {
    minHeight: 36,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E4E1D8",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  allChipSelected: {
    backgroundColor: "#252832",
    borderColor: "#252832",
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  chipText: {
    color: "#565A65",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "capitalize",
  },
  selectedText: {
    color: "#FFFFFF",
  },
});
