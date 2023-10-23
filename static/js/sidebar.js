// Javascript code for the sidebar

// =================================================================================================
// =================================================================================================
// =================================================================================================

// VARIABLES AND CONSTANTS

// =================================================================================================
// =================================================================================================
// =================================================================================================

// Units
// 1. Meter Cube Per Year (m^3/yr) (Default Output)
// 2. Litres Per Day (L/d) (Default Input)
// 3. Litres Per Second (L/s) (Optional)

// Constants
const LITRES_PER_DAY_TO_CUBIC_METRES_PER_YEAR = 0.365;
// const LITRES_PER_DAY_TO_LITRES_PER_SECOND = 0.0000115741;

// Input Variables
let populationCount = 0;
let perCapitaWaterRequirement = 0;
let demandGrowthRate = 0;
let numberOfYears = 0;
let waterDemandForecastModel = "";

// Current Water Demand Variables
let currentWaterDemandMeterCubePerYear = 0;
let currentWaterDemandLitresPerDay = 0;
// let currentWaterDemandLitresPerSecond = 0;

// Final Output Variables
let finalComputedWaterDemandMeterCubePerYear = 0;
let finalComputedWaterDemandLitresPerDay = 0;
// let finalComputedWaterDemandLitresPerSecond = 0;

// =================================================================================================
// =================================================================================================
// =================================================================================================

// FUNCTIONS

// =================================================================================================
// =================================================================================================
// =================================================================================================

// Present Water Demand (in litres per day)
function calculateCurrentWaterDemandLitresPerDay(
  currentPopulationCount,
  currentPerCapitaWaterRequirement
) {
  // Calculate the current water demand in litres per day
  let currentWaterDemandLitresPerDay =
    currentPopulationCount * currentPerCapitaWaterRequirement;
  return currentWaterDemandLitresPerDay;
}

// // Present Water Demand (in litres per second)
// function calculateCurrentWaterDemandLitresPerSecond(
//   currentWaterDemandLitresPerDay
// ) {
//   // Calculate the current water demand in litres per second
//   let currentWaterDemandLitresPerSecond =
//     currentWaterDemandLitresPerDay * LITRES_PER_DAY_TO_LITRES_PER_SECOND;
//   return currentWaterDemandLitresPerSecond;
// }

// Present Water Demand (in cubic metres per year)
function calculateCurrentWaterDemandCubicMetresPerYear(
  currentWaterDemandLitresPerDay
) {
  // Calculate the current water demand in cubic metres per year
  let currentWaterDemandCubicMetresPerYear =
    currentWaterDemandLitresPerDay * LITRES_PER_DAY_TO_CUBIC_METRES_PER_YEAR;
  return currentWaterDemandCubicMetresPerYear;
}

// Forecast Water Demand
// 1. Linear Model
function calculateForecastWaterDemandLinear(
  currentWaterDemandCubicMetresPerYear,
  demandGrowthRate,
  numberOfYears
) {
  // Calculate the forecast water demand using the linear model
  // Qi+n = Qi (1 + Number of Years * Demand Growth Rate / 100)
  let forecastWaterDemandCubicMetresPerYear =
    currentWaterDemandCubicMetresPerYear *
    (1 + (numberOfYears * demandGrowthRate) / 100);
  return forecastWaterDemandCubicMetresPerYear;
}

// 2. Exponential Model
function calculateForecastWaterDemandExponential(
  currentWaterDemandCubicMetresPerYear,
  demandGrowthRate,
  numberOfYears
) {
  // Calculate the forecast water demand using the exponential model
  // Qi+n = Qi (1 + Demand Growth Rate / 100) ^ Number of Years
  let forecastWaterDemandCubicMetresPerYear =
    currentWaterDemandCubicMetresPerYear *
    Math.pow(1 + demandGrowthRate / 100, numberOfYears);
  return forecastWaterDemandCubicMetresPerYear;
}

