import { useState } from 'react';
import './App.css';

function App() {
  let [balance, setBalance] = useState(5000);
  let [expense, setExpense] = useState(0);
  let [income, setIncome] = useState(0);
  let [amount, setAmount] = useState("");
  let [text, setText] = useState("");
  let [transactions, setTransactions] = useState([]);
  let [type, setType] = useState("expense"); // Default selection

  // Handle input changes
const handleChange = (e) => {
  const { name, value } = e.target;
  if (name === "amount") setAmount(value ? parseFloat(value) : ""); // Ensure valid number
  if (name === "text") setText(value);
};
  // Handle transaction type change
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  // Add Transaction
  const addTransaction = () => {
    if (!text || !amount) {
      alert("Please enter a valid description and amount.");
      return;
    }
  
    const newAmount = parseFloat(amount);
    if (type === "expense" && balance < newAmount) {
      alert("Not enough balance to add this expense!");
      return; // Prevents adding the expense if balance is insufficient
    }
  
    const newTransaction = { text, amount: newAmount, type };
    setTransactions([...transactions, newTransaction]);
  
    if (type === "expense") {
      setExpense((prev) => prev + newAmount);
      setBalance((prev) => prev - newAmount);
    } else {
      setIncome((prev) => prev + newAmount);
      setBalance((prev) => prev + newAmount);
    }
  
    setAmount("");
    setText("");
  };
  // Delete Transaction
  const handleDel = (index) => {
    const deletedTransaction = transactions[index];

    setTransactions(transactions.filter((_, i) => i !== index));

    if (deletedTransaction.type === "expense") {
      setExpense((prev) => prev - deletedTransaction.amount);
      setBalance((prev) => prev + deletedTransaction.amount);
    } else {
      setIncome((prev) => prev - deletedTransaction.amount);
      setBalance((prev) => prev - deletedTransaction.amount);
    }
  };

  return (
    <div className="main">
      <div className="main1">
        <h1 className="heading">Expense Tracker</h1>
        
        {/* Balance Section */}
        <div className="main2">
          <h1 className="bal">Balance: ${balance.toFixed(2)}</h1>
        </div>

        {/* Transaction Form */}
        <div className="main4">
          <input
            name="amount"
            value={amount}
            onChange={handleChange}
            className="input1"
            type="number"
            placeholder="Amount"
          />
        </div>
        <div className="main4">
          <input
            name="text"
            value={text}
            onChange={handleChange}
            className="input1"
            type="text"
            placeholder="Description"
          />
        </div>

        {/* Transaction Type Selection */}
        <div className="main5">
          <input
            type="radio"
            name="type"
            value="expense"
            checked={type === "expense"}
            onChange={handleTypeChange}
          />
          <p className="radio1">Expense</p>
          <input
            className="inp22"
            type="radio"
            name="type"
            value="income"
            checked={type === "income"}
            onChange={handleTypeChange}
          />
          <p className="radio12">Income</p>
        </div>

        {/* Add Transaction Button */}
        <div className="main6">
          <button className="AddTransition" onClick={addTransaction}>
            Add Transaction
          </button>
        </div>

        {/* Income & Expense Summary */}
        <div style={{ display: 'flex' }} className="main3">
          <div className="expense">
            <p className="p1">Expense</p>
            <h3 className="expenseh3">$ {expense.toFixed(2)}</h3>
          </div>
          <div className="income">
            <p className="p1">Income</p>
            <h3 className="incomeh3">$ {income.toFixed(2)}</h3>
          </div>
        </div>

        {/* Transaction List */}
        <div className="list">
          <h1 style={{ textAlign: 'center', fontSize: '18px', marginTop: '10px', color: 'rgb(46, 184, 46)' }}>
            Transactions
          </h1>
          <ul>
            {transactions.map((transaction, index) => (
              <li
                key={index}
                onClick={() => handleDel(index)}
                className="transaction-item"
                style={{
                  borderRight: transaction.type === "expense" ? "4px solid red" : "4px solid green",
                }}
              >
                <div className="transaction-details">
                  <p className="lip">{transaction.text}</p>
                  <p className={`libal ${transaction.type}`}>
                    $ {transaction.amount.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;