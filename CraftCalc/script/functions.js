const GEAR_TYPES = [
  { name:'수호자', bgcolor:'gray'},
  {},
  { name:'학살자', bgcolor:'gray'},
  { name:'타격대', bgcolor:'gray'},
  { name:'정찰대', bgcolor:'gray'},
  { name:'유격대', bgcolor:'gray'},
  { name:'마술사', bgcolor:'gray'},
  {},
  { name:'치유사', bgcolor:'gray'}
];
const ACC_TYPES = [
  GEAR_TYPES[0],
  '공격대',
  GEAR_TYPES[4],
  GEAR_TYPES[5],
  GEAR_TYPES[6]
];
const SLOT_NAMES = [ '머리', '몸통', '손', '다리', '발', '귀', '목', '팔', '반지' ];

function updateValue(name) {
  if (!isNaN(value) && Number(value) > 0) {
    localStorage.setItem(name, value);
  } else {
    e.target.value = null;
    localStorage.removeItem(name);
  }

  UpdateNeeds();
  MaterialTable();
}

function valueChange(e) {
  const value = e.target.value;
  if (!isNaN(value) && Number(value) > 0) {
    localStorage.setItem(e.target.name, value);
  } else {
    e.target.value = null;
    localStorage.removeItem(e.target.name);
  }

  UpdateNeeds();
  MaterialTable();
};

function createInput(name) {
  const obj = document.createElement('input');
  obj.type = 'number';
  obj.min = 0;
  obj.placeholder = 0;

  obj.name = name;
  let value = localStorage.getItem(obj.name);
  // if (isNaN(value) || value === null) { }
  if(value){
    obj.value = Number(value);
  }
  obj.onchange = valueChange;
  obj.addEventListener('clear', valueChange);
  // function (e) {
  //   const value = e.target.value;
  //   if (!isNaN(value) && Number(value) > 0) {
  //     localStorage.setItem(e.target.name, value);
  //   } else {
  //     e.target.value = null;
  //     localStorage.removeItem(e.target.name);
  //   }

  //   UpdateNeeds();
  //   MaterialTable();
  // };

  return obj;
}

function RoleTable() {
  const div_roles = document.getElementById('roles');

  const table = document.createElement('table');
  table.className = 'role-table';

  // Create thead
  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  headRow.appendChild(document.createElement('th')); // Empty corner cell

  for (let i = 0; i < SLOT_NAMES.length; i++) {
    const th = document.createElement('th');
    th.textContent = SLOT_NAMES[i];
    headRow.appendChild(th);
  }
  const th = document.createElement('th');
  th.textContent = '삭제';
  headRow.appendChild(th);
  thead.appendChild(headRow);
  table.appendChild(thead);

  // Create tbody
  const tbody = document.createElement('tbody');
  for (let i = 0; i < GEAR_TYPES.length; i++) {
    const row = document.createElement('tr');
    if (GEAR_TYPES[i].name) {
      const th = document.createElement('th');
      th.textContent = GEAR_TYPES[i].name;
      row.appendChild(th);

      for (let j = 0; j < SLOT_NAMES.length; j++) {
        const td = document.createElement('td');
        if ((i == 3 || i == 5) && (j > 4)) continue;
        else if ((i == 2 || i == 4) && (j > 4)) {
          td.rowSpan = 2;
        }
        // You can fill td with data if needed
        const reserve = createInput(`needs_${i}_${j}`);
        td.appendChild(reserve);
        row.appendChild(td);
      }
      const td = document.createElement('td');
      // td.className = 'clear row';
      const span = document.createElement('span');
      span.className = 'clear';
      const entity = '&times;';
      span.innerHTML = entity;
      // span.textContent = 'x';
      td.appendChild(span);
      td.onclick = function (e) {
        const tr = e.target.closest('tr');
        const inputs = tr.getElementsByTagName('input');
        Array.from(inputs).forEach(element => {
          element.value = null;
          const event = new Event("clear");
          element.dispatchEvent(event);
        });
      }
      row.appendChild(td);

      row.setAttribute('jcategory', i);
      // row.style.backgroundColor = GEAR_TYPES[i].bgcolor;
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);

  div_roles.appendChild(table);
}
