import { message } from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; 
import { TOKEN } from "../../constants";
import request from "../../server";

const HomePage = () => {
    const navigate = useNavigate();
    
    const login = async () =>{
        try{
        let user = {username:'abdulaziz', password:'12345'};
        let {data} = await request.post('auth/login', user);
        console.log(data);
        if(data.user.role === 'admin'){
            navigate('/dashboard');
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
    <div>
        <button onClick={login}>Login</button>
    </div>
  )
}

export default HomePage