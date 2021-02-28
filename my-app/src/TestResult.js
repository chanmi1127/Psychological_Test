import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Chart } from "react-google-charts";

// ! 참고
// report 
// https://inspct.career.go.kr/inspct/api/psycho/report?seq=seq값
// majors
// https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=5&no2=4
// jobs
// https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=5&no2=4


function TestResult() {
    const { seq } = useParams();
    const testResultApi = 'https://inspct.career.go.kr/inspct/api/psycho/report?seq=' + seq;
    const [scores, setScores] = useState([]);
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');

    const handleResult = useCallback(async () => {
        const response = await axios.get(testResultApi);
        console.log(response);

        setName(response.data.user.name);
        setGender(response.data.user.gender);

        const wonScores = response.data.result.wonScore.split(' ');
        wonScores.pop();

        const newWonScores = wonScores.map((wonScore) =>
            wonScore[2]
        );

        console.log(newWonScores);

        setScores(newWonScores);
        

        let firstBiggestScore;
        let idxfirstBiggestScore;
        let SecondBiggestScore;
        let idxSecondBiggestScore;

        newWonScores.forEach((newWonScore, index) => {
            if (index === 0) {
                firstBiggestScore = newWonScore;
                idxfirstBiggestScore = index;
            }
            else if (newWonScore > firstBiggestScore) {
                SecondBiggestScore = firstBiggestScore;
                idxSecondBiggestScore = idxfirstBiggestScore;
                firstBiggestScore = newWonScore;
                idxfirstBiggestScore = index;
            }
            else if (SecondBiggestScore < newWonScore < firstBiggestScore) {
                SecondBiggestScore = newWonScore;
                idxSecondBiggestScore = index;

            }
            console.log(firstBiggestScore);
            console.log(idxfirstBiggestScore);
            console.log(SecondBiggestScore);
            console.log(idxSecondBiggestScore);
        });
    }, [testResultApi]);

    useEffect(() => {
        handleResult();
    }, [handleResult]);


    return (
        <div>
            <h2>직업가치관검사 결과표</h2>
            <p>직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과 신념입니다. 따라서 여러분의 직업생활과 관련하여 포기하지 않는 무게중심의 역할을 한다고 볼 수 있습니다. 직업가치관검사는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려줍니다. 또한 본인이 가장 중요하게 생각하는 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.</p>
            <table>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>성별</th>
                        <th>검사일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{name}</td>
                        <td>{gender}</td>
                        <td>date</td>
                    </tr>
                </tbody>
            </table>
            <div>
            <h2>직업가치관 검사 결과 그래프</h2>
            <Chart
                width={'800px'}
                height={'600px'}
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={[
                    ['직업가치관', '점수'],
                    ['능력발휘', scores[0]],
                    ['보수', scores[1]],
                    ['안정성', scores[2]],
                    ['사회적 인정', scores[3]],
                    ['사회봉사', scores[4]],
                    ['자기계발', scores[5]],
                    ['창의성', scores[6]],
                ]}
            />
            </div>
        </div>
    );
}

export default TestResult;