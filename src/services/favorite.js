import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export async function getFavorite() {
  const categoryId = await AsyncStorage.getItem("@devBlog/favorite");
  if (categoryId) {
    const { data } = await api.get(
      `/api/categories/${categoryId}?fields=name&populate=posts,posts.cover`,
    );
    return data?.data?.attributes?.posts?.data;
  } else {
    return [];
  }
}

export async function setFavorite(categoryId) {
  await AsyncStorage.setItem("@devBlog/favorite", String(categoryId));
  const response = await getFavorite();
  return response;
}
