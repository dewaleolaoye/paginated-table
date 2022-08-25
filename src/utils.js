export const showTableData = (data) => {
  console.log(data, 'RESPONSE');

  let tdata = '';

  data.forEach(
    ({ id, row, gender, age }) =>
      (tdata += `
    <tr data-entryid=${id}>
      <td>${row}</td>
      <td>${gender}</td>
      <td>${age}</td>
    </tr>
    `)
  );

  document.getElementById('tbody').innerHTML = tdata;
};

export const handleNextPage = (page) => {
  console.log(page, 'number');

  const btn = document.querySelector('next');

  btn.addEventListener('click', () => console.log('clicked next'));
};

export const handlePreviousPage = (page) => {
  console.log(page, 'number');

  const btn = document.querySelector('previous');

  btn.addEventListener('click', () => console.log('clicked previous'));
};
