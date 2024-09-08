import CustomBottomSheet from "@/components/CustomBottomSheet";
import SongList from "@/components/songList/SongList";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const home = () => {
  const songActionRef = useRef<BottomSheetModal>(null);
  const [songList, setSongList] = useState([]);

  useEffect(()=>{
    handleGetAllSongs();
  },[])

  const handleOpenMenu = useCallback(function () {
    songActionRef.current?.present();
  }, []);

  async function handleGetAllSongs(){
    try{
      const response = await fetch(`https://shazam-api7.p.rapidapi.com/charts/get-top-songs-in-country?country_code=IN&limit=10`,{
        method:"GET",
        headers:{
          'x-rapidapi-key':'693fbe4752msh7b16b93528c2617p12644cjsnda92f6025764',
          'x-rapidapi-host':'shazam-api7.p.rapidapi.com',
        },
      })
      const {data} = await response.json();
      setSongList(data);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <SongList handleOpenMenu={handleOpenMenu} songList={songList}/>
      <CustomBottomSheet ref={songActionRef} snapPoints={["45%"]} color="#333">
        <Text className="text-white">Bikash</Text>
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

export default home;
