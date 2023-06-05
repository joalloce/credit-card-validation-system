import CreditCardForm from "../components/CreditCardForm";

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="pb-2 m-2 text-lg font-bold">
        Validate Credit Card Information
      </h1>
      <CreditCardForm />
    </div>
  );
};

export default Home;
