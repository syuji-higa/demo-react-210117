// NOTE: フェッチ周りに関連した表示を扱いやすいので採用
import useSWR from 'swr'
import UserListItem from './components/UserListItem';
import './App.css';
// NOTE: mock から生成したスキーマを取得
import { paths, operations } from '../_schema';

// TODO: 環境変数から渡す
const API_BASE_URL = 'http://127.0.0.1:4010'

// NOTE:
//   IE 対応なら unfetch
//   SSR するなら isomorphic-fetch
//   両方なら isomorphic-unfetch
//   を使う
const fetcher = (path: keyof paths) => fetch(API_BASE_URL + path).then(r => {
  // TODO:
  //   - API 側のレスポンスボディを設定
  //   - エラー時のハンドリング（レスポンスの整形など）をする
  //     ※SWR との組み合わせは要調査
  return r.json()
})

// TODO: 別のファイルにまとめて定義
type GetUserResponse = operations['getUser']['responses'][200]['application/json']

// TODO: エラーレスポンスを整形したら正しく設定
type ResponseErrro = any

function App() {
  
  const { data, error, isValidating } = useSWR<GetUserResponse, ResponseErrro>('/user', fetcher)

  return (
    <div className="App">
      {error ? (
        // NOTE: データ取得失敗時の表示
        // NOTE: 5 秒おきに再試行されるのでリフェッチボタンは不要
        <p>Error（Retry after 5 seconds）</p>
      ) : (
        // NOTE: データ取得成功時の表示
        <ul className="App-user-list">
          {
            data?.map(({ id, name, age }) => {
              return (
                <li key={id} className="App-user-list-item">
                  <UserListItem id={id} name={name} age={age} />
                </li>
              )
            })
          }
        </ul>
      )}
      {/* NOTE: データ取得中の表示 */}
      {/* TODO: スケルトンスクリーンに差し替え */}
      {isValidating && <div>loading...</div>}
    </div>
  );
}

export default App;
