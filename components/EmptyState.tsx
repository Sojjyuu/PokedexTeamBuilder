import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type EmptyStateProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function EmptyState({
  icon,
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={46} color="#E3350D" />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      {actionLabel && onAction && (
        <Pressable
          onPress={onAction}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 36,
    paddingHorizontal: 22,
    alignItems: "center",
  },
  iconCircle: {
    width: 92,
    height: 92,
    marginBottom: 18,
    borderRadius: 46,
    backgroundColor: "#FDE9E4",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#20222A",
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
  },
  message: {
    maxWidth: 310,
    marginTop: 8,
    color: "#7A7E89",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
  button: {
    marginTop: 19,
    minWidth: 145,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: "#E3350D",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },
});
