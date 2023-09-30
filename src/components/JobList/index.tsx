/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import withAuth from '../utils/AuthHOC/withAuth';
import { getAllJobRequest } from '../../axios/services/getAllJob';
import toast from 'react-hot-toast';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

type jobListType = {
  title: string;
  company: string;
  type: string;
  location: string;
  created_at: Date;

  company_logo: string;
  company_url: string;
  description: string;
  how_to_apply: string;
  id: string;
  url: string;
};

const JobList: React.FC = () => {
  const [jobList, setJobList] = useState<jobListType[]>([]);

  useEffect(() => {
    getAllJobRequest({})
      .then((res) => {
        setJobList(res.data);
      })
      .catch((err) => {
        toast.error(`Error ${err.status}: ${err.data.message}`);
      });
  }, []);

  return (
    <Layout>
      <section css={sectionStyle}>
        <h2>Job List</h2>
        {jobList.map((job) => (
          <Link to={`/job/${job.id}`} key={job.id}>
            <JobCard>
              <div>
                <h3>{job.title}</h3>
                <p>
                  {job.company} – <span>{job.type}</span>
                </p>
              </div>
              <div
                css={css`
                  text-align: right;
                `}
              >
                <h4>{job.location}</h4>
                <p>{`Created: ${job.created_at}`}</p>
              </div>
            </JobCard>
          </Link>
        ))}
      </section>
    </Layout>
  );
};

const sectionStyle = css`
  width: 95%;
  max-width: 1400px;
  margin: 0 auto 3rem auto;

  h2 {
    color: var(--clr-secondary);
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const JobCard = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 0 10px;

  h3 {
    color: var(--clr-primary);
  }

  p {
    color: #888;
  }

  span {
    font-weight: bold;
    color: var(--clr-info);
  }

  &:hover {
    background: #eee;
  }
`;

export default withAuth(JobList);
