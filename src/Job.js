import React, { useState } from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

export default function Job({ job }) {
    const [open, setOpen] = useState(false);

    /**
     * Calculates the difference of today's time and the job posting's creation time in days.
     * @param {*} createdAt The Date that the job posting was created at
     */
    function getDifferenceInDays(createdAt) {
        let today = new Date(),
        createdOn = new Date(createdAt),
        msInDay   = 24 * 60 * 60 * 1000;

        // Normalize the hours and calculate the difference in days
        today.setHours(0,0,0,0);
        createdOn.setHours(0,0,0,0);

        return (today.getTime() - createdOn.getTime()) / msInDay
    }

    return (
        <Card className="mb-3 box-shadow">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Title>
                            {job.title} - <span className="text-muted font-weight-light">{job.company}</span>
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-2">
                            { getDifferenceInDays(job.created_at) > 0 && new Date(job.created_at).toLocaleDateString() + ` - ${getDifferenceInDays(job.created_at)} days ago ` }
                            { getDifferenceInDays(job.created_at) === 0 && new Date(job.created_at).toLocaleDateString() +  " - Today" }
                        </Card.Subtitle>
                        <Badge variant="secondary" className="mr-2">{job.type}</Badge>
                        <Badge variant="secondary">
                            <FontAwesomeIcon className="mr-2" icon={faMapMarkerAlt} size="1x" />
                            {job.location}
                        </Badge>
                        <div className="my-2" style={{ wordBreak: 'break-all' }}>
                            <ReactMarkdown source={job.how_to_apply} />
                        </div>
                    </div>
                    {job.company_logo && <img className="d-none d-md-block" height="50" alt={job.company} src={job.company_logo}/>}
                </div>
                <Card.Text>
                    <Button onClick={() => setOpen(prevOpen => !prevOpen)}
                            variant="primary">
                            <FontAwesomeIcon className="mr-2" icon={faInfoCircle} size="1x" /> {open ? 'Hide Details' : 'View Details'}
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