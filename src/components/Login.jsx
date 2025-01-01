import { useDispatch } from "react-redux";
import { loginUser } from "../store/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = async (credentials) => {
    await dispatch(loginUser(credentials));
  };

  // Rest of your component code
};

export default Login;
