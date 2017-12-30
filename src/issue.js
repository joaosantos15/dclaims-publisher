const HypercertsNewsClaims = require('../../hypercerts-news-claims/src/index.js')
// const HypercertsCore = require('hypercerts-core')
const HypercertsCore = require('../../hypercerts-core/src/hc-core.js')

exports = module.exports

const ISSUER_ID = 'MY-PUBLIC-KEY'

exports.issue = function (claim) {
  return new Promise(function (resolve, reject) {
    resolve(true)
  })
}

/*
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
*/

exports.issueBatch = function (items) {
  return new Promise(function (resolve, reject) {
    try {
      console.log('issuing batch...')
      const articleId = items[0].claim.id
      const claimsBatch = new HypercertsNewsClaims.BatchClaim(articleId, ISSUER_ID, items)
      HypercertsCore.handleVerification(articleId, claimsBatch).then(resolve)
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}

exports.issueIndividually = function (items) {
  return new Promise(function (resolve, reject) {
    try {
      console.log('issuing individually')
      const articleId = items[0].claim.id
      // const claimsBatch = new HypercertsNewsClaims.BatchClaim(articleId, ISSUER_ID, items)
      const issuingQ = []
      for (let i = 0; i < items.length; i++) {
        issuingQ.push(HypercertsCore.handleVerification(articleId, items[i]))
      }
      Promise.all(issuingQ).then(resolve)
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}
