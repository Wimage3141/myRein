import React from 'react';
import { Tabs } from 'expo-router';

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#E40078',  // focused tab text
        tabBarInactiveTintColor: '#999999' // optional: un-focused tab text
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Main' }}
      />

      <Tabs.Screen
        name="calendar"
        options={{ title: 'Calendar' }}
      />

      <Tabs.Screen
        name="dashboard"
        options={{ title: 'Dashboard' }}
      />
    </Tabs>
  );
}
