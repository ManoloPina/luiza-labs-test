import React, { Component } from 'react';
import {
  Navbar,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import Constants from '../Constants';

class Header extends Component {
  constructor(props) {
    super(props);
    this.window = window;
    this.state = {
      cep: ''
    };
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Consultar</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Form pullLeft>
          <FormGroup>
            <FormControl
              type="text"
              value={this.state.cep}
              name={'cep'}
              onChange={this.handleChange.bind(this)}
              placeholder="CEP..." />
          </FormGroup>
          <Button 
          type="submit" 
          bsStyle={'primary'}
          onClick={this.onSubmit.bind(this)}>Buscar</Button>
        </Navbar.Form>
      </Navbar>
    );
  }

  onSubmit() {
    let sendCepEvent = new CustomEvent(Constants.EVENTS.CEP, {'detail': this.state.cep});
    this.window.dispatchEvent(sendCepEvent);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({ [name]: target.value});
  }
}

export default Header;
