const debug = require('debug')('phoenix:policy:rate-limiting')
const limiter = require('limiter')


class RateLimiter() {
  constructor(options) {
    options = options || {};
    this.limit = options.limit || 1000;
    this.interval = options.interval || 1000; // ms
    this.limiters = {};
    this.options = options;
  }

  get limiter(key, limit) {
    var inst;
    debug('Key: %s', key) 
    if (key) {
      inst = this.limiters[key]
      if (!inst) {
        debug('Creating rate limiter: %d %d', limit, this.interval);
        inst = new limiter.RateLimiter(limit, this.interval);
        this.limiters[key] = inst;
      }
    }
    return inst
  }

  enforce(key, options, cb) {
    if (cb === undefined && typeof options === 'function') {
      cb = options
      options = {}
    }
    options = options || {}
    let weight = options.weight || 1
    let limit = options.limit || this.limit
    let inst = this.limiter(key, limit)

    if (inst) {
      let ok = inst.tryRemoveTokens(weight)
      debug('Bucket: ', inst.tokenBucket);
      var remaining = Math.floor(inst.getTokensRemaining());
      var reset =
        Math.max(this.interval - (Date.now() - inst.curIntervalStart), 0);

      debug('Limit: %d Remaining: %d Reset: %d', limit, remaining, reset);

      var result = {
        limit: limit,
        remaining: remaining,
        reset: reset,
        isAllowed: ok
      }

      process.nextTick(() => {
        if (cb) {
          cb(null, result);
        }
      })

    }
  }

}

module.exports = RateLimiter
