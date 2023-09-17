import { useState } from "react";
import axios from 'axios';

const Form = (props) => {

    const { transactions, setTransactions } = props;
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState();
    const [description, setDescription] = useState("");
    const [transaction, setTransaction] = useState("");
    const [errors, setErrors] = useState([]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (transaction === "Withdraw") {
            axios.post(`http://localhost:8000/api/money`,
                {
                    date,
                    amount: -amount,
                    description,
                    transaction
                })
                .then((res) => {
                    console.log(res.data);
                    setTransactions([...transactions, res.data]);
                    setDate("");
                    setAmount("");
                    setDescription("");
                    setTransaction("");
                })
                .catch((err) => {
                    console.log(err);
                    const errorResponse = err.response.data.errors;
                    const errorArr = [];
                    for (const key of Object.keys(errorResponse)) {
                        errorArr.push(errorResponse[key].message)
                    }
                    setErrors(errorArr);
                })
        } else {
            axios.post(`http://localhost:8000/api/money`,
                {
                    date,
                    amount,
                    description,
                    transaction
                })
                .then((res) => {
                    console.log(res.data);
                    setTransactions([...transactions, res.data]);
                    setDate("");
                    setAmount("");
                    setDescription("");
                    setTransaction("");
                })
                .catch((err) => {
                    console.log(err);
                    const errorResponse = err.response.data.errors;
                    const errorArr = [];
                    for (const key of Object.keys(errorResponse)) {
                        errorArr.push(errorResponse[key].message)
                    }
                    setErrors(errorArr);
                })
        }
    }

    return (
        <div>
            <h1 className="App">Add Transaction</h1>
            <form onSubmit={submitHandler} className="form">
                <div>
                    <label>Date</label>
                    <input
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        type="date"></input>
                </div>
                <div>
                    <label>Amount $</label>
                    <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"></input>
                </div>
                <div>
                    <label>Description</label>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"></input>
                </div>
                <div>
                    <label htmlFor="transaction">Type</label>
                    <select id="transaction" name="transaction" onChange={(e) => setTransaction(e.target.value)}>
                        <option value=""></option>
                        <option value="Deposit">Deposit</option>
                        <option value="Withdraw">Withdraw</option>
                    </select>
                </div>
                <div>
                    <input type="submit" value="Add Transaction" />
                </div>
                <div class="validation">{errors.map((err, index) => (
                    <p key={index}>{err}</p>
                ))}
                </div>
            </form>
        </div>
    )
}

export default Form;