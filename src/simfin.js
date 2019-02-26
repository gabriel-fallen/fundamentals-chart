// Wrappers around selected SimFin API endpoints.

const TICKER_ID_URL = 'https://simfin.com/api/v1/info/find-id/ticker';

/**
 * Fetches SimFin ID and company name for a given ticker.
 * @param {String} apiKey SimFin API key
 * @param {String} ticker
 */
// returns
// {
//   "name":   String, // "Apple Inc",
//   "simId":  Number, // 111052,
//   "ticker": String, // "AAPL"
// }
// or `undefined` when failed to find
export function fetchTicker(apiKey, ticker) {
  return fetch(`${TICKER_ID_URL}/${ticker}?api-key=${apiKey}`)
    .then(resp => resp.json()).then(arr => arr[0])
    .catch(console.log);
}

// https://simfin.com/api/v1/companies/id/{companyId}/ratios
const RATIOS_URL = 'https://simfin.com/api/v1/companies/id';
// Total Debt, EBITDA, Market Cap, Enterprise Value, EV/EBITDA
// const RATIOS_LIST = 'indicators=4-6,4-10,4-11,4-20,4-21';
// Total Debt, EBITDA, Market Cap, Enterprise Value
const RATIOS_LIST = 'indicators=4-6,4-10,4-11,4-20';

/**
 * Fetches an array of relevant company ratios.
 * @param {String} apiKey SimFin API key
 * @param {Number} companyId SimFin internal company ID (aka simId)
 */
// returns
// [
//   {
//     "indicatorId": "1-1",
//     "indicatorName": "Revenues",
//     "value": 30533000000,
//     "period": "TTM",
//     "fyear": 2017,
//     "currency": "USD",
//     "period-end-date": "2017-06-30"
//   }
// ]
function fetchRatiosRaw(apiKey, companyId) {
  return fetch(`${RATIOS_URL}/${companyId}/ratios?api-key=${apiKey}&${RATIOS_LIST}`)
    .then(resp => resp.json())
    .catch(console.log);
}
/**
 * Fetches an array of relevant company ratios.
 * @param {String} apiKey SimFin API key
 * @param {Number} companyId SimFin internal company ID (aka simId)
 */
// returns
// {
//   debt: Number,
//   ebitda: Number,
//   marketCap: Number,
//   ev: Number
// }
export function fetchRatios(apiKey, companyId) {
  return fetchRatiosRaw(apiKey, companyId).then(collectRatios);
}

function parseRatio(ratio) {
  switch (ratio.indicatorId) {
    case "4-6":
      return { debt: ratio.value };
    case "4-10":
      return { ebitda: ratio.value };
    case "4-11":
      return { marketCap: ratio.value };
    case "4-20":
      return { ev: ratio.value };
  }
}

function collectRatios(arr) {
  return arr.reduce((res, curr) => Object.assign(res, parseRatio(curr)), {});
}
