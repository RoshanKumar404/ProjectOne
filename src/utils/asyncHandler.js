const asyncHandler=(fun)=>async(req,res,next)=>{

    try {
         await fun(req,res,next)
    } catch (error) {
        error.status(error.code || 400 ).json({
            success:false,
            message:error.message
        })
    }
}

export {asyncHandler}