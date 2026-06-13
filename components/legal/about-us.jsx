import { CheckCircle2, XCircle, Info } from 'lucide-react';

export default function AboutUs() {
  const whatWeDo = [
    "Allow registered users to create vehicle listings",
    "Allow visitors to browse available vehicles",
    "Help buyers discover vehicles in their area",
    "Provide search and filtering tools"
  ];

  const whatWeDoNotDo = [
    "Process payments",
    "Hold money in escrow",
    "Participate in negotiations",
    "Verify vehicle condition",
    "Guarantee vehicle ownership",
    "Provide transportation or delivery services"
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 py-12 bg-background text-foreground rounded-2xl shadow-sm">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">About Us</h2>
        <h3 className="text-3xl font-extrabold text-foreground sm:text-4xl mt-2">
          Who We Are
        </h3>
        <p className="mt-4 text-lg text-foreground max-w-3xl mx-auto leading-relaxed">
          We are a platform that helps people discover and advertise used vehicles for sale. 
          Users can browse listings, search for vehicles, and connect directly with vehicle 
          owners using the contact information provided in listings.
        </p>
      </div>

      {/* Disclaimer Notice */}
      <div className="mb-12 bg-card border-l-2 border-purple-500 p-4 rounded-r-xl flex items-start space-x-3">
        <Info className="h-5 w-5 text-purple-500 mt-0.5 shrink-0" />
        <p className="text-sm text-foreground/80 leading-relaxed">
          We do not buy, sell, own, inspect, store, or broker vehicles. We simply provide a 
          platform where vehicle owners can advertise their vehicles and interested buyers can 
          contact them directly.
        </p>
      </div>

      {/* Grid Comparison */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* What We Do */}
        <div className="bg-card p-6 rounded-xl shadow-sm border border-green-500">
          <h4 className="text-xl font-bold text-foreground/80 flex items-center mb-6">
            <span className="p-2 bg-card rounded-lg mr-3 text-green-600 border-green-500 border">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            What We Do
          </h4>
          <ul className="space-y-4">
            {whatWeDo.map((item, index) => (
              <li key={index} className="flex items-start text-foreground/80">
                <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2.5 mr-3 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What We Do Not Do */}
        <div className="bg-card p-6 rounded-xl shadow-sm border border-red-500">
          <h4 className="text-xl font-bold text-foreground/80 flex items-center mb-6">
            <span className="p-2 bg-card rounded-lg mr-3 text-red-600 border-red-500 border">
              <XCircle className="h-5 w-5" />
            </span>
            What We Do Not Do
          </h4>
          <ul className="space-y-4">
            {whatWeDoNotDo.map((item, index) => (
              <li key={index} className="flex items-start text-foreground/80">
                <span className="h-1.5 w-1.5 bg-red-400 rounded-full mt-2.5 mr-3 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Transaction Note */}
      <div className="mt-12 text-center border-t border-gray-200 pt-6">
        <p className="text-base font-medium text-foreground/80 italic">
          All transactions occur directly between buyers and sellers.
        </p>
      </div>
    </section>
  );
}