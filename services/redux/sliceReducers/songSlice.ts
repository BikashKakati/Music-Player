import { SongType } from "@/types/type";
import { createSlice } from "@reduxjs/toolkit";
import { Audio } from "expo-av";

interface CurrentSongDetailsType {
  albumName: string;
  artistName: string;
  songName: string;
  songImageUrl: string;
  songTrackUrl: string;
}
interface InitialStateType {
  currentPlayingSongDetails: CurrentSongDetailsType;
  isPlaying: boolean;
}

const initialState: InitialStateType = {
  currentPlayingSongDetails: {
    albumName: "",
    artistName: "",
    songName: "",
    songImageUrl: "",
    songTrackUrl: "",
  },
  isPlaying: false,
};
export const songSlice = createSlice({
  name: "songSlice",
  initialState,
  reducers: {
    setCurrentPlayingSongDetails: function (state, action) {
      state.currentPlayingSongDetails = action.payload;
    },
    setIsSongPlaying: function (state, action) {
      state.isPlaying = action.payload;
    },
  },
});

export const {
  setCurrentPlayingSongDetails,
  setIsSongPlaying,
} = songSlice.actions;
