import { useEffect, useState } from "react";
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 22px;
  font-size: 18px;
  width: 100%;
  gap: 10px;
  font-weight: bold;
  & > input{
    padding: 10px 12px;
    border-radius: 12px;
    background: #e6e8e9;
    border: 1px solid #e6e8e9;
    outline: none;
    width: 100%;
  }
`;

const Cell = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 2px;
  align-items: center;
  font-weight: normal;
  width: 100%;
  justify-content: space-between;
  border: 1px solid #e6e8e9;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;

const DeleteButton = styled.button`
  background-color: #f44336; /* Red background */
  color: white; /* White text */
  padding: 10px 20px; /* Some padding */
  border: none; /* No border */
  cursor: pointer; /* Add a mouse pointer on hover */
  border-radius: 5px; /* Rounded corners */
  margin-left: 10px; /* Some margin to the left */

  &:hover {
    background-color: #d32f2f; /* Add a darker red background on hover */
  }
`;

const TransactionCell = ({ payload, onDelete }) => {
    return(
      <Cell isExpense={payload?.type === "EXPENSE"}>
        <span>{payload.desc}</span>
        <span>${payload.amount}</span>
        <DeleteButton onClick={() => onDelete(payload.id)}>Delete</DeleteButton>
      </Cell>
    )
  };
  
  const TransactionComponent = ({ transactions, onDeleteTransaction }) => {
    const [searchText, updateSearchText] = useState("");
    const [filteredTransaction, updateTxn] = useState(transactions);
  
    const filterData = () => {
      if (!searchText?.trim().length) {
        updateTxn(transactions);
        return;
      }
      const txn = transactions.filter((payload) => payload.desc?.toLowerCase().includes(searchText.toLowerCase().trim()));
      updateTxn(txn);
    };
  
    useEffect(() => {
      filterData();
    }, [transactions, searchText]);
  
    return (
      <Container>
        Transactions
        <input placeholder="search" value={searchText} onChange={(e) => updateSearchText(e.target.value)} />
        {filteredTransaction?.length ? filteredTransaction.map((payload) => <TransactionCell payload={payload} onDelete={onDeleteTransaction} /> ) : ""}
      </Container>
    )
  }
  
  export default TransactionComponent