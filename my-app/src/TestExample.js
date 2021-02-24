import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TestExample() {
    const [sampleQuestion, setSampleQuestion] = useState('');
    const [sampleAnswer01, setSampleAnswer01] = useState('');
    const [sampleAnswer02, setSampleAnswer02] = useState('');

    async function fetchExample() {
        var apiUrl  = 'https://www.career.go.kr/inspct/openapi/test/questions?apikey=8b75f809812e0d513b4789912f3513cd&q=6';
        const response = await axios.get(apiUrl);
        setSampleQuestion(response.data.RESULT[1].question);
        setSampleAnswer01(response.data.RESULT[1].answer01);
        setSampleAnswer02(response.data.RESULT[1].answer02);
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
                    {sampleQuestion}<br />
                    <input type="radio" name="sampleAnswer"/>{sampleAnswer01}
                    <input type="radio" name="sampleAnswer"/>{sampleAnswer02}
                </div>
                <Link to='/'>
                    <button>이전</button>
                </Link>
                <Link to='/test'>
                    <button>검사 시작</button>
                </Link>
            </div>
        </div>
    );
}


export default TestExample;