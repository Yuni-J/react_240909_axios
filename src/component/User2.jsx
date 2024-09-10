import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

//useReducer로 요청 상태 관리하기
//action type : SUCCESS / ERROR / LOADING
function reducer(state, action){
    switch(action.type){
        case 'LOADING':
            return {
                loding: true,
                data: null,
                error: null
            };
        case 'SUCCESS':
            return {
                loding: false,
                data: action.data,
                error: null
            };
        case 'ERROR':
            return {
                loding: false,
                data: null,
                error: action.error
            };
        default:
            throw new Error(`Unhandled action type : ${action.type}`);

    }
}

const User2 = () => {
    
    const [ state, dispatch ] = useReducer(reducer, {
        loding: false,
        data: null,
        error: null
    });

    const fetchUsers = async() => {
        try{
            // setLoading(true);
            dispatch({ type: 'LOADING' });
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            // setUsers(response.data);
            dispatch({ type: 'SUCCESS', data: response.data });
        } catch(e){
            // setError(e);
            dispatch({ type: 'ERROR', error: e });
        }
        // setLoading(false);
    };

    useEffect(()=>{
        fetchUsers();
    },[]);

    const { loading, data:users, error } = state;  //state.data => users 키워드로 조회
   
    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!users) return <div>User null!!!</div>;
    
    return (
        <div className='user2'>
            <h3>User2.jsx 영역</h3>
            <ul>
                {
                    users.map(u=> (
                        <li key={u.id}>{u.username} ({u.name}) : {u.email}</li>
                    ))
                }
            </ul>
            <button onClick={fetchUsers}>데이터 불러오기</button>
        </div>
    );
};

export default User2;