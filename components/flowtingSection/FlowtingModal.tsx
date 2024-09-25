import { useGetWorldTopSongsQuery } from "@/services/redux/apiReducers/songApi";
import { setAudioStatusState } from "@/services/redux/sliceReducers/songSlice";
import { RootState } from "@/services/redux/store";
import { getFormattedImageUrl, getLimitedFormattedText, handlePlayNextSong, handlePlayPreviousSong } from "@/utils";
import {
  PauseCircle,
  PlayCircle,
  SkipBack,
  SkipForward
} from "lucide-react-native";
import React from "react";
import { Image, Text, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

interface FlowtingModalPropType{
  onPress:()=>void;
}

const FlowtingModal = ({onPress}:FlowtingModalPropType) => {
  const { currentPlayingSongDetails, currentAudioState, currentAudioStatusState} = useSelector(
    (state: RootState) => state.songSlice
  );
  const { data: response, isLoading } = useGetWorldTopSongsQuery(10);
  const dispatch = useDispatch();

  async function handlePrevious() {
   const status = await currentAudioState?.pauseAsync();
   dispatch(setAudioStatusState(status));
  }
  async function handlePlayPause(){
    if(currentAudioStatusState?.isLoaded && currentAudioStatusState.isPlaying){
      const status = await currentAudioState?.pauseAsync();
      dispatch(setAudioStatusState(status));
    }else{
      const status = await currentAudioState?.playAsync();
      dispatch(setAudioStatusState(status));
    }
  }

  return (
    <TouchableHighlight onPress={onPress}>
      <View className="absolute h-16 w-full bottom-[50px] left-0 right-0">
      <View className="w-[330px] h-full bg-zinc-800 mx-auto rounded-lg overflow-hidden flex flex-row items-center justify-between">
        <View className="flex-1 flex flex-row items-center space-x-3 h-full">
          <Image
            source={{
              uri: getFormattedImageUrl(
                currentPlayingSongDetails?.songImageUrl || ""
              ),
            }}
            className="h-full w-16 object-cover"
          />
          <Text className="text-white">
            {getLimitedFormattedText(currentPlayingSongDetails?.songName,15)}
          </Text>
        </View>
        <View className="flex flex-row mr-3 h-full items-center">
          <TouchableHighlight
            className="h-fit w-fit rounded-full p-2"
            onPress={()=>{handlePlayPreviousSong(response?.data)}}
          >
            <SkipBack size={20} className="text-white" />
          </TouchableHighlight>
          <TouchableHighlight onPress={handlePlayPause} className="p-2 rounded-full">
            {
             ( currentAudioStatusState?.isLoaded && currentAudioStatusState.isPlaying) ?
             <PauseCircle size={28} className="text-white"/>
             :
             <PlayCircle size={28} className="text-white" />
            }
          </TouchableHighlight>
          <TouchableHighlight
            className="h-fit w-fit rounded-full p-2"
            onPress={()=>{handlePlayNextSong(response?.data)}}
          >
            <SkipForward size={20} className="text-white" />
          </TouchableHighlight>
        </View>
      </View>
    </View>
    </TouchableHighlight>
  );
};

export default FlowtingModal;
