const hapi = require('hapi')

const mockMovie = require('./mock_movie')

const server = new hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

server.route({
    method: 'GET',
    path: '/movie',
    handler: function (request, reply) {
        reply(mockMovie);
    }
});

//fl;daskf;ldksa;lfkdsa;lfkdas;'lfk;ld'sakf;ldsakf;lsadk;f'lkdsa;lfkds;
// test
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
