import { getQuote } from './api.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const quoteBlock = document.getElementById('quote');

const createQuoteMarkup = async () => {
  let stored = localStorage.getItem('DailyQuote');
  let data = stored ? JSON.parse(stored) : null;

  const dailyQuote = {
    text: quoteBlock.querySelector('.quote-text'),
    author: quoteBlock.querySelector('.author-name'),
  };

  const isExpired = !data || Date.now() - data.dateStamp > 86400000;

  if (isExpired) {
    try {
      const { author, quote } = await getQuote();
      data = { author, quote, dateStamp: Date.now() };

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
    dailyQuote.text.textContent = data.quote;
    dailyQuote.author.textContent = data.author;
  }
};

createQuoteMarkup();
