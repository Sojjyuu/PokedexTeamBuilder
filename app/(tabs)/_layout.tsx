import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerStyle: { backgroundColor: "#F7F8FC" },
        tabBarActiveTintColor: "#E3350D",
        tabBarInactiveTintColor: "#80838E",
        tabBarStyle: {
          height: 68,
          paddingTop: 6,
          paddingBottom: 8,
          borderTopWidth: 0,
          elevation: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Pokédex",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="team"
        options={{
          title: "My Team",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
