import '../style2.css';
function Contact () {
  return (
    <div className="Regestration">
      <center>
        <form>
          <h1>LOG IN</h1>
          <label htmlFor="Username">Username</label>
          <input type="text" id="Username" name="Username" />
          <label htmlFor="Password">Password</label>
          <input type="password" id="Password" name="Password" />
          <div className="checkbox-container">
            <input type="checkbox" id="checkbox" name="checkbox" />
            <label htmlFor="checkbox">Remember me</label>
            Don’t have an account? <a href="SignUp.jsx">Sign up</a>
          </div>
          <button type="submit">Submit</button>
          
        </form>
      </center>
    </div>
  );
};

export default Contact;






