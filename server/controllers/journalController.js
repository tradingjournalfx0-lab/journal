const Journal =
require("../models/Journal");




// ======================
// GET USER JOURNALS
// ======================

const getJournals =
async(req,res)=>{

  try{

    const journals =
    await Journal.find({

      user:req.user.id,

    })

    .sort({

      createdAt:-1

    });

    res.json(

      journals

    );

  }catch(error){

    console.log(error);

    res.status(500).json({

      message:error.message,

    });

  }

};




// ======================
// CREATE JOURNAL
// ======================

const createJournal =
async(req,res)=>{

  try{

    const journal =
    await Journal.create({

      user:req.user.id,

      title:req.body.title,

      emotion:req.body.emotion,

      content:req.body.content,

      tags:req.body.tags,

    });

    res.status(201).json(

      journal

    );

  }catch(error){

    console.log(error);

    res.status(500).json({

      message:error.message,

    });

  }

};




// ======================
// UPDATE JOURNAL
// ======================

const updateJournal =
async(req,res)=>{

  try{

    // CHECK USER JOURNAL

    const journal =
    await Journal.findOne({

      _id:req.params.id,

      user:req.user.id,

    });




    if(!journal){

      return res.status(404).json({

        message:
        "Journal Not Found",

      });

    }




    // UPDATE

    journal.title =
    req.body.title;

    journal.emotion =
    req.body.emotion;

    journal.content =
    req.body.content;

    journal.tags =
    req.body.tags;




    const updatedJournal =
    await journal.save();




    res.json(

      updatedJournal

    );

  }catch(error){

    console.log(error);

    res.status(500).json({

      message:error.message,

    });

  }

};




// ======================
// DELETE JOURNAL
// ======================

const deleteJournal =
async(req,res)=>{

  try{

    // CHECK USER JOURNAL

    const journal =
    await Journal.findOne({

      _id:req.params.id,

      user:req.user.id,

    });




    if(!journal){

      return res.status(404).json({

        message:
        "Journal Not Found",

      });

    }




    // DELETE

    await journal.deleteOne();




    res.json({

      message:
      "Journal Deleted ✅",

    });

  }catch(error){

    console.log(error);

    res.status(500).json({

      message:error.message,

    });

  }

};




module.exports = {

  getJournals,

  createJournal,

  updateJournal,

  deleteJournal,

};