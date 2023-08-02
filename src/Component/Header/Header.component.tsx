
const Header = (prop: { displayMonth: string | undefined, displayYear: number | undefined, handlePreviousClick: () => void, handleNextClick: () => void }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between mt-3 mb-3 bg-gray-200 bg-opacity-70 p-7 rounded-full">
            <div className="mb-3 sm:mb-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900">
                    Event Calendar - {prop.displayMonth} {prop.displayYear}
                </h2>
            </div>
            <div className="flex justify-center">
                <button
                    data-testid="previous-click"
                    type="button"
                    className="text-sm text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={prop.handlePreviousClick}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                </button>
                <button
                    data-testid="next-click"
                    type="button"
                    className="text-sm text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={prop.handleNextClick}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Header;