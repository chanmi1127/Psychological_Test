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
    const [date, SetDate] = useState('');
    const [firstHighestScoreNum, setFirstHighestScoreNum] = useState('');
    const [secondHighestScoreNum, setSecondHighestScoreNum] = useState('');
    const relatedJobsApi = `https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${firstHighestScoreNum}&no2=${secondHighestScoreNum}`;
    const [relatedJobsData, setRelatedJobsData] = useState([]);

    const handleResult = useCallback(async () => {
        const response = await axios.get(testResultApi);
        console.log(response);

        setName(response.data.user.name);
        setGender(response.data.user.grade === '100323' ? '남성' : '여성');
        SetDate(response.data.inspct.registDt.split('T')[0]);

        const wonScores = response.data.result.wonScore.split(' ');
        wonScores.pop();

        const newWonScores = wonScores.map((wonScore) =>
            wonScore[2]
        );

        setScores(newWonScores);

        const WonScoresItems = [
            { num: 1, value: newWonScores[0] },
            { num: 2, value: newWonScores[1] },
            { num: 3, value: newWonScores[2] },
            { num: 4, value: newWonScores[3] },
            { num: 5, value: newWonScores[4] },
            { num: 6, value: newWonScores[5] },
            { num: 7, value: newWonScores[6] }
        ];

        const sortedWonScoresItems = WonScoresItems.sort(function (a, b) {
            return a.value - b.value
        });


        const FirstHighestNum = sortedWonScoresItems[6].num;
        const SecondHighestNum = sortedWonScoresItems[5].num;


        setFirstHighestScoreNum(FirstHighestNum);
        setSecondHighestScoreNum(SecondHighestNum);


    }, [testResultApi]);


    const handleRelatedJobs = useCallback(async () => {
        const response = await axios.get(relatedJobsApi);
        setRelatedJobsData(response.data);
        console.log(relatedJobsData);

    }, [relatedJobsApi, relatedJobsData]);

    useEffect(() => {
        handleResult();
        handleRelatedJobs();
    }, [handleResult, handleRelatedJobs]);

    const styleTitle = {
        width: "auto",
        fontSize: "2.5rem",
        textAlign: "center",
        fontWeight: "400",
        padding: "1em"
    };

    const styleSubTitle = {
        width: "auto",
        fontSize: "2rem",
        textAlign: "center",
        fontWeight: "400",
        padding: "0 1em"
    };

    const styleContent = {
        width: "auto",
        fontSize: "1.5rem",
        textAlign: "center",
        fontWeight: "360",
        padding: "1em 2em"
    };

    const styleDiv = {
        display: "flex",
        justifyContent: "center"
    };

    const styleTable = {
        fontSize: "1.5rem",
        textAlign: "center",
        fontWeight: "400",
        border: "2px solid black",
        borderCollapse: "collapse",
        overFlow: "hidden"
    };

    const styleTdTh = {
        border: "2px solid black",
        padding: "10px 20px"
    };


    return (
        <div>
            <div style={styleTitle}>직업가치관 검사 결과표</div>
            <div style={styleContent}>직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과 신념입니다. 따라서 여러분의 직업생활과 관련하여 포기하지 않는 무게중심의 역할을 한다고 볼 수 있습니다. 직업가치관검사는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려줍니다. 또한 본인이 가장 중요하게 생각하는 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.</div>
            <div style={styleDiv}>
                <table style={styleTable}>
                    <thead>
                        <tr>
                            <th style={styleTdTh}>이름</th>
                            <th style={styleTdTh}>성별</th>
                            <th style={styleTdTh}>검사일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={styleTdTh}>{name}</td>
                            <td style={styleTdTh}>{gender}</td>
                            <td style={styleTdTh}>{date}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <div style={styleTitle}>1. 직업가치관 검사 결과 </div>
                <div style={styleSubTitle}>직업가치관 검사 결과 그래프</div>
                <div style={styleDiv}>
                    <Chart
                        width={'600px'}
                        height={'400px'}
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
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>
            </div>
            <div>
                <div style={styleTitle}>2. 가치관과 관련이 높은 직업</div>
                <div style={styleSubTitle}>종사자 평균 학력별</div>
                <div style={styleDiv}>
                    <table style={styleTable}>
                        <thead>
                            <tr>
                                <th style={styleTdTh}>분야</th>
                                <th style={styleTdTh}>직업</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={styleTdTh}>고등학교 졸업</td>
                                <td style={styleTdTh}>
                                    업데이트 예정
                                </td>
                            </tr>
                            <tr>
                                <td style={styleTdTh}>대학교 졸업</td>
                                <td style={styleTdTh}>
                                    업데이트 예정
                                </td>
                            </tr>
                            <tr>
                                <td style={styleTdTh}>대학원 졸업</td>
                                <td style={styleTdTh}>
                                    업데이트 예정
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TestResult;