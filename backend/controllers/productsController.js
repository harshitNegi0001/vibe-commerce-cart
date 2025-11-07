import db from '../utils/db.js';

class Products {
    getProducts = async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM products');
            return res.status(200).json({ message: "Success",products:result.rows });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }


}

export default new Products();