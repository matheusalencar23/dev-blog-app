import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PostItem({ data }) {
  const id = data?.id;
  const title = data?.attributes?.title;
  const description = data?.attributes?.description;
  const urlImage = data?.attributes?.cover?.data?.attributes?.url;

  const navigation = useNavigation();

  function handleNavigate() {
    navigation.navigate("Detail", { id });
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={handleNavigate}
    >
      <View style={styles.header}>
        <Image
          source={{ uri: `http://192.168.18.12:1337${urlImage}` }}
          style={styles.cover}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#efefef",
    borderRadius: 4,
    marginBottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  header: {
    marginHorizontal: 8,
  },
  cover: {
    width: 90,
    height: 90,
    borderRadius: 4,
  },
  body: {
    width: "70%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 6,
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
  },
});
