import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen
            name = "index"
            options={{
                title: "Main",
                headerShown: false,
            }}
        />

        <Tabs.Screen
            name = "calendar"
            options={{
                title: "Calendar",
                headerShown: false,
            }}
        />

        <Tabs.Screen
            name = "dashboard"
            options={{
                title: "Dashboard",
                headerShown: false,
            }}
        />
    </Tabs>
  )
}

export default _layout