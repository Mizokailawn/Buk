import VehicleSellForm from "@/components/sell/sellform";

const page = () => {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-auto max-w-92.5 md:max-w-3xl pt-15 pb-15 px-5">
        <VehicleSellForm />
      </div>
    </div>
  );
};

export default page;
