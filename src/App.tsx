import useSWR from 'swr'
import UserListItem from './components/UserListItem';
import './App.css';
import { operations } from '../_schema';

// TODO: 環境変数から渡す
const API_BASE_URL = 'http://127.0.0.1:4010'

// NOTE:
//   IE 対応なら unfetch
//   SSR するなら isomorphic-fetch
//   両方なら isomorphic-unfetch
//   を使う
const fetcher = path => fetch(path + API_BASE_URL).then(r => {
  // TODO:
  //   - API 側のレスポンスボディを設定
  //   - エラー時のハンドリング（レスポンスの整形など）をする
  //     ※SWR との組み合わせは要調査
  return r.json()
})

// TODO: 別のファイルにまとめて定義
type GetUserResponse = operations['getUser']['responses'][200]['application/json']

// TODO: エラーレスポンスをキレイにしたら正しく設定
type ResponseErrro = any

function App() {
  const { data, error } = useSWR<GetUserResponse, ResponseErrro>('/user', fetcher)

  return (
    <div className="App">
      <ul className="App-user-list">
        {
          data.map(({ id, name, age }), () => {
            return (
              <li className="App-user-list-item">
                <UserListItem id={id} name={name} age={age} />
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
