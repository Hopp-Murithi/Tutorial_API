module.exports = {
  verifyEmail: (email) => {
    if (!email) {
        // Return error messages with status codes as well as in json format for easy retrieval in frontend
      return res.status(404).json({
        message: "Email is required",
      });
    }

    // more if statements/case-switch
  },

  // another method to verify eg firstName
  verifyUserName:(userName)=>{
    // if statements/case-switch
  }
};
