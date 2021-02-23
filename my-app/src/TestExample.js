import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TestExample() {
    const [question, setQuestion] = useState('');
    const [answer01, setAnswer01] = useState('');
    const [answer02, setAnswer02] = useState('');

    async function fetchExample() {
        var apiUrl  = 'https://www.career.go.kr/inspct/openapi/test/questions?apikey=8b75f809812e0d513b4789912f3513cd&q=6';
        const response = await axios.get(apiUrl);
        setQuestion(response.data.RESULT[1].question);
        setAnswer01(response.data.RESULT[1].answer01);
        setAnswer02(response.data.RESULT[1].answer02);
    }

    useEffect(() => {
        fetchExample();
    }, []);

    return (
        <div>
            <h1>직업가치관 검사</h1>
            <h2>검사 예시</h2>
            <div>
                <div>
                    <h3>직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.</h3>
                    {question}<br />
                    <input type="radio" name="testanswer01"/>{answer01}
                    <input type="radio" name="testanswer02"/>{answer02}
                </div>
                <Link to='/'>
                    <button>이전</button>
                </Link>
                <button>검사 시작</button>
            </div>
        </div>
    );
}


export default TestExample;