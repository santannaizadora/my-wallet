import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('https://my-wallet-api-iza.herokuapp.com/transactions', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setTransactions(res.data.transactions);
                setBalance(res.data.balance);
            }
            )
            .catch(err => {
                console.log(err);
            }
            )
    }, []);

    console.log(transactions.transactions)

    return (
        <Container>
            <User>
                <h1>Olá, {localStorage.getItem('user')}</h1>
                <ion-icon 
                name="log-out-outline"
                onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/');
                }
                }
                ></ion-icon>
            </User>
            <TransactionsContainer>
                <Transactions>
                    {transactions.length > 0
                        ? transactions.map(transaction => {
                            return (
                                <Transaction key={transaction._id}>
                                    <div>
                                        <Day>{dayjs(transaction.createdAt).format("DD/MM")}</Day>
                                        <Description>{transaction.description}</Description>
                                    </div>
                                    <Amount type={transaction.type}>{transaction.amount}</Amount>
                                </Transaction>
                            )
                        })
                        :
                        <p>Não há registros de entrada ou saída</p>}
                </Transactions>
                <Balance>
                    <h2>SALDO</h2>
                    <BalanceValue value={balance}>{balance}</BalanceValue>
                </Balance>
            </TransactionsContainer>
            <Entries>
                <Link to="/entradas">
                <Entry>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <p>Nova entrada</p>
                </Entry>
                </Link>
                <Link to="/saidas">
                <Entry>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <p>Nova saída</p>
                </Entry>
                </Link>
            </Entries>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    color: #fff;
    padding: 25px;  
`;

const User = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    h1 {
        font-size: 26px;
        font-weight: bold;
    } 

    ion-icon {
        font-size: 26px;
        color: #fff;
    }
`;

const TransactionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin-top: 25px;
    align-self: center;
    width: 326px;
    height: 426px;
    padding: 20px 20px 10px 20px ;
`;

const Transactions = styled.div`
    display: flex;
    flex-direction: column;
    width: 326px;
    height: 436px;
    overflow-y: scroll;
    p {
        font-size: 20px;
        color: #868686;
        width: 180px;
        height: 46px;
        text-align: center;
        align-self: center;
        margin-right: 20px;
        margin-top: 170px;
    }
`;

const Transaction = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
    width: 286px;
    color: #000;

    div {
        display: flex;
    }
`;

const Day = styled.h3`
    font-size: 18px;
    color: #C6C6C6;
    padding-right: 10px;
`;

const Description = styled.h3`
    font-size: 18px;
    color: #000;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Amount = styled.h3`
    font-size: 18px;
    color: ${props => props.type === 'deposit' ? '#03AC00' : '#C70000'};
`;

const Balance = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 286px;
    font-size: 18px;
    color: #000;
    padding: 0 10px;
    padding-top: 10px;

    h2 {
        font-weight: bold;
    }
`;

const BalanceValue = styled.span`
    color:${props => props.value >= 0 ? '#03AC00' : '#C70000'};
`;

const Entries = styled.div`
    display: flex;
    align-self: center;
    margin-top: 25px;
    width: 326px;
    justify-content: space-between;
`;

const Entry = styled.div`
    width: 155px;
    height: 114px;
    background: #A328D6;
    border-radius: 5px;
    position: relative;

    ion-icon {
        color: #fff;
        font-size: 30px;
        margin-top: 10px;
        margin-left: 10px;
    }

    p {
        font-size: 17px;
        color: #fff;
        font-weight: bold;
        position: absolute;
        bottom: 10px;
        left: 12px;
        width: 64px;
    }
`;