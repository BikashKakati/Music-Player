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
      renderItem={({ item}: { item: SongType }) => (
        <SongListItem
          handleOpenMenu={handleOpenMenu}
          song={item}
          key={item.id}
        />
      )}
    />
  );
};

export default SongList;
