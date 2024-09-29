import { CurrentSongDetailsType, SongType } from "@/types/type";
import { Audio } from "expo-av";
import React, { useCallback, useRef, useState } from "react";
import { FlatList } from "react-native";
import SongListItem from "./SongListItem";
import CustomBottomSheet from "../CustomBottomSheet";
import { Text } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const SongList = ({ songList }: { songList: SongType[] }) => {
  
  const songActionRef = useRef<BottomSheetModal>(null);
  const handleOpenMenu = useCallback(function () {
    songActionRef.current?.present();
  }, []);

  return (
    <>
      <FlatList
        data={songList}
        renderItem={({ item, index }: { item: SongType; index: number }) => (
          <SongListItem
            handleOpenMenu={handleOpenMenu}
            song={item}
            key={item.id}
            songIndex={index}
          />
        )}
      />
      <CustomBottomSheet ref={songActionRef} snapPoints={["45%"]} color="#333">
        <Text className="text-white">Bikash</Text>
      </CustomBottomSheet>
    </>
  );
};

export default SongList;
