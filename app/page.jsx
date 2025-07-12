import Footer from "./components/Footer";
import Header from "./components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                کلینیک تخصصی دندانپزشکی لبخند
              </h1>
              <p className="text-lg text-gray-600">
                ارائه خدمات دندانپزشکی با کیفیت بالا و استفاده از جدیدترین تکنولوژی‌ها توسط متخصصین مجرب
              </p>
              <div className="flex space-x-4 space-x-reverse">
                <a
                  href="/dashboard/appointment/new"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors"
                >
                  رزرو نوبت اینترنتی
                </a>
                <a
                  href="/home/services"
                  className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg text-lg font-medium transition-colors"
                >
                  خدمات ما
                </a>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <Image
                src="/images/dental-hero.jpg"
                alt="دندانپزشک در حال معاینه بیمار"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">خدمات تخصصی ما</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                با بهره‌گیری از بهترین متخصصین و تجهیزات روز دنیا، سلامت دندان‌های شما را تضمین می‌کنیم
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "لمینت دندان",
                  description: "زیبایی و اصلاح طرح لبخند با استفاده از لمینت سرامیکی",
                  icon: "🦷"
                },
                {
                  title: "ایمپلنت",
                  description: "جایگزینی دندان‌های از دست رفته با ایمپلنت‌های با کیفیت",
                  icon: "🦴"
                },
                {
                  title: "ارتودنسی",
                  description: "اصلاح نامرتبی دندان‌ها با روش‌های مدرن ارتودنسی",
                  icon: "😁"
                },
                {
                  title: "جرمگیری",
                  description: "حرفه‌ای ترین روش‌های جرمگیری و سفید کردن دندان",
                  icon: "✨"
                },
                {
                  title: "عصب کشی",
                  description: "درمان ریشه دندان با کمترین درد و بیشترین دقت",
                  icon: "⚕️"
                },
                {
                  title: "کودکان",
                  description: "خدمات تخصصی دندانپزشکی برای کودکان",
                  icon: "👶"
                }
              ].map((service, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <Image
                src="/images/clinic-interior.jpg"
                alt="فضای داخلی کلینیک"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="md:w-1/2 md:pr-10 space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">درباره کلینیک ما</h2>
              <p className="text-lg text-gray-600">
                کلینیک دندانپزشکی لبخند با بیش از ۱۵ سال سابقه درخشان در زمینه ارائه خدمات دندانپزشکی، با بهره‌گیری از کادری مجرب و تجهیزات پیشرفته، آماده خدمت‌رسانی به شما عزیزان می‌باشد.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 ml-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>استفاده از جدیدترین تکنولوژی‌های روز دنیا</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 ml-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>کادر مجرب و متخصص با سال‌ها تجربه</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 ml-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>محیطی استریل و کاملا بهداشتی</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 ml-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>نوبت‌دهی آنلاین و مشاوره رایگان</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">آماده ایجاد لبخندی زیبا هستید؟</h2>
            <p className="text-xl mb-8">
              همین امروز نوبت خود را رزرو کنید و از مشاوره رایگان ما بهره‌مند شوید
            </p>
            <a
              href="/dashboard/appointment/new"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-medium transition-colors inline-block"
            >
              رزرو نوبت اینترنتی
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
