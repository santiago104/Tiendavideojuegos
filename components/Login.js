import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Header, Left, Button, Icon, Body, Title, Right, Form, Item, Input, Content, Footer, FooterTab } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      usuario:"",
      password:""
    };
  }

  static navigationOptions = {
    title: 'Home',
    headerShown: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

login = () =>{
  const { usuario }  = this.state ;
 const { password }  = this.state ;

 if(usuario == "" && password == ""){
     alert("Debe llenar el formulario")
 }else{
  fetch('http://192.168.0.3/servidor/login.php', {
method: 'POST',
headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
},
body: JSON.stringify({
usuario:usuario,
password:password 
})
})
.then((response) => response.json() )
.then((res) => {
alert(res);
if(res == "Ok"){
    this.props.navigation.navigate('Bienvenida')
    alert("Bienvenido")
}

} )
.done();
}
}

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Registro</Title>
          </Body>
          <Right />
        </Header>


        <Content>
        <Form>
            <Item>
              <Input placeholder="Usuario"  onChangeText={usuario => this.setState({usuario})} />
            </Item>
            <Item last>
              <Input placeholder="Contraseña" onChangeText={password => this.setState({password})} />
            </Item>
            <Button onPress={ this.login }>
            <Text>Entrar</Text>
          </Button>
          </Form>
        </Content>


        <Footer>
          <FooterTab>
            <Button full>
              <Text>El footer dividido</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Container>
    );
  }
}