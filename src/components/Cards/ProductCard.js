import Image from 'next/image'
import Link from 'next/link'
import { BiCartAdd, BiRupee } from 'react-icons/bi'
import toast from 'react-hot-toast';
import { addToCart } from '../../../utils/cartItems';
import { useRouter } from 'next/router';

function ProductCard({ product }) {

    const router = useRouter();

    return (

        <div className="card" >
            <Link href={`/product/${product?.id}`}>
                <div className="object-fit-cover  ">
                    <Image src={product?.thumbnail} width={200} height={220} alt={product?.title} className="card-img-top" />
                </div>
            </Link>
            <div className="card-body text-truncate mx-2">
                <Link href={`/product/${product?.id}`} className='text-decoration-none'>
                    <h5 className="card-title text-black">{product?.title}</h5>
                </Link>
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-title d-flex align-items-center"><BiRupee size={21} /> {product?.price}</h6>
                    <div className="d-flex ">
                        <button className='btn btn-sm btn-warning mx-2' onClick={(e) => { addToCart(product, 1), toast.success("Added in cart") }}><BiCartAdd size={22} /></button>
                        <button className='btn btn-sm btn-success' onClick={(e) => { addToCart(product, 1), router.push('/cart') }}>Buy</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
