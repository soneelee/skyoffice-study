import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

interface UserCntState {
  userCnt: number
}

const initialState: UserCntState = {
  userCnt: 0,
}

async function postData(url = '', data = {}) {
  // 옵션 기본 값은 *로 강조
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE 등
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
  })
  return response.json() // JSON 응답을 네이티브 JavaScript 객체로 파싱
}

// POST 메서드 구현 예제
async function getData(url = '') {
  // 옵션 기본 값은 *로 강조
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE 등
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
  return response.json()
}

export const userCntSlice = createSlice({
  name: 'userCnt',
  initialState,
  reducers: {
    increaseUserCnt: (state, action: PayloadAction<number>) => {
      postData('http://localhost:2567/api/post/user_cnt', { diff: 1 }).then((data) => {
        console.log(data) // JSON 데이터가 `data.json()` 호출에 의해 파싱됨
      })
      state.userCnt += 1
    },

    decreaseUserCnt: (state, action: PayloadAction<number>) => {
      postData('http://localhost:2567/api/post/user_cnt', { diff: -1 }).then((data) => {
        console.log(data) // JSON 데이터가 `data.json()` 호출에 의해 파싱됨
      })
      state.userCnt -= 1
    },

    getUserCnt: (state, action: PayloadAction<number>) => {
      getData('http://localhost:2567/api/get/user_cnt').then((data) => {
        state.userCnt = data?.userCnt || 0
      })
    },
  },
})

export const { increaseUserCnt, decreaseUserCnt, getUserCnt } = userCntSlice.actions

export default userCntSlice.reducer
