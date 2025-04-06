import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const image = require("@/assets/images/mic_image.jpg");

export default function VTS() {
  return (
    <View style={styles.container}>
      <View style={[styles.box]}>
        <Text style={styles.text}>This will take the voice</Text>
        <Image source={image} style={styles.image} />
      </View>
      <View style={[styles.box, { backgroundColor: 'lightgray' }]}>
        <Text style={styles.text}>This will display what the user said</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1, 
  },
  box: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200, 
    resizeMode: 'contain',
  },
});
