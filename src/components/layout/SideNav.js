import React from 'react'
import { MdDevices, MdCategory, MdCircle, MdOutlineDesktopWindows, MdLaptopMac, MdPhoneAndroid, MdWatch, MdLinkedCamera } from 'react-icons/md'
import { BsDash } from 'react-icons/bs'
import Link from 'next/link'
import { fetcher } from '../../../utils/swrFatcher'
import useSWR from 'swr'

function SideNav() {
    const { data, error, isLoading } = useSWR('https://dummyjson.com/products/categories', fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    return (
        <div className="w-100">
            <ul className="list-group">
                <li className="list-group-item d-flex align-items-center  navbar-top-bg">
                    <h5 className='text-white mt-2 text-uppercase'><MdCategory /> Categories</h5>
                </li>
                {data?.map((category, i) => {
                    return (
                        <Link key={i} href={`/category/${category}`} className='text-decoration-none'>
                            <li className="list-group-item list-group-item-action d-flex align-items-center"><BsDash size={24} className="m-2" />{category?.toUpperCase()}</li>
                        </Link>
                    )
                })}
                {/* 
                <li className="list-group-item list-group-item-action d-flex align-items-center"><MdOutlineDesktopWindows size={24} className="m-2" />Desktops</li>
                <li className="list-group-item list-group-item-action d-flex align-items-center"><MdLaptopMac size={24} className="m-2" />Laptops</li>
                <li className="list-group-item list-group-item-action d-flex align-items-center"><MdPhoneAndroid size={24} className="m-2" />Mobiles</li>
                <li className="list-group-item list-group-item-action d-flex align-items-center"><MdWatch size={24} className="m-2" />Components</li>
                <li className="list-group-item list-group-item-action d-flex align-items-center"><GiClothes size={24} className="m-2" />Cloths</li>
                <li className="list-group-item list-group-item-action d-flex align-items-center"><BiDish size={24} className="m-2" />Kitchen</li>
                <li className="list-group-item list-group-item-action d-flex align-items-center"><GiDoubleNecklace size={24} className="m-2" />Jwellery</li>
                <li className="list-group-item list-group-item-action d-flex align-items-center"><BiStoreAlt size={24} className="m-2" />Grocery</li>
                <li className="list-group-item list-group-item-action d-flex align-items-center"><MdLinkedCamera size={24} className="m-2" />Cameras</li> */}

            </ul>
        </div>
    )
}

export default SideNav