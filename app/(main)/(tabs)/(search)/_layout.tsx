import { Stack } from "expo-router";
import React from "react";

const Search = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="search-results/[query]"/>
    </Stack>
  );
};

export default Search;
