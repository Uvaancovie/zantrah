"use client";

import dynamic from "next/dynamic";

const LoginFormEnhanced = dynamic(() => import("@/components/auth/login-form-enhanced"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

export default function LoginPage() {
  return <LoginFormEnhanced />;
}
