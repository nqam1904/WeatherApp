import React, { Component } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import './App.css';
import CardResult from './components/CardResult';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      temperature: '',
      humidity: '',
      weather_descriptions: ''

    }
    this.getWeather();
  }

  getWeather = async () => {
    const api_call = await fetch(`http://api.weatherstack.com/current?access_key=8a35c848dd7c818c2b72ebf4b80837eb&query=Ho Chi Minh`);
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
          <Row>
            <Col sm={7}>
              <Form onChange={this.onChange}>
                <Form.Group>
                  <Form.Label>Tìm kiếm</Form.Label>
                  <Form.Control type="text" placeholder="Nhập tên thành phố" />
                </Form.Group>
              </Form>

            </Col>
            <Col sm={5}>
              <Button className="btn btn-primary mt-10">Tìm kiếm</Button>
            </Col>
          </Row>
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
