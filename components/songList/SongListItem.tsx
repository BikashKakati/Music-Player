import { Images } from "@/constants";
import { setAudioState, setAudioStatusState, setCurrentPlayingSongDetails} from "@/services/redux/sliceReducers/songSlice";
import { RootState } from "@/services/redux/store";
import { SongListItemPropType } from "@/types/type.d";
import { getFormattedImageUrl, getLimitedFormattedText } from "@/utils";
import { Audio } from "expo-av";
import { EllipsisVertical, PlayCircle } from "lucide-react-native";
import React from "react";
import {
  Image,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const SongListItem = ({
  song,
  handleOpenMenu,
}: SongListItemPropType) => {
  const dispatch = useDispatch();
  const {currentAudioState, currentAudioStatusState,currentPlayingSongDetails} = useSelector((state:RootState)=>state.songSlice);

  async function handlePlaySong(
    songName: string = "",
    playbackUrl: string | undefined = ""
  ) {
    const isPlayaingAlready = await handlePlayPauseIfAlreayPlaying(songName);
    if(isPlayaingAlready) return;
    
    const {sound, status} = await handleAudio(playbackUrl);
    dispatch(setCurrentPlayingSongDetails({
      albumName: song?.attributes?.albumName,
      artistName: song?.attributes?.artistName,
      songName: song?.attributes?.name,
      songImageUrl: song?.attributes?.artwork?.url,
      songTrackUrl: song?.attributes?.previews[0]?.url,
    }));
    dispatch(setAudioState(sound));
    dispatch(setAudioStatusState(status));
  }


  async function handlePlayPauseIfAlreayPlaying(currentSongName:string){
    if (currentPlayingSongDetails.songName === currentSongName) {
      if (currentAudioStatusState?.isLoaded && currentAudioStatusState.isPlaying) {
        const status = await currentAudioState?.pauseAsync();
        dispatch(setAudioStatusState(status));
      } else {
        const status = await currentAudioState?.playAsync();
        dispatch(setAudioStatusState(status));
      }
      return true;
    }
    return false;
  }

  async function handleAudio(playbackUrl:string){
    await currentAudioState?.stopAsync();
    await currentAudioState?.unloadAsync();


    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: false,
    });
    const soundState = await Audio.Sound.createAsync(
      {
        uri: playbackUrl,
      },
      {
        shouldPlay: true,
        isLooping: false,
      }
    );
    return soundState;
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
          {currentPlayingSongDetails.songName === song?.attributes?.name && (
            <View className="w-full h-full absolute top-0 left-0 flex items-center justify-center bg-black/40">
              {currentAudioStatusState?.isLoaded && currentAudioStatusState.isPlaying ? (
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
              currentPlayingSongDetails.songName === song?.attributes?.name
                ? "text-primary"
                : "text-white"
            }`}
          >
            {getLimitedFormattedText(song?.attributes?.name, 25)}
          </Text>
          <Text
            className={`text-[11px] font-Jakarta ${
              currentPlayingSongDetails.songName === song?.attributes?.name
                ? "text-primary"
                : "text-muted"
            }`}
          >
            {getLimitedFormattedText(song?.attributes?.albumName, 25)}
          </Text>
        </View>
        <View className="flex flex-row space-x-2 items-center">
          <EllipsisVertical
            className="h-4 w-4 p-2 text-muted"
            onPress={handleOpenMenu}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default SongListItem;
