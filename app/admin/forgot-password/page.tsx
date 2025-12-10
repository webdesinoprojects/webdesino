import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
          <CardDescription className="text-center">
            Contact the system administrator to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="bg-blue-50 p-4 rounded-lg text-blue-800 text-sm">
            <p>For security reasons, automated password reset is currently disabled.</p>
            <p className="mt-2">Please contact the technical team directly.</p>
          </div>
          
          <div className="flex flex-col gap-3 mt-4">
            <a 
              href="mailto:support@webdesino.com?subject=Password Reset Request for Admin Panel"
              className="flex items-center justify-center gap-2 w-full bg-[#02066F] text-white py-2.5 rounded-md hover:bg-[#02066F]/90 transition-colors font-medium"
            >
              <Mail size={18} />
              Email Support
            </a>
            
            <a 
              href="tel:+919310851557"
              className="flex items-center justify-center gap-2 w-full border border-gray-300 text-gray-700 py-2.5 rounded-md hover:bg-gray-50 transition-colors font-medium"
            >
              Call Support
            </a>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/admin" className="flex items-center justify-center w-full text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft size={14} className="mr-2" />
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
