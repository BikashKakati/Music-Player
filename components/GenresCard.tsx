import { View, Text, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import { Images } from '@/constants'
import { GenresPropType } from '@/types/type'

const GenresCard = ({genreData, index}:{genreData:GenresPropType, index:number}) => {
  return (
    <View className='w-32 h-20 rounded-xl overflow-hidden mb-5 mx-4 relative'>
      <View className='w-full h-full absolute top-0 left-0 flex items-center justify-center z-10'>
        <Text className='text-white text-xl font-Jakarta'>{genreData.title}</Text>
      </View>
      <Image source={genreData?.imageUrl || "" as ImageSourcePropType} className='w-full h-full opacity-60'/>
    </View>
  )
}

export default GenresCard