import CustomBottomSheet from "@/components/CustomBottomSheet";
import SongList from "@/components/songList/SongList";
import {
  BottomSheetModal
} from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const home = () => {
  const songActionRef = useRef<BottomSheetModal>(null);

  const handleOpenMenu = useCallback(function () {
    songActionRef.current?.present();
  },[])

  return (
    <SafeAreaView className="flex-1">
      <SongList handleOpenMenu={handleOpenMenu} />
      <CustomBottomSheet ref={songActionRef} snapPoints={["45%"]} color="#333">
        <Text className="text-white">Bikash</Text>
      </CustomBottomSheet>

    </SafeAreaView>
  );
};

export default home;
