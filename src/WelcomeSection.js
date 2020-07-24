import React from 'react';
import { Container } from 'react-bootstrap';

export default function WelcomeSection() {
    return (
        <Container className="welcome-section">
            <h1>Dev Jobs found easily.</h1>
            <p>Here you can find lots of developer jobs all at once.</p>
            <p className="powered-by-info">Powered by <span className="highlighted">GitHub.</span></p>
        </Container>
    )
}