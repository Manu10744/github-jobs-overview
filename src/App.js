import React, { useState } from 'react';
import useFetchJobs from './useFetchJobs';
import { Container } from 'react-bootstrap';
import Job from './Job';

function App() {
  const [params, setParams] = useState({});
  // Use page 1 as default
  const [page, setPage] = useState(1);
  const { jobs, loading, error } = useFetchJobs();

  return <Container>
    { loading && <h1>Loading...</h1> }
    { error && <h1>Error. Try refreshing.</h1> }
    { jobs.map(job => {
      return <Job key={job.id} job={job} />
    })}
  </Container>
}

export default App;
