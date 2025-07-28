import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavBar from "../../pages/common/adminnavbar";
import {
  useDeleteProduct,
  useGetList,
  useSaveProduct,
  useUpdateProduct,
} from "./productQuery";

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
    _id: "",
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
  const deleteProduct = useDeleteProduct();
  const updateProduct = useUpdateProduct();

  useEffect(() => {
    if (fetchedProducts?.data) {
      setProducts(fetchedProducts.data);
    }
  }, [fetchedProducts]);

  const addOrUpdateProduct = () => {
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

    if (currentProduct._id) {
      updateProduct.mutate(
        { formData, productId: currentProduct._id },
        {
          onSuccess: () => {
            toast.success("Product updated successfully!", {
              position: "top-right",
            });
            setCurrentProduct({
              _id: "",
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
              (error as any)?.response?.data?.message ||
                "Failed to update product",
              { position: "top-right" }
            );
          },
        }
      );
    } else {
      saveProduct.mutate(formData, {
        onSuccess: () => {
          toast.success("Product added successfully!", {
            position: "top-right",
          });
          setCurrentProduct({
            _id: "",
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
    }
  };

  const handleEdit = (product: any) => {
    setCurrentProduct({
      _id: product._id,
      productName: product.productName,
      price: product.price,
      quantity: product.quantity,
      image: product.image,
      description: product.description,
      type: product.type,
    });
    const imageUrl = `https://localhost:3000/${product.image.replace("public/", "")}`;
  setPreviewImage(imageUrl);
  };

  const handleDelete = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct.mutate(productId, {
        onSuccess: () => {
          toast.success("Product deleted successfully!", {
            position: "top-right",
          });
          refetch();
        },
        onError: (error) => {
          toast.error(
            (error as any)?.response?.data?.message ||
              "Failed to delete product",
            { position: "top-right" }
          );
        },
      });
    }
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminNavBar />
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            {currentProduct._id ? "Edit Product" : "Add New Product"}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
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
              className="border p-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Price"
              value={currentProduct.price}
              onChange={(e) =>
                setCurrentProduct({ ...currentProduct, price: e.target.value })
              }
              className="border p-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="border p-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
            />
            <select
              value={currentProduct.type}
              onChange={(e) =>
                setCurrentProduct({ ...currentProduct, type: e.target.value })
              }
              className="border p-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" className="font-bold">
                Select Type
              </option>
              <option value="Shoe">Shoes</option>
              <option value="T-Shirt">T-shirt</option>
              <option value="Cap">Cap</option>
              <option value="Scocks">Scocks</option>
              <option value="Belt">Belt</option>
              <option value="Wallet">Wallet</option>
              <option value="Shirt">Shirt</option>
            </select>
            <textarea
              placeholder="Description"
              value={currentProduct.description}
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  description: e.target.value,
                })
              }
              className="border p-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="border p-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            onClick={addOrUpdateProduct}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 w-full"
          >
            {currentProduct._id ? "Update Product" : "Add Product"}
          </button>
        </div>

        <div className="relative w-full md:w-1/3 mx-auto mt-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-3 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 pl-10 text-lg"
            placeholder="Search products..."
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="bg-white shadow-xl rounded-lg p-6 mt-8">
          <h2 className="text-3xl font-semibold mb-6">Product List</h2>
          {isLoading ? (
            <p className="text-gray-600 text-center">Loading products...</p>
          ) : error ? (
            <p className="text-red-500 text-center">Error loading products</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-gray-500 text-center">No products available.</p>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left font-semibold">Product Name</th>
                  <th className="p-3 text-left font-semibold">Price</th>
                  <th className="p-3 text-left font-semibold">Image</th>
                  <th className="p-3 text-left font-semibold">Description</th>
                  <th className="p-3 text-left font-semibold">Quantity</th>
                  <th className="p-3 text-left font-semibold">Type</th>
                  <th className="p-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{product.productName}</td>
                    <td className="p-3 text-green-600">Rs {product.price}</td>
                    <td className="p-3">
                      <img
                        src={`https://localhost:3000/${product.image.replace(
                          "public/",
                          ""
                        )}`}
                        alt=".img"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="p-3">{product.description}</td>
                    <td className="p-3">{product.quantity}</td>
                    <td className="p-3">{product.type}</td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
                      >
                        Delete
                      </button>
                    </td>
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
