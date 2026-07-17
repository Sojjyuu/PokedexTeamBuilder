import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import EmptyState from "../../components/EmptyState";
import PokemonCard from "../../components/PokemonCard";
import PokemonSearchBar from "../../components/PokemonSearchBar";
import TypeFilter from "../../components/TypeFilter";
import { usePokemonApp } from "../../contexts/PokemonAppContext";
import { fetchPokemonList } from "../../services/pokeapi";
import { PokemonListItem } from "../../types/pokemon";

const POKEMON_LIMIT = 151;

export default function PokedexScreen() {
  const params = useLocalSearchParams<{ type?: string | string[] }>();
  const { isFavorite, toggleFavorite } = usePokemonApp();

  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const incomingType = Array.isArray(params.type) ? params.type[0] : params.type;
    if (incomingType) {
      setSelectedType(incomingType.toLowerCase());
    }
  }, [params.type]);

  const loadPokemon = async (isRefresh = false) => {
    try {
      setError("");
      isRefresh ? setRefreshing(true) : setLoading(true);
      const data = await fetchPokemonList(POKEMON_LIMIT);
      setPokemon(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "ไม่สามารถโหลดข้อมูลโปเกมอนได้"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void loadPokemon();
  }, []);

  const availableTypes = useMemo(() => {
    return [...new Set(pokemon.flatMap((item) => item.types))].sort();
  }, [pokemon]);

  const filteredPokemon = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return pokemon.filter((item) => {
      const matchesName =
        normalizedQuery.length === 0 ||
        item.name.toLowerCase().includes(normalizedQuery);

      const matchesType =
        selectedType === null || item.types.includes(selectedType);

      return matchesName && matchesType;
    });
  }, [pokemon, query, selectedType]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E3350D" />
        <Text style={styles.loadingText}>กำลังเปิด Pokédex...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <EmptyState
          icon="cloud-offline-outline"
          title="โหลดข้อมูลไม่สำเร็จ"
          message={`${error}\nแตะปุ่มด้านล่างเพื่อลองใหม่`}
          actionLabel="ลองอีกครั้ง"
          onAction={() => void loadPokemon()}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={filteredPokemon}
      keyExtractor={(item) => item.name}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      columnWrapperStyle={styles.column}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => void loadPokemon(true)}
          tintColor="#E3350D"
        />
      }
      ListHeaderComponent={
        <View>
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>POKÉDEX TEAM BUILDER</Text>
            <Text style={styles.title}>ค้นหาและสร้างทีมของคุณ</Text>
            <Text style={styles.subtitle}>
              แสดงโปเกมอนรุ่นที่ 1 จำนวน {pokemon.length} ตัว
            </Text>
          </View>

          <PokemonSearchBar
            value={query}
            onChangeText={setQuery}
            onClear={() => setQuery("")}
          />

          <TypeFilter
            types={availableTypes}
            selectedType={selectedType}
            onSelectType={setSelectedType}
          />

          <View style={styles.resultRow}>
            <Text style={styles.resultText}>
              พบ {filteredPokemon.length} รายการ
            </Text>
            {selectedType && (
              <Text style={styles.filterText}>Type: {selectedType}</Text>
            )}
          </View>
        </View>
      }
      renderItem={({ item }) => (
        <PokemonCard
          pokemon={item}
          favorite={isFavorite(item.name)}
          onPress={() => router.push(`/pokemon/${item.name}`)}
          onToggleFavorite={() => void toggleFavorite(item.name)}
          onTypePress={setSelectedType}
        />
      )}
      ListEmptyComponent={
        <EmptyState
          icon="search-outline"
          title="ไม่พบโปเกมอน"
          message={
            query.trim()
              ? `ไม่พบชื่อที่ตรงกับ “${query.trim()}”`
              : "ไม่มีโปเกมอนในประเภทที่เลือก"
          }
          actionLabel="ล้างตัวกรอง"
          onAction={() => {
            setQuery("");
            setSelectedType(null);
          }}
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
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    color: "#666A76",
    fontSize: 15,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: "#F7F8FC",
    flexGrow: 1,
  },
  column: {
    gap: 12,
  },
  hero: {
    marginBottom: 16,
  },
  eyebrow: {
    color: "#E3350D",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  title: {
    marginTop: 5,
    color: "#20222A",
    fontSize: 27,
    lineHeight: 34,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 5,
    color: "#777B87",
    fontSize: 14,
  },
  resultRow: {
    marginTop: 4,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resultText: {
    color: "#777B87",
    fontSize: 13,
    fontWeight: "600",
  },
  filterText: {
    color: "#E3350D",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "capitalize",
  },
});
