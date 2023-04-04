import styled from 'styled-components'

export const Container = styled.div`
    min-height: 150px;
    display: flex;
    width: 400px;
    justify-content: space-between;
    flex-direction: column;
    background-color: ${({bg})=> bg? bg+"80" : '#CCFF0005'};
    margin-bottom: 10px;
    border: 1px solid #000000;
    border-radius: 7px;

`