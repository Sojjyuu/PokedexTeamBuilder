import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { TYPE_COLORS } from "../constants/typeColors";
import { formatPokemonName } from "../services/pokeapi";
import { PokemonListItem } from "../types/pokemon";

type PokemonCardProps = {
  pokemon: PokemonListItem;
  favorite: boolean;
  inTeam?: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
  onTypePress: (type: string) => void;
  onToggleTeam?: () => void;
};

export default function PokemonCard({
  pokemon,
  favorite,
  inTeam = false,
  onPress,
  onToggleFavorite,
  onTypePress,
  onToggleTeam,
}: PokemonCardProps) {
  const backgroundColor = TYPE_COLORS[pokemon.types[0]] ?? "#7B7F8C";

  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`ดูรายละเอียด ${pokemon.name}`}
        onPress={onPress}
        style={({ pressed }) => [
          styles.mainPressable,
          pressed && styles.pressed,
        ]}
      >
        <View
          style={[
            styles.imageArea,
            { backgroundColor: `${backgroundColor}22` },
          ]}
        >
          <Text style={styles.number}>
            #{String(pokemon.id).padStart(3, "0")}
          </Text>
          <Image source={{ uri: pokemon.image }} style={styles.image} />
        </View>

        <Text numberOfLines={1} style={styles.name}>
          {formatPokemonName(pokemon.name)}
        </Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          favorite ? "ลบออกจากรายการโปรด" : "เพิ่มในรายการโปรด"
        }
        onPress={onToggleFavorite}
        hitSlop={8}
        style={styles.favoriteButton}
      >
        <Ionicons
          name={favorite ? "heart" : "heart-outline"}
          size={22}
          color={favorite ? "#E3350D" : "#757985"}
        />
      </Pressable>

      <View style={styles.typeRow}>
        {pokemon.types.map((type) => (
          <Pressable
            key={type}
            onPress={() => onTypePress(type)}
            style={[
              styles.typeBadge,
              { backgroundColor: TYPE_COLORS[type] ?? "#7B7F8C" },
            ]}
          >
            <Text style={styles.typeText}>{type}</Text>
          </Pressable>
        ))}
      </View>

      {onToggleTeam && (
        <Pressable
          onPress={onToggleTeam}
          style={[
            styles.teamAction,
            inTeam && styles.removeTeamAction,
          ]}
        >
          <Ionicons
            name={inTeam ? "remove-outline" : "add-outline"}
            size={18}
            color="#FFFFFF"
          />
          <Text style={styles.teamActionText}>
            {inTeam ? "นำออกจากทีม" : "เพิ่มเข้าทีม"}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    marginBottom: 12,
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  mainPressable: {
    padding: 10,
    paddingBottom: 4,
  },
  pressed: {
    opacity: 0.75,
  },
  imageArea: {
    minHeight: 125,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    position: "absolute",
    top: 9,
    left: 10,
    color: "#777B87",
    fontSize: 11,
    fontWeight: "900",
  },
  image: {
    width: 115,
    height: 115,
  },
  name: {
    marginTop: 9,
    color: "#20222A",
    fontSize: 16,
    fontWeight: "900",
  },
  favoriteButton: {
    position: "absolute",
    top: 11,
    right: 11,
    zIndex: 2,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFFE6",
  },
  typeRow: {
    paddingHorizontal: 10,
    paddingBottom: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  typeBadge: {
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 999,
  },
  typeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "capitalize",
  },
  teamAction: {
    paddingVertical: 10,
    backgroundColor: "#E3350D",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  removeTeamAction: {
    backgroundColor: "#484C58",
  },
  teamActionText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
  },
});
