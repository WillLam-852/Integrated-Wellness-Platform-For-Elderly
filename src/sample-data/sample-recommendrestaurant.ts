import RecommendRestaurant from "@/models/RecommendRestaurant";

const sampleRestaurants: RecommendRestaurant[] = [
    new RecommendRestaurant(
        1,
        'The Gourmet Bistro',
        'A cozy place offering a variety of gourmet dishes made from locally sourced ingredients.',
        'French',
        'https://example.com/images/gourmet-bistro.jpg',
        'https://example.com/gourmet-bistro'
    ),
    new RecommendRestaurant(
        2,
        'Sushi Paradise',
        'Experience the best sushi in town with our fresh and authentic Japanese cuisine.',
        'Japanese',
        'https://example.com/images/sushi-paradise.jpg',
        'https://example.com/sushi-paradise'
    ),
    new RecommendRestaurant(
        3,
        'Pizza Palace',
        'Home of the classic and gourmet pizzas, baked to perfection in our stone oven.',
        'Italian',
        'https://example.com/images/pizza-palace.jpg',
        'https://example.com/pizza-palace'
    ),
];

export default sampleRestaurants;