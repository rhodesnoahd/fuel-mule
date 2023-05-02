const fuelQuoteHistoryController = require("../controllers/fuelQuoteHistoryController");
class Pricing {
  #currentPricePerGallon;
  #locationFactor;
  #rateHistoryFactor;
  #companyProfitFactor;
  #gallonsRequestedFactor;
  #margin;
  #suggestedPrice;

  constructor(_stateCode, _history, _gallonsRequested) {
    this.#currentPricePerGallon = 1.5;

    this.#locationFactor = _stateCode === "TX" ? 0.02 : 0.04;
    this.#rateHistoryFactor = _history ? 0.01 : 0;
    this.#companyProfitFactor = 0.1;
    this.#gallonsRequestedFactor = _gallonsRequested >= 1000 ? 0.02 : 0.03;

    this.#margin =
      this.#currentPricePerGallon *
      (this.#locationFactor -
        this.#rateHistoryFactor +
        this.#gallonsRequestedFactor +
        this.#companyProfitFactor);

    this.#suggestedPrice = this.#currentPricePerGallon + this.#margin;
  }
  get_suggested_price() {
    return this.#suggestedPrice;
  }
}

module.exports = Pricing;
