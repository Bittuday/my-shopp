import Breadcrumb from '@/components/layout/Breadcrumb';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BiRupee } from 'react-icons/bi';
import { getCartItems } from '../../utils/cartItems';

function Checkout() {
    const [cart, setCart] = useState(getCartItems());
    const [yourCart, setYourCart] = useState({});

    useEffect(() => {
        setYourCart(JSON.parse(Cookies.get('yourCart')))
    }, [cart])
    return (
        <>
            <Head>
                <title>Checkout</title>
            </Head>
            <Breadcrumb title={'Checkout'} />
            <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last">
                    <Link className='text-decoration-none' href="/cart">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Your cart</span>
                            <span className="badge bg-primary rounded-pill">{cart?.length}</span>
                        </h4>
                    </Link>

                    <ul className="list-group mb-3">
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Subtotal (<BiRupee size={21} />)</span>
                            <strong>{yourCart?.subTotal?.toFixed(2)}</strong>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>GST 18% (<BiRupee size={21} />)</span>
                            <strong>{yourCart?.gstAmount?.toFixed(2)}</strong>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (<BiRupee size={21} />)</span>
                            <strong>{yourCart?.grandTotal?.toFixed(2)}</strong>
                        </li>
                    </ul>
                    <form className="card p-2">
                        <div className="input-group">
                            <button className="w-100 btn btn-primary btn-lg" type="submit">Order Place</button>
                        </div>
                    </form>
                </div>
                <div className="col-md-7 col-lg-8">
                    <h4 className="mb-3">Billing address</h4>
                    <form className="needs-validation was-validated" novalidate="">
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <label for="firstName" className="form-label">First name</label>
                                <input type="text" className="form-control" id="firstName" placeholder="" value="" required />
                                <div className="invalid-feedback">
                                    Valid first name is required.
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <label for="lastName" className="form-label">Last name</label>
                                <input type="text" className="form-control" id="lastName" placeholder="" value="" required />
                                <div className="invalid-feedback">
                                    Valid last name is required.
                                </div>
                            </div>
                            <div className="col-12">
                                <label for="mobile" className="form-label">Mobile</label>
                                <input type="tel" className="form-control" id="mobile" placeholder="+91" required />
                                <div className="invalid-feedback">
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>
                            <div className="col-12">
                                <label for="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                                <div className="invalid-feedback">
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>

                            <div className="col-12">
                                <label for="address" className="form-label">Address</label>
                                <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
                                <div className="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>
                            <div className="col-12">
                                <label for="landmark" className="form-label">Landmark</label>
                                <input type="text" className="form-control" id="landmark" placeholder="Apartment or suite" />
                            </div>
                            <div className="col-md-5">
                                <label for="country" className="form-label">Country</label>
                                <select className="form-select" id="country" required>
                                    <option value="">Choose...</option>
                                    <option value="india" selected>INDIA</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please select a valid country.
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label for="state" className="form-label">State</label>
                                <select className="form-select" id="state" required>
                                    <option value="">Choose...</option>
                                    <option>California</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please provide a valid state.
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label for="zip" className="form-label">Zip</label>
                                <input type="text" className="form-control" id="zip" placeholder="" required />
                                <div className="invalid-feedback">
                                    Zip code required.
                                </div>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <h4 className="mb-3">Payment</h4>
                        <div className="my-3">
                            <div className="form-check">
                                <input id="cod" name="paymentMethod" type="radio" className="form-check-input" checked="true" required />
                                <label className="form-check-label" for="cod">cash on Delevery</label>
                            </div>
                        </div>
                        <hr className="my-4" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Checkout