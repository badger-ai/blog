// js/sanity.js
const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: 'bw8xzmsp',     // Your Project ID
  dataset: 'production',
  useCdn: true,              // `false` if you want fresh data
  apiVersion: '2024-04-17',  // Use today's date or latest
});

export default client;