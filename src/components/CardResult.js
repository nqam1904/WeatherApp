import React from 'react'
import { Card } from 'react-bootstrap';


const CardResult = (props) => {
    return (
        <div className="cardResult">
            <Card>

                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        {props.temperature} độ, <span style={{ marginLeft: '20px' }}>độ ẩm:{props.humidity}</span>,<span style={{ marginLeft: '20px' }}>{props.weather_descriptions}</span>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default CardResult;
