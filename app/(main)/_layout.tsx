import CustomBottomSheet from "@/components/CustomBottomSheet";
import FlowtingModal from "@/components/flowtingSection/FlowtingModal";
import SongDetailsModal from "@/components/songDetailsModal/SongDetailsModal";
import { RootState } from "@/services/redux/store";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import React, { useRef } from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const { currentPlayingSongDetails, currentAudioStatusState } = useSelector(
    (state: RootState) => state.songSlice
  );

  const songModalRef = useRef<BottomSheetModal>(null);
  function handleOpenSongPlayingModal(){
    songModalRef.current?.present();
  }
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="profile" />
        <Stack.Screen name="artist-info" />
        <Stack.Screen name="song-info" />
      </Stack>

      {currentAudioStatusState?.isLoaded && <FlowtingModal onPress={handleOpenSongPlayingModal}/>}

      <CustomBottomSheet ref={songModalRef} snapPoints={["100%"]} color="#333">
        <SongDetailsModal/>
      </CustomBottomSheet>
    </>
  );
};

export default MainLayout;
