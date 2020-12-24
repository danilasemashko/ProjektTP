import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import '../index.css'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            message(data.message)
            console.log(error.message)
        } catch (e) { }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
            message(data.message)
        } catch (e) { }
    }

    return (
        <div className="mainDiv">
            <div className="logo1"></div>
            <div className="mainBlock">
                <div className="content">
                    <div className="mainText">Войти в систему</div>
                    <div className="blockInput">
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Введите email"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="password">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Введите пароль"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="mainButtonIn">
                        <div className="mainButtonIn1"></div>
                        <button
                            id="mainButtonIn"
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Войти
                        </button>
                        <div className="mainButtonIn2"></div>
                    </div>
                    <button
                        id="mainButtonReg"
                        onClick={registerHandler}
                        disabled={loading}
                    >
                        Зарегестрироваться
                    </button>


                </div>

            </div>

        </div>
    )
}