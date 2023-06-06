import React from 'react'
import Header from './Header'
import SideNav from './SideNav'

function Layout({ children }) {
    return (
        <>
            <Header />
            <div className="container-md mt-4">
                <div className="row g-3">
                    <div className="col-md-3 d-none d-md-block">
                        <SideNav />
                    </div>
                    <div className="col-12 col-md-9">
                        {children}
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default Layout
