// utils/generateToken.js

const jwt =
require("jsonwebtoken");




// =========================
// GENERATE JWT TOKEN
// =========================

const generateToken =
(id)=>{

  // CHECK ID

  if(!id){

    throw new Error(

      "User ID Required"

    );

  }




  // CHECK SECRET

  if(

    !process.env.JWT_SECRET

  ){

    throw new Error(

      "JWT_SECRET Missing"

    );

  }




  // CREATE TOKEN

  const token =
  jwt.sign(

    {

      id:id,

    },

    process.env.JWT_SECRET,

    {

      expiresIn:"30d",

    }

  );




  return token;

};




// =========================
// EXPORT
// =========================

module.exports =
generateToken;