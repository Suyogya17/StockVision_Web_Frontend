import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSaveProduct } from "./productQuery"; // Your API mutation hook

const ProductForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const saveProduct = useSaveProduct(); // Custom API mutation

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("quantity", data.quantity);
    formData.append("price", data.price);

    if (data.image) {
      formData.append("image", data.image); // Ensure it's a single file, not an array
    } else {
      toast.error("Please select an image");
      return;
    }

    saveProduct.mutate(formData, {
      onSuccess: () => {
        toast.success("Product added successfully!");
        reset();
        setPreviewImage(null);
      },
      onError: (error: any) => {
        console.error("Error response:", error?.response);
        toast.error(error?.response?.data?.message || "Failed to add product");
      },
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setValue("image", e.target.files[0], { shouldValidate: true }); // Ensure the correct file format
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Product</h2>

        <div className="flex justify-center mb-4">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover border border-gray-300"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-full text-gray-500">
                Upload Image
              </div>
            )}
          </label>
        </div>
        {errors.image && (
          <p className="text-red-500 text-sm">
            {errors.image.message as string}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Product Name</label>
            <input
              type="text"
              {...register("productName", {
                required: "Product name is required",
              })}
              className="w-full px-4 py-2 border rounded focus:border-blue-500"
            />
            {errors.productName && (
              <p className="text-red-500 text-sm">
                {errors.productName.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full px-4 py-2 border rounded focus:border-blue-500"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Product Type</label>
            <input
              type="text"
              {...register("type", { required: "Product type is required" })}
              className="w-full px-4 py-2 border rounded focus:border-blue-500"
            />
            {errors.type && (
              <p className="text-red-500 text-sm">
                {errors.type.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Quantity</label>
            <input
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
                valueAsNumber: true,
              })}
              className="w-full px-4 py-2 border rounded focus:border-blue-500"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">
                {errors.quantity.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
              className="w-full px-4 py-2 border rounded focus:border-blue-500"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">
                {errors.price.message as string}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
