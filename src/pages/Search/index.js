import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Text,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import PostItem from "../../components/PostItem";
import api from "../../services/api";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [empty, setEmpty] = useState(false);

  async function handleSearch() {
    if (!searchInput) {
      alert("Digite algo que deseja pesquisar");
      return;
    }

    const { data } = await api.get(
      `/api/posts?filters[title][$containsi]=${searchInput}&populate=cover`,
    );

    if (data?.data?.length === 0) {
      setEmpty(true);
      setPosts([]);
      return;
    }

    setPosts(data?.data);
    setEmpty(false);
    setSearchInput("");
    Keyboard.dismiss();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="O que está buscando?"
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Feather name="search" size={25} color="#000" />
        </TouchableOpacity>
      </View>

      {empty && (
        <View>
          <Text style={styles.emptyText}>
            Ops... Não encontramos nenhum post...
          </Text>
        </View>
      )}
      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={posts}
        keyExtractor={(item) => String(item?.id)}
        renderItem={({ item }) => <PostItem data={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 18,
  },
  containerInput: {
    flexDirection: "row",
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    width: "85%",
    backgroundColor: "#c4c4c4",
    height: 45,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  searchButton: {
    width: "15%",
    backgroundColor: "#c4c4c4",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    marginLeft: -1,
  },
  emptyText: {
    textAlign: "center",
  },
});
