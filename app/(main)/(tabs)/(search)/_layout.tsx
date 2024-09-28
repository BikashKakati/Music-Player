import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Search = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="search-results/[query]" />
    </Stack>
  );
};

export default Search;
