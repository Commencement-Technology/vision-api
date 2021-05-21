import express from 'express';

let app = require('./server').default;

if (module.hot) {
    module.hot.accept('./server', () => {
        console.log('🔁  HMR Reloading `./server`...');
        try {
            app = require('./server').default;
        } catch (error) {
            console.error(error);
        }
    });
    console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.API_PORT ? parseInt(process.env.API_PORT, 10) : 4000;

const server = express()
    .use((req, res) => app.handle(req, res))
    .listen(port, (err: Error) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`> Started on port ${port}`);
    });

['SIGINT', 'SIGTERM'].forEach((signal: any) => {
    process.on(signal, () => {
        console.info(`Shutting down because of ${signal}`);
        server.close(() => {
            console.error('Server closed gracefully')
        });
    })
});

export default server;
