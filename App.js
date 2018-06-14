import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation'; // Version can be specified in package.json
import axios from 'axios';
import Swiper from 'react-native-deck-swiper';

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    // backgroundColor: "#F5FCFF"
  },
  card: {
    
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});



class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies:[],
      text: '',
      toggle: false
    };
  }
  serverRequest=(text)=>{
    
    
    console.log(text)
    axios.post('http://localhost:5002/api', [text])
  .then( (response)=> {
    console.log(response.data);
    this.setState({
      movies: response.data,
      text: '',
      toggle: true
      
    })
  })
  .catch( (error)=> {
    console.log(error);
  });
  
  }
  render() {
    let currentMovies =  this.state.movies.map( (movie)=>{
      return(
        <Text key={movie.id}>
        {movie.title}
        {/* {movie.releaseDate} */}
        </Text>
      
      )
    })
    let cardView = (<Text>no cards</Text>);
    if (this.state.toggle == true){
      cardView = (
        <Swiper
        
              cards={currentMovies}
              renderCard={(card) => {
                  return (
                      <View style={styles.card}>
                          <Text style={styles.text}>{card}</Text>
                      </View>
                  )
              }}
              onSwiped={(cardIndex) => {console.log(cardIndex)}}
              onSwipedAll={() => {console.log('onSwipedAll')}}
              cardIndex={0}
              backgroundColor={'#4FD0E9'}
              stackSize= {3}>
              <Button
                  onPress={() => {console.log('oulala')}}
                  title="Press me">
                  You can press me
              </Button>
          </Swiper>
      )
    }
     
    return (
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home</Text>
        <TextInput
        value={this.state.text}
          style={{width: 100, height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text: text})}
        />
        <Button title="send Request" 
        onPress={()=>this.serverRequest(this.state.text)}
        
        ></Button>
        
        {cardView}
       
        
      </View>
     
      
    );
  }
}
class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

export default createBottomTabNavigator({
  Home: { screen: HomeScreen },
   Settings: { screen: SettingsScreen },
});

// export default class App extends React.Component {
//   render() {
//     return (
    
      
//       <View style={styles.container}>
       
//         {/* <Text>Boom Boom Boom Boom</Text> */}
       
//       </View>
   
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
