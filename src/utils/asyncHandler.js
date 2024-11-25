const asyncHandler=(requestHandler)=>{
   return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>{
            next(err)
        })
    }
}

// ***************this is the  try and catch method*************

// const asyncHandler=(fun)=>async(req,res,next)=>{

//     try {
//          await fun(req,res,next)
//     } catch (error) {
//         error.status(error.code || 400 ).json({
//             success:false,
//             message:error.message
//         })
//     }
// }

export {asyncHandler}


