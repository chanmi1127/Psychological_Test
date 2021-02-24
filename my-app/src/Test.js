import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Test() {
    const [data, setData] = useState([]);

    async function fetchTest() {
        var apiUrl  = 'https://www.career.go.kr/inspct/openapi/test/questions?apikey=8b75f809812e0d513b4789912f3513cd&q=6';
        const response = await axios.get(apiUrl);
        console.log(response.data.RESULT);
        setData(response.data.RESULT);
    }

    useEffect(() => {
        fetchTest();
    }, []);

    const questions = data.map((data) => (
        <li key={data.qitemNo}>
            {data.question} <br/>
            <input type="radio" name={data.qitemNo} value={data.answerScore01} />
            {data.answer01} 
            &nbsp;
            <input type="radio" name={data.qitemNo} value={data.answerScore02} />
            {data.answer02}
        </li>)
    );

    return (
        <div>
            <h2>검사 진행</h2>
            <div>
                {questions}
            </div>
            <button>이전</button>
            <button>다음</button>
            <Link to='/testfinished'>
                <button>제출</button>
            </Link> 
        </div>
    );
}

export default Test;