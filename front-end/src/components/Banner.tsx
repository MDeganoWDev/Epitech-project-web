import React from 'react';

const Banner: React.FC = () => {
    return (
        <div className="bg-slate-300 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between flex-wrap">
                    <div className="w-0 flex-1 flex items-center">
                        <p className="ml-3 font-medium text-white truncate">
                            <span className="md:hidden">Job Finder</span>
                            <span className="text-black hidden md:inline">Find the job that fits you</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
