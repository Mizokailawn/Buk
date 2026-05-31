import ListingsWrapper from "@/components/listings/listingsgridwrapper";

export default async function ListingsPage({ searchParams }) {
  return (
    <div className="px-3 w-full h-full max-w-6xl mx-auto">
      <ListingsWrapper searchParams={searchParams} />
    </div>
  );
}
