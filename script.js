const state = { // this will represent all the values from the html
    balance: 100,
    income: 400,
    expense: 100,
    transactions: [ // when ever we have a list or multiple items we use Array
        /* { id: uniqueId(),name: 'salary', amount: 1000, type: 'income' },
        { id: uniqueId(), name: 'Buy Grocery', amount: 50, type: 'expense' },
        { id: uniqueId(), name: 'Buy Guitar', amount: 500, type: 'expense' } */
    ]
}
let balanceEl = document.querySelector('#balance');
let incomeEl = document.querySelector('#income');
let expenseEl = document.querySelector('#expense');
let transactionsEl = document.querySelector('#transaction');
let incomeBtnEl = document.querySelector('#incomeBtn');
let expenseBtnEl = document.querySelector('#expenseBtn')
let nameInputEl = document.querySelector('#name')
let amountInputEl = document.querySelector('#amount')

/* function init() {
  balanceEl.innerHTML = `€${state.balance}`
  incomeEl.innerHTML = `€${state.income}`
  expenseEl.innerHTML = `€${state.expense}`

// Next we have to loop through the transaction array
let transactionEl, 


  for (let i = 0; i < state.transactions.length; i++){
      transactionEl = document.createElement("li");// this is to create the list elements i commented in index file.
      transactionsEl.append(state.transactions[i].name) // when i = 1 you will get the first element inside the state transaction object.

      transactionsEl.appendChild(transactionEl)

      //containerEl = document.createElement('div');
      /* amountEl = document.createElement('span')
      if (item.type === 'income') {
            amountEl.classList.add('income-amt');
        } else if (item.type === 'expense') {
            amountEl.classList.add('expense-amt');
        }
        amountEl.innerHTML = `$${item.amount}`;

        containerEl.appendChild(amountEl);

        btnEl = document.createElement('button');
        btnEl.innerHTML = 'X';

        containerEl.appendChild(btnEl);

        transactionEl.appendChild(containerEl); 
    }
     

}
init()
 */


function init() {
    /* let localState = JSON.parse( localStorage.getItem ('expenseTrackerState')) 

    if (localState !== null){
        state = localState
    } */
    updateState()
    initListeners();
    //render();

}


function uniqueId() {
    return Math.round(Math.random()* 1000000);
}

function initListeners() {
    incomeBtnEl.addEventListener('click', onAddIncomeClick);
    expenseBtnEl.addEventListener('click', onAddExpenseClick);
}
function onAddIncomeClick() {
    addTransaction(nameInputEl.value, amountInputEl.value, 'income');
}

function addTransaction(name, amount , type){
    // let name = nameInputEl.value;
    // let amount = amountInputEl.value;
    if (name !== '' && amount !== '') {
        let transaction = {
            id: uniqueId(),
            name: name,
            amount: parseInt(amount),
             type: type
        }

        state.transactions.push(transaction);
        updateState()

    } else {
        alert('Please enter valid data')
    }

    nameInputEl.value = ''
    amountInputEl.value = ''
}

function onAddExpenseClick() {
    addTransaction(nameInputEl.value, amountInputEl.value, 'expense');

}

function onDeleteClick(event) {
      let id = parseInt(event.target.getAttribute('data-id')) 
      let deleteIndex

      for (let i = 0; i < state.transactions.length; i++){
           if (state.transactions[i].id === id) {
               deleteIndex = i;
               break;
           }
      }

      state.transactions.splice(deleteIndex, 1);

      updateState() 
}


function updateState() {
    let balance = 0;
    let income = 0;
    let expense = 0;
    let item;
    for (let i = 0; i < state.transactions.length; i++) {
        item = state.transactions[i];

        if (item.type === 'income') {
            income += item.amount;
        } else if (item.type === 'expense') {
            expense += item.amount
        }
    }

    balance = income - expense

    state.balance = balance;
    state.income = income;
    state.expense = expense;

   // localStorage.setItem('expenseTrackerState',JSON.stringify(state)) // this JASON.stringify converts an object to string

    render()

}

function render() {
    balanceEl.innerHTML = `€${state.balance}`;
    incomeEl.innerHTML = `€${state.income}`;
    expenseEl.innerHTML = `€${state.expense}`;

    // let transactionEl = document.createElement('li');

    let transactionEl;
    let containerEl;
    let amountEl;
    let itemEl;
    let btnEl;

    transactionsEl.innerHTML = ''

    for (let i = 0; i < state.transactions.length; i++) {
        item = state.transactions[i];
        transactionEl = document.createElement('li');
        transactionEl.append(state.transactions[i].name)

        transactionsEl.appendChild(transactionEl);

        containerEl = document.createElement('div');

        amountEl = document.createElement('span');

        if (item.type === 'income') {
            amountEl.classList.add('income-amt');
        } else if (item.type === 'expense') {
            amountEl.classList.add('expense-amt');
        }
        amountEl.innerHTML = `€${item.amount}`

        containerEl.appendChild(amountEl);

        btnEl = document.createElement('button');
        btnEl.setAttribute('data-id', item.id);
        btnEl.innerHTML = 'x'

        btnEl.addEventListener('click', onDeleteClick);

        containerEl.appendChild(btnEl)


        transactionEl.appendChild(containerEl);


    }

}


init();