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

export default function FavoritesScreen() {
  const { favorites, isFavorite, toggleFavorite, hydrated } = usePokemonApp();
  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const loadFavorites = async () => {
      if (!hydrated || favorites.length === 0) {
        setPokemon([]);
        return;
      }

      try {
        setLoading(true);
        const data = await Promise.all(
          favorites.map((name) => fetchPokemonByName(name))
        );
        if (active) {
          setPokemon(data.sort((a, b) => a.id - b.id));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadFavorites();

    return () => {
      active = false;
    };
  }, [favorites, hydrated]);

  if (!hydrated || loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E3350D" />
        <Text style={styles.loadingText}>กำลังโหลดรายการโปรด...</Text>
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
            <Text style={styles.title}>โปเกมอนที่ชื่นชอบ</Text>
            <Text style={styles.subtitle}>
              บันทึกไว้แล้ว {favorites.length} ตัว
            </Text>
          </View>
        ) : null
      }
      renderItem={({ item }) => (
        <PokemonCard
          pokemon={item}
          favorite={isFavorite(item.name)}
          onPress={() => router.push(`/pokemon/${item.name}`)}
          onToggleFavorite={() => void toggleFavorite(item.name)}
          onTypePress={(type) =>
            router.push({ pathname: "/", params: { type } })
          }
        />
      )}
      ListEmptyComponent={
        <EmptyState
          icon="heart-outline"
          title="ยังไม่มีโปเกมอนที่ชื่นชอบ"
          message="กดรูปหัวใจบนการ์ดโปเกมอน แล้วรายการจะปรากฏที่หน้านี้"
          actionLabel="ไปที่ Pokédex"
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
});
