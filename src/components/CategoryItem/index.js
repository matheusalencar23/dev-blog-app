import React from "react";
import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CategoryItem({ data, favorite }) {
  const id = data?.id;
  const title = data?.attributes?.name;
  const urlImage = data?.attributes?.icon?.data?.attributes?.url;

  const navigation = useNavigation();

  function handleNavigate() {
    navigation.navigate("Category", { id, title });
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={handleNavigate}
      onLongPress={() => favorite(id)}
    >
      <Image
        style={styles.icon}
        source={{
          uri: `http://192.168.18.12:1337${urlImage}`,
        }}
      />
      <Text style={styles.name}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    minWidth: 140,
    backgroundColor: "#fff",
  },
  icon: {
    width: 40,
    height: 40,
  },
  name: {},
});
