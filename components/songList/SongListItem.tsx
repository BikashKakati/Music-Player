import { Images } from "@/constants";
import { SongListItemPropType } from "@/types/type.d";
import { Audio } from "expo-av";
import { EllipsisVertical, Pause, PlayCircle } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

const SongListItem = ({
  song,
  currentSongDetails,
  handleOpenMenu,
  setCurrentSongDetails,
  currentSound,
  setCurrentSound
}: SongListItemPropType) => {

  async function handlePlaySong(songName: string = "", playbackUrl:string|undefined="") {
    if(currentSongDetails.songName === songName){
      if(currentSongDetails.isPlaying){
        await currentSound?.pauseAsync();
      }else{
        await currentSound?.playAsync();
      }
      setCurrentSongDetails(prev => ({...prev, isPlaying:!prev.isPlaying}));
      return;
    }
    currentSound?.stopAsync();
    await Audio.setAudioModeAsync({playsInSilentModeIOS:true, staysActiveInBackground:true,shouldDuckAndroid:false})
    const {sound, status} = await Audio.Sound.createAsync(
      {
        uri:playbackUrl
      },
      {
        shouldPlay:true,
        isLooping:false,
      }
    )
    await sound.playAsync();
    setCurrentSound(sound);
    setCurrentSongDetails({
      songName,
      isPlaying:status.isLoaded && status.isPlaying,
    })
  }

  return (
    <>
      <TouchableHighlight
        className="mx-4 h-20 mb-1"
        onPress={() => {
          handlePlaySong(song?.attributes?.name, song?.attributes?.previews[0]?.url);
        }}
      >
        <View className="h-full w-full flex flex-row space-x-4 items-center font-Jakarta">
          {/* <View className="h-full w-20 bg-yellow-200"> */}
          <Image
            source={{
              uri: song?.attributes?.artwork?.url
                ?.replace("{w}", "300")
                .replace("{h}", "300"),
            }}
            className="w-20 h-full"
          />
          {/* </View> */}
          <View className="flex-1">
            <Text
              className={`text-lg ${
                currentSongDetails.songName === song?.attributes?.name ? "text-primary" : "text-white"
              }`}
            >
              {song?.attributes?.name}
            </Text>
            <Text
              className={`text-xs ${
                currentSongDetails.songName === song?.attributes?.name ? "text-primary" : "text-muted"
              }`}
            >
              {song?.artistName}
            </Text>
          </View>
          <View className="flex flex-row space-x-2 items-center">
            {currentSongDetails.songName === song?.attributes?.name && (
              currentSongDetails.isPlaying ? <Image className="w-8 h-8" source={Images.songPlayingGif} />:<PlayCircle className="w-2 h-2" color={"white"}/>
            )}
            <EllipsisVertical
              className="h-4 w-4 p-2 text-muted"
              onPress={handleOpenMenu}
            />
          </View>
        </View>
      </TouchableHighlight>
    </>
  );
};

export default SongListItem;
