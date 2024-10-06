import Wrapper from "@/components/Wrapper";
import { useGetSongsBySearchQuery } from "@/services/redux/apiReducers/songApi";
import { setSongsQueueList } from "@/services/redux/sliceReducers/songSlice";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

const SearchResultsByQuery = () => {
  const { query } = useLocalSearchParams();
  const dispatch = useDispatch();
  const { data: response, isLoading } = useGetSongsBySearchQuery({
    genreType: getFormattedQuery(query as string),
    limit: 10,
  });
  console.log(response?.data)

  function getFormattedQuery(query:string):string{
    return query.toLocaleLowerCase().split(" ").join("%20");
  }
 

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
          title: `Dive into ${formattedTitle((query as string))} music`,
        }}
      />
      {/* {isLoading ? <Loader /> : <SongList songList={response?.data || []} />} */}
    </Wrapper>
  );
};

export default SearchResultsByQuery;
