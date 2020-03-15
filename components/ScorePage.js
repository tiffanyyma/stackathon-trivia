import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export default class Item extends Component {

  constructor(props){
    super(props);
    this.state = {

    }

  }


  render() {

    const { correct, playAgain } = this.props

      return (
        <View style={styles.item}>
          <Text style={styles.titleText}>Congrats!</Text>

          <Text style={styles.paragraph}>
            You got {correct} out of 10 questions correct!
          </Text>

          {/* <Text style={styles.paragraph}>
            Play again?
          </Text> */}
          <Button
          title="Play Again?"
          onPress={ () => {
            playAgain()
          }}
        />

        </View>
      );

  }
}



const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
    marginVertical: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  question: {
    fontSize: 24,
  },
  answer: {
    fontSize: 18,
  },
  item: {
    // backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  correct: {
    backgroundColor: '#B6F9C9',
  },
  incorrect: {
    backgroundColor: '#E57E75',
  },
});
