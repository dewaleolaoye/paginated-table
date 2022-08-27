let currentPage = 1;
const BASE_URL = `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84`;

const tbody = document.querySelector('.tbody');
const loader = document.getElementById('loader');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.previous');
const pagePreview = document.querySelector('.page-preview');

let paginatedData = [];

const isEven = (num) => {
  return num % 2 === 0;
};

const loaderStatus = (display) => {
  loader.style.display = display;
};

export const getData = async (url) => {
  try {
    const response = await fetch(url);

    if (response) {
      loaderStatus('none');
    }

    const data = await response.json();
    const arr = Object.values(data.results[0])[0];
    const arr2 = Object.values(data.results[0])[1];

    paginatedData = [...arr, ...arr2];
  } catch (error) {
    loaderStatus('none');
    console.log(error, 'error here from the app');
  }
};

export const showTableData = async (currPage = 1, action = '') => {
  let tdata = '';
  const page = `&page=${currPage}`;

  if (!isEven(currentPage) && action !== 'prev') {
    console.log('ODD VALUE HERE');
    loaderStatus('block');
    await getData(BASE_URL + page);
  }

  const sliceRange = !isEven(currentPage) ? '0, 5' : '5, 10';

  const a = sliceRange.split(',')[0];
  const b = sliceRange.split(',')[1];

  paginatedData.slice(a, b).forEach(
    ({ id, row, gender, age }) =>
      (tdata += `
      <tr data-entryid=${id}>
        <td>${row}</td>
        <td>${gender}</td>
        <td>${age}</td>
      </tr>
      `)
  );

  tbody.innerHTML = tdata;
};

function handleNextPage() {
  currentPage++;

  showTableData(currentPage);
  pagePreview.textContent = `Showing Page ${currentPage}`;
}

function handlePreviousPage() {
  if (currentPage > 1) {
    currentPage -= 1;
    console.log(currentPage, 'PREVIOUS CURRENT PAGE');

    showTableData(currentPage, 'prev');
    pagePreview.textContent = `Showing Page ${currentPage}`;
  }
}

pagePreview.textContent = `Showing Page ${currentPage}`;
nextBtn.addEventListener('click', handleNextPage);
prevBtn.addEventListener('click', handlePreviousPage);
