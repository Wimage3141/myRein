import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import Calendar from '@/Components/Calendar'

const calendar = () => {
  const openDayTasks = (date:string) => {
    router.push({
      pathname: '/daytasks', // apparently / always means /app in expo router
      params: { date: date },
    });
  }

  return (
    // <View>
    //   <Text>my very realistic calendar (with 2 days :) ) (because i don't want to stress myself out too much by thinking about the future) </Text>
    //   <Button title='April 28th' onPress={() => openDayTasks("2025-04-28")} />
    //   <Button title='April 29th' onPress={() => openDayTasks("2025-04-28")} />
    // </View>
    <View>
      <Text className="text-xl font-bold mb-4 text-center">
        My Very Realistic Calendar
      </Text>

      <Calendar />
    </View>
  )
}

export default calendar