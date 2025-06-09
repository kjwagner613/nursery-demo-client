import { useState, useEffect, useContext } from "react";
import FlipDeckGallery from "../components/FlipDeckGallery"; // Use new flip deck gallery
import AuthContext from "../context/AuthContext";
import "../index.css"; 
const BASE_URL = import.meta.env.VITE_API_URL;



// Define category data globally
const categoryData = {
  Desert: ["Cacti", "Succulents", "Dry Flowers"],
  Mountain: ["Evergreens", "Alpine Flowers"],
  Tropical: ["Palms", "Orchids", "Ferns"],
  Forest: ["Maples", "Pine", "Birch"]
};

// CategoryFilter Component
const CategoryFilter = ({ setSelectedCategory, categoryData }) => {
  const [selectedCategory, setCategory] = useState("");
  const [selectedSubcategory, setSubcategory] = useState("");

  return (
    <>

      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="All">All Products</option>
        {Object.keys(categoryData).map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>


      {selectedCategory && (
        <select onChange={(e) => setSubcategory(e.target.value)}>
          <option id="subcategory-select" value="">Select Subcategory</option>
          {categoryData[selectedCategory].map(subcat => (
            <option key={subcat} value={subcat}>{subcat}</option>
          ))}
        </select>
      )}
    </>
  );
};

// Products Component
const Products = () => {
  const { token } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQty, setSelectedQty] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [purchaseList, setPurchaseList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const categoryQuery = selectedCategory && selectedCategory !== "All" ? `?category=${selectedCategory}` : "";

      const response = await fetch(`${BASE_URL}/api/products${categoryQuery}`, { headers });

      if (!response.ok) {
        console.error("Error fetching products:", response.statusText);
        setProducts([]);
        setSelectedProduct(null);
        return;
      }

      const data = await response.json();
      setProducts(data.length > 0 ? data : []);
      setSelectedProduct(data.length > 0 ? data[0] : null);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, token]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") handlePrevImage();
      if (event.key === "ArrowRight") handleNextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentImageIndex]);

  useEffect(() => {
    setCurrentProductIndex(0);
    setCurrentImageIndex(0);
  }, [searchTerm]);

  useEffect(() => {
    if (selectedProduct) {
      setTotalPrice(selectedProduct.price * selectedQty);
    } else {
      setTotalPrice(0);
    }
  }, [selectedProduct, selectedQty]);

  const addToPurchaseList = () => {
    if (!selectedProduct) return;

    setPurchaseList((prevList) => {
      const existing = prevList.find(item => item.product._id === selectedProduct._id);
      if (existing) {
        return prevList.map(item =>
          item.product._id === selectedProduct._id
            ? { ...item, quantity: item.quantity + selectedQty }
            : item
        );
      } else {
        return [...prevList, { product: selectedProduct, quantity: selectedQty }];
      }
    });
  };

  const calculateTotalCost = () => {
    return purchaseList.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2);
  };

  const removeFromPurchaseList = (productId) => {
    setPurchaseList((prevList) => prevList.filter(item => item.product._id !== productId));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || selectedCategory === "" || product.category === selectedCategory)
  );


  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-main)', fontSize: 'var(--font-size-titles)' }} className="pt-2">
        Product Gallery
      </h1>

      <CategoryFilter setSelectedCategory={setSelectedCategory} categoryData={categoryData} />

      {selectedCategory && (
        <div className="my-4">
          <input
            type="text"
            placeholder="Search products..."
            className="border rounded p-2 w-full md:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {loading ? <p>Loading products...</p> : null}
      {!selectedCategory && !loading && <p>Please select a category to begin.</p>}

      <div className="max-w-[1300px] mx-auto px-[10vw]">
        <div className="flex flex-row justify-between gap-8 mt-8 w-full">
          {/* Left column: Product info and navigation */}
          <div className="flex flex-col items-start border-2 border-green-900 rounded-lg p-6"
            style={{ background: "#e6e9bf", width: "350px", }}>
            {filteredProducts.length > 0 && (
              <>
                <h2>{filteredProducts[currentProductIndex].name}</h2>
                <p>Category: {filteredProducts[currentProductIndex].category} / {filteredProducts[currentProductIndex].subcategory}</p>
                <p>Price: ${filteredProducts[currentProductIndex].price.toFixed(2)}</p>

                <label htmlFor="qty-select">Quantity:</label>
                <select id="qty-select" value={selectedQty} onChange={(e) => setSelectedQty(Number(e.target.value))}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>

                <p>Total Price: ${(filteredProducts[currentProductIndex].price * selectedQty).toFixed(2)}</p>

                {/* Product navigation */}
                <div className="flex gap-2 mt-4">
                  <button onClick={() => currentProductIndex > 0 && setCurrentProductIndex(currentProductIndex - 1)}>Previous</button>
                  <button onClick={() => currentProductIndex < filteredProducts.length - 1 && setCurrentProductIndex(currentProductIndex + 1)}>Next</button>
                </div>
                <button className="mt-7" onClick={addToPurchaseList}>Add to Cart</button>
              </>
            )}
          </div>

          {/* Right column: FlipDeckGallery */}
          <div className="flex flex-col items-center justify-center self-center border-2"
            style={{ background: "#e6e9bf", width: "350px", paddingLeft: 8 }}>
            <FlipDeckGallery products={filteredProducts} currentProductIndex={currentProductIndex}
              setCurrentProductIndex={setCurrentProductIndex} currentImageIndex={currentImageIndex}
              setCurrentImageIndex={setCurrentImageIndex} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;