let currentPage = 1;
const BASE_URL = `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84`;

const tbody = document.querySelector('.tbody');
const loader = document.getElementById('loader');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.previous');
const pagePreview = document.querySelector('.page-preview');
const errText = document.querySelector('.error');

let paginatedData = [];
let prevUrl = '';
let sliceRange = [];

let a = 0;
let b = 5;

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

    prevUrl = data.results[0].paging?.previous;

    paginatedData = [...arr, ...arr2];
  } catch (error) {
    loaderStatus('none');

    errText.textContent = 'Something went wrong';
  }
};

export const showTableData = async (currPage = 1, action = '') => {
  let tdata = '';
  const page = `&page=${currPage}`;

  if (!isEven(currentPage) && action !== 'prev') {
    loaderStatus('block');
    await getData(BASE_URL + page);
  }

  if (action === 'prev' && isEven(currPage)) {
    loaderStatus('block');
    await getData(prevUrl);
  }

  sliceRange = !isEven(currentPage) ? '0, 5' : '5, 10';

  a = sliceRange.split(',')[0];
  b = sliceRange.split(',')[1];

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

    showTableData(currentPage, 'prev', prevUrl);

    pagePreview.textContent = `Showing Page ${currentPage}`;
  }
}

pagePreview.textContent = `Showing Page ${currentPage}`;
nextBtn.addEventListener('click', handleNextPage);
prevBtn.addEventListener('click', handlePreviousPage);
