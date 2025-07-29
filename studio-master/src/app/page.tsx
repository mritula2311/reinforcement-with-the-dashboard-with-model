import { LoginForm } from "@/components/auth/LoginForm";
import { Shield } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="bg-primary text-primary-foreground p-3 rounded-full mb-4 shadow-lg">
          <Shield className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 font-headline">
          Crash Guard
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Integrated Emergency Response System
        </p>
      </div>
      <LoginForm />
    </main>
  );
}
