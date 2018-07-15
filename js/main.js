var PRICE_UPDATE_INTERVAL = 1 * 60 * 1000 // 1 min;

function updateCurrencyData()
{
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => response.json())
        .then(json => {
            app.currencyData = json.bpi;
        });
}

function spill(bucket, target, value)
{
    bucket.splice(bucket.indexOf(value), 1);
    target.push(value);
}

var app = new Vue({
    el: '#btc-converter',
    data: {
      tstt: 'Hello Vue! asdasd',
      availableCurrencies: [
        'EUR', 'USD', 'GBP'
      ],
      viewableCurrencies: [

      ],
      currencyData: {} //empty for now. Will be parsed from json
    },
    methods: {
        addCurrency: function (currency) {
            spill(this.availableCurrencies, this.viewableCurrencies, currency);
        },
        removeCurrency: function (currency) {
            spill(this.viewableCurrencies, this.availableCurrencies, currency);
        }
    },
    created() {
        updateCurrencyData();
        setInterval(updateCurrencyData, PRICE_UPDATE_INTERVAL);
    }
  })