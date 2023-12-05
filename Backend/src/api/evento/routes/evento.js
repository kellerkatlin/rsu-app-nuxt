'use strict';

/**
 * evento router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::evento.evento');
