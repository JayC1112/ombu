"use client";

/**
 * Smooth scroll to a section by ID
 * Uses scrollIntoView with CSS scroll-margin-top for header offset
 */
export function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (element) {
    // Use scrollIntoView - CSS scroll-margin-top handles the header offset
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * Smooth scroll to a section with manual offset calculation
 * Use this when scroll-margin-top is not applicable
 */
export function scrollToSectionWithOffset(sectionId: string, offset: number = 80): void {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
}
