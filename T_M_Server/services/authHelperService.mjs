import pool from "../db/connection.mjs";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authHelperService = {

  /*
 
    @ Pushpendra
    Method Name - {userSignup}
    Desc - Created method for signup user
    Date - 05/10/23
 
  */

  signup: async function (body) {
    const newUser = this.getUserDetails(body);    // Creating new user object adding user information in here

    const { isExists } = await this.checkEmailExists(newUser.user_email);   // Checking whether email already exists or not
    if (isExists) {
      return { status: false, message: "Email is already exists !!", data: [] };
    }

    const hashPassword = await bcrypt.hash(newUser.password, 10);  // Here we are hashing the {user_password}
    newUser['password'] = hashPassword; // Replacing password with hash password

    let insertQuery = "INSERT INTO tm_users SET ?";  // Creating new user
    const [rows] = await pool.query(insertQuery, newUser);

    const { token, refresh_token } = await this.setTokenRefToken(rows.insertId); // Here we are setting token and refresh token in to database

    return { status: true, message: "User inserted successfully", data: { token, refresh_token } }
  },

  /*
 
    @ Pushpendra
    Method Name - {setTokenRefToken}
    Desc - Created method for setting refresh token and token into db
    Date - 05/10/23
 
  */

  setTokenRefToken(user_id) {
    return new Promise(async res => {
      let token = jwt.sign({ user_id: user_id, user_type: 'user' }, process.env.TOKEN_KEY, { expiresIn: '5h' });  // Token will expire in 1 hour
      let refresh_token = jwt.sign({ user_id: user_id, user_type: 'user' }, process.env.REF_TOKEN_KEY, { expiresIn: '90d' });  // Ref Token will expire in 90 days
      let updateQuery = "UPDATE tm_users SET ? WHERE user_id = ?"; // Setting token and refresh token here
      const [updateData] = await pool.query(updateQuery, [{ token, refresh_token }, user_id]);
      res({ token, refresh_token });
    });
  },

  /*
 
    @ Pushpendra
    Method Name - {getUserDetails}
    Desc - Created method for returning user details according body data
    Date - 05/10/23
 
  */

  getUserDetails: function (body) {
    return {
      user_first_name: body.user_first_name,
      user_last_name: body.user_last_name,
      user_email: body.user_email,
      password: body.password,
      token: null,  // We will assign it after creating user
      refresh_token: null,  // We will assign it after creating user
      created_on: new Date().getTime(),
      modified_on: new Date().getTime()
    };
  },

  /*
 
    @ Pushpendra
    Method Name - {checkEmailExists}
    Desc - Created method for checking whether email is already existing or not
    Date - 05/10/23
 
  */

  checkEmailExists: async function (user_email) {
    const [rows] = await pool.query(`SELECT * FROM tm_users WHERE user_email = ?`, [user_email]);
    return {
      isExists: rows.length > 0 ? true : false,
      userData: rows
    };   // If we got email then we will send true
  },

  /*
 
    @ Pushpendra
    Method Name - {validatePassword}
    Desc - Created method for checking whether password is matching to our db password or not
    Date - 05/10/23
 
  */

  validatePassword: async function (userPass, dbPass) {
    return new Promise((res, rej) => {
      bcrypt.compare(userPass, dbPass, function (err, result) {
        if (err) {
          rej();
        }
        res(result);
      });
    })
  },

  /*
 
    @ Pushpendra
    Method Name - {userLogin}
    Desc - Created method for login user
    Date - 05/10/23
 
  */

  login: async function (body) {
    let user = body;
    const { isExists, userData } = await this.checkEmailExists(body.user_email);   // Checking whether email already exists or not
    if (!isExists) {
      return { status: false, message: "Email not exists !!", data: [] }
    }
    else {
      let passCheck = await this.validatePassword(user.password, userData[0].password); // Validating password here
      if (!passCheck) {
        return { status: false, message: "Invalid Password !!", data: [] }
      }
      const { token, refresh_token } = await this.setTokenRefToken(userData[0].user_id); // Setting new token and referesh token here
      return { status: true, message: "User inserted successfully", data: { token, refresh_token } };
    }
  }
}

export default authHelperService;