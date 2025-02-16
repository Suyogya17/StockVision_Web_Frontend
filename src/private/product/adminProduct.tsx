import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavBar from "../../pages/common/adminnavbar";
import { useGetList, useSaveProduct } from "./productQuery";

export default function AdminProduct() {
  const [products, setProducts] = useState<
    {
      _id: string;
      productName: string;
      price: string;
      quantity: number;
      image: string;
      description: string;
      type: string;
    }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentProduct, setCurrentProduct] = useState({
    productName: "",
    price: "",
    quantity: 1,
    image: "" as string | File,
    description: "",
    type: "",
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { data: fetchedProducts, refetch, isLoading, error } = useGetList();
  const saveProduct = useSaveProduct();

  useEffect(() => {
    if (fetchedProducts?.data) {
      setProducts(fetchedProducts.data);
    }
  }, [fetchedProducts]);

  const addProduct = () => {
    if (!currentProduct.image) {
      toast.error("Please select an image", { position: "top-right" });
      return;
    }
    const formData = new FormData();
    formData.append("productName", currentProduct.productName);
    formData.append("price", currentProduct.price);
    formData.append("quantity", currentProduct.quantity.toString());
    formData.append("description", currentProduct.description);
    formData.append("type", currentProduct.type);

    if (currentProduct.image instanceof File) {
      formData.append("image", currentProduct.image);
    }

    saveProduct.mutate(formData, {
      onSuccess: () => {
        toast.success("Product added successfully!", { position: "top-right" });
        setCurrentProduct({
          productName: "",
          price: "",
          quantity: 1,
          image: "",
          description: "",
          type: "",
        });
        setPreviewImage(null);
        refetch();
      },
      onError: (error) => {
        toast.error(
          (error as any)?.response?.data?.message || "Failed to add product",
          { position: "top-right" }
        );
      },
    });
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminNavBar />
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Add New Product
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={currentProduct.productName}
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  productName: e.target.value,
                })
              }
              className="border p-2 rounded w-full"
            />
            <input
              type="number"
              placeholder="Price"
              value={currentProduct.price}
              onChange={(e) =>
                setCurrentProduct({ ...currentProduct, price: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={currentProduct.quantity}
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  quantity: +e.target.value,
                })
              }
              className="border p-2 rounded w-full"
              min="1"
            />
            <input
              type="text"
              placeholder="Type"
              value={currentProduct.type}
              onChange={(e) =>
                setCurrentProduct({ ...currentProduct, type: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <textarea
              placeholder="Description"
              value={currentProduct.description}
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  description: e.target.value,
                })
              }
              className="border p-2 rounded w-full"
            ></textarea>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  setCurrentProduct({
                    ...currentProduct,
                    image: e.target.files[0],
                  });
                  setPreviewImage(URL.createObjectURL(e.target.files[0]));
                }
              }}
              className="border p-2 rounded w-full"
            />
          </div>

          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-32 h-32 mt-4 object-cover rounded-lg border"
            />
          )}

          <button
            onClick={addProduct}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Add Product
          </button>
        </div>

        <div className="relative w-full md:w-1/3 mx-auto mt-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 pl-10"
            placeholder="Search products..."
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">Product List</h2>
          {isLoading ? (
            <p className="text-gray-600 text-center">Loading products...</p>
          ) : error ? (
            <p className="text-red-500 text-center">Error loading products</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-gray-500 text-center">No products available.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left">Product Name</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Image</th>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Quantity</th>
                  <th className="p-2 text-left">Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-gray-100">
                    <td className="p-2">{product.productName}</td>
                    <td className="p-2 text-green-600 font-semibold">
                      ${product.price}
                    </td>
                    <td className="p-2">
                      <img
                        src={product.image ? product.image : "image"} // Use a default image if the product doesn't have one
                        alt={product.productName}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>

                    <td className="p-2">{product.description}</td>
                    <td className="p-2 text-center">{product.quantity}</td>
                    <td className="p-2 capitalize">{product.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
