import React from 'react';
import { Card } from 'react-bootstrap';

export default function Job({ job }) {
    return (
        <div>
            {job.title}
        </div>
    )
}