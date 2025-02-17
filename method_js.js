const http = require('http'); // Import HTTP module

const PORT = 3001; // Use a different port
const HOSTNAME = 'localhost';

// Create HTTP server
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json'); // Set common header

    let responseMessage = '';

    if (req.method === 'GET') {
        responseMessage = { message: 'GET request received' };
    } else if (req.method === 'POST') {
        responseMessage = { message: 'POST request received' };
    } else if (req.method === 'PUT') {
        responseMessage = { message: 'PUT request received' };
    } else if (req.method === 'PATCH') {
        responseMessage = { message: 'PATCH request received' };
    } else if (req.method === 'DELETE') {
        responseMessage = { message: 'DELETE request received' };
    } else {
        responseMessage = { message: 'Method not allowed' };
        res.writeHead(405);
        res.end(JSON.stringify(responseMessage));
        return;
    }

    res.writeHead(200);
    res.end(JSON.stringify(responseMessage));
});

// Start server
server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});

// const http = require('http'); // Import HTTP module

// const PORT = 3000; // Define port
// const HOSTNAME = 'localhost'; // Localhost

// // Create HTTP server
// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' }); // Set response headers
//     res.end('Hello, World!\n'); // Response message
// });

// // Start server and listen on specified port
// server.listen(PORT, HOSTNAME, () => {
//     console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
// });