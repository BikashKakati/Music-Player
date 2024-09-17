import React, { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

interface WrapperPropType{
    className?:string,
    children:ReactNode
}

const Wrapper = ({className, children}:WrapperPropType) => {
    const styles = `flex-1 px-4 py-2 ${className}`
  return (
    <SafeAreaView className={styles}>
      {children}
    </SafeAreaView>
  )
}

export default Wrapper