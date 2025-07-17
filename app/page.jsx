"use client";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaTooth, FaSmile, FaClinicMedical, FaCalendarAlt, FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { GiTooth } from "react-icons/gi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// import { GiTooth } from "react-icons/bs";

// Constants moved to separate files would be better in production
const SERVICES = [
  {
    title: "لمینت و کامپوزیت دندان",
    description: "طراحی لبخند هالیوودی با استفاده از لمینت سرامیکی و کامپوزیت ونیر با کیفیت بالا",
    icon: <GiTooth className="text-xl" />,
    link: "/services/laminate",
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "ایمپلنت دندان",
    description: "کاشت دندان با ایمپلنت‌های سوئیسی و کره‌ای با گارانتی مادام العمر",
    icon: <GiTooth className="text-xl" />,
    link: "/services/implant",
    color: "bg-green-100 text-green-600"
  },
  {
    title: "ارتودنسی نامرئی",
    description: "درمان ناهنجاری‌های دندانی با روش‌های مدرن ارتودنس ثابت و متحرک (اینویزیلاین)",
    icon: <FaSmile className="text-xl" />,
    link: "/services/orthodontics",
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "جراحی لثه و ایمپلنت",
    description: "درمان بیماری‌های لثه و پیوند استخوان توسط متخصصین پریودانتیکس",
    icon: <GiTooth className="text-xl" />,
    link: "/services/gum-surgery",
    color: "bg-red-100 text-red-600"
  },
  {
    title: "درمان ریشه (اندو)",
    description: "عصب‌کشی بدون درد با دستگاه روتاری پیشرفته و میکروسکوپ جراحی",
    icon: <FaTooth className="text-xl" />,
    link: "/services/root-canal",
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    title: "دندانپزشکی اطفال",
    description: "درمان تخصصی دندان‌های شیری و فیشور سیلانت برای کودکان در محیطی دوست داشتنی",
    icon: <FaSmile className="text-xl" />,
    link: "/services/pediatric",
    color: "bg-pink-100 text-pink-600"
  }
];

const FEATURES = [
  {
    title: "تجهیزات مدرن",
    description: "استفاده از دستگاه‌های دیجیتال رادیوگرافی، لیزر دندانپزشکی و میکروسکوپ جراحی"
  },
  {
    title: "کادر مجرب",
    description: "متخصصین با تجربه و فارغ التحصیل از دانشگاه‌های معتبر داخلی و خارجی"
  },
  {
    title: "استانداردهای بهداشتی",
    description: "رعایت پروتکل‌های دقیق استریلیزاسیون مطابق با استانداردهای جهانی"
  },
  {
    title: "پذیرش آنلاین",
    description: "امکان رزرو نوبت به صورت اینترنتی و مشاوره تلفنی رایگان"
  },
  {
    title: "همکاری با بیمه‌ها",
    description: "همکاری با بیمه‌های تکمیلی و ارائه خدمات با تخفیف ویژه"
  }
];

