/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import withAuth from '../utils/AuthHOC/withAuth';
import { getAllJobRequest } from '../../axios/services/getAllJob';
import toast from 'react-hot-toast';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

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

  const handleClick = () => {};

  return (
    <Layout>
      <section css={sectionStyle}>
        <h2>Job List</h2>
        {jobList.map((job) => (
          <Link to={`/job/${job.id}`} key={job.id}>
            <div css={cardStyle} onClick={handleClick}>
              <div>
                <h4>{job.title}</h4>
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
                <p>Time</p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </Layout>
  );
};

const sectionStyle = css`
  width: 95%;
  max-width: 1400px;
  margin: 0 auto;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const cardStyle = css`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;

  span {
    font-weight: bold;
    color: var(--clr-info);
  }
`;

export default withAuth(JobList);
