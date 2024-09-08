import CustomBottomSheet from "@/components/CustomBottomSheet";
import Wrapper from "@/components/Wrapper";
import SongList from "@/components/songList/SongList";
import { useGetWorldTopSongsQuery } from "@/services/redux/apiReducers/songApi";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const home = () => {
  const songActionRef = useRef<BottomSheetModal>(null);
  const {data:resonse} = useGetWorldTopSongsQuery("");
  // },[])

  const handleOpenMenu = useCallback(function () {
    songActionRef.current?.present();
  }, []);


  return (
    <Wrapper className="flex-1 px-4">
      <Text className="text-2xl text-white font-bold mb-4">Top Songs</Text>
      <SongList handleOpenMenu={handleOpenMenu} songList={resonse?.data}/>
      <CustomBottomSheet ref={songActionRef} snapPoints={["45%"]} color="#333">
        <Text className="text-white">Bikash</Text>
      </CustomBottomSheet>
    </Wrapper>
  );
};

export default home;
