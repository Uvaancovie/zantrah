"use client";

import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("@/components/auth/login-form"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

export default function LoginPage() {
  return <LoginForm />;
}
