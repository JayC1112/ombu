export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  locationId?: string;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}

// Mock data - replace with real API data later
export const mockReviews: ReviewSummary = {
  averageRating: 4.6,
  totalReviews: 2847,
  reviews: [
    {
      id: "1",
      author: "Sarah M.",
      rating: 5,
      text: "Best Korean BBQ in Utah! The meat quality is excellent and the banchan is always fresh. Love the unlimited refills!",
      date: "2 weeks ago",
    },
    {
      id: "2",
      author: "Michael T.",
      rating: 5,
      text: "Amazing experience every time. Great service, delicious food, and the hot pot at South Jordan is a must-try!",
      date: "1 month ago",
    },
    {
      id: "3",
      author: "Jessica L.",
      rating: 4,
      text: "Love coming here with my family. The all-you-can-eat deal is unbeatable. Gets busy on weekends so come early!",
      date: "3 weeks ago",
    },
  ],
};

// Function to get reviews - can be replaced with API call later
export async function getReviews(): Promise<ReviewSummary> {
  // TODO: Replace with actual Google Business Profile API or Outscraper integration
  return mockReviews;
}
