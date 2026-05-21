import { PhoneAuth } from "@/components/auth/phoneauth";

const PhoneLogin = () => {  
  return (
     <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">        
        <PhoneAuth />
      </div>
    </div>
  );
};

export default PhoneLogin;
