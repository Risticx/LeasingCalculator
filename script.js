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
    document.getElementById('carValueSlider').value = value; // Update slider value
    updateLeasingDetails();
}

function updateCarValueInput(value) {
    const slider = document.getElementById('carValueSlider');
    slider.value = validateCarValue(value);
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
    if (!value || isNaN(value)) return carValueMin; // Handle invalid input
    value = parseFloat(value);
    if (value < carValueMin) return carValueMin;
    if (value > carValueMax) return carValueMax;
    return value;
}

function validateAndSetCarValue(input) {
    const value = validateCarValue(input.value);
    input.value = value;
    document.getElementById('carValueSlider').value = value;
    updateLeasingDetails();
}

function validateDownPayment(value) {
    value = Math.round(value / 5) * 5; 
    if (value < downPaymentMin) return downPaymentMin;
    if (value > downPaymentMax) return downPaymentMax;
    return value;
}

function updateLeasingDetails() {
    const carValueElement = document.getElementById('carValue');
    const carValue = parseFloat(carValueElement.value);
    const errorMessage = document.getElementById('errorMessage');
    
    if (carValue < carValueMin || carValue > carValueMax || !carValueElement.value) {
        errorMessage.style.display = 'block';
        clearResults();
        document.getElementById('carValueSlider').value = carValueMin; // Reset slider to minimum value
        return;
    } else {
        errorMessage.style.display = 'none';
    }

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

function clearResults() {
    document.getElementById('totalLeasingCost').textContent = '';
    document.getElementById('downPaymentAmount').textContent = '';
    document.getElementById('monthlyInstallment').textContent = '';
    document.getElementById('interestRate').textContent = '';
}

document.addEventListener('DOMContentLoaded', () => {
    updateLeasingDetails();
});
