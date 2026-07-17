import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

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

        return (
          <Pressable
            key={type}
            onPress={() => onSelectType(selected ? null : type)}
            style={[
              styles.chip,
              selected && {
                backgroundColor: TYPE_COLORS[type] ?? "#7B7F8C",
                borderColor: TYPE_COLORS[type] ?? "#7B7F8C",
              },
            ]}
          >
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
    paddingVertical: 14,
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E1E3E8",
    backgroundColor: "#FFFFFF",
  },
  allChipSelected: {
    backgroundColor: "#20222A",
    borderColor: "#20222A",
  },
  chipText: {
    color: "#656975",
    fontSize: 13,
    fontWeight: "800",
    textTransform: "capitalize",
  },
  selectedText: {
    color: "#FFFFFF",
  },
});
