import { Slim } from 'slim-js';
import { tag, template, useShadow } from 'slim-js/Decorators';

import 'slim-js/directives/all.js';

import 'chart.js'

import { produce } from "immer";

import { load, save } from "../../storage";
import { fetchTicker, fetchRatios } from "../../simfin";

import APP_TEMPLATE from './app.template.html';

@tag('my-app')
@template(`${APP_TEMPLATE}`)
@useShadow(true)
class MyApp extends Slim {
  onBeforeCreated() {
    this.model = load();
    this.fetchRatiosAndDrawChart();
  }

  fetchRatiosAndDrawChart() {
    Promise.all(this.model.tickers.map(ticker => {
      return fetchRatios(this.model.apiKey, ticker.simId).then(ratios => {
        return Object.assign({}, ticker, ratios);
      });
    })).then(ratios => this.drawChart(ratios));
  }

  drawChart(ratios) {
    const ctx = this.myChart.getContext('2d');
    const chartData = ratiosToChart(ratios);
    const chart = new Chart(ctx, {
        type: 'bubble',

        data: chartData,

        options: {}
    });
  }

  saveKey(e) {
    e.preventDefault();
    const { apiKey } = this;
    apiKey.value = apiKey.value.trim();
    const { value: text } = apiKey;
    if (text) {
      this.model = produce(this.model, draft => {
        draft.apiKey = text;
      });
      save(this.model);
    }
  }

  addTicker(e) {
    e.preventDefault();
    const { tickerName } = this;
    tickerName.value = tickerName.value.trim();
    const { value: text } = tickerName;
    if (text) {
      fetchTicker(this.model.apiKey, text).then(ticker => {
        if (ticker) {
          this.model = produce(this.model, draft => {
            draft.tickers.push(ticker);
          });
          save(this.model);
          tickerName.value = null;
          this.fetchRatiosAndDrawChart();
        } else {
          console.log('Failed to fetch ticker data.');
        }
      });
    }
  }

  removeTicker(ticker) {
    this.model = produce(this.model, draft => {
      draft.tickers = this.model.tickers.filter(existingTicker => existingTicker.ticker !== ticker);
    });
    save(this.model);
    this.fetchRatiosAndDrawChart();
  }
}

/**
 * Transforms ratios data into bubble chart data.
 * @param {Array} ratios
 */
function ratiosToChart(ratios) {
  return {
    // labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: ratiosToDatasets(ratios)
  };
}

function ratiosToDatasets(ratios) {
  const maxCap = ratios.reduce((max, {marketCap}) => Math.max(max, marketCap), 0);
  const data = ratios.map(ratioToData).map(({x, y, r}) => ({x, y, r: (r / maxCap * 100)}));
  return ratios.map((ratio, index) =>{
    const h = 360/data.length * index;
    return ({
      label: ratio.name,
      backgroundColor: `hsla(${h},100%,50%,1)`,
      borderColor: `hsla(${h},100%,50%,1)`,
      data: [data[index]],
    });
  });
}

function ratioToData({debt, ev, ebitda, marketCap}) {
  return {
    x: ev / ebitda,
    y: debt / ebitda,
    r: marketCap
  };
}
