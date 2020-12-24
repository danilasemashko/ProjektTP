
import '../create.css'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import React, { useContext, useEffect, useState } from 'react'



export const CreatePage = () => {


    const history = useHistory()
    const auth = useContext(AuthContext);
    const [time, setTime] = useState(new Date().toLocaleString());
    let [isCourseChaned, SetIsCourseChaned] = useState(false);
    const [a, setA] = useState([
        { curs: "usdBuy", value: (2.7 + Math.random() * (2.9 - 2.7)).toFixed(2) },
        { curs: "eurBuy", value: (3.05 + Math.random() * (3.2 - 3.05)).toFixed(2) },
        { curs: "rubBuy", value: (2.95 + Math.random() * (3.05 - 2.95)).toFixed(2) },
        { curs: "plnBuy", value: (14.5 + Math.random() * (15.5 - 14.5)).toFixed(2) },
    ])
    const [b, setB] = useState([
        { curs: "usdSell", value: (a[0].value * 1.02).toFixed(2) },
        { curs: "eurSell", value: (a[1].value * 1.02).toFixed(2) },
        { curs: "rubSell", value: (a[2].value * 1.02).toFixed(2) },
        { curs: "plnSell", value: (a[3].value * 1.02).toFixed(2) },
    ])
    const [buySelectValue, setBuySelectValue] = useState('USD');
    const [sellSelectValue, setSellSelectValue] = useState('USD')
    const [changeOn, setChangeOn] = useState(0)
    const [inpValue, setInpValue] = useState(0)

    function showBlock() {
        if (inpValue < 1000 && inpValue > 0 && changeOn != ('Невыполнимая операция')) {
            document.getElementsByClassName('receipt')[0].style.display = 'block'
        }
    }

    function hideBlock() {
        document.getElementsByClassName('receipt')[0].style.display = 'none'
    }


    function valChange() {
        let tempA = a;
        let tempB = b;
        let rand = Math.round(1 - 0.5 + Math.random() * 2);
        tempA.map(item => {
            if (rand === 1) {
                return item.value = (Number(item.value) + Number(0.01 + Math.random() * (0.05 - 0.01))).toFixed(2)
            } else {
                return item.value = (Number(item.value) - Number(0.01 + Math.random() * (0.05 - 0.01))).toFixed(2)
            }
        })
        for (let i = 0; i < tempA.length; i++) {
            tempB[i].value = (+tempA[i].value * 1.02).toFixed(2);
        }
        setA(tempA)
        setB(tempB)
        SetIsCourseChaned(isCourseChaned = !isCourseChaned);


    }

    useEffect(() => { }, [isCourseChaned]);

    const tick = () => {
        setTime(new Date().toLocaleString())
    }

    useEffect(() => {
        setInterval(() => tick(), 1000);
    }, [time])

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    const buyOnChangeHandler = (e) => {
        setBuySelectValue(e.target.value);
    }

    const sellOnChangeHandler = (e) => {
        setSellSelectValue(e.target.value);
    }

    const inputChangeHandler = (e) => {
        setInpValue(e.target.value);
        switch (buySelectValue) {
            case 'USD': {
                switch (sellSelectValue) {
                    case 'BYN': {
                        return setChangeOn((e.target.value * Number(a[0].value)).toFixed(2))
                    }
                    case 'USD': {
                        return setChangeOn('Невыполнимая операция')
                    }
                    case 'EUR': {
                        return setChangeOn((e.target.value * Number(a[0].value) / Number(a[1].value)).toFixed(2))
                    }
                    case 'PLN': {
                        return setChangeOn((e.target.value * Number(a[0].value) / Number(a[3].value) * 10).toFixed(2))
                    }
                    case 'RUB': {
                        return setChangeOn((e.target.value * Number(a[0].value) / Number(a[2].value) * 100).toFixed(2))
                    }
                }
            }
            case 'BYN': {
                switch (sellSelectValue) {
                    case 'BYN': {
                        return setChangeOn('Невыполнимая операция')
                    }
                    case 'USD': {
                        return setChangeOn((e.target.value / Number(a[0].value)).toFixed(2))
                    }
                    case 'EUR': {
                        return setChangeOn((e.target.value / Number(a[1].value)).toFixed(2))
                    }
                    case 'PLN': {
                        return setChangeOn((e.target.value / Number(a[3].value) * 10).toFixed(2))
                    }
                    case 'RUB': {
                        return setChangeOn((e.target.value / Number(a[2].value) * 100).toFixed(2))
                    }
                }
            }
            case 'EUR': {
                switch (sellSelectValue) {
                    case 'BYN': {
                        return setChangeOn((e.target.value * Number(a[1].value)).toFixed(2))
                    }
                    case 'USD': {
                        return setChangeOn((e.target.value * Number(a[1].value) / Number(a[0].value)).toFixed(2))
                    }
                    case 'EUR': {
                        return setChangeOn('Невыполнимая операция')
                    }
                    case 'PLN': {
                        return setChangeOn((e.target.value * Number(a[1].value) / Number(a[3].value) * 10).toFixed(2))
                    }
                    case 'RUB': {
                        return setChangeOn((e.target.value * Number(a[1].value) / Number(a[2].value) * 100).toFixed(2))
                    }
                }
            }
            case 'RUB': {
                switch (sellSelectValue) {
                    case 'BYN': {
                        return setChangeOn((e.target.value * Number(a[2].value) / 100).toFixed(2))
                    }
                    case 'USD': {
                        return setChangeOn((e.target.value * Number(a[2].value) / 100 / Number(a[0].value)).toFixed(2))
                    }
                    case 'EUR': {
                        return setChangeOn((e.target.value * Number(a[2].value) / 100 / Number(a[1].value)).toFixed(2))
                    }
                    case 'PLN': {
                        return setChangeOn((e.target.value * Number(a[2].value) / 100 / Number(a[3].value) * 10).toFixed(2))
                    }
                    case 'RUB': {
                        return setChangeOn('Невыполнимая операция')
                    }
                }

            }
            case 'PLN': {
                switch (sellSelectValue) {
                    case 'BYN': {
                        return setChangeOn((e.target.value * Number(a[3].value) / 10).toFixed(2))
                    }
                    case 'USD': {
                        return setChangeOn((e.target.value * Number(a[3].value) / 10 / Number(a[0].value)).toFixed(2))
                    }
                    case 'EUR': {
                        return setChangeOn((e.target.value * Number(a[3].value) / 10 / Number(a[1].value)).toFixed(2))
                    }
                    case 'PLN': {
                        return setChangeOn('Невыполнимая операция')
                    }
                    case 'RUB': {
                        return setChangeOn((e.target.value * Number(a[3].value) / 10 / Number(a[2].value) * 100).toFixed(2))
                    }
                }

            }
        }
    }

    return (
        <div className="mainDiv">

            <nav className="navBar">
                <div className="logo"></div>
                <div className="time">
                    <time className="time2">{time}</time>
                </div>

                <div className="logOut"><a href="/" onClick={logoutHandler} >Выйти</a></div>
            </nav>

            <div className="course">
                <div id="headerCourse"></div>
                <div className="mainCourse">

                    <div className="valuta">
                        <div className="valuta1">Валюта</div>
                        <div className="usd">
                            <div className="usdImage"></div>
                            <div className="usdText">USD</div>
                        </div>
                        <div className="eur">
                            <div className="eurImage"></div>
                            <div className="eurText">EUR</div>
                        </div>
                        <div className="rub">
                            <div className="rubImage"></div>
                            <div className="rubText">100 RUB</div>
                        </div>
                        <div className="pln">
                            <div className="plnImage"></div>
                            <div className="plnText">10 PLN</div>
                        </div>
                    </div>

                    <div className="buy">
                        <div className="buyText">Покупка</div>
                        {a.map(item => {
                            return (
                                <div className={item.curs}>{item.value}</div>
                            )
                        })}

                    </div>

                    <div className="sell">
                        <div className="sellText">Продажа</div>
                        {b.map(item => {
                            return (
                                <div className={item.curs}>{item.value}</div>
                            )
                        })}
                    </div>

                </div>
            </div>
            <button className="btn2" onClick={valChange}></button>
            <div className="instrukt"></div>
            <div className="history">
                <button id="butHistory">Просмотреть историю</button>
            </div>
            <div className="system">  </div>

            <div className="calc">
                <div className="calcText">Хочу обменять</div>
                <div className="calcInp">
                    <div className="inp1">
                        <input type="text" name="valuta1" placeholder="Введите сумму" className="inpVal1" onChange={inputChangeHandler} />
                        <select className="vibor" id="viborVal1" value={buySelectValue} onChange={buyOnChangeHandler}>
                            <option value="BYN">BYN</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="RUB">RUB</option>
                            <option value="PLN">PLN</option>
                        </select>
                    </div>
                    <div>НА</div>
                    <div className="inp2">
                        <div id="inpVal2">{changeOn}</div>
                        <select className="vibor2" id="viborVal2" value={sellSelectValue} onChange={sellOnChangeHandler}>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="RUB">RUB</option>
                            <option value="PLN">PLN</option>
                            <option value="BYN">BYN</option>
                        </select>
                    </div>
                </div>

                <div className="calcBut">
                    <button className="but1" onClick={showBlock} >Купить</button>
                    <button className="but2" onClick={showBlock}>Продать</button>
                </div>

            </div>
            <div className="receipt">
                <div className="receiptButton">
                    <button className="recBut" onClick={hideBlock}></button>
                </div>
                <div className="receiptInfo">
                    <div className="receiptOperation">Операция завершена</div>
                    <div className="receiptUser">Пользователь:</div>
                    <div className="receiptDate">Дата и время:{time}</div>
                    <div className="receiptValuta">Перевод:из {inpValue} {buySelectValue} в {changeOn} {sellSelectValue}</div>

                </div>

            </div>
        </div>
    )
}