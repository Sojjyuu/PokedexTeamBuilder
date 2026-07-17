import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { PokemonAppProvider } from "../contexts/PokemonAppContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PokemonAppProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "#F7F8FC" },
            contentStyle: { backgroundColor: "#F7F8FC" },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="pokemon/[name]"
            options={{ title: "Pokémon Details" }}
          />
        </Stack>
      </PokemonAppProvider>
    </SafeAreaProvider>
  );
}
