import GenresCard from "@/components/GenresCard";
import Wrapper from "@/components/Wrapper";
import { genres } from "@/constants";
import { useLazyGetSongsBySearchQueryQuery } from "@/services/redux/apiReducers/songApi";
import { Search } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const SearchTrack = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [getSongsBySearchQuery] = useLazyGetSongsBySearchQueryQuery();

  async function handleSearchQuery() {
    const formattedSearchQuery = searchQuery.toLocaleLowerCase().split(" ").join("%20");
    console.log(formattedSearchQuery);
    const { data: response } = await getSongsBySearchQuery({
      searchQuery: formattedSearchQuery,
      limit: 10,
    });
    console.log(response.data.tracks);
  }

  return (
    <Wrapper>
      <View className="border border-zinc-600 py-2 pl-5 pr-2 rounded-full flex flex-row items-center">
        <TextInput
          className="text-white flex-1"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={"#999"}
          placeholder="Search here..."
          cursorColor={"#fff"}
        />
        <Pressable className="w-8" onPress={handleSearchQuery}>
          <Search size={19} className="text-muted mx-auto" />
        </Pressable>
      </View>

      <ScrollView>
        <View className="mt-6 flex flex-row justify-between flex-wrap">
          {genres.map((genre, index) => (
            <GenresCard key={genre.title} genreData={genre} index={index} />
          ))}
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default SearchTrack;
