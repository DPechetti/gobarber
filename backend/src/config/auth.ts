export default {
  jwt: {
    secret: process.env.APP_SECRET || 'to test',
    expiresIn: '1d',
  },
};
