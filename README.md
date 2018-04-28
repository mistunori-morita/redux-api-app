# Redux-api app
- `create-react-app xxx` で雛形インストール
- `npm install axios redux react-router react-router-dom react-redux redux-thunk react-router-redux`でインストール
```js
//package.jsonにインストールされていればOKxx
{
  "name": "redux-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "axios": "^0.18.0",
    "react": "^16.3.1",
    "react-dom": "^16.3.1",
    "react-redux": "^5.0.7",
    "react-router": "^4.2.0",
    "react-router-dom": "^4.2.2",
    "react-scripts": "1.1.4",
    "redux": "^3.7.2",
    "redux-thunk": "^2.2.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```
- index.jsに、importしていく
```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//ここから下
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createHistory } from 'history/createBrowserHistory';
import { routerMiddleware } from "react-router-redux";
import thunk from 'redux-thunk';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
```

- scr/viewsフォルダを作成 全てのviewはここに
- src/reducers/index.jsを作成
```js
//reducers/index.js
import { combineReducers } from 'redux';

export default combineReducers({  });
```

```js
//index.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from "react-router-redux";
import thunk from 'redux-thunk';
import reducers from './reducers'

const history = createHistroy()
const middleware = [ routerMiddleware(history), thunk];

const store = createStore(
  reducers,
  applyMiddleware(...middleware)
)


ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();

```
- npm startでビルドできたら雛形OK

## Routerの設定
- App.jsを修正
```js
import React, { Component } from 'react';
import { Route, Router } from 'react-router';
import PropTypes from 'prop-types';
import './App.css';
import Home from './views/Home';

class App extends Component {
  render() {
    return (
      //Routerの設定
      <Router history={ this.props.history}>
        <div className="App">
          <Route exact path="/" component={Home}/>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  history: PropTypes.any.isRequired
}

export default App;

```

- index.jsを修正
```js
  <Provider store={store}>
  //historyを追加
    <App history={ history }/>
  </Provider>
```
- views/homeを作成
- コンポーネントとして渡す
- うまくいくとHomeコンポーネントの中身が表示される

## Reducer周り
- actions/http.js
```js
import axios from 'axios';

const http = axios.create({
  baseURL: 'https://eactjsteachingproj.herokuapp.com/'
})

export default http;
```
- actions/index.js
```js
import http from './htpp';

//getUserss
export const getUsers = () => {
  return (dipatch, getState) =>{
    console.log("action getUsers")
  }
}
```

### reducerとviewのつなぎこみ
```js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUsers } from '../actions'

class Home extends Component {
  constructor(){
    super();
  }
  componentDidMount(){
    this.props.getUsers();
  }
  render(){
    return(
      <div>
        <h2>Home</h2>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    users: state.getUsers
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getUsers
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```

## cssによるスタイリング
- `npm install materialize-css`を使用
```js
//今回はこういう形で使用
import 'materialize-css/dist/css/materialize.min.css'
import './index.css'
```
- あとはスタイリングしていけば整う
- `https://fonts.google.com/?selection.family=Gugi`で好きなフォントを設定してクリック
- @IMPORTの部分を押して、css側にインポートしたのちに、font-familiyをbodyなり好きな箇所に貼ればOK

## loadingのインポート
- `npm install react-spinners`をインストール
- `http://www.davidhu.io/react-spinners/`
- 好きなローディングのやつを選んでそれをimport
```js
//例
//RingLoaderこれがサイトにあったものをそのまま書いただけ
import { RingLoader } from 'react-spinners'


//それをjsx側の方で記述
<RingLoader 
  color="#fff"
  loading={true}
/>

//本来はこうやって分けて表示　これで出し分けてる
if(this.props.users.type === 'START_GET_USERS'){
  return(
    <div className="Home-Loader">
      <RingLoader
        color="#fff"
        loading={true}
      />
    </div>
  )
}
return(
  <div className="Home">
    { users }
  </div>
);

```

## Redirectの設定
- UserItemをクリックしたら詳細ページへの遷移
```js
class UserItem extends Component {
  //初期化
  constructor(){
    super();
    //stateを定義
    this.state ={
      isRequired: false
    }
    this.onClick = this.onClick.bind(this);
  }

  //clickeventの設定
  onClick(e){
    // alert(this.props.id);

    //setStateでstateを更新
    this.setState({
      isRequired: true
    })
  }
  render(){
    const { name, last_name, id, facebook } = this.props;
    //条件付きレンダリング 
    if(this.state.isRequired){
      return( <Redirect to={"/detail/" + id}/>);
    }
    return(
      <div className="card" onClick={ this.onClick }>
```
- UserDetailコンポーネントを作成
```js
import React, { Component } from 'react'


class UserDetail extends Component{
  render(){
    return(
      <div>
        <h2>Haloa</h2>
      </div>
    );
  }
}


export default UserDetail;
```
- クリックするとここに遷移されるようになる

## npm update
- 余談だがnpmの更新しろよーみたいな通知がでたら
- `npm install -g npm-check-updates`でグローバルにインストール
- `https://www.nxworld.net/services-resource/npm-check-updates.html`
- `npm update`とかしてアップデート

## Updateしてバグったら
- `rm -rf node_modules && npm install`
- 一旦削除して再度インストール