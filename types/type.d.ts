import React from "react";

export declare interface TabIconPropType {
  color: string;
  focused: boolean;
  label: string;
  children: React.ReactNode;
}

export declare interface SongListItemPropType {
  imageUrl?: string;
  songName: string;
  artistName: string;
  playSong: string;
  setPlaySong: React.Dispatch<React.SetStateAction<string>>;
  handleOpenMenu: () => void;
}

export declare interface SongType {
  id: number;
  songName: string;
  artistName: string;
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
