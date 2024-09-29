import CustomBottomSheet from "@/components/CustomBottomSheet";
import Loader from "@/components/Loader";
import Wrapper from "@/components/Wrapper";
import SongList from "@/components/songList/SongList";
import { useGetWorldTopSongsQuery } from "@/services/redux/apiReducers/songApi";
import { setSongsQueueList } from "@/services/redux/sliceReducers/songSlice";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef } from "react";
import { Text } from "react-native";
import { useDispatch } from "react-redux";

const home = () => {
  const {data:resonse, isLoading} = useGetWorldTopSongsQuery(10);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(resonse){
      dispatch(setSongsQueueList(resonse?.data || []));
    }
  },[resonse])

  return (
    <Wrapper>
      <Text className="text-2xl text-white font-bold mb-4">Top Songs</Text>
      {
        isLoading ? 
        (<Loader/>)
        :
        (
          <SongList songList={resonse?.data}/>
        )
      }
    </Wrapper>
  );
};

export default home;
