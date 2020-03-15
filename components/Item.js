import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlightBase } from 'react-native';



export default class Item extends Component {

  constructor(props){
    super(props);
    this.state = {
      answered: false,
      selected: [0, 0, 0, 0]
    }

  }


  render() {

    const { question, index, correctAns, incorrAns, handleClick } = this.props
    const answers = [correctAns, ...incorrAns]

    const Entities = require('html-entities').AllHtmlEntities;
    const Entities2 = require('html-entities').XmlEntities;
    const entities = new Entities();
    const entities2 = new Entities2();

      return (
        <View style={styles.item}>
          <Text style={styles.question}>
            Question #{index}: {entities2.decode(entities.decode(question))}{'\n'}
            </Text>
          <Text style={styles.answer}>

            {answers.map( (answer,index) => {

              let highlight;
              if (this.state.selected[index]) {
                if (answer === correctAns) {
                  highlight = styles.correct
                } else if (answer !== correctAns) {
                  highlight = styles.incorrect
                }
              }

              if (this.state.answered && answer===correctAns) {
                highlight=styles.correct;
              }

              return (
              <Text key={answer}
                onPress={ this.state.answered
                  ? undefined
                  : (() => {
                    handleClick(answer, correctAns);
                    let newSelected = this.state.selected;
                    newSelected[index] = 1;
                    this.setState({
                      answered: true,
                      selected: [...newSelected]
                    })
                  })}
                style={highlight}
                  >
                {answer} {'\n'}
              </Text>

              )
              }
            )}

          </Text>
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
    backgroundColor: '#f9c2ff',
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
