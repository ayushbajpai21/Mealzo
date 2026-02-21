import React from 'react';

const Skeleton = ({ className }) => {
    return (
        <div className={`animate-pulse bg-gray-200 rounded-xl ${className}`}></div>
    );
};

export const DishCardSkeleton = () => {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 h-full">
            <Skeleton className="w-full h-48 mb-4" />
            <div className="flex justify-between mb-2">
                <Skeleton className="w-2/3 h-6" />
                <Skeleton className="w-1/4 h-6" />
            </div>
            <Skeleton className="w-full h-10 mb-4" />
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="space-y-1">
                    <Skeleton className="w-12 h-3" />
                    <Skeleton className="w-16 h-6" />
                </div>
                <Skeleton className="w-10 h-10 rounded-xl" />
            </div>
        </div>
    );
};

export default Skeleton;
