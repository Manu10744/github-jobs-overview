import React from 'react';
import JobListing from './JobListing';
import WelcomeSection from './WelcomeSection';

export default function LandingPage() {
    return <div className="page-wrapper">
            <WelcomeSection />
            <JobListing />
           </div>
}