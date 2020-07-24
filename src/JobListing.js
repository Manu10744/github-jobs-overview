import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Job from './Job';
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';
import useFetchJobs from './useFetchJobs';

export default function JobListing() {
    function handleParamChange(e) {
        const param = e.target.name;
        const value = e.target.value;
        setPage(1);
        setParams(prevParams => {
          return { ...prevParams, [param]: value }
        });
    }

    const [params, setParams] = useState({ description: '', location: '', full_time: false });
    // Use page 1 as default
    const [page, setPage] = useState(1);
    const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

    return <Container className="my-4">
            <SearchForm params={params} onParamChange={handleParamChange} />
            
            <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
            {loading && <h1>Loading...</h1>}
            {error && <h1>Error. Try refreshing.</h1>}
            {jobs.map(job => {
            return <Job key={job.id} job={job} />
            })}
            <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
          </Container>
}