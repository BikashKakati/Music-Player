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
  songName?: string;
  artistName?: string;
  attributes?:{
    name?:string;
    previews:[{url?:string}];
    artwork?:{
      url:string;
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
