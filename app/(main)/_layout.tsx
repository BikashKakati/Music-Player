import { Stack } from "expo-router";
import React from "react";

const MainLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="profile" />
      <Stack.Screen name="artist-info" />
      <Stack.Screen name="song-info" />
    </Stack>
  );
};

export default MainLayout;
