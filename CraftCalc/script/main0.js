const need_materials = [];

function UpdateNeeds() {
  let print = [];
  const table = document.querySelector('#roles table');
  if (!table) return;

  // const rows = table.querySelectorAll('tbody tr');
  // rows.forEach((row, rowIndex) => {
  //   const cells = row.querySelectorAll('td input[type="number"]');
  //   cells.forEach((input, colIndex) => {
  //     print.push(`row: ${rowIndex}, col: ${colIndex}, value: ${input.value}`)
  //     // console.log(`row: ${rowIndex}, col: ${colIndex}, value: ${input.value}`);
  //   });
  // });
  // console.log(print);

  craft_DB;

  for (let r = 0; r < rows; r++) {
    const cells = row.querySelectorAll('td input[type="number"]');

    // armors
    for (let c = 0; c < 5; c++) {
      // craft_DB에서 jcategory == r, slot == c 인 항목을 가져오기
      const item = craft_DB.find(entry => entry.jcategory === r && entry.slot === c);
      if (item) {
        // 필요한 로직을 여기에 추가
        // 예: print.push(item);
        const amount = Number(cells[c].value);
        if (amount > 0) {
          const existing = need_materials.find(mat => mat.id === item.id);
          if (existing) {
            existing.amount += amount;
          } else {
            need_materials.push({ id: item.id, amount });
          }
        }
      }
    }

    // accs
    for (let c = 5; c < cells.length; c++) {

    }
  }

}


// This script will be executed after the HTML is fully loaded
document.addEventListener("DOMContentLoaded", function () {

  RoleTable();

});

// Custom event dispatcher for input value changes
document.addEventListener('input', function (e) {
  if (e.target && e.target.tagName === 'INPUT' && e.target.type === 'number') {
    const customEvent = new CustomEvent('roleInputChanged', {
      detail: {
        input: e.target,
        previousValue: e.target.previousValue,
        value: e.target.value,
      }
    });

    const td = e.target.closest('td');
    const tr = e.target.closest('tr');
    let row = Array.from(tr.parentNode.children).indexOf(tr);
    let col = Array.from(tr.children).indexOf(td) - 1; // -1 because first cell is <th>
    // // let input = customEvent.detail.input;
    // customEvent.detail.row = row;
    // customEvent.detail.col = col;
    // document.dispatchEvent(customEvent);
    let value = customEvent.detail.value;
    let storage_name = `needs_${row}_${col}`;
    localStorage.setItem(storage_name, value);

    UpdateNeeds();
  }
});

// Example usage: Listen for the custom event elsewhere
// document.addEventListener('roleInputChanged', function(e) {
//   console.log('Input changed:', e.detail.input, 'New value:', e.detail.value);
// });