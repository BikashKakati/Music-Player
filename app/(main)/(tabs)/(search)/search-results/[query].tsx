import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useGetSongsByGenreQuery } from '@/services/redux/apiReducers/songApi';

const SearchResults = () => {
    const {query} = useLocalSearchParams();
    const {data, isLoading} = useGetSongsByGenreQuery({genreType:query,limit:10});
  return (
    <View>
      <Text className='text-white'>SearchResults:{query}</Text>
    </View>
  )
}

export default SearchResults