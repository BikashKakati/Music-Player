import { View, Text } from "react-native";
import React, { useCallback, useEffect } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useGetSongsByGenreQuery } from "@/services/redux/apiReducers/songApi";
import Wrapper from "@/components/Wrapper";
import Loader from "@/components/Loader";
import SongList from "@/components/songList/SongList";
import { setSongsQueueList } from "@/services/redux/sliceReducers/songSlice";
import { useDispatch } from "react-redux";

const SearchResultsByGenre = () => {
  const { genre } = useLocalSearchParams();
  const dispatch = useDispatch();
  const { data: response, isLoading } = useGetSongsByGenreQuery({
    genreType: genre,
    limit: 10,
  });

  useEffect(() => {
    if (response) {
      dispatch(setSongsQueueList(response?.data || []));
    }
  }, [response]);

  const formattedTitle = useCallback(function (title:string):string{
    if(title.includes("_")){
      const words = title.split("_");
      return words.join(" ").toLowerCase();
    }
    return title.toLowerCase();
  },[])

  return (
    <Wrapper safeArea={false}>
      <Stack.Screen
        options={{
          title: `Dive into ${formattedTitle((genre as string))} music`,
        }}
      />
      {isLoading ? <Loader /> : <SongList songList={response?.data || []} />}
    </Wrapper>
  );
};

export default SearchResultsByGenre;
