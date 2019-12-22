// eslint-disable-next-line import/prefer-default-export
const formatDate = (date) => date.toISOString().split('T')[0]

const createUrlFromToken = (token) => `${process.env.BASE_URL}/selfies/${token}`

module.exports = {
  formatDate,
  createUrlFromToken,
}
