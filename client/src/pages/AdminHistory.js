import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const AdminHistory = () => {
    const [a, setA] = useState()

    const getAllUser = async () => {
        const response = await axios.get('/api/user/getAllUsers');
        const result = [];
        response.data.forEach(item => {
            if (item.receipt.length) {
                // console.log(item.receipt);
                item.receipt.forEach(item => {
                    result.push(item)
                })
            }
        });
        console.log(result);
        setA(result)
    }

    useEffect(() => {
        getAllUser()
    }, [])

    return (
        <>
            <h1>Hello</h1>
            <div className="historyMain">
                {a?.length && a.map(item => {
                    return (
                        <div className="historyDiv">
                            <p>Время: {item.time}</p>
                            <p>Из какой валюты: {item.currencyFromWhich}</p>
                            <p>Значение из какой вылюты: {item.valueFromWhich}</p>
                            <p>В какую валюту: {item.currencyInWhich}</p>
                            <p>Значение в какую валюту: {item.valueInWhich}</p>
                            <p>Имеил: {item.email}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}