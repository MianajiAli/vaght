"use client";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaTooth, FaSmile, FaClinicMedical, FaCalendarAlt } from "react-icons/fa";
import { GiTooth } from "react-icons/gi";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-50 to-cyan-50 py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-100 to-transparent"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center relative z-10">
            <div className="md:w-1/2 space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight"
              >
                سلامت دندان‌های شما، <span className="text-blue-600">اولویت ماست</span>
              </motion.h1>
              <p className="text-lg text-gray-600">
                در کلینیک تخصصی لبخند، با بهره‌گیری از پیشرفته‌ترین تجهیزات و متخصصین مجرب،
                زیباترین لبخندها را برای شما به ارمغان می‌آوریم.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/dashboard/appointment/new"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <FaCalendarAlt />
                  رزرو نوبت اینترنتی
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/home/services"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg text-lg font-medium transition-all shadow hover:shadow-md flex items-center gap-2"
                >
                  <FaTooth />
                  خدمات تخصصی
                </motion.a>
              </div>
              <div className="flex flex-wrap gap-6 pt-6">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FaSmile className="text-blue-600 text-xl" />
                  </div>
                  <span className="text-gray-700">+5000 بیمار راضی</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FaClinicMedical className="text-blue-600 text-xl" />
                  </div>
                  <span className="text-gray-700">۱۵ سال تجربه</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0 relative">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <Image
                  src="/images/dental-hero.jpg"
                  alt="دندانپزشک در حال معاینه بیمار"
                  width={600}
                  height={500}
                  className="rounded-xl shadow-2xl border-8 border-white"
                  priority
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <GiTooth className="text-blue-600 text-2xl" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">پزشکان متخصص</p>
                      <p className="text-sm text-gray-600">تیم حرفه‌ای ما</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-gray-800 mb-4"
              >
                خدمات <span className="text-blue-600">تخصصی</span> ما
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-600 max-w-3xl mx-auto"
              >
                با استفاده از جدیدترین تکنولوژی‌های روز دنیا، سلامت و زیبایی دندان‌های شما را تضمین می‌کنیم
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 overflow-hidden group"
                >
                  <div className="relative">
                    <div className="absolute -top-6 -right-6 bg-blue-100 w-16 h-16 rounded-full opacity-20 group-hover:opacity-30 transition-all"></div>
                    <div className="bg-blue-600 text-white p-3 rounded-lg inline-flex mb-6">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <a
                    href={service.link}
                    className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1 transition-colors"
                  >
                    اطلاعات بیشتر
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2 relative"
              >
                <Image
                  src="/images/clinic-interior.jpg"
                  alt="فضای داخلی کلینیک"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-xl border-8 border-white"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 max-w-xs">
                  <h4 className="font-bold text-gray-800 mb-2">چرا ما را انتخاب کنید؟</h4>
                  <p className="text-sm text-gray-600">تیم متخصص و با تجربه ما با دقت و حوصله به درمان شما می‌پردازد</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2"
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-6">کلینیک دندانپزشکی <span className="text-blue-600">لبخند</span></h2>
                <p className="text-lg text-gray-600 mb-8">
                  با بیش از ۱۵ سال سابقه درخشان در زمینه دندانپزشکی، کلینیک لبخند همواره پیشرو در ارائه خدمات تخصصی با کیفیت بالا بوده است. ما با بهره‌گیری از کادری مجرب و تجهیزات پیشرفته، آماده خدمت‌رسانی به شما عزیزان می‌باشیم.
                </p>

                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-8"
                >
                  <a
                    href="/about"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    بیشتر درباره ما
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">نظرات <span className="text-blue-600">مراجعین</span></h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">تجربه بیماران ما از خدمات کلینیک لبخند</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div className="mr-3">
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">"{testimonial.comment}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 bg-blue-600 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-blue-700 to-transparent"></div>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-6"
            >
              آماده ایجاد <span className="text-yellow-300">لبخندی زیبا</span> هستید؟
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl mb-8 max-w-2xl mx-auto"
            >
              همین امروز نوبت خود را رزرو کنید و از مشاوره رایگان ما بهره‌مند شوید
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                href="/dashboard/appointment/new"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-medium transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                <FaCalendarAlt />
                رزرو نوبت اینترنتی
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Data
const services = [
  {
    title: "لمینت دندان",
    description: "زیبایی و اصلاح طرح لبخند با استفاده از لمینت سرامیکی با کیفیت",
    icon: <FaTooth className="text-xl" />,
    link: "/services/laminate"
  },
  {
    title: "ایمپلنت دندان",
    description: "جایگزینی دندان‌های از دست رفته با ایمپلنت‌های با کیفیت و ماندگار",
    icon: <GiTooth className="text-xl" />,
    link: "/services/implant"
  },
  {
    title: "ارتودنسی",
    description: "اصلاح نامرتبی دندان‌ها با روش‌های مدرن ارتودنسی ثابت و متحرک",
    icon: <FaSmile className="text-xl" />,
    link: "/services/orthodontics"
  },
  {
    title: "جرمگیری حرفه‌ای",
    description: "حرفه‌ای ترین روش‌های جرمگیری و سفید کردن دندان بدون آسیب به مینا",
    icon: <GiTooth className="text-xl" />,
    link: "/services/cleaning"
  },
  {
    title: "درمان ریشه",
    description: "عصب کشی و درمان ریشه دندان با کمترین درد و بیشترین دقت",
    icon: <FaTooth className="text-xl" />,
    link: "/services/root-canal"
  },
  {
    title: "دندانپزشکی کودکان",
    description: "خدمات تخصصی دندانپزشکی برای کودکان در محیطی دوست داشتنی",
    icon: <FaSmile className="text-xl" />,
    link: "/services/pediatric"
  }
];

const features = [
  {
    title: "تجهیزات پیشرفته",
    description: "استفاده از جدیدترین تکنولوژی‌های روز دنیا در دندانپزشکی"
  },
  {
    title: "پزشکان متخصص",
    description: "کادر مجرب و متخصص با سال‌ها تجربه در زمینه دندانپزشکی"
  },
  {
    title: "محیط استریل",
    description: "رعایت کامل پروتکل‌های بهداشتی با محیطی کاملا استریل"
  },
  {
    title: "نوبت‌دهی آنلاین",
    description: "رزرو آسان نوبت به صورت آنلاین و مشاوره رایگان"
  },
  {
    title: "پوشش بیمه",
    description: "همکاری با بیمه‌های مختلف برای کاهش هزینه‌های درمان"
  }
];

const testimonials = [
  {
    name: "علی محمدی",
    rating: 5,
    comment: "بسیار حرفه‌ای و دلسوزانه عمل کردند. لمینت دندان‌هایم عالی شد و همه تعریف می‌کنند."
  },
  {
    name: "فاطمه زاهدی",
    rating: 4,
    comment: "دندان‌های فرزندم را بدون هیچ استرسی درمان کردند. محیط بسیار مناسبی برای کودکان دارند."
  },
  {
    name: "رضا نوروزی",
    rating: 5,
    comment: "ایمپلنتی که گذاشتند کاملا طبیعی است و اصلا احساس نمی‌کنم دندان مصنوعی دارم."
  }
];
