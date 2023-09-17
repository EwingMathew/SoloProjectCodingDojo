import { useState } from "react";
import Display from "../components/Display";
import Form from "../components/Form";


const Main = (props) => {

    const [transactions, setTransactions] = useState([]);

    return (
        <div className="App">
            <h1>Money Manager</h1>
            <Form transactions={transactions} setTransactions={setTransactions} />
            <Display transactions={transactions} setTransactions={setTransactions} />
        </div>
    )
}

export default Main;