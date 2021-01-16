import React, {useEffect} from "react"
import SignInSide from "./components/SignInSide"
import SignUp from "./components/SignUp"
import {Search} from "./components/Search"
import Recipe from "./components/Recipe"
import {useStore} from "./store/Store"
import {authh} from "./store/firebase"
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
const queryClient = new QueryClient()
function App() {
  const {user, loading, setUser, setLoading,} = useStore()
  useEffect(() => {
    const unsubscribe = authh.onAuthStateChanged(user => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])
  if(loading){
    return(
    <div style={{display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',}}>
    <CircularProgress style={{margin:"auto"}}/>
    </div>
    )
}
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
    {!user?
    <Switch>
      <Route exact path="/login">
        <SignInSide/>
        </Route>
        <Route path="/signup">
          <SignUp/>
        </Route>
        <Route render={()=><Redirect to="/login"/>}/>
        </Switch>
       :<Switch> <Route exact path="/"><Search/></Route>
        <Route path="/Recipe/:id" component={Recipe} />
        <Route render={()=><Redirect to="/"/>}/>
        </Switch>}
      </Router>
      </QueryClientProvider>
  );
}

export default App;
