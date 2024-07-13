import { useEffect, useState } from "react";




export default function Shoppingcomponent(){

const[categories, setCategories] = useState([]);

const[products, setProducts] = useState([]);

const[cardItem, setCardItem] = useState([]);


useEffect(() => {
    loadCategories();
    loadProducts("https://fakestoreapi.com/products");
  }, []);


function loadCategories(){
    fetch("https://fakestoreapi.com/products/categories")
    .then(response => response.json())
    .then(data=>{
        setCategories(data)
    })
    .catch(error =>{
        console.error("Error fetching categories:", error);
    })
}

function loadProducts(url){
    fetch(url)
    .then(response => response.json())
    .then(data=>{
        setProducts(data)
    }).catch(error =>{
        console.log("error fetching categories:" ,error);
    })
}

function hangelAddToCard(e) {
    const id = e.target.id;

    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Update cartItems state with the new item
            setCardItem([...cardItem, data]);
        })
        .catch(error => {
            console.error('Error fetching product:', error);
        });
}

function handelCategoriesOnChange(e){

    const id = e.target.value;
    loadProducts(`https://fakestoreapi.com/products/category/${id}`)
}

    return(
        <div className="container-flux">
            <header className="bg-danger text-white text-center p-3">
                <h1> <span className="bi bi-bag-dash-fill"></span> Shopping Home</h1>
            </header>
            <section className="row">
                <nav className="col-2">
                    <div className="container">
                        <h4>Select Categories</h4>
                        <div>
                            <select className="form-select" onChange={handelCategoriesOnChange}>
                                {
                                    categories.map(cat =>
                                        <option key={cat}>{cat}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                </nav>
                <main className="col-6 d-flex flex-wrap overflow-auto" style={{height:'600px'}}>
                    {
                        products.map(prod =>
                            <div key={prod.id} className="card m-2 p-2 w-25">
                                <img src={prod.image} className="card-img-top" height="150" />
                                <div className="card-header">
                                    <p>{prod.title}</p>
                                </div>
                                <div className="card-body">
                                    <dl>
                                        <dt>Price</dt>
                                        <dd>{prod.price}</dd>
                                        <dt>Rating</dt>
                                        <dd>{prod.rating.rate}</dd>
                                    </dl>
                                </div>
                                <div className="card-footer">
                                    <button id={prod.id} onClick={hangelAddToCard} className="btn btn-info w-100">
                                        <span className="bi bi-card4">Add to Card</span>
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </main>
                <aside className="col-4">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Preview</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cardItem.map(item =>
                                    <tr key={item.id}>
                                        <td>{item.title}</td>
                                        <td>{item.price}</td>
                                        <td><img src={item.image} width="50" height="50px"></img>  </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </aside>
            </section>
       </div>
    )
}