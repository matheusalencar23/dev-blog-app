import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import CategoryPosts from "./pages/CategoryPosts";
import Search from "./pages/Search";

const Stack = createNativeStackNavigator();

function Routes() {
  const headerDefaultOptions = {
    headerTintColor: "#fff",
    headerStyle: {
      backgroundColor: "#232630",
    },
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          ...headerDefaultOptions,
          title: "Detalhes",
        }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryPosts}
        options={{
          ...headerDefaultOptions,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          ...headerDefaultOptions,
          title: "Procurando algo?",
        }}
      />
    </Stack.Navigator>
  );
}

export default Routes;
