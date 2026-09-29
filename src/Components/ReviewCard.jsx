import React from 'react'

const ReviewCard = ({
    name = '',
    rating = 0,
    date = '',
    comment = '',
    avatar = 'https://via.placeholder.com/40',
    alt = 'Reviewer avatar'
}) => {
    const renderStars = () =>
        Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? 'text-amber-400' : 'text-gray-300'}>
                ★
            </span>
        ))

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-3">
                <img
                    src={avatar}
                    alt={alt}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <h4 className="font-semibold text-gray-800 text-sm">{name}</h4>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="font-medium text-gray-700">{rating}.0</span>
                        <div className="text-amber-400 flex">{renderStars()}</div>
                        <span className="text-gray-400">{date}</span>
                    </div>
                </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed pl-13">
                {comment}
            </p>
        </div>
    )
}

export default ReviewCard
