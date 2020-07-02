import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import './App.css';
import CardResult from './components/CardResult';
import FormSearch from './components/FormSearch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-activity';
import 'react-activity/dist/react-activity.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      temperature: '',
      humidity: '',
      weather_descriptions: '',
      isShowCard: false,
      isLoading: false,
      isQuery: ''
    }

  }

  getWeather = async (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    e.target.reset(); // xóa chuỗi trong input
    let data = [];
    if (name === "") {
      toast.warn('Vui lòng nhập tên thành phố !');
    } else {

      const api_call = await fetch(`http://api.weatherstack.com/current?access_key=8a35c848dd7c818c2b72ebf4b80837eb&query=${name}`);

      const res = await api_call.json();// trả dữ liệu api về
      data[0] = res;
      localStorage.setItem("res", JSON.stringify(data));
      let list = JSON.parse(localStorage.getItem("res"));
      list.push(res);
      localStorage.setItem("res", JSON.stringify(list));
      console.log(res);
      if (!name) {
        return toast.error("Không tìm thấy dữ liệu!");


      }
      this.setState({
        name: res.location.name,
        temperature: res.current.temperature,
        humidity: res.current.humidity,
        weather_descriptions: res.current.weather_descriptions,
        isShowCard: !this.state.isShowCard, // hiển thị thông tin thành phố

      });

    }
  }
  getData = () => {

  }
  render() {
    const { isShowCard, isLoading, isQuery } = this.state;
    const elementsCard = isShowCard ? (<CardResult name={this.state.name}
      temperature={this.state.temperature}
      humidity={this.state.humidity}
      weather_descriptions={this.state.weather_descriptions} />) : ''; // ẩn component card khi chưa tìm thành phố
    const result = isLoading ? <Spinner size={32} speed={1} animating={true} /> : (elementsCard);
    return (
      <Container>
        <div className="form">
          <FormSearch loadweather={this.getWeather} value={isQuery} />
          <ToastContainer autoClose={3000} />
        </div>
        <Row>
          <Col sm={6}>
            <p>Kết quả</p>
            {result}
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
