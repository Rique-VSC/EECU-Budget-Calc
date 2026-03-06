// --- Step Pages ---
const stepPages = document.querySelectorAll(".progressBar button");
stepPages.forEach(btn => {
  btn.addEventListener("click", () => {
    stepPages.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    // Logic to show/hide sections based on step can be added here
    btn.dataset.section && document.querySelectorAll(".inputs > div").forEach(div => {
      div.style.display = div.id === btn.dataset.section ? "block" : "none";
    });
  });
});


// --- Creating input elements ---

// !!! Hard Code in the container for the inputs !!!
const createInputElement = (id, label) => {
  const input = document.createElement("input");
  input.type = "number";
  input.id = id;
  input.placeholder = label;
  input.addEventListener("change", () => {refreshChart()});
  return input;
};

// --- Chart.js setup ---
const canvas = document.getElementById("chartCanvas").getContext("2d");
const chartTypeSelect = document.getElementById("chartTypeSelect");
const monthselect = document.getElementById("monthSelect");
const budgetSelect = document.getElementById("budgetSelect");
const metricSelect = document.getElementById("metricSelect");
const renderBtn = document.getElementById("renderBtn");

// --- Setup ---
const housingData = createInputElement("housingData", "Housing").getRootNode;
const utilData = createInputElement("utilData", "Utilities");
const transportData = createInputElement("transportData", "Transport");
const entertainmentData = createInputElement("entertainmentData", "Entertainment");
const hobbiesData = createInputElement("hobbiesData", "Hobbies");
const splurgeData = createInputElement("splurgeData", "Splurge");
const emergencyData = createInputElement("emergencyData", "Emergency");
const retireData = createInputElement("retireData", "Retirement");
const vacationData = createInputElement("vacationData", "Vacation");

let currentChart = null;

// --- Fallback ---
function toNumber(el, fallback = 0) {
  if (!el.value) return fallback;
  const v = parseFloat(el.value.replace(/[^0-9.\-]/g, ''));
  return Number.isFinite(v) ? v : fallback;
}

// --- Chart ---
function buildChart() {
  const housing = toNumber(housingData, 1000);
  const util = toNumber(utilData, 1000);
  const transport = toNumber(transportData, 1000);
  const entertainment = toNumber(entertainmentData, 1000);
  const hobbies = toNumber(hobbiesData, 1000);
  const splurge = toNumber(splurgeData, 1000);
  const emergency = toNumber(emergencyData, 1000);
  const retire = toNumber(retireData, 1000);
  const vacation = toNumber(vacationData, 1000);

  console.log(housing);

  const labels = ["Housing","Utilities","Transport","Entertainment","Hobbies","Splurge","Emergency","Retirement","Vacation"];
  const data = [housing, util, transport, entertainment, hobbies, splurge, emergency, retire, vacation];

  return {
    type: "doughnut",
    data: {
      labels,
      datasets: [{
        label: "Pie Chart",
        data,
        backgroundColor: [
          "#8979ff","#ff928a","#3cc3df","#ffae4c","#537ff1","#6fd195","#8c63da","#2bb7dc","#1f94ff"
        ]
      }]
    },
    options: {
      plugins: {
        title:{display: true, text: "Current Budget"}
      }
    }
  };
}

// --- Initializer ---
function initChart() {
  if (typeof Chart === "undefined") {
    console.warn("Chart Not found")
    return null;
  }

  const cfg = buildChart();
  currentChart = new Chart(canvas, cfg);
  return currentChart;
}

// --- Update Chart ---
function refreshChart() {
  const cfg = buildChart();
  if (!currentChart) {
    currentChart = initChart();
    return;
  }

  currentChart.data.labels = cfg.data.labels;
  currentChart.data.datasets[0] = cfg.data.datasets[0];
  currentChart.options.plugins = cfg.options.plugins;
  currentChart.update();
}

// --- Run Chart ---
initChart();
// setInterval(refreshChart, 2000);