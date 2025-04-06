// app/calendar.tsx
import React from "react";
import {useRouter} from "expo-router";
import {Button} from "react-native";
import CalendarScreen from '../../components/CalendarScreen';

export default function Calendar(){
    const router = useRouter();
    const handleClick = ()=>{
        router.push("/VoiceToText");
    }
    return(
        <div>
            <CalendarScreen/>
            <div className="VTS Button">
                <Button
                title = "VTS"
                onPress={handleClick}
                />
            </div>
        </div>
        
    )
}

// Button for voice-to-text
// When user presses the button, take them to a new screen and do voice-to-text