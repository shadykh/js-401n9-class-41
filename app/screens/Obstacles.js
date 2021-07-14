import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
const Obstacles = ({
    color,
    obstacleWidth, 
    obstacleHeight, 
    randomBottom, 
    gap, 
    obstaclesLeft}) => {

    return (
        <>
            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: obstacleWidth,
                height: 500,
                left: obstaclesLeft,
                bottom: randomBottom + obstacleHeight + gap,
            }}><Text style={styles.text} > 401
            </Text></View>
            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: randomBottom,
            }}><Text style={styles.text2} > 301
            </Text></View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      //justifyContent: "center",
      //borderRadius: birdRadius,
    },
    text: {
      color: "white",
      fontSize: 50,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0",
      paddingTop:250
    },
    text2: {
        color: "white",
        fontSize: 50,
        lineHeight: 70,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0",
      },
  });

export default Obstacles