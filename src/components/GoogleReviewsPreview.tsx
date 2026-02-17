"use client";

import { Star, ExternalLink } from "lucide-react";
import { mockReviews } from "@/data/reviews";

export default function GoogleReviewsPreview() {

  const { averageRating, totalReviews, reviews } = mockReviews;

  // Generate star display
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : i < rating
            ? "text-yellow-400 fill-yellow-400/50"
            : "text-muted"
        }
      />
    ));
  };

  return (
    <section className="py-16 relative bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div
            
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              What Our <span className="text-gradient">Guests Say</span>
            </h2>
            <p className="text-muted">
              Join thousands of happy customers across Utah
            </p>
          </div>

          {/* Rating Summary */}
          <div
            
            className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10"
          >
            {/* Google Rating Card */}
            <div className="glass rounded-2xl p-6 flex items-center gap-4">
              {/* Google Logo Placeholder */}
              <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center">
                <span className="text-2xl font-bold text-gradient">G</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-3xl font-bold">{averageRating}</span>
                  <div className="flex">{renderStars(averageRating)}</div>
                </div>
                <p className="text-sm text-muted">
                  Based on{" "}
                  <span className="text-foreground font-medium">
                    {totalReviews.toLocaleString()}
                  </span>{" "}
                  reviews
                </p>
              </div>
            </div>

            {/* View All Link */}
            <a
              href="https://www.google.com/search?q=ombu+grill+utah+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              View all reviews on Google
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Review Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                
                className="glass rounded-xl p-5"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-semibold">
                        {review.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{review.author}</p>
                      <p className="text-xs text-muted">{review.date}</p>
                    </div>
                  </div>
                  {/* Rating */}
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>

                {/* Review Text */}
                <p className="text-sm text-muted leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
