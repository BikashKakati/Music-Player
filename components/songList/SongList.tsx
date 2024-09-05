import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import SongListItem from "./SongListItem";
import { SongType } from "@/types/type";

const SongList = ({handleOpenMenu}:{handleOpenMenu:()=>void}) => {
  const [playSong, setPlaySong] = useState<string>("");

  const songList = [
    {
      id: 1,
      songName: "ye ha",
      artistName: "yulaa",
    },
    {
      id: 2,
      songName: "sad jii",
      artistName: "buhaji",
    },
    {
      id: 3,
      songName: "suio",
      artistName: "tiju butta",
    },
  ];



  return (
    <FlatList
      data={songList}
      renderItem={({ item }: { item: SongType }) => (
        <SongListItem
        handleOpenMenu={handleOpenMenu}
          playSong={playSong}
          setPlaySong={setPlaySong}
          songName={item.songName}
          artistName={item.artistName}
        />
      )}
    />
  );
};

export default SongList;
