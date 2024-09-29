import React, { ReactNode } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface WrapperPropType{
    className?:string,
    children:ReactNode,
    safeArea?:boolean,
}

const Wrapper = ({className, children, safeArea=true}:WrapperPropType) => {
    const styles = `flex-1 px-4 py-2 ${className}`
  if(safeArea){
    return (
      <SafeAreaView className={styles}>
      {children}
    </SafeAreaView>
    )
  }
  return (
    <View className={styles}>
      {children}
    </View>
  )
}

export default Wrapper