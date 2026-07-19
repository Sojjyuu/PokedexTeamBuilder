import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

function TabIcon({
  name,
  color,
  focused,
}: {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  focused: boolean;
}) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapFocused]}>
      <Ionicons name={name} color={color} size={22} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerStyle: { backgroundColor: "#D62828" },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "900",
          fontSize: 21,
        },
        tabBarActiveTintColor: "#D62828",
        tabBarInactiveTintColor: "#7B7D86",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "800",
          marginTop: 2,
        },
        tabBarStyle: {
          height: 72,
          paddingTop: 7,
          paddingBottom: 9,
          borderTopWidth: 3,
          borderTopColor: "#F7C948",
          backgroundColor: "#FFFFFF",
          elevation: 12,
        },
        sceneStyle: {
          backgroundColor: "#F5F2E9",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Pokédex",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={focused ? "grid" : "grid-outline"}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={focused ? "heart" : "heart-outline"}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="team"
        options={{
          title: "My Team",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={focused ? "people" : "people-outline"}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      {/* ซ่อนหน้าตัวอย่าง two.tsx ที่ติดมากับ Expo template */}
      <Tabs.Screen
        name="two"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 36,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapFocused: {
    backgroundColor: "#FDE8E7",
  },
});
