// import { useEffect, useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import Navbar from "../../pages/common/header";
// import { useGetList, useSaveProduct } from "../product/productQuery";

// export default function AdminProduct() {
//   // ✅ Capitalized function name
//   const [products, setProducts] = useState<
//     {
//       id: string;
//       productName: string;
//       price: string;
//       quantity: string;
//       image: string;
//       description: string;
//     }[]
//   >([]);

//   const [currentProduct, setCurrentProduct] = useState({
//     id: "",
//     productName: "",
//     price: "",
//     quantity: 1,
//     image: "" as string | File, // ✅ Fixed type
//     description: "",
//   });

//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch products using the useGetList hook
//   const { data: fetchedProducts, refetch } = useGetList();

//   useEffect(() => {
//     if (fetchedProducts) {
//       setProducts(fetchedProducts);
//     }
//   }, [fetchedProducts]);

//   const { mutate: saveProduct } = useSaveProduct();

//   const addProduct = () => {
//     const formData = new FormData();
//     formData.append("productName", currentProduct.productName);
//     formData.append("price", currentProduct.price);
//     formData.append("quantity", currentProduct.quantity.toString());
//     formData.append("description", currentProduct.description);

//     if (currentProduct.image instanceof File) {
//       formData.append("image", currentProduct.image);
//     }

//     saveProduct(formData, {
//       onSuccess: () => {
//         setCurrentProduct({
//           id: "",
//           productName: "",
//           price: "",
//           quantity: 1,
//           image: "",
//           description: "",
//         });
//         refetch();
//       },
//       onError: (error) => {
//         console.error("Error saving product:", error);
//       },
//     });
//   };

//   const filteredProducts = products.filter((product) =>
//     product.productName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 min-h-screen">
//       <Navbar />

//       <div className="container mx-auto p-6">
//         <div className="bg-white shadow-2xl rounded-2xl p-8 mb-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//             Add New Product
//           </h2>

//           <div className="grid md:grid-cols-2 gap-6">
//             <input
//               type="text"
//               value={currentProduct.productName}
//               onChange={(e) =>
//                 setCurrentProduct({
//                   ...currentProduct,
//                   productName: e.target.value,
//                 })
//               }
//               placeholder="Enter product name"
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//             <input
//               type="number"
//               value={currentProduct.price}
//               onChange={(e) =>
//                 setCurrentProduct({ ...currentProduct, price: e.target.value })
//               }
//               placeholder="Enter product price"
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//             <input
//               type="number"
//               value={currentProduct.quantity}
//               onChange={(e) =>
//                 setCurrentProduct({
//                   ...currentProduct,
//                   quantity: +e.target.value,
//                 })
//               }
//               placeholder="Enter quantity"
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               min="1"
//             />
//             <textarea
//               value={currentProduct.description}
//               onChange={(e) =>
//                 setCurrentProduct({
//                   ...currentProduct,
//                   description: e.target.value,
//                 })
//               }
//               placeholder="Enter product description"
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             ></textarea>
//           </div>

//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               if (e.target.files) {
//                 setCurrentProduct({
//                   ...currentProduct,
//                   image: e.target.files[0],
//                 });
//               }
//             }}
//             className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-4"
//           />

//           {currentProduct.image && (
//             <img
//               src={
//                 currentProduct.image instanceof File
//                   ? URL.createObjectURL(currentProduct.image)
//                   : currentProduct.image
//               }
//               alt="Preview"
//               className="w-32 h-32 mt-4 object-cover rounded-lg border"
//             />
//           )}

//           <button
//             onClick={addProduct}
//             className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
//           >
//             Add Product
//           </button>
//         </div>

//         <div className="relative w-full md:w-1/3 mx-auto mb-6">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="px-4 py-2 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none pl-10"
//             placeholder="Search products..."
//           />
//           <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//         </div>

//         <div className="bg-white shadow-2xl rounded-2xl p-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6">
//             Product List
//           </h2>
//           {filteredProducts.length === 0 ? (
//             <p className="text-gray-500 text-center">No products available.</p>
//           ) : (
//             <ul className="space-y-4">
//               {filteredProducts.map((product) => (
//                 <li
//                   key={product.id}
//                   className="flex justify-between items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
//                 >
//                   <div className="flex gap-4 items-center">
//                     {product.image && (
//                       <img
//                         src={product.image}
//                         alt={product.productName}
//                         className="w-16 h-16 object-cover rounded-lg border"
//                       />
//                     )}
//                     <div>
//                       <h3 className="text-lg font-bold text-gray-800">
//                         {product.productName}
//                       </h3>
//                       <p className="text-sm text-gray-500">${product.price}</p>
//                       <p className="text-sm text-gray-500">
//                         Qty: {product.quantity}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         {product.description}
//                       </p>
//                     </div>
//                   </div>
//                   <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200">
//                     Delete
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
