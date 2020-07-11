import * as React from "react";
import "./Login.css";
import {CircularProgress} from "@material-ui/core";
import {useState} from "react";
import axios from "axios";



interface LoginProps {
    loading: boolean;
    setLoading: (loading: boolean) =>{};
    history: any
}

const Login:React.FC<LoginProps> = ({loading, setLoading, history}) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        axios.post("http://localhost:5000/api/login", credentials)
            .then(res => {//todo: do I need a type for res with ts?
                console.log(res);
                localStorage.setItem("token", res.data.payload);
                history.push("/friends");
                setLoading(false);
            }).catch(console.log);
    }

    /*
    login = e => {
    e.preventDefault();
    // make a post request to the login endpoint on the server
    axios
      .post("http://localhost:5000/api/login", this.state.credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
        // redirect the user to the app's main logged in page
        this.props.history.push("/protected");
      })
      .catch(err => console.log({ err }));
  };
     */

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return(
        <div className="login">
            {!loading ?
            <form className="form" onSubmit={submitLogin}>
                <label className="label">
                    <input
                        className="input"
                        type="text"
                        name="username"
                        placeholder="username"
                        onChange={handleChange}
                        value={credentials.username}
                    />
                </label>
                <label className="label">
                    <input
                        className="input"
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={handleChange}
                        value={credentials.password}
                    />
                </label>
                <button className="button">LOG IN</button>
            </form>
                : <CircularProgress/>}
        </div>
    );
}

export default Login;