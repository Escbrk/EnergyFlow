import spritePath from '../img/svg/sprite.svg';

const qwe = `  <svg>
                <use href="${spritePath}#icon-star">1</use>
              </svg>`;

export const ratingForm = id => `
        <div class="rating-window" data-id=${id}>
          <button type="button" class="close-modal-btn" data-modal-type="rating">
            <svg>
              <use href="${spritePath}#icon-close"></use>
            </svg>
          </button>
          <p class="rating-title">Rating</p>

          <form class="ratingForm">
            <div class="rating-score">
              <span>0.0</span>

              <div>
                  <label><input type="radio" name="rate" value="1" required></label>
                  <label><input type="radio" name="rate" value="2" required></label>
                  <label><input type="radio" name="rate" value="3" required></label>
                  <label><input type="radio" name="rate" value="4" required></label>
                  <label><input type="radio" name="rate" value="5" required></label>
              </div>
            </div>
            <label for="email"></label>
            <input type="email" name="email" id="email" class="rating-email-input" placeholder="Email" required/>

            <label for="message"></label>
            <textarea name="message" id="message" class="rating-message-input" placeholder="Your comment"></textarea>

            <button type="submit" class="ratingSubmitBtn">Send</button>
          </form>
        </div>
    `;
