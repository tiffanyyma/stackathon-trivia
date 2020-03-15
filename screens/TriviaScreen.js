import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';

import Item from '../components/Item'

export default class HelloWorldApp extends Component {

  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      numCorrect: 0,

    }
    this.handleQuestionAnswer = this.handleQuestionAnswer.bind(this)
  }

  componentDidMount(){
    return fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.results,

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  handleQuestionAnswer(answer, correctAns) {
    if (answer === correctAns) {
      console.log("correct answer")
      this.setState({
        numCorrect: ++this.state.numCorrect
      })
      console.log("num correct", this.state.numCorrect)
    } else {
      console.log("wrong answer")
    }

  }


  render() {

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={
            ({item, index}) =>
            <Item key={item}
              index={index}
              question={item.question}
              correctAns={item.correct_answer}
              incorrAns={item.incorrect_answers}
              handleClick={this.handleQuestionAnswer}
              />
          }
          keyExtractor={({id}, index) => id}
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
});