// Function to format numbers with commas
function numberWithCommas(x) {
  let parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

// Function to Handle Submit Button Click
function handleSubmitButtonClick() {
  // Get all Inputs
  populationCount = document.getElementById("population-count").value;
  perCapitaWaterRequirement = document.getElementById(
    "per-capita-water-requirement"
  ).value;
  demandGrowthRate = document.getElementById("demand-growth-rate").value;
  numberOfYears = document.getElementById("number-of-years").value;
  forecastModel = document.getElementById("forecast-model-select").value;

  // Get Output Elements to Display Results
  const currentWaterDemandMeterCubePerYearOutput = document.getElementById(
    "current-water-demand-meter-cube-per-year"
  );
  const forecastedWaterDemandMeterCubePerYearOutput = document.getElementById(
    "forecasted-water-demand-meter-cube-per-year"
  );

  // Calculate Current Water Demand (in litres per day)
  currentWaterDemandLitresPerDay = calculateCurrentWaterDemandLitresPerDay(
    populationCount,
    perCapitaWaterRequirement
  );

  // // Calculate Current Water Demand (in litres per second)
  // currentWaterDemandLitresPerSecond = calculateCurrentWaterDemandLitresPerSecond(
  //   currentWaterDemandLitresPerDay
  // );

  // Calculate Current Water Demand (in cubic metres per year)
  currentWaterDemandMeterCubePerYear =
    calculateCurrentWaterDemandCubicMetresPerYear(
      currentWaterDemandLitresPerDay
    );

  // Calculate Forecast Water Demand
  if (forecastModel == "linear") {
    finalComputedWaterDemandMeterCubePerYear =
      calculateForecastWaterDemandLinear(
        currentWaterDemandMeterCubePerYear,
        demandGrowthRate,
        numberOfYears
      );
  } else if (forecastModel == "exponential") {
    finalComputedWaterDemandMeterCubePerYear =
      calculateForecastWaterDemandExponential(
        currentWaterDemandMeterCubePerYear,
        demandGrowthRate,
        numberOfYears
      );
  } else {
    alert("Please select a forecast model");
  }

  // Round to 4 decimal places
  currentWaterDemandMeterCubePerYear =
    Math.round(currentWaterDemandMeterCubePerYear * 10000) / 10000;
  finalComputedWaterDemandMeterCubePerYear =
    Math.round(finalComputedWaterDemandMeterCubePerYear * 10000) / 10000;

  // Display Results with unit appended and formatted with commas
  currentWaterDemandMeterCubePerYearOutput.innerHTML =
    numberWithCommas(currentWaterDemandMeterCubePerYear) +
    " m<sup>3</sup>/year";
  forecastedWaterDemandMeterCubePerYearOutput.innerHTML =
    numberWithCommas(finalComputedWaterDemandMeterCubePerYear) +
    " m<sup>3</sup>/year";
}

// =================================================================================================
// =================================================================================================
// =================================================================================================

// EVENT LISTENERS

// =================================================================================================
// =================================================================================================
// =================================================================================================

// Event Listener for Population Count Input
document.addEventListener("DOMContentLoaded", function () {
  // Grab the input element
  const inputElem = document.getElementById("population-count");

  // Attach a blur event listener
  inputElem.addEventListener("blur", function () {
    // If the value is less than the minimum, reset it to the minimum
    if (parseFloat(this.value) < parseFloat(this.min)) {
      this.value = this.min;
    }
  });
});

// Event listener for Per Capita Water Requirement Input
document.addEventListener("DOMContentLoaded", function () {
  // Grab the input element
  const inputElem = document.getElementById("per-capita-water-requirement");

  // Attach a blur event listener
  inputElem.addEventListener("blur", function () {
    // If the value is less than the minimum, reset it to the minimum
    if (parseFloat(this.value) < parseFloat(this.min)) {
      this.value = this.min;
    }
  });
});

// Event Listener for Deman Growth Rate Input
document.addEventListener("DOMContentLoaded", function () {
  // Grab the input element
  const inputElem = document.getElementById("demand-growth-rate");

  // Attach a blur event listener
  inputElem.addEventListener("blur", function () {
    // If the value is less than the minimum, reset it to the minimum
    if (parseFloat(this.value) < parseFloat(this.min)) {
      this.value = this.min;
    }
  });

  // Attach a blur event listener
  inputElem.addEventListener("blur", function () {
    // If the value is greater than the maximum, reset it to the maximum
    if (parseFloat(this.value) > parseFloat(this.max)) {
      this.value = this.max;
    }
  });
});

// Event Listener to create Toast Notification on Submit Button Click
// const container = document.querySelector('.alert-toast');
const button = document.querySelector('sl-button[variant="success"]');
const alert = document.querySelector('sl-alert[variant="success"]');

button.addEventListener("click", () => alert.toast());

// =================================================================================================
// =================================================================================================
// =================================================================================================

// MAIN CODE

// =================================================================================================
// =================================================================================================
// =================================================================================================

// Bind the Submit Button Click Event to the Function
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", handleSubmitButtonClick);
