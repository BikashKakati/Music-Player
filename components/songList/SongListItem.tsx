import { Images } from "@/constants";
import { setCurrentPlayingSongDetails, setIsSongPlaying } from "@/services/redux/sliceReducers/songSlice";
import { SongListItemPropType } from "@/types/type.d";
import { getLimitedFormattedText } from "@/utils";
import { Audio } from "expo-av";
import { EllipsisVertical, PlayCircle } from "lucide-react-native";
import React from "react";
import {
  Image,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { useDispatch } from "react-redux";

const SongListItem = ({
  song,
  currentSongDetails,
  handleOpenMenu,
  setCurrentSongDetails,
  currentSound,
  setCurrentSound,
}: SongListItemPropType) => {
  const dispatch = useDispatch();

  async function handlePlaySong(
    songName: string = "",
    playbackUrl: string | undefined = ""
  ) {
    const isPlayaingAlready = await handlePlayPauseIfAlreayPlaying(songName);
    if(isPlayaingAlready) return;
    
    const {sound, status} = await handleAudio(playbackUrl);
    setCurrentSound(sound);
    setCurrentSongDetails({
      songName,
      isPlaying: status.isLoaded && status.isPlaying,
    });

    dispatch(setCurrentPlayingSongDetails({
      albumName: song?.attributes?.albumName,
      artistName: song?.attributes?.artistName,
      songName: song?.attributes?.name,
      songImageUrl: song?.attributes?.artwork?.url,
      songTrackUrl: song?.attributes?.previews[0]?.url,
    }));
    dispatch(setIsSongPlaying(status.isLoaded));
  }


  async function handlePlayPauseIfAlreayPlaying(currentSongName:string){
    if (currentSongDetails.songName === currentSongName) {
      if (currentSongDetails.isPlaying) {
        await currentSound?.pauseAsync();
      } else {
        await currentSound?.playAsync();
      }
      setCurrentSongDetails((prev) => ({
        ...prev,
        isPlaying: !prev.isPlaying,
      }));
      return true;
    }
    currentSound?.stopAsync();
    setCurrentSound(undefined);
    return false;
  }

  async function handleAudio(playbackUrl:string){
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
              uri: song?.attributes?.artwork?.url
                ?.replace("{w}", "300")
                .replace("{h}", "300"),
            }}
            className="w-full h-full"
          />
          {currentSongDetails.songName === song?.attributes?.name && (
            <View className="w-full h-full absolute top-0 left-0 flex items-center justify-center bg-black/40">
              {currentSongDetails.isPlaying ? (
                <Image className="w-8 h-8" source={Images.songPlayingGif} />
              ) : (
                <PlayCircle className="w-2 h-2" color={"white"} />
              )}
            </View>
          )}
        </View>
        {/* </View> */}
        <View className="flex-1">
          <Text
            className={`text-[16px] font-Jakarta ${
              currentSongDetails.songName === song?.attributes?.name
                ? "text-primary"
                : "text-white"
            }`}
          >
            {getLimitedFormattedText(song?.attributes?.name, 25)}
          </Text>
          <Text
            className={`text-[11px] font-Jakarta ${
              currentSongDetails.songName === song?.attributes?.name
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
