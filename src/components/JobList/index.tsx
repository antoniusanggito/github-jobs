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

interface formValues {
  description?: string;
  location?: string;
  full_time?: boolean;
  page?: number;
}

const JobList: React.FC = () => {
  const [jobList, setJobList] = useState<jobListType[]>([]);
  const [form, setForm] = useState<formValues>({
    description: '',
    location: '',
    full_time: false,
    page: 1,
  });

  useEffect(() => {
    getAllJobRequest({})
      .then((res) => {
        setJobList(res.data);
      })
      .catch((err) => {
        toast.error(`Error ${err.status}: ${err.data.message}`);
      });
  }, []);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    const payload = {
      description: form.description === '' ? undefined : form.description,
      location: form.location === '' ? undefined : form.location,
      full_time: form.full_time,
      page: form.page,
    };
    console.log(payload);
    getAllJobRequest(payload)
      .then((res) => {
        setJobList(res.data);
      })
      .catch((err) => {
        toast.error(`Error ${err.status}: ${err.data.message}`);
      });
  };

  return (
    <Layout>
      <section css={formContainerStyle}>
        <form onSubmit={handleSearch}>
          <div css={inputText}>
            <label htmlFor="description">Job Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Filter by title, benefits, companies, expertise"
            />
          </div>
          <div css={inputText}>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              id="location"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, location: e.target.value }))
              }
              placeholder="Filter by city, state, zip code or country"
            />
          </div>
          <div>
            <input
              type="checkbox"
              name="full_time"
              id="full_time"
              checked={form.full_time}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, full_time: !form.full_time }))
              }
            />
            <label htmlFor="location">Full Time Only</label>
          </div>
          <input type="submit" value="Search" />
        </form>
      </section>
      <section css={listContainerStyle}>
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

const formContainerStyle = css`
  form {
    width: 95%;
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    gap: 40px;
    align-items: center;

    label {
      font-weight: bold;
    }
  }
`;

const inputText = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  input {
    padding: 8px 12px;
    width: 100%;
    max-width: 600px;
    flex-grow: 1;
  }
`;

const listContainerStyle = css`
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
