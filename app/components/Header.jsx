import Link from "next/link";

const Header = ({ }) => {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* لوگو را اینجا قرار دهید */}
                    <Link href="/" className="text-xl font-bold text-blue-600">کلینیک دندانپزشکی لبخند</Link>
                </div>

                <nav className="hidden md:flex items-center gap-3 text-gray-700 font-medium">
                    <Link href="/" className="hover:text-blue-500 px-2 py-1">خانه</Link>
                    <Link href="/home/services" className="hover:text-blue-500 px-2 py-1">خدمات</Link>
                    <Link href="/home/dentists" className="hover:text-blue-500 px-2 py-1">دندانپزشکان</Link>
                    <Link href="/home/about" className="hover:text-blue-500 px-2 py-1">درباره ما</Link>
                    <Link href="/dashboard/" className="hover:text-blue-500 px-2 py-1">داشبورد</Link>
                </nav>

                <div className="hidden md:flex items-center gap-2">
                    {/* <Link href="/login" className="text-gray-700 hover:text-blue-500 px-2 py-1">ورود</Link>
                    <Link href="/register" className="text-gray-700 hover:text-blue-500 px-2 py-1">ثبت نام</Link> */}
                    <Link
                        href="/dashboard/appointment/new"
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-200"
                    >
                        نوبت دهی اینترنتی
                    </Link>
                </div>

                <div className="md:hidden">
                    <button
                        id="menu-toggle"
                        className="text-gray-700 focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors"
                        aria-label="منو"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
