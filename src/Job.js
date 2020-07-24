import React, { useState } from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

export default function Job({ job }) {
    const [open, setOpen] = useState(false);

    let today = new Date(),
    createdOn = new Date(job.created_at),
    msInDay   = 24 * 60 * 60 * 1000;

    // Normalize the hours and calculate differenceInDays
    today.setHours(0,0,0,0);
    createdOn.setHours(0,0,0,0);
    let differenceInDays = (today.getTime() - createdOn.getTime()) / msInDay

    return (
        <Card className="mb-3 box-shadow">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Title>
                            {job.title} - <span className="text-muted font-weight-light">{job.company}</span>
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-2">
                            {new Date(job.created_at).toLocaleDateString()} - {differenceInDays} days ago
                        </Card.Subtitle>
                        <Badge variant="secondary" className="mr-2">{job.type}</Badge>
                        <Badge variant="secondary">{job.location}</Badge>
                        <div className="my-2" style={{ wordBreak: 'break-all' }}>
                            <ReactMarkdown source={job.how_to_apply} />
                        </div>
                    </div>
                    {job.company_logo && <img className="d-none d-md-block" height="50" alt={job.company} src={job.company_logo}/>}
                </div>
                <Card.Text>
                    <Button onClick={() => setOpen(prevOpen => !prevOpen)}
                            variant="primary">
                            {open ? 'Hide Details' : 'View Details'}
                    </Button>
                </Card.Text>

                <Collapse in={open}>
                    <div className="mt-4">
                        <ReactMarkdown source={job.description} />
                    </div>
                </Collapse>
                <p className="job-posting-origin">Posted by GitHub.</p>
            </Card.Body>
        </Card>
    )
}