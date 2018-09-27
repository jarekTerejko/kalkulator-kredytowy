// submit form listener
document.querySelector('#loan-form').addEventListener('submit', e => {

	// hide results - necessary if calculation is made more than once
	document.querySelector('#results').style.display = 'none';

	// show loader
	loader.style.display = 'block';

	// after 2s call calculateResults function
	setTimeout(calculateResults, 2000);

	e.preventDefault();
});

// variables
const clearBtn = document.querySelector('#clear-btn');
const card = document.querySelector('.card');

const loader = document.createElement('div');
loader.classList.add('loader');
card.appendChild(loader);
loader.style.display = 'none';

const amount = document.querySelector('#amount');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');

// calculateResults function
const calculateResults = () => {

	// variables
	const monthlyPayment = document.querySelector('#monthly-payment');
	const totalPayment = document.querySelector('#total-payment');
	const totalInterest = document.querySelector('#total-interest');

	const principalAmount = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value) / 100 / 12;
	const calculatedPayments = parseFloat(years.value) * 12;

	// monthly payment
	const x = Math.pow(1 + calculatedInterest, calculatedPayments);
	const monthly = (principalAmount * x * calculatedInterest) / (x - 1);

	if (isFinite(monthly)) {
		
		console.log('calculating...');

		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatedPayments).toFixed(2);
		totalInterest.value = ((monthly * calculatedPayments) - principalAmount).toFixed(2);

		// hide loader
		loader.style.display = 'none';

		// show results
		document.querySelector('#results').style.display = 'block';

	} else {

		// call showError
		showError('Sprawdź czy wrowadzono wszystkie wymagane dane!');

	}

}

let errorState = true;

const changeErrorState = () => {
	if (errorState === true) {
		errorState = false;
	} else {
		errorState = true;
	}
}

// showError function
const showError = error => {

	// hide results
	document.querySelector('#results').style.display = 'none';

	// hide loader
	loader.style.display = 'none';

	// create error element (div)
	const errorElement = document.createElement('div');

	// add alert class to div;
	errorElement.className = 'alert alert-danger';

	// put text into created div
	errorElement.textContent = error;
	
	//	prevent appending more than one errorElement
	if (errorState) {
		
		card.appendChild(errorElement);
		errorState = false;
		
		// remove error element after specified time
		setTimeout(removeError, 5000);
		setTimeout(changeErrorState, 5000);
	}

}

// removeError function
const removeError = () => {
	document.querySelector('.alert').remove();
}

// clearInputs function
const clearInputs = e => {
	
	console.log('clearing...');

	e.preventDefault();
	amount.value = '';
	interest.value = '';
	years.value = '';

	document.querySelector('#results').style.display = 'none';

}

clearBtn.addEventListener('click', clearInputs);
