import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './UserInfo.css';

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
    <div className="user-info">
      <div className="title">
        직업가치관 검사
      </div>
      <form>
        <div className="user-name">
          <h3>이름</h3>
          <p><label><input type="text" name="name" placeholder="이름" onChange={nameChange}/></label></p>
        </div>
        <div className="user-gender">
          <h3>성별</h3>
          <p>
            <label><input type="radio" name="gender" value="100323" onChange={genderChange}/>남성</label>
            <label><input type="radio" name="gender" value="100324" onChange={genderChange}/>여성</label>
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