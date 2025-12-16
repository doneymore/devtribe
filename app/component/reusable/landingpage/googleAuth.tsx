"use client";
import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import Script from "next/script";
import { useAuth } from "@/app/lib/hooks/useAuths";
import { useRouter } from "next/navigation";
import { createOrLoginUser } from "@/app/lib/blogServices";

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleAuthModal = ({ isOpen, onClose }: GoogleAuthModalProps) => {
  const router = useRouter();
  const buttonDivRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Use the auth hook
  const { login, isLoading, setAuthLoading } = useAuth();

  // Client ID - prioritize environment variable
  const CLIENT_ID =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    "1030737803985-m259rn3ostuqa08du9nanhmjcu40c8jh.apps.googleusercontent.com";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCredentialResponse = async (response: any) => {
    const idToken = response.credential;
    setAuthLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "https://secneedles-vn55-v1.onrender.com/api/GoogleAuth/signin-google",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (!data.token || !data.user) {
        throw new Error("Invalid Google auth response");
      }
      const blogUserResponse = await createOrLoginUser({
        email: data.user.email,
        name: data.user.name,
        token: data.token,
      });
      debugger;

      if (!blogUserResponse || blogUserResponse.result !== 1) {
        throw new Error("Failed to create or login blog user");
      }

      if (data.token && data.user) {
        // Save to Redux store
        login(data.token, {
          id: blogUserResponse?.payload?.userId || "",
          email: blogUserResponse?.payload?.emailAddress || data.user.email,
          name: `${blogUserResponse.payload.firstName} ${blogUserResponse.payload.lastName}`,
          picture: data.user.picture,
        });

        // Close modal after successful login
        onClose();

        // Redirect to blog page after successful login
        router.push("/pages/blogScreen");
      } else {
        throw new Error("No token received from backend");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setError("Authentication failed. Please try again.");
      setAuthLoading(false);
    }
  };

  const initializeGoogleSignIn = () => {
    if (
      typeof window !== "undefined" &&
      window.google &&
      buttonDivRef.current &&
      !initializedRef.current
    ) {
      try {
        // Initialize Google Sign-In
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: false,
        });

        // Clear previous content
        buttonDivRef.current.innerHTML = "";

        // Render the button
        window.google.accounts.id.renderButton(buttonDivRef.current, {
          theme: "filled_blue",
          size: "large",
          width: 300,
          text: "signin_with",
          shape: "rectangular",
        });

        initializedRef.current = true;
      } catch (error) {
        console.error("Error initializing Google Sign-In:", error);
        setError("Failed to load Google Sign-In. Please refresh the page.");
      }
    }
  };

  useEffect(() => {
    if (!isOpen) {
      initializedRef.current = false;
      setError(null);
      return;
    }

    if (scriptLoaded) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        initializeGoogleSignIn();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, scriptLoaded, CLIENT_ID]);

  if (!isOpen) return null;

  return (
    <>
      {/* Load Google Sign-In script */}
      <Script
        src="https://accounts.google.com/gsi/client"
        onLoad={() => setScriptLoaded(true)}
        strategy="lazyOnload"
      />

      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Sign in to continue
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              disabled={isLoading}
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Please sign in with Google to access the Blog
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {isLoading && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-blue-700 text-sm">Signing in...</p>
            </div>
          )}

          {!scriptLoaded && !error && (
            <div className="flex justify-center items-center min-h-[44px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}

          <div
            ref={buttonDivRef}
            className="flex justify-center min-h-[44px]"
          ></div>

          <p className="text-xs text-gray-500 text-center mt-4">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </>
  );
};

export default GoogleAuthModal;
