'use strict';

/**
 * evento service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::evento.evento');
