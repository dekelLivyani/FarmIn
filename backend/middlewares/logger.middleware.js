const logger = require('../services/logger.service')

async function log(req, res, next) {
  if (req.session && req.session.user) {
    logger.info('Req from: ' + req.session.user.fname)
  }
  next()
}

module.exports = {
  log
}
