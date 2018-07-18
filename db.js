const Sequelize = require('sequelize')

const db = new Sequelize('project', 'root', 'prabhatkumar', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
    }
})

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    email:{
         type: Sequelize.STRING,
        allowNull: false,
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    college:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    phoneNumber:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    address:{
        type: Sequelize.STRING,
        allowNull: false,
    },
   

})

const Product = db.define('products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    BookName: {
        type: Sequelize.STRING,
        allowNull: false
    },
     AuthorName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
       type: Sequelize.STRING,
        allowNull: false, 
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },
    condition:{
         type:   Sequelize.ENUM,
       values: ['New', 'Almost New', 'Slight Damage','Worn'],
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
    },
    dstatus: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
    }
    
})
Product.belongsTo(User,{as : 'seller'})


const Wishlist = db.define('wishlists',{
    User_id: {
       type: Sequelize.INTEGER,
        allowNull:false,
    },
    Product_id: {
       type: Sequelize.INTEGER,
        allowNull:false,
    },

})

const Cart = db.define('carts',{
    User_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    Product_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
    },

})

const Message = db.define('messages',{
    User_id: {
       type: Sequelize.INTEGER,
        allowNull:false,
    },
     Product_id: {
       type: Sequelize.INTEGER,
        allowNull:false,
    },
          Seller_id: {
       type: Sequelize.INTEGER,
        allowNull:false,
    },
    message: {
        type: Sequelize.STRING,
        allowNull:false,
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue: 0,
    },
})

const Chkout = db.define('chkouts',{
    User_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    AuthorName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    BookName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    condition:{
        type:   Sequelize.ENUM,
        values: ['New', 'Almost New', 'Slight Damage','Worn'],
    },
    Product_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },

})




db.sync()
    .then(() => console.log("Database has been synced"))
    .catch((err) => console.error("Error creating database"))

exports = module.exports = {
    User:User,  Product:Product, Wishlist: Wishlist, Message:Message, Cart:Cart, Chkout:Chkout, db:db
}