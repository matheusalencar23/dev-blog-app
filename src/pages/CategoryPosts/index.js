import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import PostItem from "../../components/PostItem";

export default function CategoryPosts() {
  const navigation = useNavigation();
  const route = useRoute();

  const [posts, setPosts] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route?.params?.title || "Categoria",
    });
  }, [navigation]);

  useEffect(() => {
    async function loadPost() {
      const { data } = await api.get(
        `/api/categories/${route?.params?.id}?fields=name&populate=posts,posts.cover`,
      );
      setPosts(data?.data?.attributes?.posts?.data);
    }

    loadPost();
  }, []);

  function handleBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      {!posts.length && (
        <View style={styles.warningContainer}>
          <Text style={styles.warning}>
            Esta categoria ainda não possui nenhum post...
          </Text>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.textButton}>Encontrar posts</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={posts}
        keyExtractor={(item) => String(item?.id)}
        renderItem={({ item }) => <PostItem data={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#fff",
  },
  warningContainer: {
    alignItems: "center",
    paddingTop: 32,
  },
  warning: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#162133",
    padding: 12,
    marginTop: 24,
    borderRadius: 4,
  },
  textButton: {
    color: "#fff",
    fontSize: 16,
  },
});
