import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useGetSongsByGenreQuery } from "@/services/redux/apiReducers/songApi";
import Wrapper from "@/components/Wrapper";
import Loader from "@/components/Loader";
import SongList from "@/components/songList/SongList";
import { setSongsQueueList } from "@/services/redux/sliceReducers/songSlice";
import { useDispatch } from "react-redux";

const SearchResults = () => {
  const { query } = useLocalSearchParams();
  const dispatch = useDispatch();
  const { data: response, isLoading } = useGetSongsByGenreQuery({
    genreType: query,
    limit: 10,
  });

  useEffect(() => {
    if (response) {
      dispatch(setSongsQueueList(response?.data || []));
    }
  }, [response]);

  return (
    <Wrapper safeArea={false}>
      <Stack.Screen
        options={{
          title: `Dive into ${(query as string).toLowerCase()} music`,
        }}
      />
      {isLoading ? <Loader /> : <SongList songList={response?.data || []} />}
    </Wrapper>
  );
};

export default SearchResults;
