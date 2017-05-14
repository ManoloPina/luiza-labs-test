class Constants {
  static get EVENTS() {
    return {
      CEP: 'cep-event'
    }
  }

  static get HEADERS() {
    return new Headers({
      'Content-Type': 'application/json'
    });
  }
}

export default Constants;