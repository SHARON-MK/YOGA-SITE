const bcrypt = require('bcryptjs')

const encryptPassword = async (password) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      return passwordHash;
    } catch (error) {
      console.log(error.message);
    }
  };

  module.exports = encryptPassword;