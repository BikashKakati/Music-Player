import FlowtingModal from "@/components/flowtingSection/FlowtingModal";
import { RootState } from "@/services/redux/store";
import { Stack } from "expo-router";
import React from "react";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const {isAnySongLoaded, isPlaying} = useSelector((state:RootState)=> state.songSlice);
  return (
    <>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="profile" />
      <Stack.Screen name="artist-info" />
      <Stack.Screen name="song-info" />
    </Stack>
    {
      isAnySongLoaded && isPlaying && <FlowtingModal/>
    }
    
    </>
  );
};

export default MainLayout;
