
import Link from 'next/link';
import React from 'react';

const DentistsPage = () => {
    const dentists = [
        {
            id: 1,
            name: "دکتر مریم محمدی",
            specialty: "متخصص زیبایی دندان",
            image: "/images/doctors/dr-mohammadi.jpg",
            bio: "دارای بورد تخصصی زیبایی دندان از دانشگاه تهران با ۱۲ سال سابقه کار تخصصی در زمینه لمینت، کامپوزیت و بلیچینگ",
            education: "دکترای دندانپزشکی از دانشگاه علوم پزشکی تهران",
            experience: "۱۲ سال",
            services: ["لمینت سرامیکی", "کامپوزیت ونیر", "بلیچینگ دندان"],
            schedule: [
                { day: "شنبه", hours: "۱۶:۰۰ - ۲۰:۰۰" },
                { day: "یکشنبه", hours: "۹:۰۰ - ۱۳:۰۰" },
                { day: "دوشنبه", hours: "۱۶:۰۰ - ۲۰:۰۰" }
            ]
        },
        {
            id: 2,
            name: "دکتر علی رضایی",
            specialty: "متخصص ایمپلنت",
            image: "/images/doctors/dr-rezaei.jpg",
            bio: "فارغ التحصیل از دانشگاه علوم پزشکی شهید بهشتی با تخصص در ایمپلنت‌های فوری و All-on-4",
            education: "دکترای دندانپزشکی از دانشگاه علوم پزشکی شهید بهشتی",
            experience: "۱۵ سال",
            services: ["ایمپلنت فوری", "All-on-4", "پیوند استخوان"],
            schedule: [
                { day: "سه‌شنبه", hours: "۱۴:۰۰ - ۱۸:۰۰" },
                { day: "چهارشنبه", hours: "۹:۰۰ - ۱۳:۰۰" },
                { day: "پنجشنبه", hours: "۱۴:۰۰ - ۱۸:۰۰" }
            ]
        },
        {
            id: 3,
            name: "دکتر سارا حسینی",
            specialty: "متخصص ارتودنسی",
            image: "/images/doctors/dr-hosseini.jpg",
            bio: "متخصص ارتودنسی ثابت و متحرک با تجربه کار با جدیدترین سیستم‌های نامرئی",
            education: "دکترای دندانپزشکی از دانشگاه علوم پزشکی ایران",
            experience: "۱۰ سال",
            services: ["ارتودنسی ثابت", "ارتودنسی نامرئی", "ارتودنسی کودکان"],
            schedule: [
                { day: "شنبه", hours: "۱۴:۰۰ - ۱۸:۰۰" },
                { day: "دوشنبه", hours: "۹:۰۰ - ۱۳:۰۰" },
                { day: "چهارشنبه", hours: "۱۴:۰۰ - ۱۸:۰۰" }
            ]
        },
        {
            id: 4,
            name: "دکتر امیر کریمی",
            specialty: "متخصص درمان ریشه",
            image: "/images/doctors/dr-karimi.jpg",
            bio: "متخصص اندودنتیکس با تجربه در درمان‌های پیچیده ریشه با استفاده از میکروسکوپ دندانپزشکی",
            education: "دکترای دندانپزشکی از دانشگاه علوم پزشکی شیراز",
            experience: "۸ سال",
            services: ["عصب‌کشی با میکروسکوپ", "عصب‌کشی بدون درد", "درمان آبسه دندان"],
            schedule: [
                { day: "یکشنبه", hours: "۱۴:۰۰ - ۱۸:۰۰" },
                { day: "سه‌شنبه", hours: "۹:۰۰ - ۱۳:۰۰" },
                { day: "پنجشنبه", hours: "۱۴:۰۰ - ۱۸:۰۰" }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Hero Section */}
            <div className="bg-blue-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">تیم دندانپزشکان ما</h1>
                        <p className="text-xl max-w-3xl mx-auto">
                            متخصصین مجرب و با سابقه ما آماده ارائه بهترین خدمات دندانپزشکی به شما هستند
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Dentists Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {dentists.map(dentist => (
                        <div key={dentist.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={dentist.image}
                                    alt={dentist.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                    <h3 className="text-xl font-bold text-white">{dentist.name}</h3>
                                    <p className="text-blue-300">{dentist.specialty}</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-500">سابقه کار: {dentist.experience}</span>
                                    <button
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    // onClick={() => document.getElementById(`modal-${dentist.id}`).showModal()}
                                    >
                                        مشاهده پروفایل
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Why Choose Us */}
                <div className="bg-white rounded-xl shadow-md p-8 mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">چرا دندانپزشکان ما؟</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">تخصص و تجربه</h3>
                            <p className="text-gray-600">همه دندانپزشکان ما دارای مدارک تخصصی و سال‌ها تجربه عملی هستند</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">تجهیزات پیشرفته</h3>
                            <p className="text-gray-600">استفاده از جدیدترین تکنولوژی‌ها و دستگاه‌های دندانپزشکی روز دنیا</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">رویکرد بیمارمحور</h3>
                            <p className="text-gray-600">تمرکز بر راحتی و رضایت بیمار با کمترین درد و استرس ممکن</p>
                        </div>
                    </div>
                </div>

                {/* Appointment CTA */}
                <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">همین امروز نوبت بگیرید</h2>
                    <p className="mb-6 max-w-2xl mx-auto">تیم مجرب ما آماده ارائه خدمات دندانپزشکی با کیفیت به شما عزیزان می‌باشد</p>
                    <Link
                        href="/dashboard/appointment/new"
                        className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                        رزرو نوبت اینترنتی
                    </Link>
                </div>
            </div>

            {/* Dentist Modals
            {dentists.map(dentist => (
                <dialog key={dentist.id} id={`modal-${dentist.id}`} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box max-w-4xl" dir="rtl">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-2xl font-bold">{dentist.name}</h3>
                            <button
                                // onClick={() => document.getElementById(`modal-${dentist.id}`).close()}
                                className="btn btn-sm btn-circle"
                            >
                                ×
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-1">
                                <img
                                    src={dentist.image}
                                    alt={dentist.name}
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <div className="mb-6">
                                    <h4 className="text-xl font-bold text-blue-600 mb-2">{dentist.specialty}</h4>
                                    <p className="text-gray-700 mb-4">{dentist.bio}</p>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">تحصیلات:</span> {dentist.education}</p>
                                        <p><span className="font-medium">سابقه کار:</span> {dentist.experience} سال</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-lg font-bold mb-3">خدمات تخصصی</h4>
                                        <ul className="space-y-2">
                                            {dentist.services.map((service, index) => (
                                                <li key={index} className="flex items-start">
                                                    <svg className="w-5 h-5 text-blue-500 mt-0.5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {service}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-bold mb-3">ساعات کاری</h4>
                                        <ul className="space-y-2">
                                            {dentist.schedule.map((item, index) => (
                                                <li key={index} className="flex justify-between">
                                                    <span>{item.day}</span>
                                                    <span className="font-medium">{item.hours}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-action">
                            <Link
                                href={`/booking?doctor=${dentist.id}`}
                                className="btn btn-primary"
                            >
                                رزرو نوبت با {dentist.name.split(' ')[1]}
                            </Link>
                        </div>
                    </div>
                </dialog>
            ))} */}
        </div>
    );
};

export default DentistsPage;
