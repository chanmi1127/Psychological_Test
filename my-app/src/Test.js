import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Alert, Button} from "react-bootstrap";

function Test() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [sampleQuestion, setSampleQuestion] = useState('');
  const [sampleAnswer01, setSampleAnswer01] = useState('');
  const [sampleAnswer02, setSampleAnswer02] = useState('');
  const [sampleAnswerDesc01, setSampleAnswerDesc01] = useState('');
  const [sampleAnswerDesc02, setSampleAnswerDesc02] = useState('');
  const [sampleAnswerValue, setSampleAnswerValue] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [page, setPage] = useState(-2);
  const apiUrl = `https://www.career.go.kr/inspct/openapi/test/questions?apikey=${process.env.REACT_APP_API_KEY}&q=6`;
  const postApiUrl = 'http://www.career.go.kr/inspct/openapi/test/report';
  const history = useHistory();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const fetchSample = useCallback(async () => {
    const response = await axios.get(apiUrl);
    setSampleQuestion(response.data.RESULT[1].question);
    setSampleAnswer01(response.data.RESULT[1].answer01);
    setSampleAnswer02(response.data.RESULT[1].answer02);
    setSampleAnswerDesc01(response.data.RESULT[1].answer03);
    setSampleAnswerDesc02(response.data.RESULT[1].answer04);
  }, [apiUrl]);

  const fetchQuestions = useCallback(async () => {
    const response = await axios.get(apiUrl);
    setQuestions(response.data.RESULT);
    setAnswers(() => {
      return new Array(response.data.RESULT.length);
    });
  }, [apiUrl]);

  useEffect(() => {
    fetchSample();
  }, [fetchSample]);


  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const visibleQuestions = useMemo(() => {
    return questions.slice(page * 5, (page + 1) * 5);
  }, [page, questions]);

  const isButtonDisabled = useMemo(() => {
    let isDisabled = false;
    visibleQuestions.forEach((question) => {
      const index = parseInt(question.qitemNo, 10);
      if (!answers[index - 1]) {
        isDisabled = true;
      }
    });
    return isDisabled;
  }, [answers, visibleQuestions]);

  const handleAnswerScoreChange = questionNo => (e) => {
    setAnswers((current) => {
      const newAnswers = [...current];
      newAnswers[questionNo - 1] = e.target.value;
      return newAnswers;
    })
  };

  const handleSubmit = e => {
    e.preventDefault();
    const timestamp = String(new Date().getTime());
    const totalAnswers = answers.map((answer, index) =>
      "B" + String(parseInt(index) + 1) + "=" + answer);
    const newTotalAnswers = totalAnswers.join(' ');
    console.log(newTotalAnswers);

    const data = {
      "apikey": process.env.REACT_APP_API_KEY,
      "qestrnSeq": "6",
      "trgetSe": "100209",
      "name": name,
      "gender": gender,
      "startDtm": timestamp,
      "answers": newTotalAnswers
    };

    console.log(data);

    const handlePost = async () => {
      const response = await axios.post(postApiUrl, data, { headers: { 'Content-Type': 'application/json' } });
      const seq = response.data.RESULT.url.split("=")[1];

      seq &&
        history.push('/testfinished/' + seq);

    };

    handlePost();

  };

  const styleContainer = {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto"
  };

  const styleTitle = {
    width: "auto",
    fontSize: "2.5rem",
    textAlign: "center",
    fontWeight: "400",
    padding: "1em"
  };

  const styleContent = {
    width: "auto",
    fontSize: "1.5rem",
    textAlign: "center",
    fontWeight: "400",
    padding: "1em 2em"
  };

  const styleUserInfo = {
    width: "auto",
    fontSize: "1.25rem",
    textAlign: "center",
    fontWeight: "360",
    padding: "1em"
  };

  const styleExplanation = {
    width: "60%",
    fontSize: "1.25rem",
    textAlign: "left",
    fontWeight: "400",
    padding: "0.5em",
    margin: "0 auto"
  };

  const styleQuestion = {
    width: "auto",
    fontSize: "1.5rem",
    textAlign: "center",
    fontWeight: "400",
    padding: "1em"
  };

  const styleAnswer = {
    width: "auto",
    fontSize: "1.5rem",
    textAlign: "center",
    fontWeight: "500",
    padding: "1em"
  };

  return (
    page === -2 ? (
      <div style={styleContainer} >
        <div>
          <div style={styleTitle}>직업가치관 검사</div>
          <div style={styleContent}>
            직업가치란 직업생활을 통하여 충족하고자 하는 욕구 또는 상대적으로 중요시하는 것을 의미합니다.
            이 검사는 직업과 관련된 다양한 욕구 및 가치들에 대해 여러분이 상대적으로 무엇을 얼마나 더 중요하게 여기는가를 살펴보고,
            그 가치가 충족될 가능성이 높은 직업을 탐색할 수 있도록 도움을 주는 검사입니다.
        </div>
        </div>
        <div style={styleUserInfo}>
          <p>이름</p>
          <p><label><input type="text" name="name" placeholder="이름" onChange={handleNameChange} /></label></p>
          <p>성별</p>
          <p>
            <label><input type="radio" name="gender" value="100323" onChange={handleGenderChange} />남성</label>{' '}{' '}
            <label><input type="radio" name="gender" value="100324" onChange={handleGenderChange} />여성</label>
          </p>
          <Button variant="outline-primary" size="lg" onClick={() => {
            setPage((current) => {
              return current + 1;
            });
          }} disabled={!name || !gender}>
            검사 시작
            </Button>
        </div>
      </div>
    ) : (
        page < 0 ? (
          <div style={styleContainer}>
            <div style={styleTitle}>직업가치관 검사 예시</div>
            <div style={styleQuestion}>
              직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.<br />
              가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요. <br /> <br />
              <p>[검사 예시]</p>
              {sampleQuestion}
            </div>
            <div style={styleAnswer}>
              <label style={{ marginRight: "2em" }}><input type="radio" name="sampleAnswer" onChange={(e) => setSampleAnswerValue(e.target.value)} />{sampleAnswer01}</label>
              <label><input type="radio" name="sampleAnswer" onChange={(e) => setSampleAnswerValue(e.target.value)} />{sampleAnswer02}</label><br />
              <div style={styleExplanation}>
                <Alert variant="info">
                  {sampleAnswer01}{': '}{sampleAnswerDesc01} <br />
                  {sampleAnswer02}{': '}{sampleAnswerDesc02}
                </Alert>
              </div>
              <div class="form-group row">
                <div class="col-md-6">
                  <Button type="button" class="btn form-control" variant="outline-primary" size="lg" onClick={() => {
                    setPage((current) => {
                      return current - 1;
                    });
                  }}>
                    이전
                  </Button>
                </div>
                <div class="col-md-6">
                  <Button type="button" class="btn form-control" variant="outline-primary" size="lg" onClick={() => {
                    setPage((current) => {
                      return current + 1;
                    });
                  }}
                    disabled={!sampleAnswerValue}>
                    검사 시작
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
            <div style={styleContainer}>
              <div style={styleTitle}>직업가치관 검사 진행</div>
              <div>
                {visibleQuestions.map((question) => {
                  const qitemNo = parseInt(question.qitemNo, 10);
                  return (
                    <div key={qitemNo}>
                      <div style={styleQuestion}>{qitemNo}{'. '}{question.question}</div>
                      <div style={styleAnswer}>
                        <label style={{ marginRight: "2em" }}>
                          <input
                            type="radio"
                            name={`B[${qitemNo}]`}
                            value={question.answerScore01}
                            onChange={handleAnswerScoreChange(question.qitemNo)}
                            checked={answers[question.qitemNo - 1] === question.answerScore01 ? true : false}
                          />
                          {question.answer01}
                        </label>
                        <label>
                          <input
                            type="radio"
                            name={`B[${qitemNo}]`}
                            value={question.answerScore02}
                            onChange={handleAnswerScoreChange(question.qitemNo)}
                            checked={answers[question.qitemNo - 1] === question.answerScore02 ? true : false}
                          />
                          {question.answer02}
                        </label>
                        <div style={styleExplanation}>
                          <Alert variant="info">
                            {question.answer01}{': '}{question.answer03} <br />
                            {question.answer02}{': '}{question.answer04}
                          </Alert>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <br />
              <div style={styleAnswer}>
                <div class="form-group row">
                  <div class="col-md-6">
                    <Button type="button" class="btn form-control" variant="outline-primary" size="lg"
                      onClick={() => {
                        setPage((current) => {
                          return current - 1;
                        });
                      }}
                    >
                      이전
                  </Button>
                  </div>
                  {page < 5 ? (
                    <div class="col-md-6">
                      <Button type="button" class="btn form-control" variant="outline-primary" size="lg"
                        onClick={() => {
                          setPage((current) => {
                            return current + 1;
                          });
                        }}
                        disabled={isButtonDisabled}
                      >
                        다음
                    </Button>
                    </div>
                  ) : (
                      <div class="col-md-6">
                        <Button class="btn form-control" variant="outline-primary" size="lg" onClick={handleSubmit} disabled={isButtonDisabled}>
                          제출
                      </Button>
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))
  );
};


export default Test;
