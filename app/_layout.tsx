import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { PokemonAppProvider } from "../contexts/PokemonAppContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PokemonAppProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "#D62828" },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: { fontWeight: "900" },
            contentStyle: { backgroundColor: "#F5F2E9" },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="pokemon/[name]"
            options={{ title: "Pokémon Data" }}
          />
        </Stack>
      </PokemonAppProvider>
    </SafeAreaProvider>
  );
}
