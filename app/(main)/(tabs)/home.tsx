import CustomBottomSheet from "@/components/CustomBottomSheet";
import Wrapper from "@/components/Wrapper";
import SongList from "@/components/songList/SongList";
import { useGetWorldTopSongsQuery } from "@/services/redux/apiReducers/songApi";
import { RootState } from "@/services/redux/store";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import {AVPlaybackStatus, Audio} from "expo-av";
import Loader from "@/components/Loader";

const home = () => {
  const songActionRef = useRef<BottomSheetModal>(null);
  const {data:resonse, isLoading} = useGetWorldTopSongsQuery(10);
  const {currentPlayingSongDetails} = useSelector((state:RootState)=> state.songSlice);

  const handleOpenMenu = useCallback(function () {
    songActionRef.current?.present();
  }, []);


  return (
    <Wrapper className="flex-1">
      <Text className="text-2xl text-white font-bold mb-4">Top Songs</Text>
      {
        isLoading ? 
        (<Loader/>)
        :
        (
          <SongList handleOpenMenu={handleOpenMenu} songList={resonse?.data}/>
        )
      }
      <CustomBottomSheet ref={songActionRef} snapPoints={["45%"]} color="#333">
        <Text className="text-white">Bikash</Text>
      </CustomBottomSheet>
    </Wrapper>
  );
};

export default home;
