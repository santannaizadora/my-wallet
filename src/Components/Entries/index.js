import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { toast } from 'react-toastify';
import { ThreeDots } from "react-loader-spinner";


export default function Entries() {
    const url = window.location.href;
    const urlArray = url.split('/');
    const transactionType = urlArray[urlArray.length - 1];
    console.log(transactionType);
    const [formData, setFormData] = useState([
        {
            amount: 0,
            description: ''
        }
    ]);

    console.log(formData)
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, formState: { errors }, handleSubmit } = useForm({
        criteriaMode: "all"
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    const navigate = useNavigate();
    const onSubmit = () => {
        setIsSubmitting(true);
        axios.post('https://my-wallet-api-iza.herokuapp.com/transactions', {
            ...formData,
            type: `${transactionType === 'entradas' ? 'deposit' : 'withdraw'}`
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setIsSubmitting(false);
                setFormData({
                    amount: 0,
                    description: '',
                    type: `${transactionType === 'entradas' ? 'deposit' : 'withdraw'}`
                });
                toast.success('Transação registrada com sucesso!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate('/home');
            }
            )
            .catch(err => {
                toast.error(err.response.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setIsSubmitting(false);
            }
            )
    }


    return (
        <Container>
            <h1>Nova {transactionType === 'entradas' ? 'entrada' : 'saída'}</h1>
            <Form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                <Input
                    {...register("amount", {
                        required: "O campo valor é obrigatório",
                        pattern: {
                            value: /^[0-9]+(\.[0-9]{1,2})?$/,
                            message: "Insira um valor válido"
                        }
                    })}
                    value={formData.amount}
                    type="number"
                    placeholder="Valor"
                    onChange={handleChange}
                    disabled={isSubmitting}
                    autoComplete='off'
                />
                <ErrorMessage
                    errors={errors}
                    name="amount"
                    render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                            <Error className='error-message' key={type}>{message}</Error>
                        ))
                    }
                />
                <Input
                    {...register("description", {
                        required: "O campo descrição é obrigatório",
                        minLength: {
                            value: 6,
                            message: "Insira uma descrição com pelo menos 6 caracteres"
                        }
                    })}
                    value={formData.description}
                    type="text"
                    placeholder="Descrição"
                    onChange={handleChange}
                    disabled={isSubmitting}
                    autoComplete='off'
                />
                <ErrorMessage
                    errors={errors}
                    name="description"
                    render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                            <Error className='error-message' key={type}>{message}</Error>
                        ))
                    }
                />
                <Button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ?
                        <ThreeDots color="#FFF" height={50} width={50} />
                        :
                        `Salvar ${transactionType === 'entradas' ? 'entrada' : 'saída'}`
                    }
                </Button>
            </Form>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    padding: 25px;

    h1 {
        font-size: 26px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 40px;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 326px;
    height: 46px;    
    background: #A328D6;
    border-radius: 4.63636px;
    border: none;
    color: #FFFFFF;
    font-size: 20.976px;
    opacity: ${props => !props.disabled ? 1 : 0.5};
`
const Input = styled.input`
    width: 326px;
    height: 58px;
    background:  ${props => !props.disabled ? '#FFFFFF' : '#F2F2F2'};
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 0 10px;
    margin-bottom: 15px;
    font-size: 19.976px;
`
const Error = styled.p`
    color: #FFF;
    font-size: 14px;
    padding-bottom: 10px;
`