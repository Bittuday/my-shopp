import Breadcrumb from '@/components/layout/Breadcrumb';
import Head from 'next/head';
import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { BiRupee } from 'react-icons/bi';
import { addToCart } from '../../../utils/cartItems';

function SingleProduct({ product }) {
    const [quantity, setQuantity] = useState(1);
    const router = useRouter()

    return (
        <>
            <Head>
                <title>{product?.title}</title>
            </Head>
            <main className='mb-4 -mt-1'>
                <Breadcrumb title={'Product'} />
                <div className="row g-3">
                    <div className="col-lg-6">
                        <div className="p-2">
                            <Image src={product?.thumbnail} className="border" alt={product?.title} width={350} height={300} />
                        </div>
                        <div className=""></div>
                    </div>
                    <div className="col-lg-6">
                        <h2>{product?.title}</h2>
                        <h4 className="card-title d-flex align-items-center"><BiRupee size={21} /> {product?.price}</h4>
                        <h5 className='mt-2'>Description</h5>
                        <p>{product?.description}</p>
                        <div className="d-flex gap-3">
                            <b>Qty:</b>
                            <div className="input-group input-group-sm w-25 mb-3 border">
                                <button className='btn input-group-text btn-sm btn-outline-dark' onClick={() => setQuantity((quantity > 1) ? quantity - 1 : 1)}>-</button>
                                <input type="tel" className="form-control" value={quantity} />
                                <button className='btn input-group-text btn-sm btn-outline-dark' onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                        </div>
                        <div className="d-flex gap-3 mt-4">
                            <button type='button' className='btn btn-sm btn-warning' onClick={() => { addToCart(product, quantity), toast.success("Added to cart") }} >Add To Cart</button>
                            <button type='button' className='btn btn-sm btn-success' onClick={() => { addToCart(product, quantity), router.push('/cart') }} >Buy Now</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SingleProduct


export async function getServerSideProps(context) {
    const productId = context?.params?.slug;
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const product = await response.json();
    return {
        props: {
            product
        }, // will be passed to the page component as props
    }
}