const HypercertsNewsClaims = require('../../hypercertsNewsClaims/index.js')
const HypercertsCore = require('hypercerts-core')

exports = module.exports

exports.issue = function (claim) {
  return new Promise(function (resolve, reject) {
    resolve(true)
  })
}

exports.issueBatch = function (items) {
  return new Promise(function (resolve, reject) {
    try {
      const articleId = items[0].claim.id
      const claimsBatch = new HypercertsNewsClaims.BatchClaim(articleId, items)
      HypercertsCore.handleVerification(articleId, claimsBatch).then(resolve)
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}
