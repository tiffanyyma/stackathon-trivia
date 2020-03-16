import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import {Header} from 'react-native-elements';

//import components here
import Item from '../components/Item'
import ScorePage from '../components/ScorePage'

export default class Trivia extends Component {

  render() {

    //loading image
    if(this.props.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    //if all questions are answered, it'll show the score page
    if(this.props.numAnswered === 10){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ScorePage
            correct={this.props.numCorrect}
            playAgain={this.props.playAgain}
          />
        </View>
      )
    }

    //else if no questions are answered yet, list of questions show up
    return(
      <View style={{flex: 1, paddingTop:20}}>
        <Header
          containerStyle={styles.header}
          leftComponent={{
            text: `GAME ID: ${this.props.gameId}`,
            style: { color: '#fff', width: 90 },
          }}
          rightComponent={{
            text: `SCORE: ${this.props.numCorrect}/10`,
            style: { color: '#fff', width: 90 },
          }}

        />
        <FlatList
          data={this.props.dataSource}
          renderItem={
            ({item, index}) =>
            <Item key={item.question}
              index={index}
              question={item.question}
              correctAns={item.correct_answer}
              incorrAns={item.incorrect_answers}
              handleClick={this.props.handleQuestionAnswer}
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
