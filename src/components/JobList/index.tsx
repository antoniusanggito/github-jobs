/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import withAuth from '../utils/AuthHOC/withAuth';
import { getAllJobRequest } from '../../axios/services/getAllJob';
import toast from 'react-hot-toast';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button } from '../shared/Button.styled';

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
}

const JobList: React.FC = () => {
  const [jobList, setJobList] = useState<jobListType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [form, setForm] = useState<formValues>({
    description: '',
    location: '',
    full_time: false,
  });
  const [search, setSearch] = useState<formValues>(form);

  useEffect(() => {
    const payload = {
      description: search.description,
      location: search.location,
      full_time: search.full_time,
      page,
    };
    getAllJobRequest(payload)
      .then((res) => {
        if (page === 1) {
          setJobList(res.data.jobs);
          setTotal(res.data.total);
        } else {
          const checker = res.data.jobs.every((job: jobListType) =>
            jobList.includes(job)
          );
          if (!checker) {
            setJobList((prev) => [...prev].concat(res.data.jobs));
            setTotal(res.data.total);
          }
        }
      })
      .catch((err) => {
        toast.error(`Error ${err.status}: ${err.data.message}`);
      });
  }, [page, search]);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    setSearch({
      description: form.description === '' ? undefined : form.description,
      location: form.location === '' ? undefined : form.location,
      full_time: form.full_time === false ? undefined : form.full_time,
    });
    setPage(1);
  };

  const handleMore = async () => {
    setPage((prev) => prev + 1);
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
          <div css={inputCheckbox}>
            <input
              type="checkbox"
              name="full_time"
              id="full_time"
              checked={form.full_time}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, full_time: !form.full_time }))
              }
            />
            <label htmlFor="full_time">Full Time Only</label>
          </div>
          <Button type="submit">
            <h3>Search</h3>
          </Button>
        </form>
      </section>
      <section css={listContainerStyle}>
        <h2>Job List</h2>
        {jobList.length === 0 && (
          <p
            css={css`
              font-style: italic;
            `}
          >
            No jobs available
          </p>
        )}
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
        {page * 5 < total && <MoreBtn onClick={handleMore}>More Jobs</MoreBtn>}
      </section>
    </Layout>
  );
};

const formContainerStyle = css`
  padding: 20px 0;

  form {
    width: 95%;
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    gap: 40px;
    align-items: center;

    @media screen and (max-width: 767px) {
      flex-direction: column;
      align-items: flex-end;
    }
  }

  label {
    font-weight: bold;
  }
`;

const inputText = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  max-width: 500px;

  input[type='text'] {
    padding: 8px 12px;
  }
`;

const inputCheckbox = css`
  display: flex;
  align-items: center;
  gap: 8px;
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

const MoreBtn = styled.button`
  width: 100%;
  text-align: center;
  color: #fff;
  font-weight: bold;
  padding: 8px 0;
  border-radius: 6px;
  background: var(--clr-primary);
  cursor: pointer;

  &:hover {
    filter: brightness(1.2);
  }
`;

export default withAuth(JobList);
