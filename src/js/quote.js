import { getQuote } from './api.js';
import { refs } from './refs.js';
import { loader, quoteLoader } from './handlers/loader.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const quoteBlock = document.getElementById('quote');

const createQuoteMarkup = async () => {
  const dateNow = new Date().toISOString().slice(0, 10);

  const stored = localStorage.getItem('DailyQuote');
  let data = stored ? JSON.parse(stored) : null;

  const dailyQuote = {
    text: quoteBlock.querySelector('.quote-text'),
    author: quoteBlock.querySelector('.author-name'),
  };

  const isExpired = !data || dateNow !== data.date;
  refs.quoteWrapper.innerHTML = quoteLoader();

  if (isExpired) {
    try {
      const { author, quote } = await getQuote();
      data = { author, quote, date: dateNow };

      localStorage.setItem('DailyQuote', JSON.stringify(data));
    } catch (err) {
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch Daily Quote',
      });

      iziToast.info({
        title: 'Info!',
        message: 'Default quote was setting up!',
      });

      data = { author: 'EnergyFlow', quote: 'Stay active' };
    }
  }

  if (dailyQuote.text && dailyQuote.author) {
    refs.quoteWrapper.innerHTML = `
    <p class="quote-text">${data.quote}</p>
    <p class="author-name">${data.author}</p>
    `;
  }
};

createQuoteMarkup();
