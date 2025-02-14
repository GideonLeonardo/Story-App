import CheckUserAuth from '../auth/check-user-auth';
import Transaction from '../network/transaction';

const Edit = {
  async init() {
    CheckUserAuth.checkLoginState();

    const transactionId = this._getTransactionId();
    if (!transactionId) {
      alert('Data dengan id yang dicari tidak ditemukan');
      return;
    }
    try {
      const response = await Transactions.getById(transactionId);
      const responseRecords = response.data.results;
      this._populateTransactionToForm(responseRecords);
    } catch (error) {
      console.error(error);
    }

    await this._initialUI();
    await this._initialData();
    this._initialListener();
  },
};

export default Edit;
