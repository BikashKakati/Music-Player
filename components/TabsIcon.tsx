import { View, Text } from 'react-native'
import React from 'react'
import { TabIconPropType } from '@/types/type.d'

export default function TabsIcon({color,focused,label,children}:TabIconPropType) {
  return (
    <View className='flex items-center justify-start'>
        {children}
        <Text className={`${focused ?"text-primary":"text-muted"} text-xs leading-none`}>{label}</Text>
    </View>
  )
}