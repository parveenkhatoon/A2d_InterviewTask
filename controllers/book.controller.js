

module.exports = (prisma,books,authenticateToken)=>{

    books.get('/books', authenticateToken, async(req,res)=>{
        try {

            let page = parseInt(req.query.page || 1 )
            if( page<1 ){
                page = 1
            }
    
            const results = await prisma.book.findMany({
                skip: (page-1)*10,
                take: 10,
              })

            res.status(200).json({data:results})
            
        } catch (error) {
            res.status(500).json({message:error.message})
            
        }
    })


    books.post('/books',authenticateToken, async(req, res, next)=>{
        try {
            const { bookName, bookPrice, authorName, createdBy} = req.body
            console.log(req.userDetail.id)
            let data = { bookName, bookPrice, authorName, createdBy, UserId: req.userDetail.id }
            if(( bookName && bookPrice && authorName && createdBy && req.userDetail.id)){
                const book = await prisma.book.create({ 
                    data
                })
               
                res.status(200).json("added the book successfully")
              }
            else{
                res.status(401).json("user not able to add books")
            }
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    })


    books.put('/books/:id',authenticateToken, async(req,res)=>{
        try {
            const {id} = req.params
            const { bookName, bookPrice, authorName, createdBy} = req.body
            let data = { bookName, bookPrice, authorName, createdBy}

            const book = await prisma.book.update({
                where : {
                    id: Number(id)
                },
                data 
            })

        res.status(200).json({data: book})
            
        } catch (error) {
            res.status(500).json({message: error.message})
        }

    })

    books.delete('/books/:id',authenticateToken, async(req,res)=>{
        try {
            const {id} = req.params
            const book = await prisma.book.delete({
                where : {
                    id: Number(id)
                }
            })

        res.status(200).json({data: book})
            
        } catch (error) {
            res.status(500).json({message: error.message})
        }

    })


    books.get('/books/author', authenticateToken, async(req,res)=>{
        try {
            const {authorName} = req.query
            // console.log(authorName)
            const results = await prisma.book.findMany({
                where: {
                    authorName
                }
              })

            res.status(200).json({data:results})
            
        } catch (error) {
            // console.log(error.message)
            res.status(500).json({message:error.message})
            
        }
    })
}