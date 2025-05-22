import pool from "../config/database.js"; //  "pool" (matches the export in index.js)


const User = {
  // Find user by Google ID
  async findByGoogleId(googleId) {
    
    const { rows } = await pool.query("SELECT * FROM users WHERE google_id = $1", [googleId]);
  return rows[0]; // Returns user data
  },
  
  // Create a new user
  async create({ googleId, displayName, email, profilePicture }) {
    const query = `
      INSERT INTO users (google_id, display_name, email, profile_picture)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    
    const values = [googleId, displayName, email, profilePicture];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Find user by ID
  async findById(id) {
    const query = "SELECT * FROM users WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  },

  async logoutUser(userId) {
    try {
      const query = "DELETE FROM sessions WHERE user_id = $1"; // Assuming you store sessions in a 'sessions' table
      await pool.query(query, [userId]);
      return { success: true, message: "User logged out successfully" };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, message: "Logout failed" };
    }
  }
};

export default User;
