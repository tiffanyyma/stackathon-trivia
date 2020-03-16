import * as React from 'react';
import { Platform, StyleSheet, Text, View, Alert, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

// import stateless components here
import Trivia from './TriviaScreen';


export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      numCorrect: 0,
      numAnswered: 0
    }
    this.handleQuestionAnswer = this.handleQuestionAnswer.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }

  //if we decide to start a new game, createNewGame runs and loads a new game
   createNewGame() {
    fetch('http://192.168.1.234:3000/api/', {
      method: 'POST',
      cache: 'no-cache',
      body: '',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(async (res) => {
      const data = await res.json();
      if (res.status === 200) {
        Alert.alert(
          'New Trivia Game',
          'Play against friends by having them enter the Game ID ' + data.gameId,
          [
            {
              text: 'Play Now', onPress: () => {
                this.loadData(data.gameId);
              }
            }
          ]
        )
      } else {
        throw new Error('Error from server creating game')
      }
    })
    .catch(error => {
      console.log(error)
    });
  }

  //if we want to join a game, joinGame will get the gameId and pass it to loadData so it gets the correct game questions
  joinGame() {
    Alert.prompt(
      'Join Trivia Game',
      'Please enter an existing Game Id',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (gameId) => this.loadData(gameId)
        }
      ],
      'plain-text');
  }
  loadData(gameId) {
    fetch(`http://192.168.1.234:3000/api/${gameId}`)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        questions: responseJson,
        gameId: gameId,
      });

    })
    .catch((error) =>{
      console.error(error);
    });
  }

  //handleQuestionAnswer keeps track of how many questions were answered
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

  // resets state at the end if you want to play again
  playAgain() {
    this.setState({
      questions: null,
      numCorrect: 0,
      numAnswered: 0,
      isLoading: true
    })
  }


  render() {

    //if no game has been started, there are no questions on the state
    //it will render these two buttons for user to decide action
    if (!this.state.questions) {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>



            <View style={styles.title}>
              <Text style={styles.titleText}>Let's Play!</Text>
            </View>

            <Image
              style={styles.welcomeImage}
              source={{uri: 'https://www.bluefootsd.com/wp-content/uploads/2018/05/trivia-night.png'}}
            />

            <View style={styles.buttonContainer}>
              <Button
                title={'New Game'}
                type={'outline'}
                onPress={() => this.createNewGame(this.props.navigation)}
              />
              <Button
                title={'Join Game'}
                type={'outline'}
                onPress={() => this.joinGame(this.props.navigation)}
              />
            </View>


          </ScrollView>
        </View>

      );
      }
      else {

        //once questions are fetched by loaddata, trivia component will render
        return (
          <Trivia
            loading={this.state.loading}
            dataSource={this.state.questions}
            numCorrect={this.state.numCorrect}
            numAnswered={this.state.numAnswered}
            handleQuestionAnswer={this.handleQuestionAnswer}
            playAgain={this.playAgain}
            gameId={this.state.gameId}
          />
        )
      }
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    // paddingTop: 30,
    padding: 30,
  },
  title: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    textShadowOffset: {width: 2, height: 2},
    textShadowColor: '#B6F9C9',
    textShadowRadius: 4,
    fontFamily: 'Courier'
  },
  welcomeImage: {
    justifyContent: 'center',
    // flex: 1,
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  titleText: {
    fontSize: 32,
    fontWeight: '900'
  },
  buttonContainer: {
    alignItems: 'center',
    paddingTop: 10,
    marginHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'space-around'
    // flexWrap: 'wrap'
  },


  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
