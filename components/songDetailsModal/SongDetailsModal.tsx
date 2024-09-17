import { View, Text, Image, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/redux/store";
import { getFormattedImageUrl } from "@/utils";
import Wrapper from "../Wrapper";
import {
  Heart,
  List,
  Pause,
  Play,
  PlayCircle,
  Repeat,
  SkipBack,
  SkipForward,
} from "lucide-react-native";
import { setAudioStatusState } from "@/services/redux/sliceReducers/songSlice";

const SongDetailsModal = () => {
  const dispatch = useDispatch();
  const {
    currentPlayingSongDetails,
    currentAudioStatusState,
    currentAudioState,
  } = useSelector((state: RootState) => state.songSlice);



  async function handlePlayPause() {
    if (
      currentAudioStatusState?.isLoaded &&
      currentAudioStatusState.isPlaying
    ) {
      const status = await currentAudioState?.pauseAsync();
      dispatch(setAudioStatusState(status));
    } else {
      const status = await currentAudioState?.playAsync();
      dispatch(setAudioStatusState(status));
    }
  }
  return (
    <View className="w-full h-full px-8 pt-5">
      <View className="h-14"></View>
      <Image
        source={{
          uri: getFormattedImageUrl(currentPlayingSongDetails?.songImageUrl),
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
        <Text className="text-white text-xs">00.00</Text>
        <View className="flex-1 w-full h-1 bg-white/50 rounded-full relative">
          <View
            className="h-full bg-white rounded-full"
            style={{
              width: `${
              20}%`,
            }}
          >
            <View className="w-4 h-4 rounded-full bg-white absolute -top-[6px] -right-3 z-20"></View>
          </View>
        </View>
        <Text className="text-white text-xs">00.00</Text>
      </View>
      <View className="flex flex-row items-center justify-between mt-14">
        <Repeat size={23} className="text-white" />
        <SkipBack size={25} className="text-white" />
        <Pressable onPress={handlePlayPause}>
          <View className="w-20 h-20 flex items-center justify-center border-4 border-gray-400 bg-transparent rounded-full">
            {currentAudioStatusState?.isLoaded &&
            currentAudioStatusState.isPlaying ? (
              <Pause size={25} className="text-white" />
            ) : (
              <Play size={25} className="text-white" />
            )}
          </View>
        </Pressable>
        <SkipForward size={25} className="text-white" />
        <List size={23} className="text-white" />
      </View>
    </View>
  );
};

export default SongDetailsModal;
