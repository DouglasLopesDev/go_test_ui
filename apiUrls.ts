const functionUrl = 'https://ft0i067jya.execute-api.us-east-2.amazonaws.com/default';


const api = {
  url: {
    project: {
      get: `${functionUrl}/get-Project`,
      post: `${functionUrl}/post-Project`,
      put: `${functionUrl}/put-Project`
    },
  },
};

export default api;
