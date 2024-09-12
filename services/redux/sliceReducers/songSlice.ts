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
  isAnySongLoaded:boolean;
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
  isAnySongLoaded: false,
  isPlaying:false,
};
export const songSlice = createSlice({
  name: "songSlice",
  initialState,
  reducers: {
    setCurrentPlayingSongDetails: function (state, action) {
      state.currentPlayingSongDetails = action.payload;
    },
    setIsSongLoaded: function (state, action) {
      state.isAnySongLoaded = action.payload;
    },
    setIsSongPlaying: function (state, action) {
      state.isPlaying = action.payload;
    },
  },
});

export const {
  setCurrentPlayingSongDetails,
  setIsSongPlaying,
  setIsSongLoaded
} = songSlice.actions;
