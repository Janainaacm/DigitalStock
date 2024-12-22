
const Calendar = () => {
  return (
    <>

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default p-8">
        <div>
          <h1 className="text-xl font-semibold pb-3">Calendar</h1>
        </div>
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-sm bg-indigo-600 text-white">
              <th className="flex h-15 items-center justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Sunday </span>
                <span className="block lg:hidden"> Sun </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Monday </span>
                <span className="block lg:hidden"> Mon </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Tuesday </span>
                <span className="block lg:hidden"> Tue </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Wednesday </span>
                <span className="block lg:hidden"> Wed </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Thursday </span>
                <span className="block lg:hidden"> Thur </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Friday </span>
                <span className="block lg:hidden"> Fri </span>
              </th>
              <th className="flex h-15 items-center justify-center rounded-tr-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> Saturday </span>
                <span className="block lg:hidden"> Sat </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="grid grid-cols-7">
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black ">
                  1
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black">
                  2
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray  md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  3
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  4
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  5
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  6
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  7
                </span>
              </td>
            </tr>
            <tr className="grid grid-cols-7">
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  8
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  9
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  10
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  11
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  12
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  13
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  14
                </span>
              </td>
            </tr>
            <tr className="grid grid-cols-7">
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  15
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  16
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  17
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  18
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  19
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  20
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  21
                </span>
              </td>
            </tr>
            <tr className="grid grid-cols-7">
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  22
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  23
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  24
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  25
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  26
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  27
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  28
                </span>
              </td>
            </tr>
            <tr className="grid grid-cols-7">
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  29
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  30
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  31
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  1
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  2
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  3
                </span>
              </td>
              <td className="ease relative h-24 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black  ">
                  4
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Calendar;
