import useForm from "../../../hooks/useForm/useForm";

const FORM_ENDPOINT = "http://localhost:3000/api/produtoservicos"; // TODO - update to the correct endpoint

const Form = () => {
  const additionalData = {
    sent: new Date().toISOString(),
  };

  const { handleSubmit, status, message } = useForm({
    additionalData,
  });

  if (status === "success") {
    return (
      <>
        <div>Thank you!</div>
        <div>{message}</div>
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        <div>Something bad happened!</div>
        <div>{message}</div>
      </>
    );
  }

  return (
    <form
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      method="POST"
    >
      <div className="pt-0 mb-3">
        <input
          type="text"
          placeholder="Your produto name"
          name="selectedProductName"
          required
        />
      </div>
      <div className="pt-0 mb-3">
        <input
         type="text"
         placeholder="o. que ele faz"
         name="selectedProductDescription"
         required
        />
      </div>
      <div className="pt-0 mb-3">
        <input
         type="text"
         placeholder="qual o seu preço"
         name="selectedProductPrice"
         required
        />
      </div>
      {status !== "loading" && (
        <div className="pt-0 mb-3">
          <button type="submit">
            Send a message
          </button>
        </div>
      )}
    </form>
  );
};

export default Form;


