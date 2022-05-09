import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import RegisterForm from './RegisterForm';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Container>
            <LogoText>MyWallet</LogoText>
            <RegisterForm
                formData={formData}
                setFormData={setFormData}
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
            />
            <Login>
                <Link to="/">
                    Já tem uma conta? Faça login!
                </Link>
            </Login>
        </Container>
    );
}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

const LogoText = styled.p`
    font-family: 'Saira Stencil One', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 68.982px;
    line-height: 86px;
    text-align: center;
    color: #FFFFFF;
    font-size: 32px;
`
const Login = styled.p`
    padding-top: 30px;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 17px;
    text-align: center;
    
    a{
        color: #FFFFFF;
        text-decoration: none;
    }
`