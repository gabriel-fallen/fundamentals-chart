Fundamentals Chart
==================

This is a Single Page App that draws a bubble chart of the given public companies
based on their fundamental ratios. You can try it [here](https://fundamentals-chart.5apps.com/).

Ratios used:

- `Debt/EBITDA` for Y axis;
- `Enterprise Value/EBITDA` for X axis;
- `Market Capitalization` determines radius.

You can add companies to the chart via their "tickers" - stock exchange identifiers
(like `AAPL` for "Apple Inc."). A ticker for a company can be found via
[Yahoo Finance](https://finance.yahoo.com/), Google Finance or a stock exchange
like NASDAQ.

Campanies' data gets retrieved through [SimFin](https://simfin.com/) API, thus
to use the application you need to register there and get an API Key (for free
at the time of writing).

Privacy
-------

All the data the application keeps is stored in your browser's Local Storage.
This has two implications:

1. your data never leaves your device, the only service the application contacts
   is SimFin and the only data sent there is your API Key and companies' tickers;

2. keeping your data safe and secure is your responsibility - if you loose your
   browser's Local Storage or it gets stolen the author has no idea what was there,
   can't restore the data and holds no liability.

SimFin Privacy Policy can be found [here](https://simfin.com/privacy).

License
-------

MIT License

Copyright (c) 2019 Alexander Tchitchigin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
