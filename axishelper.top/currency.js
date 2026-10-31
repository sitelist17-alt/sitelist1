// ============================================================
// AXIS — GLOBAL CURRENCY CONFIG v2 (fixed)
// Единый источник валюты для всех страниц. Без конфликтов.
// ============================================================

(function() {
  const CONFIG_KEY = 'axis_currency_config';

  const COUNTRIES = {
    'DZ': { country: 'Iraq',     currency: 'IQD', flag: 'IQ', rate: 1689 },
    'PH': { country: 'Philippines', currency: 'PHP', flag: '🇵🇭', rate: 58.20 },
    'RU': { country: 'Russia',      currency: 'RUB', flag: '🇷🇺', rate: 92.50 },
    'UA': { country: 'Ukraine',     currency: 'UAH', flag: '🇺🇦', rate: 41.30 },
    'MA': { country: 'Morocco',     currency: 'MAD', flag: '🇲🇦', rate: 9.95 },
    'TN': { country: 'Tunisia',     currency: 'TND', flag: '🇹🇳', rate: 3.12 },
    'EG': { country: 'Egypt',       currency: 'EGP', flag: '🇪🇬', rate: 48.60 },
    'SA': { country: 'Saudi Arabia',currency: 'SAR', flag: '🇸🇦', rate: 3.75 },
    'AE': { country: 'UAE',         currency: 'AED', flag: '🇦🇪', rate: 3.67 },
    'TR': { country: 'Turkey',      currency: 'TRY', flag: '🇹🇷', rate: 34.20 },
    'US': { country: 'USA',         currency: 'USD', flag: '🇺🇸', rate: 1 },
    'EU': { country: 'Europe',      currency: 'EUR', flag: '🇪🇺', rate: 0.92 }
  };

  function getCountryCode() {
    try {
      const raw = localStorage.getItem(CONFIG_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p && p.countryCode && COUNTRIES[p.countryCode]) return p.countryCode;
      }
    } catch (e) {}
    return 'DZ';
  }

  function getConfig() {
    return COUNTRIES[getCountryCode()] || COUNTRIES['DZ'];
  }

  function setCountry(code) {
    if (!COUNTRIES[code]) return;
    localStorage.setItem(CONFIG_KEY, JSON.stringify({
      countryCode: code,
      currency: COUNTRIES[code].currency,
      rate: COUNTRIES[code].rate,
      flag: COUNTRIES[code].flag,
      country: COUNTRIES[code].country
    }));
    applyToPage();
  }

  // Обновление UI админки и сайдбара
  function applyToPage() {
    const cfg = getConfig();

    const flagMini = document.getElementById('countryFlagMini');
    if (flagMini) flagMini.textContent = cfg.flag;

    const regionName = document.getElementById('regionName');
    if (regionName) regionName.textContent = cfg.country;

    const currLabel = document.getElementById('currentCurrencyLabel');
    if (currLabel) currLabel.textContent = cfg.currency;

    const rateLabel = document.getElementById('currentRateLabel');
    if (rateLabel) rateLabel.textContent = `1 USD = ${cfg.rate} ${cfg.currency}`;
  }

  // Экспорт
  window.AXIS_CURRENCY = {
    get: getConfig,
    getCode: getCountryCode,
    set: setCountry,
    COUNTRIES
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyToPage);
  } else {
    applyToPage();
  }
})();