import React, {useState, useEffect, useMemo, useCallback} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Test() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [page, setPage] = useState(0);

    var apiUrl  = 'https://www.career.go.kr/inspct/openapi/test/questions?apikey=8b75f809812e0d513b4789912f3513cd&q=6';

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
    
    const submit = e => {
      e.preventDefault()
      axios.post('www.career.go.kr/inspct/openapi/test/report?apikey=8b75f809812e0d513b4789912f3513cd&qestrnSeq=6',{
        body: JSON.stringify({answers})})
    };

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    return (
      <form onSubmit={submit}>
          <h1>검사 진행</h1>
          <div>
            {visibleQuestions.map((question) => {
              const qitemNo = parseInt(question.qitemNo, 10);
    
              return (
                <div key={qitemNo}>
                  <h3>{question.question}</h3>
                  <div>
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
                </div>
              );
            })}
          </div>
          <br />
          {page > 0? (
            <button
            onClick={() => {
              setPage((current) => {
                  return current - 1;   
              });
            }}
          >
            이전 
          </button>
          ) : (
            <Link to='/testexample'>
              <button>
              이전
            </button>
            </Link>
          )}
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
          ) : (
              <button type="submit" disabled={isButtonDisabled}>
                제출
              </button>
          )} 
        </form>
      );
    };
    
    export default Test;

    