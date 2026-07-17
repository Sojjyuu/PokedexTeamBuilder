import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";

import EmptyState from "../../components/EmptyState";
import PokemonCard from "../../components/PokemonCard";
import { usePokemonApp } from "../../contexts/PokemonAppContext";
import { fetchPokemonByName } from "../../services/pokeapi";
import { PokemonListItem } from "../../types/pokemon";

export default function TeamScreen() {
  const {
    team,
    favorites,
    isFavorite,
    toggleFavorite,
    toggleTeamMember,
    hydrated,
  } = usePokemonApp();

  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const loadTeam = async () => {
      if (!hydrated || team.length === 0) {
        setPokemon([]);
        return;
      }

      try {
        setLoading(true);
        const data = await Promise.all(
          team.map((name) => fetchPokemonByName(name))
        );
        if (active) {
          setPokemon(data);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadTeam();

    return () => {
      active = false;
    };
  }, [team, hydrated]);

  if (!hydrated || loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E3350D" />
        <Text style={styles.loadingText}>กำลังจัดทีม...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={pokemon}
      keyExtractor={(item) => item.name}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.listContent,
        pokemon.length === 0 && styles.emptyContent,
      ]}
      columnWrapperStyle={pokemon.length > 0 ? styles.column : undefined}
      ListHeaderComponent={
        pokemon.length > 0 ? (
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>ทีมของฉัน</Text>
              <Text style={styles.subtitle}>เลือกได้สูงสุด 6 ตัว</Text>
            </View>
            <View style={styles.counter}>
              <Text style={styles.counterText}>{team.length}/6</Text>
            </View>
          </View>
        ) : null
      }
      renderItem={({ item }) => (
        <PokemonCard
          pokemon={item}
          favorite={isFavorite(item.name)}
          inTeam
          onPress={() => router.push(`/pokemon/${item.name}`)}
          onToggleFavorite={() => void toggleFavorite(item.name)}
          onToggleTeam={() => void toggleTeamMember(item.name)}
          onTypePress={(type) =>
            router.push({ pathname: "/", params: { type } })
          }
        />
      )}
      ListEmptyComponent={
        <EmptyState
          icon="people-outline"
          title="ทีมยังว่างอยู่"
          message="เปิดหน้ารายละเอียดโปเกมอน แล้วกด “เพิ่มเข้าทีม” เพื่อสร้างทีมสูงสุด 6 ตัว"
          actionLabel="เลือกโปเกมอน"
          onAction={() => router.push("/")}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7F8FC",
  },
  loadingText: {
    marginTop: 12,
    color: "#666A76",
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: "#F7F8FC",
    flexGrow: 1,
  },
  emptyContent: {
    justifyContent: "center",
  },
  column: {
    gap: 12,
  },
  header: {
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#20222A",
    fontSize: 27,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 5,
    color: "#777B87",
    fontSize: 14,
  },
  counter: {
    minWidth: 55,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: "#E3350D",
    alignItems: "center",
  },
  counterText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },
});
