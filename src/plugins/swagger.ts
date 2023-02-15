import fp from 'fastify-plugin'


module.exports = fp(async function(fastify) {
    fastify.register(require('fastify-swagger'), {
        routePrefix: '/docs',
        swagger: {
          info: {
            title: process.env.API_NAME,
            description: 'Fastify API Demo with Postgres',
            version: '0.1.0'
          },
          host: process.env.API_HOST,
          schemes: ['http'],
          consumes: ['application/json'],
          produces: ['application/json'],
        },
        exposeRoute: true
      })
})