const interestRates = {
    brandNew: 0.0299,
    used: 0.037
};
const carValueMin = 10000;
const carValueMax = 200000;
const downPaymentMin = 10;
const downPaymentMax = 50;

function updateCarValue(value) {
    value = validateCarValue(value);
    document.getElementById('carValue').value = value;
    updateLeasingDetails();
}

function updateCarValueInput(value) {
    value = validateCarValue(value);
    const slider = document.getElementById('carValueSlider');
    slider.value = value;
    document.getElementById('carValue').value = value;
    updateLeasingDetails();
}

function updateDownPayment(value) {
    value = validateDownPayment(value);
    document.getElementById('downPayment').value = value;
    updateLeasingDetails();
}

function updateDownPaymentInput(value) {
    value = validateDownPayment(value);
    const slider = document.getElementById('downPaymentSlider');
    slider.value = value;
    document.getElementById('downPayment').value = value;
    updateLeasingDetails();
}

function validateCarValue(value) {
    if (value < carValueMin) return carValueMin;
    if (value > carValueMax) return carValueMax;
    return value;
}

function validateDownPayment(value) {
    value = Math.round(value / 5) * 5;
    if (value < downPaymentMin) return downPaymentMin;
    if (value > downPaymentMax) return downPaymentMax;
    return value;
}

function updateLeasingDetails() {
    const carValue = parseFloat(document.getElementById('carValue').value);
    const downPaymentPercentage = parseFloat(document.getElementById('downPayment').value);
    const leasePeriod = parseInt(document.getElementById('leasePeriod').value);
    const carType = document.getElementById('carType').value;
    const interestRate = interestRates[carType];

    const downPaymentAmount = (carValue * downPaymentPercentage) / 100;
    const financedAmount = carValue - downPaymentAmount;

    const monthlyInterestRate = interestRate / 12;
    const numberOfPayments = leasePeriod;

    const monthlyInstallment = financedAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    const totalLeasingCost = downPaymentAmount + (monthlyInstallment * numberOfPayments);

    document.getElementById('totalLeasingCost').textContent = `Total Leasing Cost: €${totalLeasingCost.toFixed(2)}`;
    document.getElementById('downPaymentAmount').textContent = `Down Payment: €${downPaymentAmount.toFixed(2)}`;
    document.getElementById('monthlyInstallment').textContent = `Monthly Installment: €${monthlyInstallment.toFixed(2)}`;
    document.getElementById('interestRate').textContent = `Interest Rate: ${(interestRate * 100).toFixed(2)}%`;
}

updateLeasingDetails();
