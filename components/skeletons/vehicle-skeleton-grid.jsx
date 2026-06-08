import { SkeletonCard } from "./skeleton-card";

export default function VehicleSkeletonGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
