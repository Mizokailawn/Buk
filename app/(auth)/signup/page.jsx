import { SignupForm } from "@/components/auth/signup-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full h-full items-center justify-center px-2 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
