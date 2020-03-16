import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export default class Item extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  render() {

    const { correct, playAgain } = this.props

    return (
      <View style={styles.item}>
        <Text style={styles.titleText}>Congrats!</Text>

        <Text style={styles.paragraph}>
          You got {correct} out of 10 questions correct!
        </Text>

        <Button title="Play Again?"
          onPress={ () => playAgain() }
        />

      </View>
    );
  }
}



const styles = StyleSheet.create({

  titleText: {
    paddingTop: 50,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    // fontFamily: 'Cochin',
    margin: 24,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    // marginVertical: 20,
  },
  item: {
    // backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

});
