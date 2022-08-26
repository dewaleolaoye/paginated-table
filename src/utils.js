let currentPage = 1;
export const BASE_URL = `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84`;

const tbody = document.getElementById('tbody');
const loader = document.getElementById('loader');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.previous');

let clickCount = 0;

let paginatedData = [];

const isEven = (num) => {
  return num % 2 === 0;
};

const isOdd = (num) => {
  return num % 2 !== 0;
};

const loaderStatus = (display) => {
  loader.style.display = display;
};

export const showTableData = async (currPage, clickCounter) => {
  let tdata = '';
  const page = `&page=${currPage}`;

  if (isEven(clickCounter)) {
    loaderStatus('block');
    await getData(BASE_URL + page);
  }

  const sliceRange = isEven(clickCounter) ? '0, 5' : '5, 10';

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
  clickCount++;
  showTableData(currentPage, clickCount);
}

function handlePreviousPage() {
  if (currentPage > 1) {
    currentPage -= 1;
    clickCount -= 1;

    showTableData(currentPage, clickCount);
  }
}

showTableData(currentPage, clickCount);

nextBtn.addEventListener('click', handleNextPage);
prevBtn.addEventListener('click', handlePreviousPage);
