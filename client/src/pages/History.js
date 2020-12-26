import React, { useState } from 'react';
import axios from 'axios'
import '../create.css'

export const History = () => {
    const [history, setHistory] = useState();


    const funk = async () => {
        const userId = JSON.parse(localStorage.getItem("userData")).userId;
        const response = await axios.get(`/api/user/${userId}`);
        const user = response.data;

        setHistory(user.receipt)
    }
    funk()



    return (
        <><h1>Hello</h1>
            <div className="historyMain">

                {history?.length && history.map(item => {
                    return (
                        <div className="historyDiv">
                            <p>Время: {item.time}</p>
                            <p>Из какой валюты: {item.currencyFromWhich}</p>
                            <p>Значени из какой вылюты: {item.valueFromWhich}</p>
                            <p>В какую валюту: {item.currencyInWhich}</p>
                            <p>Значени в какую валюту: {item.valueInWhich}</p>
                            <p>Имеил: {item.email}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}