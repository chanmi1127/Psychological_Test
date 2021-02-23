import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function UserInfo() {

  const[name, setName] = useState('');
  const[gender, setGender] = useState('');
 
  const nameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const genderChange = (e) => {
    console.log(e.target.value);
    setGender(e.target.value);
  };


  return (
    <div>
      <h1>직업가치관 검사</h1>
      <form>
        <div>
          <h3>이름</h3>
          <p><input type="text" name="name" placeholder="이름" onChange={nameChange}/></p>
        </div>
        <div>
          <h3>성별</h3>
          <p>
              <input type="radio" name="gender" value="100323" onChange={genderChange}/>남성
              <input type="radio" name="gender" value="100324" onChange={genderChange}/>여성
          </p>
        </div>
      </form>
      <Link to='/testexample'>
        <button type="submit" disabled={!name || !gender}>검사 시작</button>
      </Link>
    </div> 
  )
}

export default UserInfo;