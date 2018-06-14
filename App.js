import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation'; // Version can be specified in package.json
import axios from 'axios';




class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: 'Movies?',
      text: ''
      
    };
  }
  serverRequest=(text)=>{
    
    
    console.log(text)
    axios.post('http://localhost:5002/api', [text])
  .then( (response)=> {
    console.log(response.data);
    this.setState({
      movies: response.data,
      
    })
  })
  .catch( (error)=> {
    console.log(error);
  });
  
  }
  render() {
    return (
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home</Text>
        <TextInput
          style={{width: 100, height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text: text})}
        />
        <Button title="send Request" onPress={()=>this.serverRequest(this.state.text)}></Button>
      <Text>{this.state.movies}</Text>
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
