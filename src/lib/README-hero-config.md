# Hero Configuration Guide

## Overview
The Hero component now supports dynamic image and gradient rotation with smooth animations. The configuration is managed through a JSON-like structure in `heroConfig.ts` for easy customization.

## Configuration Structure

Each hero slide consists of:
- `id`: Unique identifier for the slide
- `image`: Path to the hero image
- `gradient`: Color scheme object with 7 color properties
- `title`: Optional custom title text

## Adding New Slides

To add a new hero slide, simply add a new object to the `heroSlides` array:

```typescript
{
  id: "custom-hero",
  image: "/images/landing/your-image.png",
  gradient: {
    primary: "#YOUR_COLOR",
    secondary: "#YOUR_COLOR",
    accent1: "#YOUR_COLOR",
    accent2: "#YOUR_COLOR", 
    accent3: "#YOUR_COLOR",
    highlight1: "#YOUR_COLOR",
    highlight2: "#YOUR_COLOR",
  },
  title: "Your custom title here!"
}
```

## Gradient Color Properties

- `primary`: Main gradient color (largest blur effect)
- `secondary`: Secondary gradient color (medium blur)
- `accent1`: Green accent color
- `accent2`: Light background color
- `accent3`: Additional accent color
- `highlight1`: Red highlight color (large blur)
- `highlight2`: Orange highlight color (large blur)

## Features

- **Auto-rotation**: Changes slides every 5 seconds
- **Pause on hover**: Stops rotation when user hovers over the hero
- **Manual navigation**: Click indicators or use arrow buttons
- **Smooth animations**: Uses Framer Motion for fluid transitions
- **Progress indicators**: Shows current slide progress
- **Responsive design**: Works on all screen sizes

## Customization Options

You can modify the following in the Hero component:
- Rotation interval (currently 5000ms)
- Animation duration and easing
- Transition effects
- Navigation controls visibility

## Image Requirements

- Recommended size: High resolution (1920x1080 or higher)
- Format: PNG, JPG, or WebP
- Aspect ratio: Should work well with `object-contain` positioning
- Location: Place images in `/public/images/landing/` directory