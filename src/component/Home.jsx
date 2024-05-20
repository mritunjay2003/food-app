import { useEffect, useState } from "react";
import Banner from "./Banner"
import FoodCards from "./FoodCards"
import Navbar from "./Navbar"



function Home() {


    const [products, setProducts] = useState([])

    async function fetchProducts() {
        const res = await fetch("http://localhost:4000/api/v1/product")
        const data = await res.json()
        setProducts(data.product)



    }


    useEffect(() => {

        fetchProducts()
    }, [])


    return (

        <div>
            <Navbar />
            <Banner />
            <FoodCards products={products} />
        </div>

    )

}

export default Home;