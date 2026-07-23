const serviceType = document.getElementById('serviceType');
const bookingSize = document.getElementById('bookingSize');
const totalAmount = document.getElementById('totalAmount');
const depositAmount = document.getElementById('depositAmount');
const balanceAmount = document.getElementById('balanceAmount');
const payDepositBtn = document.getElementById('payDepositBtn');
const payFullBtn = document.getElementById('payFullBtn');
const bookingForm = document.getElementById('bookingForm');
const formMessage = document.getElementById('formMessage');

const prices = {
  dance: { small: 450, medium: 700, large: 950 },
  cleanup: { small: 250, medium: 400, large: 600 },
  both: { small: 650, medium: 1000, large: 1400 }
};

function currency(value) {
  return `$${value.toLocaleString()}`;
}

function getTotal() {
  return prices[serviceType.value][bookingSize.value];
}

function updatePricing() {
  const total = getTotal();
  const deposit = Math.round(total * 0.3);
  const balance = total - deposit;

  totalAmount.textContent = currency(total);
  depositAmount.textContent = currency(deposit);
  balanceAmount.textContent = currency(balance);

  payDepositBtn.dataset.amount = deposit;
  payFullBtn.dataset.amount = total;
}

payDepositBtn.addEventListener('click', () => {
  formMessage.textContent = `Deposit checkout ready for ${currency(Number(payDepositBtn.dataset.amount || 0))}.`;
});

payFullBtn.addEventListener('click', () => {
  formMessage.textContent = `Full payment checkout ready for ${currency(Number(payFullBtn.dataset.amount || 0))}.`;
});

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formMessage.textContent = 'Booking request captured. Connect this form to your payment/booking system next.';
});

serviceType.addEventListener('change', updatePricing);
bookingSize.addEventListener('change', updatePricing);

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fx-reveal-visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fx-reveal').forEach(el => observer.observe(el));

const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const y = window.scrollY * 0.12;
  hero.style.backgroundPosition = `center ${y}px`;
});

updatePricing();
