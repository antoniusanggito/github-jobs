const baseUrl = process.env.REACT_APP_API_URL as string;

const headers = {
  'Content-Type': 'application/json',
};

const endpoint = {
  login: `${baseUrl}/login`,
  job: `${baseUrl}/job`,
};

export { baseUrl, headers, endpoint };
