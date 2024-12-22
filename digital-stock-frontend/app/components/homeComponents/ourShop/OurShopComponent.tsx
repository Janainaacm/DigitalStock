

const OurShop = () => {
    return (
        <div>
        <div className="pb-6 pt-3  shadow-inner border-t border-gray-200">
          <h2 className="w-full text-center text-gray-900 text-4xl font-bold font-manrope leading-loose pb-2.5">
            Our Store
          </h2>
          <p className="w-full text-center text-gray-600 text-lg font-normal leading-8">
          Stop by our stores to learn the stories behind our products, get personal guidence, or shop the latest in person. See our store locations.
          </p>
        </div>
        <div className="flex items-center justify-center m-8 mb-16">
            <img className="scale-[1.1]" src="https://www.apple.com/newsroom/images/live-action/new-store-opening/Apple-Store-fifth-avenue-new-york-redesign-interior-091919_big.jpg.large.jpg" alt="" />
        </div>
        </div>
    )
}

export default OurShop;