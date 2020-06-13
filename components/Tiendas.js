import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Header, Left, Button, Icon, Body, Title, Right, Content, Footer, FooterTab } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, ProviderPropType }  from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 6.2257614;
const LONGITUDE = -75.5987237;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default class Tiendas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      location: {},
errorMessage: "",
dataSource:[]
    };
  }

  static navigationOptions = {
    title: 'Home',
    headerShown: false
  };

  cargartiendas() {
    fetch('http://192.168.0.3/servidor/tiendas.php')
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

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
    this._getLocation();
    this.cargartiendas()
    }
    
    _getLocation = async() => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    if(status !== 'granted'){
    console.log('Permission not granted');
    this.setState({
    errorMessage: 'Permission not granted'
    })
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
    location
    })
  }

login = () =>{

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
            <Title>Tiendas</Title>
          </Body>
          <Right />
        </Header>


        <Content>
        <View style={styles.container}
        >
        <MapView style={styles.mapStyle} 
        provider={this.props.provider}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={false}
        rotateEnabled={false}
        initialRegion={this.state.region}
        showsUserLocation={true}
        followsUserLocation={true}
        >
{this.state.dataSource.map(item =>(
 <Marker
title={item.nombre}
description={item.nombre}
coordinate={{
    latitude: parseFloat(item.latitud) ,
    longitude: parseFloat(item.longitud)
    }}
   />
   )
)}


    </MapView>
      </View>
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

Tiendas.propTypes = {
    provider: ProviderPropType,
    };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });