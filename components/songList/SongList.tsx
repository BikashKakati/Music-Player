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
  const [currentSongDetails, setCurrentSongDetails] =
    useState<CurrentSongDetailsType>({ songName: "", isPlaying: false });
  const [currentSound, setCurrentSound] = useState<Audio.Sound | undefined>();

  return (
    <FlatList
      data={songList}
      renderItem={({ item }: { item: SongType }) => (
        <SongListItem
          handleOpenMenu={handleOpenMenu}
          currentSongDetails={currentSongDetails}
          setCurrentSongDetails={setCurrentSongDetails}
          song={item}
          currentSound={currentSound}
          setCurrentSound={setCurrentSound}
        />
      )}
    />
  );
};

export default SongList;
