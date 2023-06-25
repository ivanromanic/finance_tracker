import styled from "styled-components"
import OverviewComponent from "./OverviewComponent";
import TransactionComponent from "./TransactionComponent";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0 10px
  font-family: Montserrat;
  width: 360 px;
`;

const HomeComponent = (props) => {
    const [transactions, updateTransaction] = useState([]);
    const [expense, updateExpense] = useState(0);
    const [income, updateIncome] = useState(0);

    const addTransaction = (payload) => {
        const transactionArray = [...transactions];
        transactionArray.push(payload);
        updateTransaction(transactionArray);
      };
    
      const deleteTransaction = (transactionId) => {
        const updatedTransactions = transactions.filter(transaction => transaction.id !== transactionId);
        updateTransaction(updatedTransactions);
      };
          

    const CalculateBalance = () => {
        let exp = 0;
        let inc = 0;
        transactions.map((payload) => {
            payload.type === "EXPENSE"
        ? (exp = exp + payload.amount)
        : (inc = inc + payload.amount);
        });
        updateExpense(exp);
        updateIncome(inc);
    }

    useEffect(() => CalculateBalance(), [transactions]);


    return(
        <Container>
            HomeComponent
            <OverviewComponent addTransaction={addTransaction} expense={expense} income={income}/>
            <TransactionComponent  transactions={transactions} onDeleteTransaction={deleteTransaction}/>
        </Container>
    );
};
export default HomeComponent