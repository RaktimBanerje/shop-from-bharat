import { createDirectus, rest } from '@directus/sdk';

const directus = createDirectus('http://ec2-3-107-13-124.ap-southeast-2.compute.amazonaws.com:8055').with(rest());

async function authenticate() {
    try {
      // Log in to get the token
      const authData = await directus.auth.login({
        username: 'admin@example.com',
        password: '5KpKUr3UQEXl',
      });
      console.log(authData); // You'll get an access token here
    } catch (error) {
      console.error('Authentication failed', error);
    }
  }
  
  authenticate();

export default directus;
