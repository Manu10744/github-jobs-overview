import React from 'react';
import { Form, Col } from 'react-bootstrap';

export default function SearchForm({ params, onParamChange }) {
    return (
        <Form.Row className="align-items-end">
            <Form.Group as={Col}>
                <Form.Label>Description</Form.Label>
                <Form.Control onChange={onParamChange} value={params.description} name="description" placeholder="Software Engineer, Administrator, Cloud Engineer, etc..." type="text"></Form.Control>
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Location</Form.Label>
                <Form.Control onChange={onParamChange} value={params.location} name="location" placeholder="Munich, New York, etc..." type="text"></Form.Control>
            </Form.Group>

            <Form.Group as={Col} xs="auto" className="ml-2">
                <Form.Check onChange={onParamChange} value={params.full_time} name="full_time" id="full-time" 
                            label="Only Full Time Jobs" type="checkbox" className="mb-2">
                </Form.Check>
            </Form.Group>
        </Form.Row>
    )
}