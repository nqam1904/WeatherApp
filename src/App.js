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
      history: !localStorage.getItem(`weatherApp`) ? [] :
        JSON.parse(localStorage.getItem(`weaterApp`)),
    }

  }

  functionIf = (name, res) => {
    if (!name) {
      this.setState({
        isLoading: !this.state.isLoading,
      });
    } else {
      this.setState({
        name: res.location.name,
        temperature: res.current.temperature,
        humidity: res.current.humidity,
        weather_descriptions: res.current.weather_descriptions,
      })
    }
  }

  getWeather = async (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    e.target.reset(); // xóa chuỗi trong input
    let history = JSON.parse(localStorage.getItem(`weatherApp`));
    if (name === "") {
      toast.warn('Vui lòng nhập tên thành phố !');
    } else {
      this.setState({
        isLoading: !this.state.isLoading,
        isShowCard: false,
      });
      try {
        const api_call = await fetch(`http://api.weatherstack.com/current?access_key=8a35c848dd7c818c2b72ebf4b80837eb&query=${name}`);
        const res = await api_call.json();// trả dữ liệu api về
        if (res.success === undefined) {
          localStorage.setItem(`weatherApp`, JSON.stringify([res]));
          this.functionIf(name, res);
          this.setState((state) => {
            state.history.push(res);
            state.isShowCard = true;
          });
        } else {
          await history.push(res);
          localStorage.setItem(`weatherApp`, JSON.stringify(history));
          this.functionIf(name, res);
          this.setState((state) => {
            state.history.push(res);
            state.isShowCard = true;
          });
        }else {
          toast.error(`Không tìm thấy thành phố này`);
        }


      } finally {
        this.setState({
          isLoading: !this.state.isLoading,
        });
      }
    }
  };
  render() {
    const { isShowCard, isLoading, history } = this.state;
    const elementsCard = isShowCard ? (
      <CardResult
        name={this.state.name}
        temperature={this.state.temperature}
        humidity={this.state.humidity}
        weather_descriptions={this.state.weather_descriptions}
      />
    ) : (
        ""
      ); // ẩn component card khi chưa tìm thành phố
    const result = isLoading ? (
      <Spinner size={32} speed={1} animating={true} />
    ) : (
        elementsCard
      );
    return (
      <Container>
        <div className="form">
          <FormSearch loadweather={this.getWeather} />
          <ToastContainer autoClose={3000} />
        </div>
        <Row>
          <Col sm={6}>
            <p>Kết quả</p>
            {result}
          </Col>
          <Col sm={6}>
            <p>Lịch sử</p>
            {history.length === 0 ? (
              ''
            ) : (
                <div>
                  {history.map((i, index) => (
                    <CardResult
                      key={index}
                      name={i.location.name}
                      temperature={i.current.temperature}
                      humidity={i.current.humidity}
                      weather_descriptions={i.current.weather_descriptions}
                    />
                  ))}
                </div>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;