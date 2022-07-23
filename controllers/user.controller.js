var bcrypt = require('bcryptjs');

module.exports = (prisma,users,generateToken)=>{


    users.post('/users/signup', async(req, res, next)=>{
        try {
            const {  username ,  password , createdBy} = req.body
            var hash = bcrypt.hashSync(password, 8);//hashing password
            let data = {username , password:hash, createdBy}
            if((username && password && createdBy )){
                const user = await prisma.user.create({ 
                    data
                })
                const user1 = await prisma.user.findUnique ({
                    where: {
                        username
                    }
                })
                var token = generateToken({id:user1.id,username:user1.username})// token genearate
                console.log(data)
                res.cookie('token', token)
                res.status(200).json("signup successfully")
              }
            else{
                res.status(401).json("user not able to create account")
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    })

    users.post('/users/login', async(req, res, next)=>{
        try {
            const { username ,  password } = req.body
            const user = await prisma.user.findUnique ({
                where: {
                    username
                }
            })
            // console.log(password,username);
         if (bcrypt.compareSync(password, user.password)){
            var token = generateToken({id:user.id,username:user.username})// token genearate
            res.cookie('token', token)
            res.status(200).json({message:"login successfully"})

         }
         else{
            res.status(401).json({message:"user does not match"})
         }

        } catch (err) {
            res.status(500).json({message: err.message})
        }
    })

    // Logout route  
    users.get('/logout', function(req, res){
        res.clearCookie('token');
        res.status(200).json({message:"logout successful"})
    });

}