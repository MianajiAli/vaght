import React from 'react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Hero Section */}
            <div className="relative bg-blue-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">درباره کلینیک دندانپزشکی لبخند</h1>
                        <p className="text-xl max-w-3xl mx-auto">
                            ارائه خدمات دندانپزشکی با کیفیت با استفاده از جدیدترین تکنولوژی‌ها و کادر مجرب
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">تاریخچه کلینیک</h2>
                        <p className="text-gray-600 mb-4 text-justify">
                            کلینیک دندانپزشکی لبخند در سال ۱۳۸۵ با هدف ارائه خدمات دندانپزشکی با کیفیت و استانداردهای جهانی تأسیس شد. از آن زمان تاکنون، ما به یکی از معتبرترین مراکز دندانپزشکی در تهران تبدیل شده‌ایم.
                        </p>
                        <p className="text-gray-600 text-justify">
                            با بیش از ۱۵ سال سابقه درخشان، ما موفق به درمان هزاران بیمار با رضایت کامل شده‌ایم. افتخار ما اعتماد بیماران و لبخند رضایت آن‌هاست.
                        </p>
                    </div>
                    <div className="rounded-lg overflow-hidden shadow-lg">
                        <img
                            src="/images/clinic-building.jpg"
                            alt="ساختمان کلینیک دندانپزشکی لبخند"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>

                {/* Mission and Vision */}
                <div className="bg-white rounded-xl shadow-md p-8 mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="border-l-4 border-blue-500 pl-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">رسالت ما</h3>
                            <p className="text-gray-600 text-justify">
                                ارائه خدمات دندانپزشکی با کیفیت جهانی، با استفاده از پیشرفته‌ترین تجهیزات و مواد باکیفیت، در محیطی بهداشتی و دوست‌داشتنی برای تمامی اقشار جامعه.
                            </p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">چشم‌انداز ما</h3>
                            <p className="text-gray-600 text-justify">
                                تبدیل شدن به برترین مرکز دندانپزشکی در سطح منطقه با تمرکز بر نوآوری، آموزش مستمر پرسنل و ارائه خدمات جامع دندانپزشکی با استانداردهای روز دنیا.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">تیم متخصصین ما</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                name: "دکتر مریم محمدی",
                                specialty: "متخصص زیبایی دندان",
                                image: "/images/doctors/dr-mohammadi.jpg",
                                experience: "۱۲ سال سابقه",
                            },
                            {
                                name: "دکتر علی رضایی",
                                specialty: "متخصص ایمپلنت",
                                image: "/images/doctors/dr-rezaei.jpg",
                                experience: "۱۵ سال سابقه",
                            },
                            {
                                name: "دکتر سارا حسینی",
                                specialty: "متخصص ارتودنسی",
                                image: "/images/doctors/dr-hosseini.jpg",
                                experience: "۱۰ سال سابقه",
                            },
                            {
                                name: "دکتر امیر کریمی",
                                specialty: "متخصص درمان ریشه",
                                image: "/images/doctors/dr-karimi.jpg",
                                experience: "۸ سال سابقه",
                            },
                        ].map((doctor, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
                                    <p className="text-blue-600 mb-2">{doctor.specialty}</p>
                                    <p className="text-gray-500">{doctor.experience}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Facilities Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">امکانات کلینیک</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "تجهیزات پیشرفته",
                                icon: (
                                    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                    </svg>
                                ),
                                description: "استفاده از جدیدترین دستگاه‌های دیجیتال دندانپزشکی با دقت و کیفیت بالا"
                            },
                            {
                                title: "استریلیزاسیون پیشرفته",
                                icon: (
                                    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ),
                                description: "سیستم استریلیزاسیون حرفه‌ای با دستگاه‌های اتوکلاو کلاس B برای تضمین سلامت بیماران"
                            },
                            {
                                title: "محیط آرامش‌بخش",
                                icon: (
                                    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                description: "طراحی داخلی مدرن و محیطی آرام برای کاهش استرس بیماران"
                            }
                        ].map((facility, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                                <div className="flex justify-center mb-4">
                                    {facility.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{facility.title}</h3>
                                <p className="text-gray-600">{facility.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials */}
                <div className="bg-blue-50 rounded-xl p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">نظرات بیماران</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                name: "محمد رضایی",
                                comment: "بهترین تجربه دندانپزشکی که داشتم. کادر بسیار حرفه‌ای و محیط بسیار تمیز و بهداشتی.",
                                rating: 5
                            },
                            {
                                name: "فاطمه احمدی",
                                comment: "دکتر محمدی عالی هستند. لمینت دندان‌های من بینظیر شده. ممنون از تیم خوب کلینیک لبخند.",
                                rating: 5
                            },
                            {
                                name: "علی محمدی",
                                comment: "برای ایمپلنت به این کلینیک مراجعه کردم. نتیجه کار عالی بود و درد بسیار کمی داشتم.",
                                rating: 4
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow">
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-4 text-justify">"{testimonial.comment}"</p>
                                <p className="font-medium text-gray-800">- {testimonial.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
