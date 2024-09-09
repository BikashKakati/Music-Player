import { Audio } from "expo-av";
import React from "react";
import { ImageSourcePropType } from "react-native";

export declare interface TabIconPropType {
  color: string;
  focused: boolean;
  label: string;
  children: React.ReactNode;
}

export declare interface CurrentSongDetailsType{
  songName:string;
  isPlaying:boolean;
}
export declare interface SongListItemPropType {
  song:SongType;
  currentSongDetails:CurrentSongDetailsType;
  setCurrentSongDetails: React.Dispatch<React.SetStateAction<CurrentSongDetailsType>>;
  handleOpenMenu: () => void;
  currentSound:Audio.Sound|undefined;
  setCurrentSound:React.Dispatch<React.SetStateAction<Audio.Sound|undefined>>;
}

export declare interface SongType {
  id?: number;
  attributes:{
    albumName:string;
    artistName:string;
    name:string;
    previews:[{url:string}]; // for song url
    artwork:{
      url:string; // for image url
    }
  }
}

export declare interface SongActionPropType {
  handleAddToPlaylist: () => void;
  songInfo: "";
}

export declare interface BottomSheetModalPropType {
  children: ReactNode;
  snapPoints: string[];
  color:string;
}
