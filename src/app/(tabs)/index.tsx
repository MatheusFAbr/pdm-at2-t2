// Updated HomeScreen with new styling
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Product } from "@/types/product";

const API_URL = "https://fakestoreapi.com/products";

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchProducts() {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar produtos", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.productImage} />

      <View style={styles.infoBox}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>

        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <Text style={styles.category}>Categoria: {item.category}</Text>

        <View style={styles.ratingBox}>
          <Text style={styles.ratingText}>⭐ {item.rating.rate}</Text>
          <Text style={styles.ratingCount}>({item.rating.count} avaliações)</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#8B5CF6" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchProducts} />
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingTop: 15,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 18,
    flexDirection: "row",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  productImage: {
    width: 95,
    height: 95,
    resizeMode: "contain",
    marginRight: 14,
  },
  infoBox: {
    flex: 1,
    gap: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  price: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#10B981",
  },
  description: {
    fontSize: 14,
    color: "#4B5563",
  },
  category: {
    fontSize: 13,
    color: "#6B7280",
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F59E0B",
  },
  ratingCount: {
    fontSize: 12,
    color: "#6B7280",
  },
});
