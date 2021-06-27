
const validatePage = (req, res, next)=>{
    try{
        console.log(!req.session)
        if(!req.session.userdata || req.session.userdata.email_address == null || req.session.email_address == "" || req.session.email_address == typeof undefined){
            res.redirect('/login')
        }else{
            next()
        }
    }catch(e){
        res.redirect('/login')
    }
}

const validateJSON = (req, res, next)=>{
    try{
        if(!req.session.userdata || req.session.userdata.email_address == null || req.session.email_address == "" || req.session.email_address == typeof undefined){
            res.status(401).json({
                status:'error',
                code:401,
                message:'Session is expired or was not initiated!'
            })
        }else{
            next()
        }
    }catch(e){
        res.status(401).json({
            status:'error',
            code:401,
            message:'Session is expired or was not initiated!'
        })
    }
}
module.exports = {validatePage, validateJSON}

