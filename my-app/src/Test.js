import React, {useState, useEffect, useMemo, useCallback} from 'react';
import axios from 'axios';

function Test() {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [sampleQuestion, setSampleQuestion] = useState('');
    const [sampleAnswer01, setSampleAnswer01] = useState('');
    const [sampleAnswer02, setSampleAnswer02] = useState('');
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [page, setPage] = useState(-2);
    const apiKey = '8b75f809812e0d513b4789912f3513cd';

    const apiUrl  = `https://www.career.go.kr/inspct/openapi/test/questions?apikey=${apiKey}&q=6`;

    const handleName = (e) => {
      console.log(e.target.value);
      setName(e.target.value);
    };
  
    const handleGender = (e) => {
      console.log(e.target.value);
      setGender(e.target.value);
    };

    const fetchSample = useCallback(async  () => {
      const response = await axios.get(apiUrl);
      setSampleQuestion(response.data.RESULT[1].question);
      setSampleAnswer01(response.data.RESULT[1].answer01);
      setSampleAnswer02(response.data.RESULT[1].answer02);
  },[apiUrl]);


    const fetchQuestions = useCallback(async  () => {
        const response = await axios.get(apiUrl);
        setQuestions(response.data.RESULT);
        setAnswers(() => {
            return new Array(response.data.RESULT.length);
        });
    },[apiUrl]);
    
    const visibleQuestions = useMemo(() => {
        return questions.slice(page*5, (page+1)*5);
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

      const answerscoreChange = questionNo => (e) => {
        setAnswers((current) => {
          const newAnswers = [...current];
          newAnswers[questionNo - 1] = e.target.value;
          return newAnswers;
        })
      };
    
    const handleSubmit = e => {
      e.preventDefault();
      const timestamp = String(Date.now());
      const totalAnswers = answers.map((answer, index) => 
        "B"+ String(parseInt(index)+1) + "=" + answer);
      const newTotalAnswers = totalAnswers.join(' ');
      console.log(newTotalAnswers);

      const data = {
        "apikey": apiKey,
        "qestrnSeq": "6",
        "trgetSe": "100209",
        "name": name,
        "gender": gender,
        "startDtm": timestamp,
        "answers": newTotalAnswers
      };

      console.log(data);

      const postApiUrl = 'http://www.career.go.kr/inspct/openapi/test/report';
      axios.post(postApiUrl, data, {headers: {'Content-Type': 'application/json'}})
        .then(response => {
          console.log(response.data);
          console.log(response.data.RESULT.url);
          console.log(response.data.RESULT.url.split("=")[1]);
        }
        );
      
    };



    useEffect(() => {
        fetchSample();
        fetchQuestions();
    }, [fetchSample,fetchQuestions]);

    return (
        page === -2? (
          <div>
            <h1>직업가치관 검사</h1>
            <h3>이름</h3>
            <p><label><input type="text" name="name" placeholder="이름" onChange={handleName}/></label></p>
            <h3>성별</h3>
            <p>
            <label><input type="radio" name="gender" value="100323" onChange={handleGender}/>남성</label>
            <label><input type="radio" name="gender" value="100324" onChange={handleGender}/>여성</label>
            </p>
            <button type="submit" onClick={() => {
              setPage((current) => {
              return current + 1;
              });
              }}
              disabled={!name || !gender}>
              검사 시작
            </button>
          </div>
        ) : ( 
        page < 0? (
        <div>
          <h1>직업가치관 검사</h1>
          <h2>검사 예시</h2>
          <h3>직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.</h3>
            {sampleQuestion}<br />
            <label><input type="radio" name="sampleAnswer"/>{sampleAnswer01}</label>
            <label><input type="radio" name="sampleAnswer"/>{sampleAnswer02}</label><br />
          <button onClick={() => {
              setPage((current) => {
              return current - 1;
              });
              }}>
            이전
          </button>
          <button onClick={() => {
              setPage((current) => {
              return current + 1;
              });
              }}>
            검사 시작
          </button>
       </div>
      ) : (
        <div>
        <h1>검사 진행</h1>
        <div>
          {visibleQuestions.map((question) => {
            const qitemNo = parseInt(question.qitemNo, 10);
            return (
              <div key={qitemNo}>
                <h3>{question.question}</h3>
                  <label>
                    <input
                      type="radio"
                      name={`B[${qitemNo}]`}
                      value={question.answerScore01}
                      onChange={answerscoreChange(question.qitemNo)}
                    />
                    {question.answer01}
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`B[${qitemNo}]`}
                      value={question.answerScore02}
                      onChange={answerscoreChange(question.qitemNo)}
                    />
                    {question.answer02}
                  </label>
              </div>
            );
          })}
        </div>
        <br />
        <button
          onClick={() => {
            setPage((current) => {
                return current - 1;   
            });
          }}
        >
          이전 
        </button>
        {page < 5? (
        <button
          onClick={() => {
            setPage((current) => {
              return current + 1;
            });
          }}
          disabled={isButtonDisabled}
        >
          다음 
        </button>
        ):( 
        <button type="submit" onClick={handleSubmit} disabled={isButtonDisabled}>
          제출
        </button> 
        )}
        </div>
        ))  
    );
  };
  
    
export default Test;
