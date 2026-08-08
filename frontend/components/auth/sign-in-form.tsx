"use client";

import { useState, useCallback, useEffect } from "react";
import { Mail, Lock, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { InputField } from "./input-field";
import { AuthButton } from "./auth-button";
import { SocialAuthButtons } from "./social-auth-buttons";
import { useAuth } from "@/contexts/AuthContext";

interface SignInFormProps {
    onSuccess?: () => void;
    onForgotPassword?: () => void;
}

interface FormErrors {
    email?: string;
    password?: string;
}

export function SignInForm({ onSuccess, onForgotPassword }: SignInFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState({ email: false, password: false });
    const [rememberMe, setRememberMe] = useState(false);
    const { login } = useAuth();

    // Real-time validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= 6;

    useEffect(() => {
        const savedEmail = localStorage.getItem("remembered-email");
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const validate = useCallback((): boolean => {
        const newErrors: FormErrors = {};

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!isEmailValid) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (!isPasswordValid) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [email, password, isEmailValid, isPasswordValid]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            setTouched({ email: true, password: true });
            return;
        }

        setIsLoading(true);

        try {
            // Auth login (mock)
            await login(email, password);

            // Save email if remember me is checked
            if (rememberMe) {
                localStorage.setItem("remembered-email", email);
            } else {
                localStorage.removeItem("remembered-email");
            }

            setIsSuccess(true);

            // Show success then close
            setTimeout(() => {
                onSuccess && onSuccess();
            }, 1500);
        } catch (err: any) {
            setErrors({
                password: err.message || "Invalid email or password"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const clearError = (field: keyof FormErrors) => {
        setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10, stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6"
                >
                    <Check className="w-10 h-10 text-green-500" strokeWidth={3} />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">Welcome Back!</h3>
                <p className="text-white/60 text-sm">Signed in successfully</p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-5">
            {/* Social Auth Buttons */}
            <SocialAuthButtons />

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#0a0a0a] px-4 text-white/40">Or continue with email</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <InputField
                    label="Email"
                    type="email"
                    placeholder="mail@domain.com"
                    icon={Mail}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        clearError("email");
                        if (!touched.email) setTouched(prev => ({ ...prev, email: true }));
                    }}
                    onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                    error={touched.email ? errors.email : undefined}
                    isValid={touched.email ? isEmailValid : undefined}
                    validationMessage={touched.email ? (isEmailValid ? "Valid email" : "Invalid email format") : undefined}
                    autoComplete="email"
                />

                <div className="space-y-2">
                    <InputField
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        icon={Lock}
                        showPasswordToggle
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            clearError("password");
                            if (!touched.password) setTouched(prev => ({ ...prev, password: true }));
                        }}
                        onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                        error={touched.password ? errors.password : undefined}
                        isValid={touched.password ? isPasswordValid : undefined}
                        validationMessage={touched.password ? (isPasswordValid ? "Valid password" : "Min 6 characters") : undefined}
                        autoComplete="current-password"
                    />

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="peer sr-only"
                                />
                                <div className={cn(
                                    "w-4 h-4 rounded border transition-all duration-200 flex items-center justify-center",
                                    rememberMe
                                        ? "bg-white border-white"
                                        : "border-white/30 group-hover:border-white/50"
                                )}>
                                    <Check className={cn(
                                        "w-3 h-3 text-black transition-all duration-200",
                                        rememberMe ? "scale-100 opacity-100" : "scale-0 opacity-0"
                                    )} strokeWidth={3} />
                                </div>
                            </div>
                            <span className="text-[11px] text-white/50 group-hover:text-white/70 transition-colors">
                                Remember me
                            </span>
                        </label>

                        <button
                            type="button"
                            onClick={() => onForgotPassword && onForgotPassword()}
                            className="text-[11px] text-white/40 hover:text-white/70 transition-colors duration-150 underline-offset-2 hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>
                </div>

                <div className="pt-2">
                    <AuthButton isLoading={isLoading}>
                        Sign In →
                    </AuthButton>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;
