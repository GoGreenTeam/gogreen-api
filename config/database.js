'use strict'

// use a remote MongoDB server on development
exports.development = {
  models: api => {
    return {

      connectionString: 'mongodb://dev.api.gogreen.alphabeta.host:27017/mongo-gogreen',
      pkg: 'mongoose'
    }
  }
}

exports.production = {
  models: api => {
    return {
      connectionString: 'mongodb://api.gogreen.alphabeta.host:27017/mongo-gogreen',
      pkg: 'mongoose'
    }
  }
}
