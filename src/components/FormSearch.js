import React from 'react';
import { Form, Col, Button, Row } from 'react-bootstrap';
const FormSearch = (props) => {
    return (
        <Form onSubmit={props.loadweather}>
            <Row>
                <Col sm={7}>
                    <Form.Group>
                        <Form.Label>Tìm kiếm</Form.Label>
                        <Form.Control type="text" autoComplete="off" name="name" placeholder="Nhập tên thành phố" />
                    </Form.Group>

                </Col>
                <Col sm={5}>
                    <Button className="btn btn-primary mt-10" type="submit">Tìm kiếm</Button>
                </Col>
            </Row>
        </Form>
    );
}

export default FormSearch;
