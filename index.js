import dotenv from "dotenv";

// load config-file
dotenv.config({ path: `.env${process.env.NODE_ENV ? `-${process.env.NODE_ENV}` : ''}` });

const app = (await import('./app.js')).app;

const hostname = '127.0.0.1';
const port = process.env.PORT || 8000;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});