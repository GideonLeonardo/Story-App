import formatDate from '../formattedDate.js';
import CheckUserAuth from './auth/check-user-auth';
import Transactions from '../network/transaction';

const Dashboard = {
  async init() {
    CheckUserAuth.checkLoginState();
    await this._initialData();
    this._initialListener();
  },

  async _initialData() {
    try {
      const response = await Transactions.getAll();
      const responseRecords = response.data.results;
      this._userTransactionsHistory = responseRecords.transactionsHistory;
      this._populateTransactionsRecordToTable(this._userTransactionsHistory);
      this._populateTransactionsDataToCard(this._userTransactionsHistory);
    } catch (error) {
      console.error(error);
    }

    const fetchRecords = await fetch('/data/DATA.json');
    const responseRecords = await fetchRecords.json();
    this._userListStory = responseRecords.listStory;
    this._populateStoriesDataToCard(this._userListStory);
  },

  _initialListener() {
    const recordDetailModal = document.getElementById('recordDetailModal');
    recordDetailModal.addEventListener('show.bs.modal', (event) => {
      const modalTitle = recordDetailModal.querySelector('.modal-title');
      modalTitle.focus();

      const button = event.relatedTarget;
      const dataRecord = this._userListStory.find((item) => {
        return item.id == button.dataset.recordId;
      });

      this._populateDetailStoryToModal(dataRecord);
    });
  },

  _populateStoriesDataToCard(listStory = null) {
    if (!(typeof listStory === 'object')) {
      throw new Error(`Parameter listStory should be an object. The value is ${listStory}`);
    }

    if (!Array.isArray(listStory)) {
      throw new Error(`Parameter listStory should be an array. The value is ${listStory}`);
    }

    const recordCard = document.querySelector('#recordsCard');

    recordCard.innerHTML = '';
    if (listStory.length <= 0) {
      recordCard.innerHTML = this._templateEmptyCard();
      return;
    }

    listStory.forEach((item, idx) => {
      recordCard.innerHTML += this._templateCard(idx, listStory[idx]);
    });
  },

  _populateDetailStoryToModal(storyRecord) {
    if (!(typeof storyRecord === 'object')) {
      throw new Error(`Parameter storyRecord should be an object. The value is ${storyRecord}`);
    }

    const imgDetailRecord = document.querySelector('#recordDetailModal #imgDetailRecord');
    const nameDetailRecord = document.querySelector('#recordDetailModal #nameDetailRecord');
    const dateDetailRecord = document.querySelector('#recordDetailModal #dateDetailRecord');
    const descriptionDetailRecord = document.querySelector(
      '#recordDetailModal #descriptionDetailRecord',
    );

    imgDetailRecord.setAttribute('src', storyRecord.photoUrl);
    imgDetailRecord.setAttribute('alt', storyRecord.name);
    nameDetailRecord.textContent = storyRecord.name;
    dateDetailRecord.textContent = formatDate(storyRecord.createdAt);
    descriptionDetailRecord.textContent = storyRecord.description || '-';
  },

  _templateCard(index, storyRecord, photo_url = '') {
    return `
      <div class="col-12 col-md-6 mt-3">
        <div class="card">
          <div class="card__header m-2">
            <a class="" href="/user/profile.html?name=${storyRecord.name.replace(/\s/g, '')}">
              <h1 class="card__header-title">${storyRecord.name}</h4>
            </a>
          </div>
          <a href="#"
            data-bs-toggle="modal" data-bs-target="#recordDetailModal" 
            data-record-id="${storyRecord.id}">
            <div class="card__body">
              <img class="card__body-image w-100 h-50" src="${storyRecord.photoUrl}" alt="${
      storyRecord.name
    }-images">
              <p class="card__body-description m-2 text-start">${storyRecord.description.slice(
                0,
                100,
              )} ...</p>
              <p class="card__body-date m-2">${formatDate(storyRecord.createdAt)}</p>
            </div>
          </a>
        </div>
      </div>
    `;
  },

  _templateEmptyCard() {
    return `
      <div class="card__header">
        <p>No story</p>
      </div>
    `;
  },
};

export default Dashboard;
