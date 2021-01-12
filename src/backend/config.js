const dotenv = require('dotenv');

/*export default dotenv.config({
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID
})*/
dotenv.config();
// eslint-disable-next-line import/no-anonymous-default-export
module.exports = {
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    JWT_SECRET: process.env.JWT_SECRET,
};
