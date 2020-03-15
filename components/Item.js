import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

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

    if (this.state.answered === false) {

      return (
        <View style={styles.item}>
          <Text style={styles.question}>
            Question #{index}: {question}{'\n'}
            </Text>
          <Text style={styles.answer}>

            {answers.map( (answer,index) =>
              <Text key={answer}
                onPress={ () => {
                    handleClick(answer, correctAns);
                    let newSelected = this.state.selected;
                    newSelected[index] = 1;
                    this.setState({
                      answered: true,
                      selected: [...newSelected]
                    })

                  }
                }>
                {answer} {'\n'}
              </Text>
            )}

          </Text>
        </View>
      );
    } else {

      return (
        <View style={styles.item}>
          <Text style={styles.question}>
            Question #{index}: {question}{'\n'}
            </Text>
          <Text style={styles.answer}>

            {answers.map( (answer, index) =>
               this.state.selected[index]
               ?
                <Text key={answer} style={styles.selected}>
                  {answer} {'\n'}
                </Text>
                :
                  <Text key={answer} >
                  {answer} {'\n'}
                </Text>




            )}

          </Text>
        </View>
      );

    }


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
  selected: {
    backgroundColor: '#B6F9C9',
  },
});
