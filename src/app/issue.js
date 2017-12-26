exports = module.exports

exports.issue = function (claim) {
  return new Promise(function (resolve, reject) {
    if (true) {
      resolve(true)
    } else {
      reject(false)
    }
  })
}
