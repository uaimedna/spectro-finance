var PRICE_UPDATE_INTERVAL = 1 * 60 * 1000 // 1 min;
var CURRENCY_API_ANDPOINT = 'https://api.coindesk.com/v1/bpi/currentprice.json';

function updateCurrencyData()
{
    fetch(CURRENCY_API_ANDPOINT)
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

function decodeSpecialHTML(text)
{
    var area = document.createElement("textarea");
    area.innerHTML = text;
    return area.value;
}

var app = new Vue({
    el: '#btc-converter',
    data: {
        btcAmount: 0,
        availableCurrencies: [
            'EUR', 'USD', 'GBP'
        ],
        viewableCurrencies: [],
        currencyData: {} // Empty for now. Will be parsed from json
    },
    methods: {
        addCurrency: function (currency) 
        {
            spill(this.availableCurrencies, this.viewableCurrencies, currency);
        },
        removeCurrency: function (currency) 
        {
            spill(this.viewableCurrencies, this.availableCurrencies, currency);
        },
        getBtcValue: function (currency) 
        {
            let currencyData = this.currencyData[currency];
            return decodeSpecialHTML(currencyData.symbol) + "" + numeral(this.btcAmount * currencyData.rate_float).format('0,0.00');
        }
    },
    created() 
    {
        updateCurrencyData();
        setInterval(updateCurrencyData, PRICE_UPDATE_INTERVAL);
    }
})