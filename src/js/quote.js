import { getQuote } from './api.js';

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
    dailyQuote.text.textContent = data.quote;
    dailyQuote.author.textContent = data.author;
  }
};

createQuoteMarkup();
