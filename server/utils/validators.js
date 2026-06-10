// utils/validators.js

// =========================
// EMAIL REGEX
// =========================

const emailRegex =
/^\S+@\S+\.\S+$/;




// =========================
// REGISTER VALIDATION
// =========================

const validateRegister =
(data)=>{

  const errors = [];




  // NAME

  if(

    !data.name ||

    data.name.trim() === ""

  ){

    errors.push(

      "Name is required"

    );

  }




  // EMAIL

  if(

    !data.email ||

    data.email.trim() === ""

  ){

    errors.push(

      "Email is required"

    );

  }else if(

    !emailRegex.test(

      data.email

    )

  ){

    errors.push(

      "Invalid email format"

    );

  }




  // PASSWORD

  if(!data.password){

    errors.push(

      "Password is required"

    );

  }else if(

    data.password.length < 6

  ){

    errors.push(

      "Password must be at least 6 characters"

    );

  }




  return errors;

};




// =========================
// LOGIN VALIDATION
// =========================

const validateLogin =
(data)=>{

  const errors = [];




  // EMAIL

  if(

    !data.email ||

    data.email.trim() === ""

  ){

    errors.push(

      "Email is required"

    );

  }else if(

    !emailRegex.test(

      data.email

    )

  ){

    errors.push(

      "Invalid email format"

    );

  }




  // PASSWORD

  if(

    !data.password ||

    data.password.trim() === ""

  ){

    errors.push(

      "Password is required"

    );

  }




  return errors;

};




// =========================
// TRADE VALIDATION
// =========================

const validateTrade =
(data)=>{

  const errors = [];




  // SYMBOL

  if(

    !data.symbol ||

    data.symbol.trim() === ""

  ){

    errors.push(

      "Symbol is required"

    );

  }




  // SIDE

  if(

    !data.side ||

    data.side.trim() === ""

  ){

    errors.push(

      "Trade side is required"

    );

  }else if(

    !["BUY","SELL"].includes(

      data.side

    )

  ){

    errors.push(

      "Trade side must be BUY or SELL"

    );

  }




  // ENTRY

  if(

    data.entry === undefined ||

    data.entry === null ||

    data.entry === ""

  ){

    errors.push(

      "Entry price is required"

    );

  }else if(

    isNaN(

      Number(data.entry)

    )

  ){

    errors.push(

      "Entry must be a number"

    );

  }




  // EXIT

  if(

    data.exit === undefined ||

    data.exit === null ||

    data.exit === ""

  ){

    errors.push(

      "Exit price is required"

    );

  }else if(

    isNaN(

      Number(data.exit)

    )

  ){

    errors.push(

      "Exit must be a number"

    );

  }




  // PROFIT

  if(

    data.profit !== undefined &&

    data.profit !== "" &&

    isNaN(

      Number(data.profit)

    )

  ){

    errors.push(

      "Profit must be a number"

    );

  }




  // SESSION

  if(

    data.session &&

    ![

      "London",

      "New York",

      "Asia"

    ].includes(

      data.session

    )

  ){

    errors.push(

      "Invalid trading session"

    );

  }




  return errors;

};




// =========================
// PROFILE VALIDATION
// =========================

const validateProfile =
(data)=>{

  const errors = [];




  if(

    data.email &&

    !emailRegex.test(

      data.email

    )

  ){

    errors.push(

      "Invalid email format"

    );

  }




  if(

    data.fullName &&

    data.fullName.length > 50

  ){

    errors.push(

      "Full name too long"

    );

  }




  if(

    data.bio &&

    data.bio.length > 300

  ){

    errors.push(

      "Bio must be under 300 characters"

    );

  }




  return errors;

};




// =========================
// EXPORTS
// =========================

module.exports = {

  validateRegister,

  validateLogin,

  validateTrade,

  validateProfile,

};