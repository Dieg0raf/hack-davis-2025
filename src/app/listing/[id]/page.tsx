// import Navbar from "@/components/Navbar";
import ListingContent from "./ListingContent";

type Props = {
  params: {
    id: string;
  };
};

export default function ListingPage({ params }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ListingContent id={params.id} />
      </main>
    </div>
  );
}
