/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import withAuth from '../utils/AuthHOC/withAuth';
import { getDetailJobRequest } from '../../axios/services/getDetailJob';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

type jobDetailType = {
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

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobDetail, setJobDetail] = useState<jobDetailType | null>(null);

  useEffect(() => {
    getDetailJobRequest({ jobId: id as string })
      .then((res) => {
        setJobDetail(res.data);
      })
      .catch((err) => {
        if (err.status === 401) {
          navigate('/', { replace: true });
          toast.error(`Error ${err.status}: Session expired`);
        } else {
          toast.error(`Error ${err.status}: ${err.data.message}`);
        }
      });
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <section css={sectionStyle}>
        <Back onClick={handleBack}>
          <img src="/images/left-arrow.svg" alt="back icon" />
          <h3>Back</h3>
        </Back>
        {jobDetail && (
          <InfoCard
            css={css`
              padding: 20px;
            `}
          >
            <span>
              {jobDetail.type} / {jobDetail.location}
            </span>
            <h2>{jobDetail.title}</h2>
            <hr />
            {/* XSS vulnerable */}
            <div css={contentWrapperStyle}>
              <div
                dangerouslySetInnerHTML={{ __html: jobDetail.description }}
              ></div>
              <div>
                <InfoCard>
                  <h4>{jobDetail.company}</h4>
                  <hr />
                  <img
                    src={jobDetail.company_logo}
                    alt={`${jobDetail.company} logo`}
                  />
                  <a href={jobDetail.company_url}>{jobDetail.company_url}</a>
                </InfoCard>
                <InfoCard>
                  <h4>How to apply</h4>
                  <hr />
                  <div
                    dangerouslySetInnerHTML={{ __html: jobDetail.how_to_apply }}
                  ></div>
                </InfoCard>
              </div>
            </div>
          </InfoCard>
        )}
      </section>
    </Layout>
  );
};

const Back = styled.div`
  margin: 20px 0;
  cursor: pointer;
  display: flex;
  width: fit-content;
  gap: 4px;
  align-items: center;
  color: var(--clr-primary);
  padding: 4px;

  h3 {
    margin: 0;
  }

  &:hover {
    background: #eee;
  }
`;

const sectionStyle = css`
  width: 95%;
  max-width: 1400px;
  margin: 0 auto;

  span {
    color: #888;
  }

  h2 {
    color: var(--clr-secondary);
  }
`;

const contentWrapperStyle = css`
  display: flex;
  width: 100%;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }

  & > div:first-child {
    flex-grow: 1;
    margin-right: 20px;
    max-width: 70vw;

    @media screen and (max-width: 767px) {
      margin-right: 0;
      max-width: 100%;
    }
  }

  & > div:last-child {
    min-width: 30vw;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

export const InfoCard = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 6px solid #eee;
`;

export default withAuth(JobDetail);
