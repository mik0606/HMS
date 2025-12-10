import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Building2,
  ShieldCheck,
  Activity,
  Database,
  CheckCircle2,
  Eye,
  EyeOff,
  RefreshCw,
  Lock,
  Mail,
  AlertCircle
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, logout, user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  const generateCaptcha = useCallback(() => {
    // A-Z, 2-9, excluding ambiguous characters like I, L, 1, O, 0
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
    setCaptchaInput(''); // Clear input on regeneration
  }, []);

  // Generate CAPTCHA on mount
  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      if (user?.role === 'super_admin') {
        navigate('/dashboard', { replace: true });
      } else {
        logout();
        setError('Access restricted to Super Admin only.');
      }
    }
  }, [isAuthenticated, user, isLoading, navigate, logout]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 1. CAPTCHA Validation
    if (captchaInput.toUpperCase() !== captcha) {
      setError('Incorrect security code. Please try again.');
      generateCaptcha(); // Regenerate to prevent brute force
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. Authentication Logic
      await login(email, password);
      // Navigation is handled by useEffect
    } catch (err: any) {
      setError('Invalid email or password. Please check your credentials.');
      setIsSubmitting(false);
      generateCaptcha(); // Security best practice: reset CAPTCHA on failed login
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-50 font-inter">
      {/* LEFT PANEL - Marketing / Visuals */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden text-white flex-col justify-between p-12"
        style={{ background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)' }}>

        {/* Background Patterns (Optional subtle enhancement) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full justify-between">

          {/* Top Logo Area */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm font-semibold tracking-wider opacity-90 uppercase">Karur Gastro Healthcare</span>
            </div>
          </div>

          {/* Main Hero Text */}
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 tracking-tight">
              Enterprise Healthcare Management System
            </h1>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed opacity-90">
              Secure, HIPAA-compliant platform with role-based access control, comprehensive audit trails, and real-time analytics for modern healthcare operations.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: ShieldCheck, text: "Secure Access" },
                { icon: CheckCircle2, text: "HIPAA Compliant" },
                { icon: Activity, text: "Real-time Analytics" },
                { icon: Database, text: "Auto Backup" },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <feature.icon className="w-4 h-4 text-blue-200" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full">
              <CheckCircle2 className="w-5 h-5 text-white" />
              <span className="font-semibold text-sm">Trusted by 150+ Healthcare Institutions</span>
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-xs text-blue-200 opacity-70 flex gap-4">
            <span>24/7 Support</span>
            <span>•</span>
            <span>ISO 27001 Certified</span>
            <span>•</span>
            <span>99.9% Uptime</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12 relative">
        <div className="max-w-[480px] w-full">

          {/* Mobile Header (Visible only on small screens) */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex justify-center items-center p-3 bg-blue-50 rounded-xl mb-4">
              <Building2 className="w-8 h-8 text-[#0D47A1]" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">KARUR GASTRO</h1>
            <p className="text-sm text-gray-500">Healthcare Management</p>
          </div>

          <Card className="border-0 shadow-[0px_20px_40px_rgba(0,0,0,0.04)] rounded-[24px] overflow-hidden bg-white">
            <CardContent className="p-8 md:p-10">

              {/* Card Header Content */}
              <div className="mb-8">
                <div className="hidden lg:flex items-center gap-2 mb-6">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Building2 className="w-5 h-5 text-[#0D47A1]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Karur Gastro</h3>
                    <p className="text-[10px] text-gray-500 font-medium uppercase">Healthcare Management</p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-muted-foreground text-[15px]">Sign in to access your healthcare dashboard</p>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive" className="mb-6 bg-red-50 border-red-100 text-red-900">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm font-medium ml-2">{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address or Mobile</Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="text" // allow mobile too
                      placeholder="Enter your email or mobile number"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-11 h-[50px] bg-gray-50/50 border-gray-200 focus:border-[#1E4DB7] focus:ring-[#1E4DB7]/20 rounded-xl transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your secure password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-11 pr-11 h-[50px] bg-gray-50/50 border-gray-200 focus:border-[#1E4DB7] focus:ring-[#1E4DB7]/20 rounded-xl transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* CAPTCHA Section */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Security Verification</Label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Enter code"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        required
                        className="pl-11 h-[50px] bg-gray-50/50 border-gray-200 focus:border-[#1E4DB7] focus:ring-[#1E4DB7]/20 rounded-xl"
                      />
                    </div>

                    {/* CAPTCHA Display Box */}
                    <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-xl px-4 min-w-[140px] justify-between select-none">
                      <span className="font-mono text-xl font-bold text-gray-800 tracking-widest" aria-label={`CAPTCHA code: ${captcha.split('').join(' ')}`}>
                        {captcha}
                      </span>
                      <button
                        type="button"
                        onClick={generateCaptcha}
                        className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E4DB7]/30"
                        title="Refresh CAPTCHA"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#1E4DB7] focus:ring-[#1E4DB7] transition-all" />
                    <span className="text-gray-600 group-hover:text-gray-800 transition-colors">Remember me for 30 days</span>
                  </label>
                  <a href="#" className="font-semibold text-[#1E4DB7] hover:text-[#1565C0] hover:underline transition-colors">
                    Forgot Password?
                  </a>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  className="w-full h-[50px] text-[15px] font-semibold bg-[#1E4DB7] hover:bg-[#1565C0] text-white rounded-xl shadow-[0px_4px_12px_rgba(30,77,183,0.2)] hover:shadow-[0px_6px_20px_rgba(30,77,183,0.3)] transition-all duration-200"
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    "Sign In to Dashboard"
                  )}
                </Button>
              </form>

            </CardContent>
          </Card>

          <div className="mt-8 text-center flex items-center justify-center gap-2 text-gray-500 text-xs font-medium opacity-80">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Enterprise-grade Security</span>
          </div>

        </div>
      </div>
    </div>
  );
}
