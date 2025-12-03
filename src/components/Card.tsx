import { ReactNode } from "react";
import { StyleSheet, View, Text } from "react-native";


export default function Card({ title, body, children, leftComponent, rightComponent }: any) {
  return (
    <View style={styles.card}>
      {leftComponent && <View style={styles.side}>{leftComponent}</View>}
      <View style={styles.content}>
        {title && <Text style={styles.title}>{title}</Text>}
        {body && <Text style={styles.body}>{body}</Text>}
        {children}
      </View>
      {rightComponent && <View style={styles.side}>{rightComponent}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  content: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },
  body: {
    fontSize: 16,
    color: "#4B5563",
  },
  side: {
    marginHorizontal: 6,
  },
});