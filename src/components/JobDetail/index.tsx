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
        toast.error(`Error ${err.status}: ${err.data.message}`);
      });
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <section css={sectionStyle}>
        <Back onClick={handleBack}>
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
`;

const sectionStyle = css`
  width: 95%;
  max-width: 1400px;
  margin: 0 auto;
`;

const contentWrapperStyle = css`
  display: flex;
  width: 100%;

  & > div:first-child {
    flex-grow: 1;
    margin-right: 20px;
  }

  & > div:last-child {
    min-width: 30vw;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const InfoCard = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 6px solid #eee;
`;

export default withAuth(JobDetail);
