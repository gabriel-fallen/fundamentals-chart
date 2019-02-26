import { Slim } from 'slim-js';
import { tag, template, useShadow } from 'slim-js/Decorators';

import 'slim-js/directives/all.js';

import { load, save } from "../../storage";
import { fetchTicker, fetchRatios } from "../../simfin";

import APP_TEMPLATE from './app.template.html';

@tag('my-app')
@template(`${APP_TEMPLATE}`)
// @useShadow(true)
class MyApp extends Slim {
  onBeforeCreated() {
    this.ratios = [];
    this.model = load();
    Promise.all(this.model.tickers.map(ticker => {
      return fetchRatios(this.model.apiKey, ticker.simId).then(ratios => {
        return Object.assign({}, ticker, ratios);
      });
    })).then(ratios => this.ratios = ratios);
  }

  saveKey(e) {
    e.preventDefault();
    const { apiKey } = this;
    apiKey.value = apiKey.value.trim();
    const { value: text } = apiKey;
    if (text) {
      // this.callAttribute('on-new-item', text)
      this.model.apiKey = text;
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
          this.model.tickers.push(ticker);
          this.model = Object.assign({}, this.model);
          save(this.model);
          tickerName.value = null;
        } else {
          console.log('Failed to fetch ticker data.');
        }
      });
    }
  }
}
