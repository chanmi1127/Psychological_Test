import React from 'react';
import {Link} from 'react-router-dom';

function TestFinished() {
    return (
        <div>
            <h2>검사가 완료되었습니다.</h2>
            <h4>검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려주고,
중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.</h4>
            <Link to={'/testresult/:seq'}>
              <button type="submit">
                결과 보기
              </button>
            </Link>
        </div>
    );
}


export default TestFinished;