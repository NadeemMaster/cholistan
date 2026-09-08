import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100">
      
      {/* Navigation Bar */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo Placeholder */}
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
              C
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">Cholistan Tractors</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Authorized Al-Ghazi Dealership</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-600 dark:text-gray-300 hover:text-primary transition">Home</a>
            <a href="#models" className="text-gray-600 dark:text-gray-300 hover:text-primary transition">Models</a>
            <a href="#scheme" className="text-gray-600 dark:text-gray-300 hover:text-primary transition">Green Scheme</a>
            <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-primary transition">Testimonials</a>
          </nav>

          <div className="flex items-center">
            <Link 
              href="/login" 
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md font-medium transition shadow-md"
            >
              Dealership Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-white dark:bg-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
              Empowering Pakistan's Agriculture with <span className="text-primary">New Holland</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10">
              Welcome to Cholistan Tractors, your premier Al-Ghazi Dealership. We provide top-tier agricultural machinery, authentic parts, and unparalleled service to farmers nationwide.
            </p>
            <div className="flex justify-center gap-4">
              <a href="#contact" className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-md font-semibold text-lg transition shadow-lg">
                Book Your Tractor
              </a>
              <a href="#models" className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 px-8 py-3 rounded-md font-semibold text-lg transition">
                View Models
              </a>
            </div>
          </div>
        </div>
        
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full pointer-events-none opacity-5 dark:opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </section>

      {/* Features / Models Section */}
      <section id="models" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Our Fleet</span>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">New Holland Tractors</h3>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Discover our range of powerful, efficient, and durable tractors designed specifically for the rugged terrain of Pakistan.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Model Card 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                [Tractor Image Placeholder]
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">NH Ghazi (65 HP)</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">The most popular and versatile tractor for medium to large farms, combining power with unmatched fuel efficiency.</p>
                <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-4 mt-4">
                  <span className="text-primary font-bold">In Stock</span>
                  <a href="#contact" className="text-sm font-semibold text-gray-900 dark:text-white hover:text-primary transition">Inquire Now &rarr;</a>
                </div>
              </div>
            </div>

            {/* Model Card 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                [Tractor Image Placeholder]
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">NH 480S (55 HP)</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">A compact powerhouse designed for smaller farms and orchards, offering agility without compromising on strength.</p>
                <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-4 mt-4">
                  <span className="text-primary font-bold">In Stock</span>
                  <a href="#contact" className="text-sm font-semibold text-gray-900 dark:text-white hover:text-primary transition">Inquire Now &rarr;</a>
                </div>
              </div>
            </div>

            {/* Model Card 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                [Tractor Image Placeholder]
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">NH 850 (85 HP)</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Heavy-duty performance for large-scale operations. Built for deep plowing, heavy towing, and maximum yield.</p>
                <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-4 mt-4">
                  <span className="text-primary font-bold">Available on Order</span>
                  <a href="#contact" className="text-sm font-semibold text-gray-900 dark:text-white hover:text-primary transition">Inquire Now &rarr;</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Testimonials</span>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">Hear From Our Farmers</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl relative">
              <div className="text-primary text-4xl absolute top-4 right-6 opacity-20">"</div>
              <p className="text-gray-700 dark:text-gray-300 italic mb-6">
                "Booking my New Holland 850 through Cholistan Tractors was incredibly smooth. They handled all the factory paperwork and delivered my tractor exactly on time. Highly recommended!"
              </p>
              <div>
                <h5 className="font-bold text-gray-900 dark:text-white">Haji Ehsan</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">NH 850 Owner</span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl relative">
              <div className="text-primary text-4xl absolute top-4 right-6 opacity-20">"</div>
              <p className="text-gray-700 dark:text-gray-300 italic mb-6">
                "I applied through the Green Tractor Scheme and the staff guided me through every single step. Outstanding customer service and a brilliant machine."
              </p>
              <div>
                <h5 className="font-bold text-gray-900 dark:text-white">M. Yousaf</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">NH Ghazi Owner</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-2xl font-bold mb-4">Cholistan Tractors</h4>
            <p className="text-gray-400 mb-4">Your trusted Al-Ghazi dealership providing agricultural excellence to the heart of Pakistan.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Bank Square Road, Liaquatpur</li>
              <li>Phone: +92 68 5795666</li>
              <li>Email: info@cholistantractors.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#home" className="hover:text-primary transition">Home</a></li>
              <li><a href="#models" className="hover:text-primary transition">Tractor Models</a></li>
              <li><Link href="/login" className="hover:text-primary transition">Dealership Staff Login</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Cholistan Tractors. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
