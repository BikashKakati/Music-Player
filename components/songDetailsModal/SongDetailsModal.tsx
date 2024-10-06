import { useGetWorldTopSongsQuery } from "@/services/redux/apiReducers/songApi";
import {
  setAudioState,
  setAudioStatusState,
  setCurrentPlayingSongDetails,
  setCurrentPosition,
} from "@/services/redux/sliceReducers/songSlice";
import { RootState } from "@/services/redux/store";
import {
  getFormattedImageUrl,
  getFormattedTime,
  handleAudio,
  handlePlayNextSong,
  handlePlayPreviousSong,
} from "@/utils";
import {
  Heart,
  List,
  Pause,
  Play,
  Repeat,
  SkipBack,
  SkipForward,
} from "lucide-react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Image, Pressable, Text, TouchableHighlight, View, Animated } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Svg, { Path } from 'react-native-svg';

const SongDetailsModal = () => {
  const dispatch = useDispatch();
  // const waterFillAnim = useRef(new Animated.Value(0)).current;
  // const wave1Anim = useRef(new Animated.Value(0)).current;
  // const wave2Anim = useRef(new Animated.Value(0)).current;

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

  // useEffect(() => {
  //   Animated.timing(waterFillAnim, {
  //     toValue: getIncreamentStatus()!,
  //     duration: 1000,
  //     useNativeDriver: false,
  //   }).start();

  //   Animated.loop(
  //     Animated.parallel([
  //       Animated.timing(wave1Anim, {
  //         toValue: 1,
  //         duration: 7000,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(wave2Anim, {
  //         toValue: 1,
  //         duration: 5000,
  //         useNativeDriver: true,
  //       }),
  //     ])
  //   ).start();
  // }, [getIncreamentStatus()]);

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
        <View className="absolute w-full h-full bg-black/80"></View>
        {/* <Animated.View 
          className="absolute bottom-0 left-0 right-0 bg-blue-500/30 overflow-hidden"
          style={{
            height: waterFillAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          }}
        >
          <Svg height="100%" width="100%" style={{ position: 'absolute', top: -40 }}>
            <Animated.View style={{
              transform: [{
                translateX: wave1Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -400],
                }),
              }],
            }}>
              <Path
                d="M0,0 C100,20 200,-20 400,0 V60 H0 Z"
                fill="rgba(255,255,255,0.3)"
              />
            </Animated.View>
          </Svg>
          <Svg height="100%" width="100%" style={{ position: 'absolute', top: -30 }}>
            <Animated.View style={{
              transform: [{
                translateX: wave2Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -400],
                }),
              }],
            }}>
              <Path
                d="M0,0 C150,40 300,-40 400,0 V60 H0 Z"
                fill="rgba(255,255,255,0.2)"
              />
            </Animated.View>
          </Svg>
        </Animated.View> */}
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
          <TouchableHighlight
            onPress={() => {
              handlePlayPreviousSong();
            }}
          >
            <SkipBack size={25} className="text-white" />
          </TouchableHighlight>
          <TouchableHighlight onPress={handlePlayPause}>
            <View className="w-20 h-20 flex items-center justify-center border-4 border-gray-400 bg-slate-700/50 rounded-full">
              {currentAudioStatusState?.isLoaded &&
              currentAudioStatusState.isPlaying ? (
                <Pause size={25} className="text-white" />
              ) : (
                <Play size={25} className="text-white" />
              )}
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              handlePlayNextSong();
            }}
          >
            <SkipForward size={25} className="text-white" />
          </TouchableHighlight>
          <List size={23} className="text-white" />
        </View>
      </View>
    </View>
  );
};

export default SongDetailsModal;
