import pool from "../db/connection.mjs";

const tmhelperService = {

  /*
 
    @ Pushpendra
    Method Name - {get_tm_list}
    Desc - Created method for getting all the tm's information
    Date - 05/10/23
 
  */

  get_tm_list: async function (body) {
    let insertQuery = "SELECT * FROM ";  // Creating new user
    const [rows] = await pool.query(insertQuery, newUser);

    const { token } = await this.setTokenRefToken(rows.insertId); // Here we are setting token and refresh token in to database

    return { status: true, message: "User inserted successfully", data: { token } }
  },

}

export default tmhelperService;