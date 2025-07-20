let ingredients = [];

// craft_DB에서 jcategory == r, slot == c 인 항목을 가져오기
function AddToList(jcategory, slot, needs) {
  // const item = craft_DB.find(entry => entry.jcategory === rowIndex && entry.slot === colIndex);
  const item = craft_DB.find(entry => entry.jcategory === jcategory && entry.slot === slot);
  if (item) {
    item.materials.forEach(mat => {
      // console.log(get);
      const existing = ingredients.find(query => query.material === mat.material);
      if (existing) {
        existing.amount += (mat.amount * needs);
      } else {
        let amount = mat.amount * needs;
        ingredients.push({ material: mat.material, amount: amount });
      }
    });
  }
}

function SumRecipes() {
  ingredients = [];

  const table = document.querySelector('#roles table');
  if (!table) return;

  const rows = table.querySelectorAll('tbody tr');
  rows.forEach((row, rowIndex) => {
    const cells = row.querySelectorAll('td input[type="number"]');
    cells.forEach((input, colIndex) => {
      // print.push(`row: ${rowIndex}, col: ${colIndex}, value: ${input.value}`)
      // console.log(`row: ${rowIndex}, col: ${colIndex}, value: ${input.value}`);
      // AddToList(row, colIndex);
      let needs = input.value;
      if (!isNaN(needs) && Number(needs) > 0) {
        if (!(colIndex < 5 || colIndex > 8)) {
          rowIndex = 12;
        }
        AddToList(rowIndex, colIndex, Number(needs));
      }
      else {
      }
    });
  });

  ingredients.sort((a, b) => (a.material - b.material));
  // console.log(ingredients);
  // for (let r = 0; r < rows; r++) {
  //   const cells = row.querySelectorAll('td input[type="number"]');
  //   // armors
  //   for (let c = 0; c < 5; c++) {}
  //   // accs
  //   for (let c = 5; c < cells.length; c++) {}
  // }
}
function UpdateNeeds() {
  SumRecipes();

  // const table = document.querySelector('#material table');
}

function AddMaterial(row, materials, pidx, need, idx = '') {
  // 이름
  const tName = document.createElement('td');
  tName.textContent = materials[idx].material;
  tName.className = 'name';
  row.appendChild(tName);

  // 필요
  const tNeed = document.createElement('td');
  let needs = materials[idx].amount * need;
  tNeed.textContent = `${needs}`;
  row.appendChild(tNeed);

  // 보유
  const tStock = document.createElement('td');
  // You can fill td with data if needed
  const fill = document.createElement('input');
  fill.type = 'number';
  // fill.name = `${GEAR_TYPES[i]} ${SLOT_NAMES[j]}`;
  fill.name = `stock_${pidx}_${idx}`;
  fill.min = 0;
  fill.placeholder = 0;

  let value = localStorage.getItem(fill.name);
  if (isNaN(value) || value === null) { }
  else {
    fill.value = Number(value);
  }
  tStock.appendChild(fill);
  row.appendChild(tStock);

  // 부족
  const tShort = document.createElement('td');
  // let shortage = Math.max(0, needs - fill.value);
  let shortage = needs - fill.value;
  tShort.textContent = shortage;
  row.appendChild(tShort);
}

