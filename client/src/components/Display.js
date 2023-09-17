import { useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Display = (props) => {

    const { transactions, setTransactions } = props;

    var total = 0;
    function findTotal() {
        for (var i = 0; i < transactions.length; i++) {
            total += transactions[i].amount;
        }
    }
    findTotal();

    useEffect(() => {
        axios.get("http://localhost:8000/api/money")
            .then((res) => {
                console.log(res.data);
                setTransactions(organizeTransaction(res.data));
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const deleteHandler = (transactionsId) => {
        axios.delete(`http://localhost:8000/api/money/${transactionsId}`)
            .then((res) => {
                console.log(res.data);
                let newList = transactions.filter((transaction, index) => transaction._id !== transactionsId);
                setTransactions(newList);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function organizeTransaction(list) {
        console.log(list[0].date);
        var orgList = []
        orgList.push(list[0])
        console.log(orgList)
        for (var i = 1; i < list.length; i++) {
            if (list[i].date > list[i - 1].date) {
                orgList.push(list[i])
            } else {
                orgList.unshift(list[i])
            }
        }
        console.log(orgList)
        return orgList;
    }

    return (
        <div className="App">
            <h1>Transactions</h1>
            <h3>Account Balance: ${total}</h3>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Date</td>
                            <td>Amount</td>
                            <td>Description</td>
                            <td>Type</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.date}</td>
                                <td>${transaction.amount}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.transaction}</td>
                                <td>
                                    <Link to={`/edit/${transaction._id}`}>Edit</Link>
                                    <button onClick={() => deleteHandler(transaction._id)}>Delete</button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Display;