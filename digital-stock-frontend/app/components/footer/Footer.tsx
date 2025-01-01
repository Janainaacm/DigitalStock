import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-10 sm:px-10 px-6 font-[sans-serif] tracking-wide">
      <div className="max-w-screen-xl mx-auto">
      <div className="max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800">Newsletter</h3>
          <p className="text-sm mt-4 text-gray-500">
            Subscribe to our newsletter and stay up to date with the latest
            news, updates, and exclusive offers. Get valuable insights. Join our
            community today!
          </p>

          <div className="bg-gray-100 flex px-2 py-1.5 rounded-full text-left mt-8">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full outline-none bg-transparent text-sm pl-4"
            />
            <button
              type="button"
              className="bg-gray-700 hover:bg-gray-800 text-white text-sm rounded-full px-4 py-2 ml-4 transition-all tracking-wide"
            >
              Submit
            </button>
          </div>
        </div>

        <hr className="my-12" />

        <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
          <Image
                    className="block"
                    src="/logo-with-text.svg" 
                    alt="Logo"
                    width={220}
                    height={40}
                  />
          </div>

          <div>
            <h4 className="text-base font-bold mb-6 text-gray-800">Store</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-gray-500 hover:text-gray-800 text-sm"
                >
                  Smartphones
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-gray-500 hover:text-gray-800 text-sm"
                >
                  Computers
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-gray-500 hover:text-gray-800 text-sm"
                >
                  Smartwatches
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-gray-500 hover:text-gray-800 text-sm"
                >
                  Earphones
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-bold mb-6 text-gray-800">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-gray-500 hover:text-gray-800 text-sm"
                >
                  Register
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-gray-500 hover:text-gray-800 text-sm"
                >
                  Sign in
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-gray-500 hover:text-gray-800 text-sm"
                >
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-bold mb-6 text-gray-800">Digital Stock</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="javascript:void(0)"
                  className="text-gray-500 hover:text-gray-800 text-sm"
                >
                  About us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
