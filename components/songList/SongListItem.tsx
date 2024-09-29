import { Images } from "@/constants";
import { useGetWorldTopSongsQuery } from "@/services/redux/apiReducers/songApi";
import {
  setAudioState,
  setAudioStatusState,
  setCurrentPlayingSongDetails,
  setCurrentPosition,
} from "@/services/redux/sliceReducers/songSlice";
import { RootState } from "@/services/redux/store";
import { SongListItemPropType } from "@/types/type.d";
import { getFormattedImageUrl, getLimitedFormattedText, handleAudio, handlePlayNextSong } from "@/utils";
import { EllipsisVertical, PlayCircle } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { Image, Pressable, Text, TouchableHighlight, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const SongListItem = ({ song, handleOpenMenu,songIndex}: SongListItemPropType) => {
  const dispatch = useDispatch();
  const {
    currentAudioState,
    currentAudioStatusState,
    currentPlayingSongDetails,
    currentSongPosition,
  } = useSelector((state: RootState) => state.songSlice);
  const { data: response, isLoading } = useGetWorldTopSongsQuery(10);
  const timeIntervalRef = useRef<any>(null);

  useEffect(() => {
    if (currentPlayingSongDetails?.songName === song?.attributes?.name) {
      controlSongIncreamenter();
    }

    return () => {
      clearInterval(timeIntervalRef.current);
    };
  }, [
    currentAudioStatusState?.isLoaded && currentAudioStatusState?.isPlaying,
    currentSongPosition,
  ]);

  async function controlSongIncreamenter() {
    if (timeIntervalRef.current) {
      clearInterval(timeIntervalRef.current);
    }

    if (
      currentAudioStatusState?.isLoaded &&
      currentAudioStatusState.isPlaying &&
        currentSongPosition >= Math.round(currentAudioStatusState.durationMillis! / 1000) * 1000
    ) {
      timeIntervalRef.current = null;
      await handlePlayNextSong();
      return;

    }

    if (
      currentAudioStatusState?.isLoaded &&
      currentAudioStatusState.isPlaying
    ) {
      timeIntervalRef.current = setInterval(() => {
        dispatch(setCurrentPosition(currentSongPosition + 1000));
      }, 1000);
    }
  }

  async function handlePlaySong(
    songName: string = "",
    playbackUrl: string | undefined = ""
  ) {
    try {
      const isPlayingAlready = await handlePlayPauseIfAlreayPlaying(songName);
      if (isPlayingAlready) return;
  
      if (currentAudioState) {
        await currentAudioState.unloadAsync();
        dispatch(setAudioState(null)); 
      }
  
      const { sound, status } = await handleAudio(playbackUrl);
  
      dispatch(
        setCurrentPlayingSongDetails({
          albumName: song?.attributes?.albumName,
          artistName: song?.attributes?.artistName,
          songName: song?.attributes?.name,
          songImageUrl: song?.attributes?.artwork?.url,
          songTrackUrl: song?.attributes?.previews[0]?.url,
          songIndex,
        })
      );
  
      dispatch(setAudioState(sound));
      dispatch(setAudioStatusState(status));
      dispatch(setCurrentPosition(0));
    } catch (error) {
      console.error("Error playing the song:", error);
    }
  }
  async function handlePlayPauseIfAlreayPlaying(currentSongName: string) {
    if (currentPlayingSongDetails?.songName === currentSongName) {
      try {
        if (currentAudioState && currentAudioStatusState?.isLoaded) {
          if (currentAudioStatusState.isPlaying) {
            await currentAudioState.pauseAsync();
          } else {
            await currentAudioState.playAsync();
          }
    
          const status = await currentAudioState.getStatusAsync();
          dispatch(setAudioStatusState(status));
          return true;
        }
      } catch (error) {
        console.error('Error handling play/pause:', error);
      }
    }
    return false;
  }

  

  return (
    <TouchableHighlight
      className="h-16 mb-5"
      onPress={() => {
        handlePlaySong(
          song?.attributes?.name,
          song?.attributes?.previews[0]?.url
        );
      }}
    >
      <View className="h-full w-full flex flex-row space-x-4 items-center">
        {/* <View className="h-full w-20 bg-yellow-200"> */}

        <View className="w-16 h-full rounded-lg overflow-hidden relative">
          <Image
            source={{
              uri: getFormattedImageUrl(song?.attributes?.artwork?.url),
            }}
            className="w-full h-full"
          />
          {currentPlayingSongDetails?.songName === song?.attributes?.name && (
            <View className="w-full h-full absolute top-0 left-0 flex items-center justify-center bg-black/40">
              {currentAudioStatusState?.isLoaded &&
              currentAudioStatusState.isPlaying ? (
                <Image className="w-8 h-8" source={Images.songPlayingGif} />
              ) : (
                <PlayCircle size={19} color={"white"} />
              )}
            </View>
          )}
        </View>
        {/* </View> */}
        <View className="flex-1">
          <Text
            className={`text-[16px] font-Jakarta ${
              currentPlayingSongDetails?.songName === song?.attributes?.name
                ? "text-primary"
                : "text-white"
            }`}
          >
            {getLimitedFormattedText(song?.attributes?.name, 25)}
          </Text>
          <Text
            className={`text-[11px] font-Jakarta ${
              currentPlayingSongDetails?.songName === song?.attributes?.name
                ? "text-primary"
                : "text-muted"
            }`}
          >
            {getLimitedFormattedText(song?.attributes?.albumName, 25)}
          </Text>
        </View>
        <View className="flex flex-row space-x-2 items-center">
          <Pressable onPress={handleOpenMenu}>
          <EllipsisVertical
            className="h-4 w-4 p-2 text-muted"
          />
          </Pressable>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default SongListItem;
