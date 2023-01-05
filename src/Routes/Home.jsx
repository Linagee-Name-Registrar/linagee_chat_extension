import '../App.css';
import logo from '../Assets/lnr_icon_white.png';
import './Login.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  const goTo = ()=>{
    navigate('/');
  }
  const location = useLocation();

  const goTo2 = ()=>{
    console.log("jome loc", location)
    navigate('/messages', { replace: true });
  }

    return (
      <div className="App">
      <img src={logo} alt="Logo" className="App-logo"/>
      <h1 className="main-logo">
        Home
      </h1>
      <div onClick={goTo2}  className="login">
        Logout

      </div>
      <h1>

      </h1>
      <h5 ></h5>

    </div>
      )
  };
  export default Home;