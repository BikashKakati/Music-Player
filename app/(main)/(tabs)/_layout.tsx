import TabsIcon from "@/components/TabsIcon";
import { Tabs } from "expo-router";
import { Disc3, Home, Search, Users } from "lucide-react-native";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FF3243",
        tabBarInactiveTintColor: "#999",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown:false,
          tabBarIcon: ({ color, focused }) => (
            <TabsIcon color={color} focused={focused} label="Home">
              {<Home className="h-4 w-4" color={color} />}
            </TabsIcon>
          ),
        }}
      />
      <Tabs.Screen 
      name="search"
      options={{
        headerShown:false,
        tabBarIcon: ({ color, focused }) => (
          <TabsIcon color={color} focused={focused} label="Search">
            {<Search className="h-4 w-4" color={color} />}
          </TabsIcon>
        ),
      }}
      />
      <Tabs.Screen
      name="artists"
       options={{
        tabBarIcon: ({ color, focused }) => (
          <TabsIcon color={color} focused={focused} label="Artist">
            {<Users className="h-4 w-4" color={color} />}
          </TabsIcon>
        ),
      }}
      />
      <Tabs.Screen name="playlists"
       options={{
        tabBarIcon: ({ color, focused }) => (
          <TabsIcon color={color} focused={focused} label="Playlist">
            {<Disc3 className="h-4 w-4" color={color} />}
          </TabsIcon>
        ),
      }}
       />
    </Tabs>
  );
};

export default TabsLayout;
