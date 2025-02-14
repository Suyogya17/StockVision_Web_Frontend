import { useForm } from "react-hook-form";

function ProductForm() {
  const { register, handleSubmit } = useForm();

  const submit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <label>product Name</label>
        <input type="text" {...register("productName")} />
      </div>
      <div>
        <label> Image</label>
        <input type="text" {...register("image")} />
      </div>
      <div>
        <label>Description </label>
        <input type="text" {...register("description")} />
      </div>
      <div>
        <label>Type </label>
        <input type="text" {...register("type")} />
      </div>
      <div>
        <label>Quantity</label>
        <input type="text" {...register("quantity")} />
      </div>
      <div>
        <label>Price</label>
        <input type="text" {...register("price")} />
      </div>
    </form>
  );
}

export default ProductForm;
