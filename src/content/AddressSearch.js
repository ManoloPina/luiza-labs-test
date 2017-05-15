import React, { Component } from 'react';
import {
  Grid, Row, Col, Jumbotron, Alert
} from 'react-bootstrap';
import Constants from '../Constants';
import _ from 'lodash';
import $ from 'jquery';
import { Gmaps } from 'react-gmaps';
import geocoder from 'geocoder';

class AddressSearch extends Component {
  constructor(props) {
    super(props);
    this.window = window;
    this.state = {
      bairro: "",
      cep: "",
      complemento: "",
      gia: "",
      ibge: "",
      localidade: "",
      logradouro: "",
      uf: "",
      unidade: "",
      lng: 0,
      lat: 0
    }
  }

  componentDidMount() {
    this.window.addEventListener(Constants.EVENTS.CEP, this.consultAddress.bind(this));
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            {_.isEmpty(this.state.cep) ? (
              <Alert>É necessário fazer a pesquisa por CEP</Alert>
            ) : (
                <Jumbotron>
                  <h2 className="text-left text-primary">{this.state.logradouro}</h2>
                  <p className="text-left">{this.state.bairro}</p>
                  <p className="text-left">{this.state.localidade} - {this.state.uf}</p>
                  <p className="text-left">{this.state.cep}</p>
                  <Gmaps
                    className="img-thumbnail"
                    width={'100%'}
                    height={'300px'}
                    lat={this.state.lt}
                    lng={this.state.lng}
                    zoom={17}>
                  </Gmaps>
                </Jumbotron>
              )}
          </Col>
        </Row>
      </Grid>
    );
  }

  consultAddress(e) {
    new Promise((resolve, reject) => {
      console.log(e.detail);
      this.setState({ cep: e.detail });
      resolve();
    }).then(() => {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `https://viacep.com.br/ws/${this.state.cep}/json/?callback=myf`,
          type: 'GET',
          contentType: 'application/json'
        })
          .done(data => {
            let strReplace = data.replace('myf(', '');
            let strReplace2 = strReplace.replace(');', '');
            let adressObject = JSON.parse(strReplace2);
            this.setState({
              cep: adressObject.cep,
              logradouro: adressObject.logradouro,
              complemento: adressObject.complemento,
              bairro: adressObject.bairro,
              localidade: adressObject.localidade,
              uf: adressObject.uf,
              unidade: adressObject.unidade,
              ibge: adressObject.ibge,
              gia: adressObject.gia
            });
            console.log('state', this.state);
            resolve(this.state);
          })
          .fail(err => console.log('err', console.log('err', err)));

      });

    }).then(() => {
      geocoder.geocode(`${this.state.logradouro}, ${this.state.localidade} - ${this.state.uf}`,(err, data) => {
        console.log(data);
        this.setState({
          lt: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng
        });
        console.log(this.state.lt);
      });
    });
  }
}

export default AddressSearch;
