import React, { Component, useState, useEffect } from 'react';
import { Image, Alert, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Footer, FooterTab } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


export default class CardImageExample extends Component {
    constructor(props)
    {
    super(props);
    this.state = {
    isLoading: true,
    dataSource:[],
    image: null,
    visible:false
    }
    }

    

   componentDidMount() {
        fetch('http://192.168.0.3/servidor/juegos.php')
        .then((response) => response.json())
        .then((responseJson) => {
            //alert( JSON.stringify(responseJson) )
        //alert(JSON.stringify(responseJson))
        this.setState({
        isLoading: false,
        dataSource: responseJson
        }, function() {
        // In this block you can do something with new state.
        //alert(JSON.stringify(this.state.dataSource))
        });
        })
        .catch((error) => {
        console.error(error);
        });
        this.getPermissionAsync();
      }

      getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      };

      _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            this.setState({ image: result.uri });
          }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
      };

  render() {
    let { image } = this.state;
    

    return (
      <Container>
        <Header />
        <Content>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={this._pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>

        {this.state.dataSource.map((item,i)=>{
        return(
          <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: item.url}} />
              <Body>
              <Text>{item.nombre}</Text>
        <Text note>{item.nombre}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image source={{uri: item.url}} style={{height: 200, width: null, flex: 1}}/>

          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                <Text>{item.disponible}</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent onPress={() => Alert.alert(
          "Realizar compra",
          item.nombre,
          [
            {
              text: "Cancel",
              onPress: () => alert("Chichipato compra parce"),
              style: "cancel"
            },
            { text: "OK", onPress: () => alert("compra realizada") }
          ],
          { cancelable: false }
        )
         }>
                <Icon active name="chatbubbles" />
                <Text >comprar</Text>
              </Button>
            </Body>
            <Right>
        <Text>{item.precio}</Text>
            </Right>
          </CardItem>
          </Card>
        );
      })
    }

        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={() => {
     this.props.navigation.navigate('Tiendas')
    }}>
              <Text>Tiendas</Text>
            </Button>
            <Button onPress={this._pickImage}>
              <Text>Camara</Text>
            </Button>
            <Button active>
              <Text>Compras</Text>
            </Button>
            <Button onPress={() => {
      this.setState({ visible: true });
    }}>
              <Text>Contacto</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}