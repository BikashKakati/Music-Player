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
  songIndex:number;
}
interface InitialStateType {
  currentPlayingSongDetails: CurrentSongDetailsType | null;
  currentAudioState: Sound | null;
  currentAudioStatusState: AVPlaybackStatus | null;
  currentSongPosition:number;
}

const initialState: InitialStateType = {
  currentPlayingSongDetails: {
    albumName: "",
    artistName: "",
    songName: "",
    songImageUrl: "",
    songTrackUrl: "",
    songIndex:0,
  },
  currentAudioState:null,
  currentAudioStatusState:null,
  currentSongPosition:0,
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
    setCurrentPosition:function(state,action){
      state.currentSongPosition = action.payload;
    }
  },
});

export const {
  setAudioState,
  setCurrentPlayingSongDetails,
  setAudioStatusState,
  setCurrentPosition
} = songSlice.actions;
