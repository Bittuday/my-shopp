import Breadcrumb from '@/components/layout/Breadcrumb'
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiRupee } from 'react-icons/bi';
import { getCartItems, removeFromCart, updateCartItemQuantity } from '../../utils/cartItems';

function Cart() {
    const router = useRouter();
    const [cart, setCart] = useState(getCartItems());
    const [yourCart, setYourCart] = useState({
        subTotal: 0,
        gstAmount: 0,
        grandTotal: 0
    });

    const incrementQty = (product) => {
        const newQty = product.qty + 1;
        if (newQty <= 100) { // stock qty
            const productId = product.id
            updateCartItemQuantity(productId, newQty)
            setCart(getCartItems())
        }
    }
    const decrementQty = (product) => {
        const newQty = product.qty - 1;
        if (newQty > 0) { // not negative value
            const productId = product.id
            updateCartItemQuantity(productId, newQty)
            setCart(getCartItems())
        }

    }
    const removehandler = (productId) => {
        removeFromCart(productId)
        setCart(getCartItems())
    }

    useEffect(() => {
        let total = 0
        let gstAmount = 0
        cart.map((item) => {
            total += item.price * item.qty
        })
        gstAmount = total * 18 / 100;
        setYourCart({ ...yourCart, subTotal: total, gstAmount: gstAmount, grandTotal: total + gstAmount })

    }, [cart])

    const checkoutHandler = () => {
        Cookies.set('yourCart', JSON.stringify(yourCart))
        router.push('/checkout')
    }

    return (
        <>
            <Head>
                <title>Your Cart</title>
            </Head>
            <Breadcrumb title={'Your Cart'} />
            <div className="table-responsive mt-4">
                <table className='table table-borderless'>
                    <thead>
                        <tr className='border-bottom'>
                            <th scope="col">Item</th>
                            <th scope="col">Price</th>
                            <th className='float-end' scope="col">Quantity</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (cart.length > 0) ? cart?.map((item, i) => {
                                return (
                                    <tr className='border-bottom'>
                                        <td>
                                            <div className="d-flex gap-3">
                                                <Image src={item?.image} className='rounded-circle' width={40} height={40} alt={item?.title} />
                                                {item?.title}
                                            </div>
                                        </td>
                                        <td className='text-center'><span className='d-flex align-items-center'><BiRupee size={21} /> {item?.price}</span> </td>
                                        <td className='text-center'>
                                            <div className="input-group input-group-sm w-50 mb-3 border float-end">
                                                <button className='btn input-group-text btn-sm btn-outline-dark' onClick={() => decrementQty(item)}>-</button>
                                                <input type="tel" className="form-control" value={item?.qty} />
                                                <button className='btn input-group-text btn-sm btn-outline-dark' onClick={() => incrementQty(item)}>+</button>
                                            </div>
                                        </td>
                                        <td className='text-center d-flex justify-content-between'>
                                            <span className='d-flex align-items-center text-center'>
                                                <BiRupee size={21} /> {item?.price * item?.qty}</span>
                                            <button className='btn btn-sm btn-danger' onClick={() => removehandler(item?.id)}>X</button>
                                        </td>
                                    </tr>
                                )
                            }) : <tr><td className='text-center text-danger' colSpan={4}>Empty Card</td></tr>
                        }
                        {(cart.length > 0) && <>
                            <tr>
                                <td ></td>
                                <th className='border-bottom' colSpan="2" >Subtotal</th>
                                <th className='border-bottom'>
                                    <span className='d-flex align-items-center text-center'>
                                        <BiRupee size={18} /> {yourCart?.subTotal?.toFixed(2)}</span>
                                </th>
                            </tr>
                            <tr>
                                <td ></td>
                                <th className='border-bottom' colSpan="2" > 18% GST</th>
                                <th className='border-bottom'><span className='d-flex align-items-center text-center'>
                                    <BiRupee size={18} /> {yourCart?.gstAmount?.toFixed(2)}</span></th>
                            </tr>
                            <tr>
                                <td ></td>
                                <th className='border-bottom' colSpan="2" >Shipping Charge</th>
                                <th className='border-bottom'>Free</th>
                            </tr>
                            <tr>
                                <td></td>
                                <th className='border-bottom' colSpan="2" >Grand total</th>
                                <th className='border-bottom'>
                                    <span className='d-flex align-items-center text-center'>
                                        <BiRupee size={18} /> {yourCart?.grandTotal?.toFixed(2)}</span>
                                </th>
                            </tr>
                            <tr>
                                <td></td>
                                <td colSpan="3" className='border-bottom'>
                                    <button className='btn btn-primary float-end' onClick={() => checkoutHandler()}>Checkout</button>
                                </td>
                            </tr>
                        </>}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default Cart