import { message } from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux";

import { TOKEN } from "../../constants";
import { controlAuthenticated } from "../../redux/slices/authSlice";
import request from "../../server";
import '../front/front_style/home.scss';


const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async () =>{
        try{
        let user = {username:'abdulaziz', password:'12345'};
        let {data} = await request.post('auth/login', user);
        if(data.user.role === 'admin'){
            navigate('/dashboard');
            dispatch(controlAuthenticated(true));
            message.success('you are admin !');
            Cookies.set(TOKEN, data.token);
        }else{
            message.error('you are not admin !');
        }
        } catch(err){
            message.error('Password or username is wrong')
        }
    };

  return (
    <div className="container">
        <div className="home">
            <h1>Welcome Admin</h1>
                <button onClick={login}>Login</button>
        </div>
    </div>
  )
}

export default HomePage