import { useRef, useState, useEffect } from "react";



// const USER_RAGEX = /^[a-zA-Z][a-zA-ZO-9-_]{3,23}$/;
// const PWD_RAGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const LoginModal = ({ loginPopUp }) => {
  // const userRef = useRef();
  // const errRef = useRef();

  // const [user, setUser] = useState('');
  // const [validName, setValidName] = useState(false);
  // const [userFocus, setUserFocus] = useState(false);

  // const [pwd, setPwd] = useState('');
  // const [validPwd, setValidPwd] = useState(false);
  // const [pwdFocus, setPwdFocus] = useState(false);

  // const [matchPwd, setmatchPwd] = useState('');
  // const [validMatch, setValidMatch] = useState(false);
  // const [matchFocus, setMatchFocus] = useState(false);

  // const [errMsg, setErrMsg] = useState('');
  // const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   userRef.current.focus();
  // }, [])

  // useEffect(() => {
  //   const result = USER_RAGEX.test(user)
  //   console.log(result);
  //   console.log(user);
  //   setValidName(result);
  // }, [user])

  // useEffect(() => {
  //   const result = PWD_RAGEX.test(pwd)
  //   console.log(result);
  //   console.log(pwd);
  //   setValidPwd(result);
  //   const match = pwd === matchPwd;
  //   setValidMatch(match)
  // }, [pwd, matchPwd])

  // useEffect(() => {
  //   setErrMsg('');
  // }, [user, pwd, matchPwd])

  return (
    <>
    {/* {
       loginPopUp && (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
              {errMsg}
            </p>
            <h1>Register</h1>
            <form>
              <label htmlFor="username">
                Username:
              </label>
              <input type="text" 
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)} required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              /> 
              <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                4 to 24 characters. <br />
                Must begin with a letter. <br />
                letters, numbers, underscores, hyphens allowed.
              </p>
            </form>
        </section>
       )
    } */}
    </>
  )
}

export default LoginModal

