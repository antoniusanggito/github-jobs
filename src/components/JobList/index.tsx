import React from 'react';
import Layout from '../Layout';
import withAuth from '../utils/AuthHOC/withAuth';

type Props = {};

const JobList = (props: Props) => {
  return <Layout>JobList</Layout>;
};

export default withAuth(JobList);
