const Header = ({ }) => {
    return <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                {/* <img src="" alt="Dental Logo" className="w-10 h-10 rounded-full" /> */}
                <a href="/" className="text-xl font-bold text-blue-600">SmileCare Dental</a>
            </div>

            <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
                <a href="/" className="hover:text-blue-500">Home</a>
                <a href="/admin/users" className="hover:text-blue-500">Services</a>
                <a href="/auth/register" className="hover:text-blue-500">register</a>
                <a href="/auth/login" className="hover:text-blue-500">login</a>
                <a href="/index" className="hover:text-blue-500">Book Appointment</a>
            </nav>

            <div className="hidden md:block">
                <a href="/index" className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
                    Book Now
                </a>
            </div>


            <div className="md:hidden">
                <button id="menu-toggle" className="text-gray-700 focus:outline-none">
                    open menu
                </button>
            </div>
        </div>
    </header>

}

export default Header
