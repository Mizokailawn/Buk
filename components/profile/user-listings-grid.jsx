import UserVehicleCard from "./user-car-card";

export default function UserListingsGrid({ listings }) {
    return (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {listings.map((vehicle) => (
                <UserVehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
        </div>    
    )
}