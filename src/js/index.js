// Import our custom CSS
import '../sass/main.scss'

// Import components
import './components/index'

// Import javascript file as needed
import Dashboard from './pages/dashboard'
import Add from './pages/story/add';
import Profile from './pages/user/profile';
import * as bootstrap from 'bootstrap';

const routes = {
  '/': Dashboard,
  '/story/add.html': Add,
  '/user/profile.html': Profile,
};

const detectRoute = () => routes[window.location.pathname];

const initPages = () => {
  const header = document.querySelector('header');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');

  if (header && main && footer) {
    main.style.minHeight = `calc(100vh - ${header.clientHeight + footer.clientHeight}px)`;
  }
};

window.addEventListener('DOMContentLoaded', async () => {
  initPages();

  const route = detectRoute();
  route.init();
});