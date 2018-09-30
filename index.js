const Hapi = require('hapi');
const mockMovie = require('./mock_movie')

var atatus = require("atatus-node");

const server = Hapi.server({
    host: 'localhost',
    port: 3000
});

server.route({
    method: 'GET',
    path: '/movie',
    handler: (_, h) => {
        return h.response(mockMovie);
    }
});

server.route({
    method: 'GET',
    path: '/error',
    handler: (_, h) => {
        return h.response("Hello World").code(500);
    }
});

// Start the server
async function start() {
    try {
        await server.register({
            name: "Test",
            plugin: require('hapijs-status-monitor'),
            options: {
                title: 'My Status Monitor',
                routeConfig: {
                    auth: false
                }
            }
        });
        await server.start();
        atatus.start({ apiKey: "fac9ab61b1a641a588608cd2d07550c9" });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();