import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, ImageBackground, Text, View, Dimensions, TouchableWithoutFeedback, Alert } from 'react-native';
import Bird from './Bird'
import Obstacles from './Obstacles'
const image = { uri: "https://i0.wp.com/alghad.com/wp-content/uploads/2019/01/g8ymc8lx.jpg?fit=640%2C238&ssl=1" }
const image2 = { uri: "https://t3.ftcdn.net/jpg/03/23/88/08/360_F_323880864_TPsH5ropjEBo1ViILJmcFHJqsBzorxUB.jpg" }

export default function PlayList() {

  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2)
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth / 2 + 30)
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [play, setPlay] = useState(false)
  const gravity = 4
  let obstacleWidth = 50
  let obstacleHeight = 300
  let gap = 150
  let gameTimerId
  let obstaclesTimerId
  let obstaclesTimerIdTwo

  //start bird falling
  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      }, 30)

      return () => {
        clearInterval(gameTimerId)
      }
    }
    //if i dont have birdBottom as a dependecy, it wont stop
  }, [birdBottom])
  // console.log(birdBottom)

  const jump = () => {
    if (!isGameOver && (birdBottom < screenHeight)) {
      setBirdBottom(birdBottom => birdBottom + 50)
      console.log('jumped')
    }
  }

  //start first obstacle
  useEffect(() => {
    if (obstaclesLeft > -60) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesTimerId)
      }
    } else {
      setScore(score => score + 1)
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight(- Math.random() * 100)
    }
  }, [obstaclesLeft])

  //start second obstacle
  useEffect(() => {
    if (obstaclesLeftTwo > -60) {
      obstaclesTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesTimerIdTwo)
      }
    } else {
      setScore(score => score + 1)
      setObstaclesLeftTwo(screenWidth)
      setObstaclesNegHeightTwo(- Math.random() * 100)
    }
  }, [obstaclesLeftTwo])

  //check for collisions
  useEffect(() => {
    //console.log(obstaclesLeft)
    // console.log(screenWidth/2)
    // console.log(obstaclesLeft > screenWidth/2)
    if (
      ((birdBottom < (obstaclesNegHeight + obstacleHeight + 30) ||
        birdBottom > (obstaclesNegHeight + obstacleHeight + gap - 30)) &&
        (obstaclesLeft > screenWidth / 2 - 30 && obstaclesLeft < screenWidth / 2 + 30)
      )
      ||
      ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ||
        birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap - 30)) &&
        (obstaclesLeftTwo > screenWidth / 2 - 30 && obstaclesLeftTwo < screenWidth / 2 + 30)
      )
    ) {
      //console.log('game over')
      gameOver()
    }
  })

  const gameOver = () => {
    setScore(0);
    setBirdBottom(350)

  }
  const render = () => {
    setPlay(true)
  }
  const render2 = () => {
    setPlay(false)
  }
  if (play) {
    return (
      <TouchableWithoutFeedback onPress={jump}>
        <View style={styles.container}>
          <ImageBackground source={image} resizeMode="stretch" style={styles.image}></ImageBackground>
          <Bird
            birdBottom={birdBottom}
            birdLeft={birdLeft}
          />
          <Obstacles
            color={'black'}
            obstacleWidth={obstacleWidth}
            obstacleHeight={obstacleHeight}
            randomBottom={obstaclesNegHeight}
            gap={gap}
            obstaclesLeft={obstaclesLeft}
          />
          <Obstacles
            color={'black'}
            obstacleWidth={obstacleWidth}
            obstacleHeight={obstacleHeight}
            randomBottom={obstaclesNegHeightTwo}
            gap={gap}
            obstaclesLeft={obstaclesLeftTwo}
          />
          <Text style={styles.text}>{score}</Text>
          <Button
            onPress={render2}
            title="Push"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </TouchableWithoutFeedback>
    )
  } else {
    return (
      <TouchableWithoutFeedback>
        <View style={styles.container2}>
          <ImageBackground source={image2} resizeMode="stretch" style={styles.image}></ImageBackground>
          <Text style={styles.text2}>Welcome to Flappy ASAC Game</Text>
          <Button
            onPress={render}
            title="Play"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: "center",
    //borderRadius: birdRadius,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    //width: 5,
    //height: 20,
  },
  text2: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    padding: 10
    //width: 5,
    //height: 20,
  }
})
