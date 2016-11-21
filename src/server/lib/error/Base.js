class BaseError extends Error {
  constructor(opt) {
    super(opt.message);
    this.message = opt.message;
    this.code = opt.code
    this.name = 'BaseError';
    this.log(`Error:${this.name}:${opt.message}:${this.code}`)
  }

  log(msg){
		throw new Error('Unimplemented')
  }

}

module.exports = BaseError;
