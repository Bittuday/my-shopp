import Image from 'next/image'
import React from 'react'

function CategoryCard() {
    return (
        <div className="row">
            <Image src="..." className="card-img-top" alt="category image" />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    )
}

export default CategoryCard
