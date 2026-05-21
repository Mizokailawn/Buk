import VehicleCard from "../cars/car-card";

const ListingsGrid = ({ listings }) => {
  return (
    <div className="space-y-3 w-full">
      <div>
        <h1 className="text-lg md:text-2xl font-medium px-2">Explore Rides</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full px-2">
        {listings.map((vehicle) => {
          if (!vehicle || !vehicle.id) {
            console.log("Skipping invalid vehicle data: ", vehicle);
            return null; // Skip rendering for this item
          }
          return <VehicleCard key={vehicle.id} vehicles={vehicle} />;
        })}
      </div>
    </div>
  );
};

export default ListingsGrid;
