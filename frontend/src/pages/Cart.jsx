import { IoArrowBackOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import empty_cart from '../assets/empty_cart.png';
import axios from "axios";


function Cart() {
    const [myCartProd, setMyCartProd] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const platChargePrecent = 10;
    const [subtotal, setSubtotal] = useState(0);
    const [grandtotal, setGrandtotal] = useState(0);
    const navigate = useNavigate()
    useEffect(() => {
        getMyCart();
    }, []);
    useEffect(() => {
        let sub = 0;
        for (let i = 0; i < myCartProd.length; i++) {
            sub += quantity[i] * (myCartProd[i].price );
        }
        setSubtotal(sub.toFixed(2));
        setGrandtotal((sub * (1 + platChargePrecent / 100)).toFixed(2));
    }, [quantity]);

    const closeProd = (i) => {
        const closedProd = myCartProd.filter((p, index) => i != index);
        setMyCartProd([...closedProd]);
        const closedQuantity = quantity.filter((q, index) => index != i);
        setQuantity([...closedQuantity]);

    }
    const deleteFromCart = async (id, i) => {
        try {
            const result = await axios.delete('http://localhost:5000/api/cart', {
                data: { cartId: id }
            });

            if (result.data.error) {
                toast.error("Error! " + result.data.error);
            }
            else {
                toast.success("Product removed from cart");
                closeProd(i);
            }

        } catch (err) {

            toast.error("Error! " + err.message);
        }
    }
    const getMyCart = async () => {
        try {
            const result = await axios.get('http://localhost:5000/api/cart');
            if (result.data.error) {
                toast.error("Error! " + result.data.error);
                console.log("backend error")
            }
            else {
                setMyCartProd(result.data.cartItems);
                const temp = result.data.cartItems.map(i => 1);
                setQuantity(temp);
            }

        } catch (err) {
            console.log("catch error")
            console.log(err)
            toast.error("Error! " + err.messsage);
        }
    }
    const reduceQuantity = (index) => {
        if (quantity[index] > 0) {
            const temp = quantity.map((q, i) => { return (i === index) ? q - 1 : q });
            setQuantity([...temp]);
        }

    }
    const increaseQuantity = (index) => {

        const temp = quantity.map((q, i) => { return (i === index) ? q + 1 : q });
        setQuantity([...temp]);


    }
    const navigateToBuy = () => {
        if (myCartProd.length > 0 && subtotal > 0) {
            navigate('/checkout', {
                state: {
                    myCartProd, quantity, grandtotal, subtotal
                }
            });
        }
        else {
            toast.error("Please select at least one product");
        }
    }
    return (
        <div>
            <div className="cart-header">

                <div className="cart-to-home" onClick={() => navigate('/')}><IoArrowBackOutline size={25} /></div>
                <span>My Cart</span>
            </div>
            <div style={{ marginTop: '65px' }}>

                {(myCartProd.length > 0) ? <div className="my-cart-cont" >
                    <div className="cart-products">
                        {myCartProd.map((prod, i) => <div key={i} className="cart-prod-detail">
                            <div className="close-card" onClick={() => closeProd(i)}><MdClose /></div>
                            <div className="cart-prod-image"><img src={prod.images?.[0]} alt="" /></div>
                            <div className="cart-prod-info">
                                <div style={{ color: "#596b70", fontSize: "16px", fontWeight: "600", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap" }}>{prod.name}</div>
                                <div style={{ color: "var(--primary)", fontSize: "12px", fontWeight: "600" }}>{prod.brand}</div>
                                <div style={{ width: "100%", height: "0px", border: "1px solid #b1b1b1", borderRadius: "5px" }}></div>
                                <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px", gap: "5px", color: "var(--text)", justifyContent: "space-between", alignItems: "center", fontSize: "12px" }}>
                                    <div style={{ display: "flex", gap: "3px" }}>QTY: <div style={{ display: "flex", gap: "3px", height: "14px", alignItems: "center", border: "1px solid gray", padding: "1px", borderRadius: "10px" }}>
                                        <FaMinus color="var(--primary)" onClick={() => reduceQuantity(i)} /> <div style={{ height: "100%", width: "0px", border: "1px solid gray" }}></div> <span style={{ padding: "0px 3px" }}>{quantity[i]}</span> <div style={{ height: "100%", width: "0px", border: "1px solid gray" }}></div> <FaPlus color="var(--primary)" onClick={() => increaseQuantity(i)} />
                                    </div></div>

                                    <div>price : ₹ {prod.price .toFixed(2)}</div>
                                    <div>total : ₹ {(prod.price  * quantity[i]).toFixed(2)}</div>
                                    <RiDeleteBin5Fill color="red" size={18} onClick={() => deleteFromCart(prod.id, i)} />
                                </div>
                            </div>
                        </div>)}
                    </div>
                    <div className="checkout-cont">
                        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}> <span>Subtotal</span> <span>₹ {subtotal}</span> </div>

                        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}><span>Platform charges</span> <span>₹ {(subtotal * platChargePrecent / 100).toFixed(2)}</span></div>
                        <div style={{ width: "100%", height: "0px", border: "1px solid var(--highlight)", borderRadius: "5px" }}></div>
                        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}><span>Grand total</span> <span>₹ {grandtotal}</span></div>
                        <div style={{ width: "100%", height: "0px", border: "1px solid var(--highlight)", borderRadius: "5px" }}></div>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}> <button onClick={() => navigateToBuy()}>Checkout</button></div>
                    </div>
                </div> : <div style={{ width: "100%", height: "calc(100vh - 120px)", fontWeight: "600", display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center", alignItems: "center" }}>
                    <img src={empty_cart} alt="" style={{ width: "300px" }} />
                    <span style={{ fontSize: "24px", color: "var(--text)" }}>Your cart is empty</span>
                    <span style={{ fontSize: "24px", color: "var(--text)" }}>Go Back <Link to={'/'} style={{ color: "blue", fontWeight: "bold", textDecoration: "none" }}>Home</Link></span>
                </div>}
            </div>
        </div>
    )
}

export default Cart;