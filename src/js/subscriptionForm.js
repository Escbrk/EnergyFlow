import { refs } from './refs.js';
import { subscribe } from './api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { emailChecker } from './handlers/emailChecker.js';

refs.footerForm.addEventListener('submit', async e => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);

  const data = Object.fromEntries(formData);

  try {
    emailChecker(data.email);
    const res = await subscribe(data);

    iziToast.success({
      title: 'Succes',
      message: res.data.message,
    });

    form.reset();
  } catch (err) {
    iziToast.error({
      title: 'Error',
      message:
        err.response?.data?.message || err.message || 'Something went wrong!',
    });
  }
});
