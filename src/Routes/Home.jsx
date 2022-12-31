import '../App.css';
import logo from '../Assets/lnr_icon_white.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  const goTo = ()=>{
    navigate('/');
  }

    return (
      <div className="App">
      <img src={logo} alt="Logo" className="App-logo"/>
      <h1 className="main-logo">
        Home
      </h1>
      <div onClick={goTo}  className="login">
        Logout

      </div>
      <h1>

      </h1>
      <h5 ></h5>

    </div>
      )
  };
  export default Home;