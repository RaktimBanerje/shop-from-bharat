// src/app/api/proxy/route.js
import axios from 'axios';

const baseUrl = "https://shopfrombharat.apsgroup.in";  // Target API base URL

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const endpoint = searchParams.get('endpoint');  // Extract 'endpoint' query parameter
  const token = req.headers.get('authorization');  // Extract 'Authorization' token from headers
  
  const targetUrl = `${baseUrl}/${endpoint}`;  // Construct the target URL

  try {
    // Make GET request to the target API
    const response = await axios.get(targetUrl, {
      headers: { 'Authorization': token }
    });

    // Return the response data with appropriate CORS headers
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*');  // Allow cross-origin requests
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return new Response(JSON.stringify(response.data), { 
      status: response.status,
      headers: headers
    });
  } catch (error) {
    console.error('Error in proxy GET request:', error);
    return new Response(
      JSON.stringify({ message: error.message }),
      { status: error.response?.status || 500 }
    );
  }
}

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const endpoint = searchParams.get('endpoint');
  const token = req.headers.get('authorization');  // Get the Authorization token
  
  const targetUrl = `${baseUrl}/${endpoint}`;
  const body = await req.json();  // Parse the body of the request

  try {
    // Make POST request to the target API
    const response = await axios.post(targetUrl, body, {
      headers: { 'Authorization': token }
    });

    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return new Response(JSON.stringify(response.data), { 
      status: response.status,
      headers: headers
    });
  } catch (error) {
    console.error('Error in proxy POST request:', error);
    return new Response(
      JSON.stringify({ message: error.message }),
      { status: error.response?.status || 500 }
    );
  }
}

// Similar methods for PUT and DELETE
