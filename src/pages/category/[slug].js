import ProductCard from '@/components/Cards/ProductCard';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react'

function CategoryProducts({ products }) {

    const router = useRouter();
    const categoryName = router?.query?.slug;

    return (
        <>
            <Head>
                <title>{`${categoryName} products`} </title>
            </Head>
            <main className='mb-4 -mt-1'>
                <Breadcrumb title={`${categoryName?.toLocaleUpperCase()} - Products`} />
                <div className='row'>
                    {
                        products?.map((item, i) => {
                            return (
                                <div key={i} className="col-lg-4">
                                    <div className="mt-4 mx-0">
                                        <ProductCard product={item} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </main>
        </>

    )
}

export default CategoryProducts


export async function getServerSideProps(context) {

    const category = context.params.slug;

    const response = await fetch(`https://dummyjson.com/products/category/${category}`);
    const result = await response.json();
    return {
        props: {
            products: result?.products
        }, // will be passed to the page component as props
    }
}