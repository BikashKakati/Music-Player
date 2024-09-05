import { Redirect } from 'expo-router';
import React from 'react';

const Index = () => {
    const isSignedin = true;
  if(isSignedin){
    return <Redirect href={"/(main)/(tabs)/home"}/>
  }
}

export default Index;