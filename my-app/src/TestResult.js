import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Chart } from "react-google-charts";
import Button from 'react-bootstrap/Button';


function TestResult() {
    const { seq } = useParams();
    const testResultApi = 'https://inspct.career.go.kr/inspct/api/psycho/report?seq=' + seq;
    const [scores, setScores] = useState([]);
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [date, SetDate] = useState('');
    const [firstHighestScoreNum, setFirstHighestScoreNum] = useState(null);
    const [secondHighestScoreNum, setSecondHighestScoreNum] = useState(null);
    const [firstLowestScoreNum, setFirstLowestScoreNum] = useState(null);
    const [secondLowestScoreNum, setSecondLowestScoreNum] = useState(null);
    const [resultChartData, setResultChartData] = useState();
    const jobValues = ['능력발휘', '자율성', '보수', '안정성', '사회적 인정', '사회봉사', '자기계발', '창의성'];
    const educationLevelNames = ['중졸 이하', '고졸', '전문대졸', '대졸', '대학원졸'];
    const majorNames = ['계열 무관', '인문', '사회', '교육', '공학', '자연', '의학', '예체능'];
    const [educationLevels, setEducationLevels] = useState(null);
    const [majors, setMajors] = useState(null);
    const jobsEducationLevelApi = useMemo(() => {
        return `https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${firstHighestScoreNum}&no2=${secondHighestScoreNum}`
    }, [firstHighestScoreNum, secondHighestScoreNum])
    const jobsMajorsApi = useMemo(() => {
        return `https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${firstHighestScoreNum}&no2=${secondHighestScoreNum}`
    }, [firstHighestScoreNum, secondHighestScoreNum])

    const fetchUserInfo = useCallback(async () => {
        const response = await axios.get(testResultApi);

        setName(response.data.user.name);
        setGender(response.data.user.grade === '100323' ? '남성' : '여성');
        SetDate(response.data.inspct.registDt.split('T')[0]);

    }, [testResultApi]);


    const fetchWonScores = useCallback(async () => {
        const response = await axios.get(testResultApi);

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

        const firstHighestNum = sortedWonScoresItems[6].num;
        const secondHighestNum = sortedWonScoresItems[5].num;
        const firstLowestNum = sortedWonScoresItems[0].num;
        const secondLowestNum = sortedWonScoresItems[1].num;

        setFirstHighestScoreNum(firstHighestNum);
        setSecondHighestScoreNum(secondHighestNum);
        setFirstLowestScoreNum(firstLowestNum);
        setSecondLowestScoreNum(secondLowestNum);

        const chartData = [
            ['직업가치관', '점수'],
            ['능력발휘', scores[0]],
            ['보수', scores[1]],
            ['안정성', scores[2]],
            ['사회적 인정', scores[3]],
            ['사회봉사', scores[4]],
            ['자기계발', scores[5]],
            ['창의성', scores[6]],
        ];

        setResultChartData(chartData);

    }, [testResultApi, scores]);


    const fetchJobsEducationLevel = useCallback(async () => {
        const response = await axios.get(jobsEducationLevelApi);
        console.log(response.data);
        setEducationLevels(response.data);
    }, [jobsEducationLevelApi]);

    const fetchJobsMajors = useCallback(async () => {
        const response = await axios.get(jobsMajorsApi);
        console.log(response.data);
        setMajors(response.data);
    }, [jobsMajorsApi]);


    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo]);


    useEffect(() => {
        fetchWonScores();
    }, [fetchWonScores]);


    useEffect(() => {
        fetchJobsEducationLevel();
    }, [fetchJobsEducationLevel]);

    useEffect(() => {
        fetchJobsMajors();
    }, [fetchJobsMajors]);

    const styleTitle = {
        width: "auto",
        fontSize: "2.5rem",
        textAlign: "center",
        fontWeight: "400",
        padding: "1em"
    };

    const styleMainTitle = {
        width: "auto",
        fontSize: "2rem",
        textAlign: "center",
        fontWeight: "400",
        padding: "1em"
    };

    const styleSubTitle = {
        width: "auto",
        fontSize: "1.75rem",
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
        justifyContent: "center",
        padding: "2em"
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
                <div style={styleMainTitle}>1. 직업가치관 검사 결과 </div>
                <div style={styleSubTitle}>직업가치관 검사 결과 그래프</div>
                <div style={styleContent}>
                    직업생활과 관련하여 {name}님은 {firstHighestScoreNum && jobValues[firstHighestScoreNum - 1]}과(와) {secondHighestScoreNum && jobValues[secondHighestScoreNum - 1]}을(를) 가장 중요하게 생각합니다.
                    반면에 {firstLowestScoreNum && jobValues[firstLowestScoreNum - 1]}, {secondLowestScoreNum && jobValues[secondLowestScoreNum - 1]}은(는) 상대적으로 덜 중요하게 생각합니다.
                </div>
                <div style={styleDiv}>
                    <Chart
                        width={'800px'}
                        height={'600px'}
                        chartType="Bar"
                        loader={<div>Loading Chart</div>}
                        data={resultChartData && resultChartData}
                    />
                </div>
            </div>
            <div>
                <div style={styleMainTitle}>2. 가치관과 관련이 높은 직업</div>
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
                            {educationLevelNames.map((educationLevel, educationIndex) => {
                                const jobsByEducationLevels = educationLevels &&
                                    educationLevels.filter((educationLevel) => {
                                        return educationLevel[2] === educationIndex + 1;
                                    });

                                return (
                                    <tr style={jobsByEducationLevels && jobsByEducationLevels.length < 1 ? { display: "none" } : {}}>
                                        <td style={styleTdTh}>
                                            {educationLevel}
                                        </td>
                                        <td style={styleTdTh}>
                                            {jobsByEducationLevels &&
                                                jobsByEducationLevels.map((job) => {
                                                    return (
                                                        <a href={`https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${job[0]}`}>
                                                            {job[1]}{' '}
                                                        </a>
                                                    );
                                                })}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div style={styleSubTitle}>종사자 평균 전공별</div>
                <div style={styleDiv}>
                    <table style={styleTable}>
                        <thead>
                            <tr>
                                <th style={styleTdTh}>분야</th>
                                <th style={styleTdTh}>직업</th>
                            </tr>
                        </thead>
                        <tbody>
                            {majorNames.map((major, majorIndex) => {
                                const jobsByMajors = majors &&
                                    majors.filter((major) => {
                                        return major[2] === majorIndex;
                                    });

                                return (
                                    <tr style={jobsByMajors && jobsByMajors.length < 1 ? { display: "none" } : {}}>
                                        <td style={styleTdTh}>
                                            {major}
                                        </td>
                                        <td style={styleTdTh}>
                                            {jobsByMajors &&
                                                jobsByMajors.map((job) => {
                                                    return (
                                                        <a href={`https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${job[0]}`}>
                                                            {job[1]}{' '}
                                                        </a>
                                                    );
                                                })}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div style={styleDiv}>
                <Link to="/">
                    <Button variant="outline-primary" size="lg">
                        다시 검사하기
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default TestResult;