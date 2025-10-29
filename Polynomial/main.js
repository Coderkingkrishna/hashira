// ---------- Helpers ----------
function baseToDecimal(value, base) {
  return parseInt(value, base);
}

function lagrangeAtX(points, x) {
  let sum = 0;
  const k = points.length;
  for (let i = 0; i < k; i++) {
    let term = points[i].y;
    for (let j = 0; j < k; j++) {
      if (i !== j) {
        term *= (x - points[j].x) / (points[i].x - points[j].x);
      }
    }
    sum += term;
  }
  return sum;
}

// ---------- MAIN ----------
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("input.json", "utf8"));

const n = data.keys.n;
const k = data.keys.k;

let points = [];
for (let key in data) {
  if (key === "keys") continue;
  const base = parseInt(data[key].base);
  const val = data[key].value;
  const y = baseToDecimal(val, base);
  points.push({ x: parseInt(key), y });
}

points.sort((a, b) => a.x - b.x);

const subset = points.slice(0, k);
const constantTerm = lagrangeAtX(subset, 0);

console.log("Constant term (c):", Math.round(constantTerm));
