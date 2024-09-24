import { CurrentSongDetailsType, SongType } from "@/types/type";
import { Audio } from "expo-av";
import React, { useState } from "react";
import { FlatList } from "react-native";
import SongListItem from "./SongListItem";


const SongList = ({
  handleOpenMenu,
  songList,
}: {
  handleOpenMenu: () => void;
  songList: SongType[];
}) => {

  return (
    <FlatList
      data={songList}
      renderItem={({ item, index}: { item: SongType, index:number }) => (
        <SongListItem
          handleOpenMenu={handleOpenMenu}
          song={item}
          key={item.id}
          songIndex={index}
        />
      )}
    />
  );
};

export default SongList;
