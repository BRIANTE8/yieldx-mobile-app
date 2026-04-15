import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-emerald-50 to-teal-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/95 rounded-2xl shadow-2xl border border-emerald-200 p-8">
        <p className="text-xs uppercase tracking-[0.18em] font-semibold text-emerald-700 mb-2">AgroHub</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Create your account</h1>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          This demo page is a placeholder for signup. For now, enter credentials on the login screen and click Sign In.
        </p>
        <div className="space-y-4">
          <div className="rounded-xl border border-emerald-100 p-4 bg-emerald-50">
            <p className="text-sm text-gray-700">If you want to continue, use any email and password on the sign-in page.</p>
          </div>
          <Link href="/" className="block text-center bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl py-3 font-semibold transition-colors">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
