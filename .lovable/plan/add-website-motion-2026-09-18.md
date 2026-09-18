# Add website motion

## Changes
- Add scroll-triggered reveal animations for section headings, cards, forms, and key content.
- Stagger repeated cards and city items for a smoother entrance sequence.
- Keep existing hero, map, partner marquee, hover, and WhatsApp animations intact.
- Respect reduced-motion preferences and ensure content remains visible without JavaScript.

## Technical details
- Use a small Intersection Observer React wrapper to activate elements as they enter the viewport.
- Add reusable CSS classes and delays based on existing Page.ma timing and easing.
- Verify the page at desktop and mobile widths and confirm the preview builds cleanly.
