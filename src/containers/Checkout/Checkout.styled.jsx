import styled from "styled-components";


export const CheckoutPageContainer = styled.div`
    padding: 50px 350px;
`;

export const CheckoutHeader = styled.h1`
    margin: 0;
    text-align: center;
    color: #474747;
    padding: 0 0 120px 0;
`;

export const FieldsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding: 10px 300px;
`;

export const FieldContainer = styled.div`
    padding: 10px 0;
`;

export const FieldText = styled.p`
    padding: 0 0 5px 10px;
    margin: 0;
    font-size: 16px;
    font-weight: 500;
`;

export const CheckoutButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 200px;
`;

export const BackButton = styled.a`
    text-decoration: none;
    border: 2px solid #474747;
    border-radius: 10px;
    padding: 10px 30px;
    color: black;
    cursor: pointer;
    transition: background-color 0.3s;
  
    &:hover {
        background-color: #dadada !important;
    }
  
    &:active {
        background-color: #464646 !important;
    }
`;

export const ContinueButton = styled.button`
    text-decoration: none;
    border: 2px solid #474747;
    border-radius: 10px;
    color: white;
    padding: 10px 30px;
    background-color: #474747;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    margin-left: 20px;

    &:hover {
        background-color: #5E6666 !important;
    }
  
    &:active {
        background-color: #7C8181 !important;
    }
`;

export const ErrorsContainer = styled.div`
    padding: 20px;
    margin-top: 80px;
    background-color: pink;
    border: 2px solid #ed7e9a;
    border-radius: 10px;
    display: flex;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    align-items: center;
`;

export const ErrorText = styled.p`
    color: #ed5c81;
    font-size: 16px;
    font-weight: 500;
`;

export const CloseButton = styled.button`
    text-decoration: none;
    border: 2px solid #ed7e9a;
    border-radius: 10px;
    color: #ed5c81;
    height: 40px;
    background-color: #f5b5c5;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    cursor: pointer;

    &:hover {
        background-color: #f5a6ba !important;
    }
  
    &:active {
        background-color: #ed7e9a !important;
    }
`;