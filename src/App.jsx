import './App.css';
import Router from './routes/index';
import { authState } from './recoil/atoms/auth';
import { useRecoilValue } from 'recoil';
function App() {
	const authToken = useRecoilValue(authState).token;
	let isLoggedIn = true;
	if (!authToken || authToken === 'Invalid_Token') isLoggedIn = false;

	return <Router isLoggedIn={isLoggedIn} />;
}

export default App;
