import React, { Component } from 'react';
import {
  Grid, Row, Col, Jumbotron, Alert
} from 'react-bootstrap';
import Constants from '../Constants';
import _ from 'lodash';
import $ from 'jquery';

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
      unidade: ""
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
        })
        .fail(err => console.log('err', console.log('err', err)));
    });
  }
}

export default AddressSearch;
