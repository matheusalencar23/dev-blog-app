import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import api from "../../services/api";
import { setFavorite, getFavorite } from "../../services/favorite";

import CategoryItem from "../../components/CategoryItem";
import FavoritePost from "../../components/FavoritePost";
import PostItem from "../../components/PostItem";

const FlatListAnimated = Animatable.createAnimatableComponent(FlatList);

export default function Home() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [favoriteCategory, setFavoriteCategory] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      const { data } = await api.get("/api/categories?populate=icon");
      setCategories(data?.data);
    }
    loadData();
  }, []);

  useEffect(() => {
    async function loadFavorite() {
      await getPostList();

      const response = await getFavorite();
      setFavoriteCategory(response);
    }
    loadFavorite();
  }, []);

  async function handleFavorite(id) {
    const response = await setFavorite(id);
    setFavoriteCategory(response);
  }

  async function getPostList() {
    setLoading(true);
    const { data } = await api.get(
      "/api/posts?populate=cover&sort=createdAt:desc",
    );
    setPosts(data?.data);
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Animatable.Text style={styles.name} animation="fadeIn" delay={500}>
          DevBlog
        </Animatable.Text>

        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Feather name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatListAnimated
        animation="flipInX"
        delay={500}
        horizontal={true}
        contentContainerStyle={{ paddingRight: 12 }}
        style={styles.categories}
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CategoryItem data={item} favorite={handleFavorite} />
        )}
      />

      <View style={styles.main}>
        {favoriteCategory.length > 0 && (
          <FlatList
            horizontal={true}
            contentContainerStyle={{ paddingEnd: 28 }}
            style={{ marginTop: 50, maxHeight: 100, paddingStart: 18 }}
            data={favoriteCategory}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => String(item?.id)}
            renderItem={({ item }) => <FavoritePost data={item} />}
          />
        )}

        <Text
          style={[
            styles.title,
            { marginTop: favoriteCategory?.length > 0 ? 14 : 46 },
          ]}
        >
          Conteúdos em alta
        </Text>

        <FlatList
          style={{ flex: 1, paddingHorizontal: 18 }}
          showsVerticalScrollIndicator={false}
          data={posts}
          keyExtractor={(item) => String(item?.id)}
          renderItem={({ item }) => <PostItem data={item} />}
          refreshing={loading}
          onRefresh={() => getPostList()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232630",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 24,
  },
  name: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  categories: {
    maxHeight: 115,
    backgroundColor: "#efefef",
    marginHorizontal: 18,
    borderRadius: 8,
    zIndex: 9,
  },
  main: {
    backgroundColor: "#fff",
    flex: 1,
    marginTop: -30,
  },
  title: {
    fontSize: 21,
    paddingHorizontal: 18,
    marginBottom: 14,
    fontWeight: "bold",
    color: "#162133",
  },
});
