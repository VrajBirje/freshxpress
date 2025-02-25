import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in" // Ensures navigation back to the sign-in page
      />
    </div>
  );
}
