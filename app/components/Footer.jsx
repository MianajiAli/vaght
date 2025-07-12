const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-12" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Clinic */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-blue-300">درباره کلینیک</h3>
                        <p className="text-gray-300">
                            کلینیک دندانپزشکی لبخند با سال‌ها تجربه در زمینه خدمات دندانپزشکی با کیفیت و استفاده از جدیدترین تکنولوژی‌ها آماده خدمت‌رسانی به شما عزیزان می‌باشد.
                        </p>
                        <div className="flex space-x-4 space-x-reverse">
                            <a href="#" className="text-gray-400 hover:text-white">
                                <span className="sr-only">فیس بوک</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <span className="sr-only">اینستاگرام</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C13.528 2.013 13.87 2 16.615 2h.08c2.643 0 2.987.012 4.043.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.024-.047 1.379-.06 4.008-.06h.04c2.597 0 2.937.01 3.994.048 1.061.038 1.788.207 2.428.448.66.248 1.2.6 1.728 1.126a5.06 5.06 0 011.125 1.728c.24.64.41 1.367.448 2.428.038 1.057.048 1.397.048 4.004v.04c0 2.598-.01 2.938-.048 3.995-.038 1.061-.207 1.788-.448 2.428-.248.66-.6 1.2-1.126 1.728a5.06 5.06 0 01-1.728 1.125c-.64.24-1.367.41-2.428.448-1.057.038-1.397.048-4.004.048h-.04c-2.598 0-2.938-.01-3.995-.048-1.061-.038-1.788-.207-2.428-.448-.66-.248-1.2-.6-1.728-1.126a5.06 5.06 0 01-1.125-1.728c-.24-.64-.41-1.367-.448-2.428-.038-1.057-.048-1.397-.048-4.004v-.04c0-2.598.01-2.938.048-3.995.038-1.061.207-1.788.448-2.428.248-.66.6-1.2 1.126-1.728a5.06 5.06 0 011.728-1.125c.64-.24 1.367-.41 2.428-.448 1.057-.038 1.397-.048 4.004-.048h.04zm0 2.622c-2.403 0-2.687.01-3.71.055-.964.044-1.486.207-1.835.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.349-.3.871-.344 1.835-.045 1.023-.055 1.307-.055 3.71 0 2.403.01 2.687.055 3.71.044.964.207 1.486.344 1.835.182.466.399.8.748 1.15.35.35.683.566 1.15.748.349.137.871.3 1.835.344 1.023.045 1.307.055 3.71.055 2.403 0 2.687-.01 3.71-.055.964-.044 1.486-.207 1.835-.344.466-.182.8-.399 1.15-.748.35-.35.566-.683.748-1.15.137-.349.3-.871.344-1.835.045-1.023.055-1.307.055-3.71 0-2.403-.01-2.687-.055-3.71-.044-.964-.207-1.486-.344-1.835a3.317 3.317 0 00-.748-1.15 3.317 3.317 0 00-1.15-.748c-.349-.137-.871-.3-1.835-.344-1.023-.045-1.307-.055-3.71-.055zM12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm0 5.75a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zM16.5 7a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links - Updated to match header */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-blue-300">لینک‌های سریع</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-300 hover:text-white">خانه</a></li>
                            <li><a href="/home/services" className="text-gray-300 hover:text-white">خدمات</a></li>
                            <li><a href="/home/dentists" className="text-gray-300 hover:text-white">دندانپزشکان</a></li>
                            <li><a href="/home/about" className="text-gray-300 hover:text-white">درباره ما</a></li>
                            <li><a href="/dashboard/" className="text-gray-300 hover:text-white">داشبورد</a></li>
                        </ul>
                    </div>

                    {/* Services - Updated to match your services data */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-blue-300">خدمات</h3>
                        <ul className="space-y-2">
                            <li><a href="/home/services#serv_001" className="text-gray-300 hover:text-white">لمینت سرامیکی دندان</a></li>
                            <li><a href="/home/services#serv_002" className="text-gray-300 hover:text-white">ایمپلنت دندان</a></li>
                            <li><a href="/home/services#serv_003" className="text-gray-300 hover:text-white">جرمگیری حرفه‌ای</a></li>
                            <li><a href="/home/services" className="text-gray-300 hover:text-white">مشاهده همه خدمات</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-blue-300">اطلاعات تماس</h3>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-start">
                                <svg className="h-5 w-5 ml-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>تهران، خیابان ولیعصر، کوچه فلان، پلاک ۱۲۳</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>info@smileclinic.ir</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>شنبه تا پنجشنبه: ۹ صبح تا ۸ شب</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
                    <p>© {new Date().getFullYear()} کلینیک دندانپزشکی لبخند. تمام حقوق محفوظ است.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