const TESTIMONIALS = [
  {
    name: "دکتر سارا احمدی",
    rating: 5,
    comment: "به عنوان همکار دندانپزشک، کلینیک پارس دنتال را به دلیل رعایت بالای استانداردهای درمانی و استفاده از مواد باکیفیت به همه توصیه می‌کنم.",
    role: "دندانپزشک عمومی"
  },
  {
    name: "محمد رضایی",
    rating: 5,
    comment: "بعد از سال‌ها ترس از دندانپزشکی، تجربه بسیار خوبی در این کلینیک داشتم. کادر درمانی بسیار دلسوز و حرفه‌ای هستند.",
    role: "بیمار"
  },
  {
    name: "نازنین کریمی",
    rating: 4,
    comment: "لمینت دندان‌های من توسط متخصص ترمیمی این کلینیک انجام شد و نتیجه فوق‌العاده بود. محیط کلینیک هم بسیار تمیز و آرامش‌بخش است.",
    role: "بیمار"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-50 to-cyan-50 py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-100 to-transparent"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center relative z-10 gap-8">
            <div className="md:w-1/2 space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight"
              >
                کلینیک تخصصی دندانپزشکی <span className="text-blue-600">پارس دنتال</span>
              </motion.h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                ارائه خدمات تخصصی دندانپزشکی با استانداردهای جهانی و کادری مجرب در محیطی کاملا استریل و مجهز به پیشرفته‌ترین دستگاه‌های روز دنیا
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/dashboard/appointment/new"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <FaCalendarAlt />
                  نوبت دهی آنلاین
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:+982122345678"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg text-lg font-medium transition-all shadow hover:shadow-md flex items-center gap-2"
                >
                  <FaPhoneAlt />
                  تماس با ما
                </motion.a>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FaSmile className="text-blue-600 text-xl" />
                  </div>
                  <span className="text-gray-700">بیش از ۱۰,۰۰۰ بیمار راضی</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FaClinicMedical className="text-blue-600 text-xl" />
                  </div>
                  <span className="text-gray-700">۲۰ سال سابقه درخشان</span>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 mt-8 md:mt-0 relative">
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
                  quality={90}
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <GiTooth className="text-blue-600 text-2xl" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">۱۲ متخصص مجرب</p>
                      <p className="text-sm text-gray-600">در رشته‌های مختلف دندانپزشکی</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-blue-50 p-6 rounded-xl text-center"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">۲۰+</div>
                <p className="text-gray-700">سال تجربه</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-green-50 p-6 rounded-xl text-center"
              >
                <div className="text-4xl font-bold text-green-600 mb-2">۱۲</div>
                <p className="text-gray-700">متخصص مجرب</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-purple-50 p-6 rounded-xl text-center"
              >
                <div className="text-4xl font-bold text-purple-600 mb-2">۱۰,۰۰۰+</div>
                <p className="text-gray-700">بیمار راضی</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-amber-50 p-6 rounded-xl text-center"
              >
                <div className="text-4xl font-bold text-amber-600 mb-2">۵۰+</div>
                <p className="text-gray-700">خدمات تخصصی</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-gray-800 mb-4"
              >
                خدمات <span className="text-blue-600">کلینیک پارس دنتال</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-600 max-w-3xl mx-auto"
              >
                با بهره‌گیری از تکنولوژی‌های نوین و مواد باکیفیت، سلامت دندان‌های شما را تضمین می‌کنیم
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden group"
                >
                  <div className={`${service.color} p-3 rounded-lg inline-flex mb-6`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                  <a
                    href={service.link}
                    className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1 transition-colors"
                  >
                    جزئیات بیشتر
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/services"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all shadow-lg hover:shadow-xl"
              >
                مشاهده تمام خدمات
              </motion.a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
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
                  quality={90}
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 max-w-xs">
                  <h4 className="font-bold text-gray-800 mb-2">چرا کلینیک پارس دنتال؟</h4>
                  <p className="text-sm text-gray-600">اولین مرکز تخصصی دندانپزشکی دارای گواهینامه ISO 9001 در ایران</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2"
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-6">درباره <span className="text-blue-600">کلینیک پارس دنتال</span></h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  کلینیک تخصصی دندانپزشکی پارس دنتال با بیش از دو دهه تجربه در زمینه ارائه خدمات دندانپزشکی، همواره پیشرو در استفاده از تکنولوژی‌های روز دنیا بوده است. ما با بهره‌گیری از متخصصین مجرب و تجهیزات پیشرفته، محیطی امن و بهداشتی را برای مراجعین محترم فراهم کرده‌ایم.
                </p>

                <div className="space-y-4">
                  {FEATURES.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                        <IoMdCheckmarkCircleOutline className="h-5 w-5 text-blue-600" />
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
                    مشاهده اطلاعات کامل کلینیک
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Doctors Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">متخصصین <span className="text-blue-600">کلینیک پارس دنتال</span></h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">کادر درمانی مجرب و متخصص ما آماده خدمت‌رسانی به شما عزیزان هستند</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="relative h-64">
                    <Image
                      src={`/images/doctor-${index + 1}.jpg`}
                      alt={`دکتر متخصص ${index + 1}`}
                      fill
                      className="object-cover"
                      quality={80}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">دکتر محمد رضایی</h3>
                    <p className="text-blue-600 mb-3">متخصص پروتزهای دندانی</p>
                    <p className="text-gray-600 text-sm mb-4">فارغ التحصیل دانشگاه علوم پزشکی تهران با ۱۵ سال سابقه تخصصی</p>
                    <a
                      href="/doctors/1"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
                    >
                      مشاهده پروفایل
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/doctors"
                className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg text-lg font-medium transition-all shadow hover:shadow-md"
              >
                مشاهده تمام پزشکان
              </motion.a>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">تجربه <span className="text-blue-600">مراجعین ما</span></h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">نظرات بیمارانی که از خدمات کلینیک پارس دنتال استفاده کرده‌اند</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((testimonial, index) => (
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
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                      <div className="flex text-yellow-400 mt-1">
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

        {/* Contact Info */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-blue-50 p-8 rounded-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaPhoneAlt className="text-blue-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">تماس با ما</h3>
                </div>
                <p className="text-gray-600 mb-2">شماره تماس: ۰۲۱-۲۲۳۴۵۶۷۸</p>
                <p className="text-gray-600 mb-2">موبایل: ۰۹۱۲۳۴۵۶۷۸۹</p>
                <p className="text-gray-600">پست الکترونیک: info@parsdental.com</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-green-50 p-8 rounded-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FaMapMarkerAlt className="text-green-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">آدرس کلینیک</h3>
                </div>
                <p className="text-gray-600">
                  تهران، خیابان ولیعصر، بالاتر از میدان ولیعصر، کوچه فلانی، پلاک ۱۲۳، طبقه دوم
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-purple-50 p-8 rounded-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <FaClock className="text-purple-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">ساعات کاری</h3>
                </div>
                <p className="text-gray-600 mb-2">شنبه تا چهارشنبه: ۹ صبح تا ۹ شب</p>
                <p className="text-gray-600 mb-2">پنجشنبه: ۹ صبح تا ۶ عصر</p>
                <p className="text-gray-600">جمعه‌ها: تعطیل</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 bg-blue-600 text-white overflow-hidden">
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
              برای دریافت <span className="text-yellow-300">مشاوره رایگان</span> آماده‌ایم
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl mb-8 max-w-2xl mx-auto"
            >
              همکاران ما در بخش پذیرش آماده پاسخگویی به سوالات شما و تعیین نوبت در سریع‌ترین زمان ممکن هستند
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a
                href="/dashboard/appointment/new"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-medium transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                <FaCalendarAlt />
                دریافت نوبت اینترنتی
              </a>
              <a
                href="tel:+982122345678"
                className="border-2 border-white text-white hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-medium transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                <FaPhoneAlt />
                تماس تلفنی
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
