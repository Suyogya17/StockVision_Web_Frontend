import { Link } from "react-router-dom";
import Navbar from "../common/navbar";
import Footer from "../common/footer";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          About Us
        </h1>

        {/* Company Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Who We Are</h2>
          <p className="text-gray-600">
            At StockVision, we are a dynamic team dedicated to providing high-quality products and exceptional service.
            Our mission is to bring innovative solutions to our customers and create a seamless shopping experience.
            With a wide selection of products and an easy-to-navigate platform, we aim to revolutionize the e-commerce
            space, all while maintaining a focus on sustainability and customer satisfaction.
          </p>
        </section>

        {/* Our Mission */}
        <section className="mb-12 bg-gray-50 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to empower our customers to live a more convenient and sustainable lifestyle. We aim to
            provide products that not only serve a purpose but also align with values of sustainability and responsibility.
            By making it easier to access quality products, we aim to create a lasting impact on both our customers and
            the world around us.
          </p>
        </section>

        {/* Our Values */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>Customer-Centricity</strong> – We put our customers at the heart of everything we do.</li>
            <li><strong>Integrity</strong> – We operate with honesty and transparency in all our interactions.</li>
            <li><strong>Innovation</strong> – We are committed to continuous improvement and creative solutions.</li>
            <li><strong>Sustainability</strong> – We focus on products that minimize our environmental impact.</li>
          </ul>
        </section>

        {/* Contact Us */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            Have questions or want to get in touch? Feel free to <Link to="/support" className="text-blue-500 hover:underline">contact us</Link>.
          </p>
          <p className="text-gray-600">
            Email: <span className="text-blue-500">stockvision@gmail.com</span>
          </p>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
