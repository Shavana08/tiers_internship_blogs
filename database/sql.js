const mysql=require('mysql');


const connection=mysql.createConnection(
    {
        host:'bnfxunbutbl3znkyrhrf-mysql.services.clever-cloud.com',
        user:'uj1n5xzmd9pinlnf',
        password:'OToZM7tgEwclPOHLMWeY',
        database:'bnfxunbutbl3znkyrhrf',
        port:3306,
    }
)

connection.connect((err)=>{
    if(err) throw err;
    console.log('Database Connected')
})

module.exports={connection};