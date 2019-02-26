// Saving to Local Storage and loading from it.

// Model:
// {
//   apiKey: String, // SimFin API Key
//   tickers: [
//     {
//       "name":   String, // "Apple Inc",
//       "simId":  Number, // 111052,
//       "ticker": String, // "AAPL"
//     }
//   ]
// }

const STORAGE_KEY = 'fundamentals-chart-storage';

export function save(model) {
  localStorage[STORAGE_KEY] = JSON.stringify(model);
}

export function load() {
  const model = localStorage[STORAGE_KEY];
  return model && JSON.parse(model) || { apiKey: undefined, tickers: [] };
}

export function saveKey(key) {
  const model = load();
  model.apiKey = key;
  save(model);
}

// export function saveTicker(ticker) {
//   const model = load();
//   model.tickers.push(ticker);
//   save(model);
// }
