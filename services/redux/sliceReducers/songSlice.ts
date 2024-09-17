import { SongType } from "@/types/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AVPlaybackStatus, Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";

interface CurrentSongDetailsType {
  albumName: string;
  artistName: string;
  songName: string;
  songImageUrl: string;
  songTrackUrl: string;
}
interface InitialStateType {
  currentPlayingSongDetails: CurrentSongDetailsType;
  currentAudioState: Sound | null;
  currentAudioStatusState: AVPlaybackStatus | null;
}

const initialState: InitialStateType = {
  currentPlayingSongDetails: {
    albumName: "",
    artistName: "",
    songName: "",
    songImageUrl: "",
    songTrackUrl: "",
  },
  currentAudioState:null,
  currentAudioStatusState:null,
};
export const songSlice = createSlice({
  name: "songSlice",
  initialState,
  reducers: {
    setAudioState:function(state, action){
      state.currentAudioState = action.payload;
    },
    setAudioStatusState:function(state,action){
      state.currentAudioStatusState = action.payload;
    },
    setCurrentPlayingSongDetails: function (state, action) {
      state.currentPlayingSongDetails = action.payload;
    },
  },
});

export const {
  setAudioState,
  setCurrentPlayingSongDetails,
  setAudioStatusState
} = songSlice.actions;
