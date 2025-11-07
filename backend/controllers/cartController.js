import db from '../utils/db.js';

class Cart {
    addCart = async (req, res) => {
        try {
            const { prodId } = req.body;
            const isAlready = await db.query("SELECT * FROM cart_item WHERE product_id =$1", [prodId]);
            if (isAlready.rows.length > 0) {

                return res.status(200).json({ message: "Product is already added" });
            }
            else {
                await db.query('INSERT INTO cart_item (product_id) VALUES($1)', [prodId]);
                return res.status(200).json({ message: "Product added to cart" });
            }

        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    getCart = async (req, res) => {

        try {
            const result = await db.query("SELECT c.id as id, c.product_id, p.name,p.brand,p.price,p.images  FROM cart_item AS c JOIN products AS p ON p.id=c.product_id");
            return res.status(200).json({ message: "success", cartItems: result.rows });

        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
    deleteCart = async (req, res) => {
        const { cartId } = req.body;
      

        try {
            const result =await db.query('DELETE FROM cart_item WHERE id = $1', [cartId]);
            
            return res.status(200).json({ message: "success" });

        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

}

export default new Cart();