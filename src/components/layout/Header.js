import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BsCart4 } from 'react-icons/bs'
import { getCartItems } from '../../../utils/cartItems';

function Header() {

    const [cart, setCart] = useState(0);
    useEffect(() => {
        setInterval(() => {
            const cardIdems = getCartItems();
            setCart(cardIdems.length)
        }, 1000)

    }, [])


    return (
        <>
            <nav className="navbar navbar-top-bg text-white d-none d-md-block">
                <div className="container-md ">
                    <i className="nav-item navbar-nav">Get Up to 70% Discount Everyday</i>
                    <div className="dropdown p-0">
                        <span className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            My Account
                        </span>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Register</a></li>
                            <li><a className="dropdown-item" href="#">Login</a></li>
                        </ul>
                    </div>

                </div>
            </nav>
            <nav className="navbar navbar-bg  px-2">
                <div className="container-md">
                    <Link href="/" className="navbar-brand">Ecommerce</Link>
                    <Link href="/cart" className="nav-item nav-link d-flex gap-1 align-items-center text-white">
                        <span className='p-1 rounded-circle bg-primary '>  <BsCart4 size={21} className="pb-1" /></span>{cart} items</Link>
                </div>
            </nav>
            <nav className="navbar navbar-expand-lg shadow-sm  mb-2 bg-body rounded container px-2 ">

                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav">
                        <Link href="/store" className="nav-item nav-link active">Store</Link>
                        <Link href="/about" className="nav-item nav-link ">About Us</Link>
                        <Link href="#" className="nav-item nav-link">Support</Link>
                    </div>
                    {/* <div className="navbar-nav ms-auto">
                        <Link href="#" className="nav-item nav-link ">Cart</Link>
                        <Link href="#" className="nav-item nav-link ">Login</Link>
                    </div> */}
                </div>
            </nav>

        </>

    );
}

export default Header
