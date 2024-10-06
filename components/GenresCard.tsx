import { GenresPropType } from '@/types/type'
import { router } from 'expo-router'
import React from 'react'
import { Image, ImageSourcePropType, Pressable, Text, View } from 'react-native'

const GenresCard = ({genreData, index}:{genreData:GenresPropType, index:number}) => {
  function handleSelectGenre(genreType:string){
    router.push(`/(search)/genre-results/${genreType}`);
  }
  return (
   <Pressable onPress={()=>{handleSelectGenre(genreData.value)}}>
     <View className='w-32 h-20 rounded-xl overflow-hidden mb-5 mx-4 relative'>
      <View className='w-full h-full absolute top-0 left-0 flex items-center justify-center z-10'>
        <Text className='text-white text-xl font-Jakarta'>{genreData.title}</Text>
      </View>
      <Image source={genreData?.imageUrl || "" as ImageSourcePropType} className='w-full h-full opacity-60'/>
    </View>
   </Pressable>
  )
}

export default GenresCard