import pool from "../db/connection.mjs";

const tmhelperService = {

  /*
 
    @ Pushpendra
    Method Name - {userSignup}
    Desc - Created method for signup user
    Date - 05/10/23
 
  */

  userSignup: async function (body) {
    const newUser = this.getUserDetails(body);    // Creating new user object adding user information in here

    const { isExists } = await this.checkEmailExists(newUser.user_email);   // Checking whether email already exists or not
    if (isExists) {
      return { status: false, message: "Email is already exists !!", data: [] };
    }

    const hashPassword = await bcrypt.hash(newUser.password, 10);  // Here we are hashing the {user_password}
    newUser['password'] = hashPassword; // Replacing password with hash password

    let insertQuery = "INSERT INTO tm_users SET ?";  // Creating new user
    const [rows] = await pool.query(insertQuery, newUser);

    const { token } = await this.setTokenRefToken(rows.insertId); // Here we are setting token and refresh token in to database

    return { status: true, message: "User inserted successfully", data: { token } }
  },

}

export default tmhelperService;