import { View, Text, Image, Touchable, Pressable } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/services/redux/store";
import { getFormattedImageUrl } from "@/utils";
import {
  Play,
  PlayCircle,
  SkipBack,
  SkipBackIcon,
  SkipForward,
} from "lucide-react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

const FlowtingModal = () => {
  const { currentPlayingSongDetails } = useSelector(
    (state: RootState) => state.songSlice
  );

  function handlePrevious() {
    console.log("going to next");
  }
  return (
    <View className="absolute h-16 w-full bottom-12 left-0 right-0">
      <View className="w-[328px] h-full bg-zinc-800 mx-auto rounded-lg overflow-hidden flex flex-row items-center justify-between">
        <View className="flex-1 flex flex-row items-center space-x-3 h-full">
          <Image
            source={{
              uri: getFormattedImageUrl(
                currentPlayingSongDetails?.songImageUrl
              ),
            }}
            className="h-full w-16 object-cover"
          />
          <Text className="text-white">
            {currentPlayingSongDetails?.songName}
          </Text>
        </View>
        <View className="flex flex-row mr-3 h-full items-center">
          <TouchableHighlight
            className="h-fit w-fit rounded-full p-2"
            onPress={handlePrevious}
          >
            <SkipBack size={24} className="text-white" />
          </TouchableHighlight>
          <TouchableHighlight onPress={handlePrevious} className="p-2 rounded-full">
            <Play size={32} className="text-white" />
          </TouchableHighlight>
          <TouchableHighlight
            className="h-fit w-fit rounded-full p-2"
            onPress={handlePrevious}
          >
            <SkipForward size={24} className="text-white" />
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default FlowtingModal;
