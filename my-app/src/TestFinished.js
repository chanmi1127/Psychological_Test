import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function TestFinished() {
  const { seq } = useParams();

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

  const styleContent = {
    width: "auto",
    fontSize: "1rem",
    textAlign: "center",
    fontWeight: "400",
    padding: "1em 2em"
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
      <div style={styleTitle}>검사가 완료되었습니다.</div>
      <div style={styleContent}>검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려주고,
중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다. <br /><br />
        <div style={styleButton}>
          <Link to={'/testresult/' + seq}>
            <Button variant="outline-primary" size="lg">
              결과 보기
        </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TestFinished;