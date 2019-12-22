const UrlVisit = require('../model/UrlVisit')
const Cachify = require('../modules/Cachify')
const { isDate, trimDate } = require('../utils')

async function addUrlVisit(visitorSessionId, shortUrlToken, isMobile, isDesktop, browser) {
  const device = isMobile ? 'mobile' : 'desktop'
  await UrlVisit.create({
    device,
    browser,
    shortUrlToken,
    visitorSessionId,
  })
}

async function getUrlVisitsSummaryUtil(query, unique, groupBy) {
  const pipeline = [
    { $match: query },
    unique && {
      $group: {
        _id: '$visitorSessionId',
        [groupBy]: { $first: `$${groupBy}` },
      },
    },
    {
      $group: {
        _id: `$${groupBy}`,
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        [groupBy]: '$_id',
        count: 1,
      },
    },
  ]
  return UrlVisit.aggregate(pipeline.filter((stage) => stage))
}

async function getUrlVisitsSummaryImpl(shortUrlToken, startDate, endDate, unique) {
  const startDateQuery = startDate ? { createdAt: { $gt: new Date(startDate) } } : {}
  const endDateQuery = endDate ? { createdAt: { $lt: new Date(endDate) } } : {}
  const query = Object.assign(
    {
      shortUrlToken,
    },
    startDateQuery,
    endDateQuery,
  )
  return {
    all: await getUrlVisitsSummaryUtil(query, unique, null),
    groupedByDevice: await getUrlVisitsSummaryUtil(query, unique, 'device'),
    groupedByBrowser: await getUrlVisitsSummaryUtil(query, unique, 'browser'),
  }
}

const getUrlVisitsSummaryCachified = Cachify({
  func: getUrlVisitsSummaryImpl,
  namespace: 'getUrlVisitsSummary',
  ttl: 60 * 60,
})

async function getUrlVisitsSummary(shortUrlToken, startDate, endDate, unique) {
  return getUrlVisitsSummaryCachified.get(shortUrlToken, startDate, endDate, unique)
}

async function getUrlVisits(shortUrlToken, from, to, unique) {
  if ((from && !isDate(from)) || (to && !isDate(to))) {
    throw new Error('"from" and "to" should be valid dates')
  }

  return getUrlVisitsSummary(shortUrlToken, from && trimDate(new Date(from)), to && trimDate(new Date(to)), unique)
}

module.exports = {
  addUrlVisit,
  getUrlVisits,
}
