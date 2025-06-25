const calc = new StatsCalc(100);

function updateCriticalHit(value) {
  var rate = calc.critRate(value);
  var bonus = calc.critBonus(value);
  var expdmg = (1 + rate*bonus)*100;

  // console.log(input);
  const block = document.querySelector('#critical-hit .convert');

  // block.className = "converted";
  block.innerHTML = ""; // Clear the block before appending new elements

  const span1 = document.createElement("span");
  span1.className = "converted";
  span1.innerHTML = expdmg.toFixed(4).padStart(6, ' ') + " %"
  block.appendChild(span1);

  const span2 = document.createElement("span");
  span2.className = "converted";
  span2.innerHTML = `${(rate*100).toFixed(1).padStart(6, ' ') + " %"}`;
  block.appendChild(span2);

  const span3 = document.createElement("span");
  span3.className = "converted";
  span3.innerHTML = `${(bonus*100).toFixed(1).padStart(6, ' ') + " %"}`;
  block.appendChild(span3);
}

function updateDirectHit(value) {
  var rate = calc.dhRate(value)*100;
  var expdmg = calc.dhExDmg(value)*100;

  const block = document.querySelector('#direct-hit .convert');

  // block.className = "converted";
  block.innerHTML = ""; // Clear the block before appending new elements

  const span1 = document.createElement("span");
  span1.className = "converted";
  span1.innerHTML = expdmg.toFixed(3).padStart(3, ' ') + " %";
  block.appendChild(span1);

  const span2 = document.createElement("span");
  span2.className = "converted";
  span2.innerHTML = rate.toFixed(3).padStart(3, ' ') + " %";
  block.appendChild(span2);

}

function updateDetermination(value) {
  var expdmg = calc.detExDmg(value)*100;

  const block = document.querySelector('#determination .convert');

  // block.className = "converted";
  block.innerHTML = ""; // Clear the block before appending new elements

  const span = document.createElement("span");
  span.className = "converted";
  span.innerHTML = expdmg.toFixed(1).padStart(6, ' ') + " %";
  block.appendChild(span);
}

function updateSkillSpeed(value) {
  var expdmg = calc.sksExDmg(value)*100;

  const block = document.querySelector('#skill-speed .convert');

  // block.className = "converted";
  block.innerHTML = ""; // Clear the block before appending new elements

  const span = document.createElement("span");
  span.className = "converted";
  span.innerHTML = expdmg.toFixed(1).padStart(6, ' ') + " %";
  block.appendChild(span);
}

document.addEventListener("DOMContentLoaded", function() {
  const input = document.querySelector("#critical-hit input[type='number']");
  updateCriticalHit(parseInt(input.value));

  const input2 = document.querySelector("#direct-hit input[type='number']");
  updateDirectHit(parseInt(input2.value));

  const input3 = document.querySelector("#determination input[type='number']");
  updateDetermination(parseInt(input3.value));

  const input4 = document.querySelector("#skill-speed input[type='number']");
  updateSkillSpeed(parseInt(input4.value));
})
