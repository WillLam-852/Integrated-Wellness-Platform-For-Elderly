import RecommendRestaurant from "@/models/RecommendRestaurant";

const sampleRestaurants: RecommendRestaurant[] = [
    new RecommendRestaurant(
        1,
        'The Gourmet Bistro',
        'A cozy place offering a variety of gourmet dishes made from locally sourced ingredients.',
        'French',
        'https://example.com/images/gourmet-bistro.jpg',
        'https://example.com/gourmet-bistro',
        'https://example.com/logo/gourmet-bistro.jpg',
        [
            {
                discountPercentage: 10,
                terms: 'Valid on weekdays for dinner only.',
                validUntil: '2024-12-31'
            }
        ],
    ),
    new RecommendRestaurant(
        2,
        'Sushi Paradise',
        'Experience the best sushi in town with our fresh and authentic Japanese cuisine.',
        'Japanese',
        'https://example.com/images/sushi-paradise.jpg',
        'https://example.com/sushi-paradise',
        'https://example.com/logo/sushi-paradise.jpg',
        [
            {
                discountPercentage: 15,
                terms: 'Applies to all sushi rolls on Mondays.',
                validUntil: '2024-06-30'
            }
        ],
    ),
    new RecommendRestaurant(
        3,
        'Pizza Palace',
        'Home of the classic and gourmet pizzas, baked to perfection in our stone oven.',
        'Italian',
        'https://example.com/images/pizza-palace.jpg',
        'https://example.com/pizza-palace',
        'https://example.com/logo/pizza-palace.jpg',
        [
            {
                discountPercentage: 20,
                terms: '20% off on any large pizza on weekends.',
                validUntil: '2024-08-15'
            }
        ],
    ),
];

export default sampleRestaurants;