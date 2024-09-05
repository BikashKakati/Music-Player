import { Images } from "@/constants";
import { SongListItemPropType } from "@/types/type.d";
import { EllipsisVertical } from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";

const SongListItem = ({
  imageUrl,
  artistName,
  songName,
  playSong,
  handleOpenMenu,
  setPlaySong,
}: SongListItemPropType) => {

  function handlePlaySong(songName: string) {
    setPlaySong((prevSong) => (prevSong === songName ? "" : songName));
  }

  
  return (
    <>
      <TouchableHighlight
        className="mx-4 h-20 mb-1"
        onPress={() => {
          handlePlaySong(songName);
        }}
      >
        <View className="h-full w-full flex flex-row space-x-4 items-center font-Jakarta">
          <View className="h-full w-20 bg-yellow-200"></View>
          <View className="flex-1">
            <Text
              className={`text-lg ${
                playSong === songName ? "text-primary" : "text-white"
              }`}
            >
              {songName}
            </Text>
            <Text
              className={`text-xs ${
                playSong === songName ? "text-primary" : "text-muted"
              }`}
            >
              {artistName}
            </Text>
          </View>
          <View className="flex flex-row space-x-2 items-center">
            {playSong === songName && (
              <Image className="w-8 h-8" source={Images.songPlayingGif} />
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
