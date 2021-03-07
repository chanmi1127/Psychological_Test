import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { Button, Card, Table } from 'react-bootstrap';
import TestResultJobValues from './TestResultJobValues';

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
    const jobValues = ['능력발휘', '자율성', '보수', '안정성', '사회적인정', '사회봉사', '자기계발', '창의성'];
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
            { num: 7, value: newWonScores[6] },
            { num: 8, value: newWonScores[7] }
        ];

        const sortedWonScoresItems = WonScoresItems.sort(function (a, b) {
            return a.value - b.value
        });

        const firstHighestNum = sortedWonScoresItems[7].num;
        const secondHighestNum = sortedWonScoresItems[6].num;
        const firstLowestNum = sortedWonScoresItems[0].num;
        const secondLowestNum = sortedWonScoresItems[1].num;

        setFirstHighestScoreNum(firstHighestNum);
        setSecondHighestScoreNum(secondHighestNum);
        setFirstLowestScoreNum(firstLowestNum);
        setSecondLowestScoreNum(secondLowestNum);

        const chartData = [
            { 가치: '능력발휘', 점수: scores[0] },
            { 가치: '자율성', 점수: scores[1] },
            { 가치: '보수', 점수: scores[2] },
            { 가치: '안정성', 점수: scores[3] },
            { 가치: '사회적인정', 점수: scores[4] },
            { 가치: '사회봉사', 점수: scores[5] },
            { 가치: '자기계발', 점수: scores[6] },
            { 가치: '창의성', 점수: scores[7] }
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

    const copyUrlToClipboard = () => {
        var url = document.body.appendChild(document.createElement("input"));
        url.value = window.location.href;
        url.focus();
        url.select();
        document.execCommand('copy');
        url.parentNode.removeChild(url);
        alert('URL이 클립보드에 복사되었습니다.');

    };

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

    const styleContainer = {
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto"
    };

    const styleTitle = {
        width: "auto",
        fontSize: "2rem",
        textAlign: "center",
        fontWeight: "400",
        padding: "0.75em"
    };

    const styleMainTitle = {
        width: "auto",
        fontSize: "1.75rem",
        textAlign: "center",
        fontWeight: "400",
        padding: "1em"
    };

    const styleSubTitle = {
        width: "auto",
        fontSize: "1.5rem",
        textAlign: "center",
        fontWeight: "400",
        padding: "0 1em"
    };

    const styleContent = {
        width: "auto",
        fontSize: "1rem",
        textAlign: "left",
        fontWeight: "400",
        padding: "1em 2em"
    };

    const styleCareerNet = {
        width: "auto",
        fontSize: "1rem",
        textAlign: "center",
        fontWeight: "400",
        padding: "1em"
    };

    const styleDiv = {
        fontSize: "1rem",
        fontWeight: "360",
        width: "auto",
        justifyContent: "center",
        padding: "1em"
    };


    const styleCardGuide = {
        fontSize: "1rem",
        textAlign: "left",
        fontWeight: "360",
        width: "90%",
        margin: "0 auto"
    };

    const styleCardInfo = {
        fontSize: "1rem",
        textAlign: "left",
        fontWeight: "500",
        width: "90%",
        margin: "0 auto"
    };


    const styleCopyUrl = {
        width: "auto",
        fontSize: "1rem",
        textAlign: "center",
        fontWeight: "400",
    };


    const styleButton = {
        width: "auto",
        fontSize: "1.5rem",
        textAlign: "center",
        fontWeight: "360",
        padding: "1em 2em"
    };

    return (
        <div style={styleContainer}>
            <div style={styleTitle}>직업가치관 검사 결과표</div>
            <div style={styleContent}>직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과 신념입니다. 따라서 여러분의 직업생활과 관련하여 포기하지 않는 무게중심의 역할을 한다고 볼 수 있습니다. 직업가치관검사는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려줍니다. 또한 본인이 가장 중요하게 생각하는 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.</div>
            <div style={styleDiv}>
                <Table>
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
                            <td>{date}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div>
                <div style={styleMainTitle}>1. 직업가치관 검사 결과 </div>
                <div>
                    <Card border="info" style={styleCardGuide}>
                        <Card.Body>
                            <Card.Title>
                                직업가치관 검사 결과 해석 가이드
                    </Card.Title>
                            <Card.Text>
                                각 직업가치별 점수는 해당 직업가치가 갖는 상대적인 중요도를 의미합니다.
                                높은 점수를 받은 직업가치는 개인이 다른 가치보다 상대적으로 더 중요하게 생각하는 직업가치를 의미합니다.
                                한편 낮은 점수를 받은 직업가치는 개인이 다른 가치보다 상대적으로 덜 중요하게 생각하는 직업가치를 의미합니다.
                                다시 말해, 직업선택 과정에서 어느 정도 타협(또는 포기) 가능한 가치관을 의미합니다.
                    </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div style={{ padding: "1em 0 " }}>
                    <Card style={styleCardInfo} border="secondary">
                        <Card.Body>
                            <Card.Text>
                                직업생활과 관련하여 {name && name}님은 {firstHighestScoreNum && jobValues[firstHighestScoreNum - 1]}과(와) {secondHighestScoreNum && jobValues[secondHighestScoreNum - 1]}을(를) 가장 중요하게 생각합니다.
                    반면에 {firstLowestScoreNum && jobValues[firstLowestScoreNum - 1]}, {secondLowestScoreNum && jobValues[secondLowestScoreNum - 1]}은(는) 상대적으로 덜 중요하게 생각합니다.
                    </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div style={styleSubTitle}>직업가치관 검사 결과 그래프</div>
                <div style={{ position: 'relative', width: '100%', height: '0', paddingBottom: '56.25%' }}>
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            top: 0,
                        }}>
                        <ResponsiveContainer>
                            <BarChart
                                width={600}
                                height={400}
                                data={resultChartData}
                                margin={{
                                    top: 10, right: 5, bottom: 10, left: 0,
                                }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="가치" tick={{ fontSize: '10px', wordWrap: 'break-word' }} interval={0} />
                                <YAxis tick={{ fontSize: '10px' }} />
                                <Legend />
                                <Bar dataKey="점수" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div style={styleMainTitle}>2. 직업가치에 대한 설명</div>
                <TestResultJobValues />
            </div>
            <div>
                <div style={styleMainTitle}>3. 가치관과 관련이 높은 직업</div>
                <div>
                    <Card border="info" style={styleCardGuide}>
                        <Card.Body>
                            <Card.Title>
                                직업가치관별 직업 해석 가이드
                    </Card.Title>
                            <Card.Text>
                                제시된 직업들은 개인이 중요하게 생각하는 두 가지 직업가치를 동시에 충족시키는 직업들의 예시입니다.
                                본 자료는 평균치와 경향성을 근거로 작업된 자료이며, 얼마든지 다른 직업들이 존재할 수 있습니다.
                                학력과 계열은 최소 조건이 아닌 해당 직업에 종사하고 있는 사람들의 평균을 의미합니다.
                    </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div style={{ padding: "1em 0 " }}>
                    <Card style={styleCardInfo} border="secondary">
                        <Card.Body>
                            <Card.Text>
                                {name && name}님이 중요하게 생각하는 {firstHighestScoreNum && jobValues[firstHighestScoreNum - 1]}과(와) {secondHighestScoreNum && jobValues[secondHighestScoreNum - 1]}을(를) 만족시킬 수 있는 직업은 다음과 같습니다.
                    </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div style={styleSubTitle}>[종사자 평균 학력별]</div>
                <div style={styleCareerNet}>
                    직업명을 클릭하시면, 커리어넷 직업사전으로 이동하여 직업에 대한 더 자세한 정보를 확인할 수 있습니다.
                </div>
                <div style={styleDiv}>
                    <Table>
                        <thead>
                            <tr>
                                <th>분야</th>
                                <th>직업</th>
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
                                        <td>
                                            {educationLevel}
                                        </td>
                                        <td>
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
                    </Table>
                </div>
                <div style={styleSubTitle}>[종사자 평균 전공별]</div>
                <div style={styleCareerNet}>
                    직업명을 클릭하시면, 커리어넷 직업사전으로 이동하여 직업에 대한 더 자세한 정보를 확인할 수 있습니다.
                </div>
                <div style={styleDiv}>
                    <Table>
                        <thead>
                            <tr>
                                <th>분야</th>
                                <th>직업</th>
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
                                        <td>
                                            {major}
                                        </td>
                                        <td>
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
                    </Table>
                </div>
            </div>
            <div style={{ padding: "1em 0 0 0" }}>
                <Card border="info" style={styleCardGuide}>
                    <Card.Body>
                        <Card.Title>
                            직업가치관 검사 활용 가이드
                    </Card.Title>
                        <Card.Text>
                            본 직업가치관 검사는 개인이 직업을 선택할 때 어떤 가치를 중요하게 여기는지 알려줍니다.
                            직업을 선택할 때에는 직업가치관 외에도 흥미, 적성과 같은 심리적 특성을 통합적으로 고려하는 것이 좋습니다.
                            본 검사 결과는 직업을 선택할 때 고려할 수 있는 하나의 요인으로 활용하시기 바랍니다.
                    </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div style={styleDiv}>
                <Card style={styleCardGuide}>
                    <Card.Header>성인 직업심리검사 더 알아보기</Card.Header>
                    <Card.Body>
                        <Card.Title>
                            커리어넷 직업심리검사 &nbsp;
                            <Button onClick={() => window.open('https://www.career.go.kr/cnet/front/examen/inspctNor.do', '_blank')} variant="info">검사하러 가기</Button>
                        </Card.Title>
                        <Card.Text>
                            -진로개발준비도검사  <br />
                            -주요능력효능감검사  <br />
                            -이공계전공적합도검사  <br />
                            -직업가치관검사
                        </Card.Text>
                        <br />
                        <Card.Title>
                            워크넷 직업심리검사 &nbsp;
                            <Button onClick={() => window.open('https://www.work.go.kr/consltJobCarpa/jobPsyExamNew/jobPsyExamAdultList.do', '_blank')} variant="info">검사하러 가기</Button>
                        </Card.Title>
                        <Card.Text>
                            -직업선호도검사  <br />
                            -구직준비도검사  <br />
                            -창업적성검사  <br />
                            -직업가치관검사  <br />
                            -영업직무 기본역량검사  <br />
                            -IT직무 기본역량검사  <br />
                            -준고령자 직업선호도검사  <br />
                            -대학생 진로준비도검사  <br />
                            -이주민 취업준비도 검사  <br />
                            -중장년 직업역량검사  <br />
                            -성인용 직업적성검사
                    </Card.Text>
                    </Card.Body>
                </Card>
                <div></div>
            </div>
            {/* <div style={styleCopyUrl}>
                '결과 공유하기' 버튼을 누르면 URL이 클립보드에 복사됩니다. 
            </div> */}
            <div style={styleButton}>
            <Button onClick={copyUrlToClipboard} variant="outline-primary" size="lg">결과 공유하기</Button>
            </div>
            <div style={styleCopyUrl}>
                '결과 공유하기' 버튼을 누르면 URL이 클립보드에 복사됩니다. 
            </div>
            <div style={styleButton}>
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