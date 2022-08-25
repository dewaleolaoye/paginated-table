import { handleNextPage, showTableData } from './utils.js';

const BASE_URL = 'https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84';

// https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84

const startApp = async () => {
  const page = 1;

  // handleNextPage(2);

  try {
    const response = await fetch(`${BASE_URL}&page=${page}`);

    const data = await response.json();

    console.log(data.results, 'DATA');

    const objValues = Object.values(data.results[0])[0];

    showTableData(objValues);
  } catch (error) {
    console.log(error, 'error here from the app');
  }
};

document.addEventListener('DOMContentLoaded', startApp);
