import { IoMdCart } from "react-icons/io";
import appLogo from '../assets/app-logo.png'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import toast from 'react-hot-toast';


function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const addToCart = async (prodId) => {
console.log("btn pressed")
        try {
            const result = await axios.post('http://localhost:5000/api/cart',{prodId:prodId});
            if(result.data.error){
                toast.error("Error! "+result.data.error);
            }
            else{
                 toast.success(result.data.message);
            }

        } catch (err) {
            toast.error(err.message);
            console.log();
        }
    }
    const getProducts = async () => {
        try {
            const result = await axios.get('http://localhost:5000/api/products');
            if (result.data.message) {
                
                setProducts(result.data.products);
                
            }
            else{
                toast.error("Error! "+result.data.error);
            }

        } catch (err) {
            toast.error(err.message);
            console.log(err.message);
        }
    }
    return (
        <div className="home-page">
            <div className="header-div">
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center', fontSize: '25px', fontWeight: 'bold', color: 'darkblue' }}>
                    <img src={appLogo} alt="" style={{ width: '35px', height: '35px', objectFit: 'contain' }} />
                    <span>Shop<span style={{ color: 'orangered' }}>Cart</span></span>
                </div>
                <div className="open-cart-btn" onClick={() => navigate('/cart')} style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '20px' }}>
                    <IoMdCart size={25} />
                </div>
            </div>
            <div style={{ marginTop: '65px', textAlign: 'center', fontWeight: 'bold', fontSize: '26px', color: '#1f1f1f' }}>Products For You</div>
            <div className="home-products">
                {products.map((p, i) => <div key={i} className="prod-card" >
                    <img src={p.images[0]} alt="" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'contain', backgroundColor: 'white' }} />
                    <button className="add-to-cart-btn" onClick={() => addToCart(p.id)} ><MdAddShoppingCart /> Add To cart</button>
                    <span className="card-name" >{p.name}</span>
                    <span className="card-brand" >{p.brand}</span>
                    <span className="card-price" >₹{p.price}</span>
                </div>)}
            </div>


        </div>
    )
}

export default Home;