import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";


const Edit = (props) => {

    const [date, setDate] = useState("");
    const [amount, setAmount] = useState();
    const [description, setDescription] = useState("");
    const [transaction, setTransaction] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/money/${id}`)
            .then((res) => {
                console.log(res.data);
                setDate(res.data.date);
                setAmount(res.data.amount);
                setDescription(res.data.description);
                setTransaction(res.data.transaction);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        if (transaction === "Withdraw") {
            axios.put(`http://localhost:8000/api/money/${id}`,
                {
                    date,
                    amount: -amount,
                    description,
                    transaction
                })
                .then((res) => {
                    console.log(res.data);
                    navigate("/");
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
            axios.put(`http://localhost:8000/api/money/${id}`,
                {
                    date,
                    amount,
                    description,
                    transaction
                })
                .then((res) => {
                    console.log(res.data);
                    navigate("/");
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
        <div className="App">
            <h1>Money Manager</h1>
            <h1>Edit Transaction</h1>
            <form className="form" onSubmit={submitHandler}>
                {errors.map((err, index) => (
                    <p key={index}>{err}</p>
                ))}
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
                    <select id="transaction" name="transaction" onChange={(e) => setTransaction(e.target.value)} value={transaction}>
                        <option value=""></option>
                        <option value="Deposit">Deposit</option>
                        <option value="Withdraw">Withdraw</option>
                    </select>
                </div>
                <input type="submit" value="Edit Transaction" />
            </form>
            <Link to={`/`}>Back</Link>
        </div>
    )
}

export default Edit;