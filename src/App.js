import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import './App.css';
import CardResult from './components/CardResult';
import FormSearch from './components/FormSearch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      temperature: '',
      humidity: '',
      weather_descriptions: ''
    }
  }

  getWeather = async (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;

    const api_call = await fetch(`http://api.weatherstack.com/current?access_key=8a35c848dd7c818c2b72ebf4b80837eb&query=${name}`);
    const res = await api_call.json();
    console.log(res);
    this.setState({
      name: res.location.name,
      temperature: res.current.temperature,
      humidity: res.current.humidity,
      weather_descriptions: res.current.weather_descriptions,
    });

  }

  render() {
    return (
      <Container>
        <div className="form">
          <FormSearch loadweather={this.getWeather} />
        </div>
        <Row>
          <Col sm={6}>
            <p>Kết quả</p>
            <CardResult
              name={this.state.name}
              temperature={this.state.temperature}
              humidity={this.state.humidity}
              weather_descriptions={this.state.weather_descriptions} />
          </Col>
          <Col sm={6}>
            <p>Lịch sử</p>

          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
