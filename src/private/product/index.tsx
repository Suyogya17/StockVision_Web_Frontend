import { useGetList } from "./query";

interface Product {
  _id: string;
  productName: string;
  price: string;
  description: string;
  quantity: string;
  type: string;
  image: string;
}

function ProductTable() {
  // Fetch product list
  const { data: productList, isLoading, error } = useGetList();

  if (isLoading)
    return <p className="text-center text-gray-600">Loading products...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading products</p>;

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-3 text-left">Product Name</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Quantity</th>
            <th className="p-3 text-left">Type</th>
          </tr>
        </thead>
        <tbody>
          {productList?.data && productList.data.length > 0 ? (
            productList.data.map((i: Product) => (
              <tr key={i._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{i.productName}</td>
                <td className="p-3 text-green-600 font-semibold">${i.price}</td>
                <td className="p-3">
                  <img
                    src={i.image}
                    alt={i.productName}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="p-3 text-gray-600">{i.description}</td>
                <td className="p-3 text-center font-medium">{i.quantity}</td>
                <td className="p-3 capitalize">{i.type}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-3 text-center text-gray-500">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
