import { useGetWorldTopSongsQuery } from "@/services/redux/apiReducers/songApi";
import {
  setAudioState,
  setAudioStatusState,
  setCurrentPlayingSongDetails,
  setCurrentPosition,
} from "@/services/redux/sliceReducers/songSlice";
import { RootState } from "@/services/redux/store";
import { getFormattedImageUrl, handleAudio } from "@/utils";
import {
  Heart,
  List,
  Pause,
  Play,
  Repeat,
  SkipBack,
  SkipForward,
} from "lucide-react-native";
import React, { useCallback, useMemo } from "react";
import { Image, Pressable, Text, TouchableHighlight, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const SongDetailsModal = () => {
  const dispatch = useDispatch();
  const { data: resonse, isLoading } = useGetWorldTopSongsQuery(10);

  const {
    currentPlayingSongDetails,
    currentAudioStatusState,
    currentAudioState,
    currentSongPosition,
  } = useSelector((state: RootState) => state.songSlice);

  const getIncreamentStatus = useCallback(
    function () {
      if (currentAudioStatusState?.isLoaded) {
        return currentSongPosition / currentAudioStatusState.durationMillis!;
      }
    },
    [currentSongPosition, currentAudioStatusState?.isLoaded]
  );

  function getFormattedTime(timeDuraton: number | undefined): string {
    const totalSeconds = Math.floor(timeDuraton! / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }

  async function handlePlayPause() {
    try {
      if (currentAudioState && currentAudioStatusState?.isLoaded) {
        if (currentAudioStatusState.isPlaying) {
          // Pause the current song
          await currentAudioState.pauseAsync();
        } else {
          // Check if the song needs to be restarted or resumed
          if (
            Math.round(currentAudioStatusState.durationMillis! / 1000) * 1000 >
            currentSongPosition
          ) {
            // Resume the song from where it was paused
            await currentAudioState.playAsync();
          } else {
            // Restart the song
            await currentAudioState.replayAsync({ shouldPlay: true });
          }
        }

        // Update the state after the operation completes
        const status = await currentAudioState.getStatusAsync();
        dispatch(setAudioStatusState(status));
      }
    } catch (error) {
      console.error("Error handling play/pause:", error);
    }
  }

  async function handlePlayNextSong() {
    if (currentAudioState) {
      await currentAudioState?.stopAsync();
      await currentAudioState?.unloadAsync();
    }
    const songsData = resonse?.data || [];
    const currentSongIndex = currentPlayingSongDetails?.songIndex!;
    const nextSongIndex =
      currentSongIndex + 1 >= songsData.length - 1 ? 0 : currentSongIndex + 1;
    const nextSongDetails = songsData?.[nextSongIndex];
    const { sound, status } = await handleAudio(
      nextSongDetails?.attributes?.previews[0]?.url
    );
    dispatch(
      setCurrentPlayingSongDetails({
        albumName: nextSongDetails?.attributes?.albumName,
        artistName: nextSongDetails?.attributes?.artistName,
        songName: nextSongDetails?.attributes?.name,
        songImageUrl: nextSongDetails?.attributes?.artwork?.url,
        songTrackUrl: nextSongDetails?.attributes?.previews[0]?.url,
        songIndex: nextSongIndex,
      })
    );

    dispatch(setAudioState(sound));
    dispatch(setAudioStatusState(status));
    dispatch(setCurrentPosition(0));
  }
  async function handlePlayPreviousSong() {
    if (currentAudioState) {
      await currentAudioState?.stopAsync();
      await currentAudioState?.unloadAsync();
    }
    const songsData = resonse?.data || [];
    const currentSongIndex = currentPlayingSongDetails?.songIndex!;
    const previousSongIndex =
      currentSongIndex - 1 < 0 ? songsData.length - 1 : currentSongIndex - 1;
    const nextSongDetails = songsData?.[previousSongIndex];
    const { sound, status } = await handleAudio(
      nextSongDetails?.attributes?.previews[0]?.url
    );
    dispatch(
      setCurrentPlayingSongDetails({
        albumName: nextSongDetails?.attributes?.albumName,
        artistName: nextSongDetails?.attributes?.artistName,
        songName: nextSongDetails?.attributes?.name,
        songImageUrl: nextSongDetails?.attributes?.artwork?.url,
        songTrackUrl: nextSongDetails?.attributes?.previews[0]?.url,
        songIndex: previousSongIndex,
      })
    );

    dispatch(setAudioState(sound));
    dispatch(setAudioStatusState(status));
    dispatch(setCurrentPosition(0));
  }

  return (
    <View className="w-full h-full relative">
      <View className="absolute w-full h-full top-0 left-0">
        <Image
          className="w-full h-full object-cover"
          source={{
            uri: getFormattedImageUrl(
              currentPlayingSongDetails?.songImageUrl as string
            ),
          }}
        />
        {/* <BlurView intensity={100} tint="default" className="absolute w-full h-full" /> */}
        <View className="absolute w-full h-full bg-black/80" />
      </View>
      <View className="px-8 pt-5">
        <View className="h-14"></View>
        <Image
          source={{
            uri: getFormattedImageUrl(
              currentPlayingSongDetails?.songImageUrl as string
            ),
          }}
          className="w-[280px] h-[280px] object-contain mx-auto rounded-xl"
        />
        <View className="mt-6 flex-row items-start justify-between">
          <Text className="text-white text-xl">
            {currentPlayingSongDetails?.songName}
          </Text>
          <Heart size={28} className="text-white" />
        </View>
        <View className="w-full flex flex-row mt-14 items-center space-x-4">
          <Text className="text-white text-xs">
            {getFormattedTime(currentSongPosition)}
          </Text>
          <View className="flex-1 w-full h-1 bg-white/50 rounded-full relative">
            <View
              className="h-full bg-white rounded-full"
              style={{
                width: `${100 * getIncreamentStatus()!}%`,
              }}
            >
              <View className="w-4 h-4 rounded-full bg-white absolute -top-[6px] -right-3 z-20"></View>
            </View>
          </View>
          <Text className="text-white text-xs">
            {currentAudioStatusState?.isLoaded &&
              getFormattedTime(currentAudioStatusState?.durationMillis || 0)}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-between mt-14">
          <Repeat size={23} className="text-white" />
          <TouchableHighlight onPress={handlePlayPreviousSong}>
            <SkipBack size={25} className="text-white" />
          </TouchableHighlight>
          <TouchableHighlight onPress={handlePlayPause}>
            <View className="w-20 h-20 flex items-center justify-center border-4 border-gray-400 bg-transparent rounded-full">
              {currentAudioStatusState?.isLoaded &&
              currentAudioStatusState.isPlaying ? (
                <Pause size={25} className="text-white" />
              ) : (
                <Play size={25} className="text-white" />
              )}
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={handlePlayNextSong}>
            <SkipForward size={25} className="text-white" />
          </TouchableHighlight>
          <List size={23} className="text-white" />
        </View>
      </View>
    </View>
  );
};

export default SongDetailsModal;
