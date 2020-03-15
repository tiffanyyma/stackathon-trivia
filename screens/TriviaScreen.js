import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import {Header} from 'react-native-elements';

import Item from '../components/Item'
import ScorePage from '../components/ScorePage'

export default class HelloWorldApp extends Component {

  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      numCorrect: 0,
      numAnswered: 0
    }
    this.handleQuestionAnswer = this.handleQuestionAnswer.bind(this)
    this.playAgain = this.playAgain.bind(this)
  }

  loadData() {
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

  componentDidMount(){
    this.loadData()
  }

  handleQuestionAnswer(answer, correctAns) {
    if (answer === correctAns) {
      this.setState({
        numCorrect: ++this.state.numCorrect
      })
    }

    this.setState({
      numAnswered: ++this.state.numAnswered
    })

  }

  playAgain() {
    this.setState({
      isLoading: true,
      numCorrect: 0,
      numAnswered: 0
    })
    this.loadData();
  }


  render() {

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    if(this.state.numAnswered === 5){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ScorePage
            correct={this.state.numCorrect}
            playAgain={this.playAgain}
          />
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <Header
          containerStyle={styles.header}
          centerComponent={{
            text: `SCORE: ${this.state.numCorrect}/10`,
            style: { color: '#fff' },
          }}

        />
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
          keyExtractor={({id}, index) => "" + index}
        />
      </View>
    );


  }
}


const styles = StyleSheet.create({

  header: {
    backgroundColor: '#000',
    justifyContent: 'space-around',
    marginTop: -36
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
