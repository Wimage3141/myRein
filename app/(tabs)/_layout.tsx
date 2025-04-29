import React from 'react';
import { View, Text } from 'react-native';
import { Tabs } from 'expo-router';

const TabIcon = ({
  focused,
  letter,
  title,
}: {
  focused: boolean;
  letter: string;
  title: string;
}) => {
  if (focused) {
    return (
      <View className="flex-row items-center justify-center px-5 py-3 rounded-full w-40 h-16 mt-6 bg-[#E40078]">
        <Text className="text-[#FFFFFF] font-semibold text-base leading-[20px]">
          {letter}
        </Text>
        <Text className="text-[#FFFFFF] font-semibold text-base leading-[20px] ml-2">
          {title}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-none justify-center items-center">
      <Text className="text-[#E40078] text-[20px] font-semibold leading-[24px]">
        {letter}
      </Text>
    </View>
  );
};

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 8,
          left: 12,
          right: 12,
          height: 60,
          backgroundColor: '#fff',
          borderRadius: 30,
          elevation: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Main',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} letter="M" title="Main" />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} letter="C" title="Calendar" />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} letter="D" title="Dashboard" />
          ),
        }}
      />
    </Tabs>
  );
}