function MaterialTable() {
  const parent = document.getElementById('materials');
  // const parent = document.querySelector('div.materials');
  parent.textContent = "";

  const table = document.createElement('table');
  // table.className = 'materials';

  if (ingredients.length != 0) {
    // Create thead
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');

    // headRow.appendChild(document.createElement('th')); // Empty corner cell
    let header_unit = ['재료', '필요', '소지', '부족'];
    let headers = ['제작', ...header_unit, ...header_unit];
    for (let i = 0; i < headers.length; i++) {
      const th = document.createElement('th');
      if (i == 1 || i == headers.length -4) th.className = 'name';
      th.textContent = headers[i];
      headRow.appendChild(th);
    }
    thead.appendChild(headRow);
    table.appendChild(thead);

    // Create tbody
    const tbody = document.createElement('tbody');
    for (let i = 0; i < ingredients.length; i++) {
      // if (ingredients[i].material < 20)
      //   break;
      let convert = material_DB[ingredients[i].material];
      let rowspan = convert.materials.length;

      const row = document.createElement('tr');

      const th = document.createElement('th');
      th.textContent = CJOBS[convert.crafter];
      th.rowSpan = rowspan;
      row.appendChild(th);

      // let sub_mats = convert.material.length;

      const tName = document.createElement('td');
      tName.className = 'name';
      tName.textContent = convert.name;
      tName.rowSpan = rowspan;
      row.appendChild(tName);

      const tNeed = document.createElement('td');
      tNeed.textContent = ingredients[i].amount;
      tNeed.rowSpan = rowspan;
      row.appendChild(tNeed);

      const tStock = document.createElement('td');
      tStock.rowSpan = rowspan;
      // You can fill td with data if needed
      const fill = document.createElement('input');
      fill.type = 'number';
      // fill.name = `${GEAR_TYPES[i]} ${SLOT_NAMES[j]}`;
      fill.name = `stock_${ingredients[i].material}`;
      fill.min = 0;
      fill.placeholder = 0;

      let value = localStorage.getItem(fill.name);
      if (isNaN(value) || value === null) { }
      else {
        fill.value = Number(value);
      }
      tStock.appendChild(fill);
      row.appendChild(tStock);

      const tShort = document.createElement('td');
      // let shortage = Math.max(0, ingredients[i].amount - fill.value);
      let shortage = ingredients[i].amount - fill.value;
      tShort.textContent = shortage;
      tShort.rowSpan = rowspan;
      row.appendChild(tShort);

      if (convert.materials.length) {
        AddMaterial(row, convert.materials, ingredients[i].material, shortage, 0);
        tbody.appendChild(row);
      }

      for (let y = 1; y < convert.materials.length; y++) {
        const row2 = document.createElement('tr');
        AddMaterial(row2, convert.materials, ingredients[i].material, shortage, y);
        tbody.appendChild(row2);
      }
    }
    table.appendChild(tbody);
  }

  parent.appendChild(table);
}

// This script will be executed after the HTML is fully loaded
document.addEventListener("DOMContentLoaded", function () {

  RoleTable();

  UpdateNeeds();

  MaterialTable();
});

// Custom event dispatcher for input value changes
document.addEventListener('input', function (e) {
  if (e.target && e.target.tagName === 'INPUT' && e.target.type === 'number') {
    const customEvent = new CustomEvent('roleInputChanged', {
      detail: {
        input: e.target,
        // previousValue: e.target.previousValue,
        value: e.target.value,
        name: e.target.name,
      }
    });

    const section = e.target.closest('table').className;
    let value = 0;
    let storage_name = '';
    if (section === 'role-table') {
      const td = e.target.closest('td');
      const tr = e.target.closest('tr');
      let row = Array.from(tr.parentNode.children).indexOf(tr);
      let col = Array.from(tr.children).indexOf(td) - 1; // -1 because first cell is <th>
      // // let input = customEvent.detail.input;
      // customEvent.detail.row = row;
      // customEvent.detail.col = col;
      // document.dispatchEvent(customEvent);
      value = customEvent.detail.value;
      storage_name = `needs_${row}_${col}`;
      // localStorage.setItem(storage_name, value);
    }
    else {
      value = customEvent.detail.value;
      storage_name = e.target.name;
      // localStorage.setItem(storage_name, value);
    }

    // Check if value is a valid, finite, positive number // (!isNaN(value) && isFinite(value) && Number(value) > 0)
    if (!isNaN(value) && Number(value) > 0) {
      localStorage.setItem(storage_name, value);
    }
    else {
      e.target.value = null; // removeAttribute('value');
      localStorage.removeItem(storage_name);
    }

    UpdateNeeds();
    MaterialTable();
  }
});

// Example usage: Listen for the custom event elsewhere
// document.addEventListener('roleInputChanged', function(e) {
//   console.log('Input changed:', e.detail.input, 'New value:', e.detail.value);
// });

// const toggleBtn = document.getElementById('toggle-inputs');
// const inputsDiv = document.getElementById('inputs');
// let folded = false;
// toggleBtn.onclick = function () {
//   folded = !folded;
//   if (folded) {
//     inputsDiv.style.marginLeft = '-220px';
//     inputsDiv.style.opacity = '0.2';
//     toggleBtn.innerHTML = '&#9654;';
//   } else {
//     inputsDiv.style.marginLeft = '0';
//     inputsDiv.style.opacity = '1';
//     toggleBtn.innerHTML = '&#9776;';
//   }
// };
// // Optional: set width for smooth folding
// inputsDiv.style.width = '200px';
// inputsDiv.style.overflow = 'hidden';
// inputsDiv.style.display = 'inline-block';
