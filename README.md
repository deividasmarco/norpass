# NordPass Playwright E2E Tests

This repository contains end-to-end (E2E) tests for core NordPass user flows using [Playwright](https://playwright.dev/).

## Features

- Registration flow,
- Promo/coupon validation
- Global navigation links smoke test

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/deividasmarco/norpass.git
   cd norpass
### Information about tests

## 1. **purchase.spec.js (Product Purchase Flow)**
- Automates the business plan purchase flow, including:
- Accepting the cookie consent banner.
- Navigating to the “For Personal” section.
- Selecting a plan and clicking purchase.
- Handling the purchase process, including entering email, personal details, and payment information.
  
Purpose: The product purchase (checkout) workflow functions from homepage to checkout.

## 2. **coupon.spec.js**
Steps:
- Accepts cookie banner if shown.
- Clicks the “Get the Deal”/business deal banner.
- Scrolls and clicks the “Save XX%” discount badge (uses value from .env).
- Asserts that the coupon badge appears and matches the expected code (from .env).

Purpose: Verifies that promotional banners and coupons (e.g., PASSDAY20) are correctly applied during the business plan checkout.

## 3. **navlinksrespond.spec.js**
Steps:
- Accepts cookies.
- Scrapes all top-level navigation links.
- Sends HTTP requests to each and checks for a valid (status < 400) response.

Purpose: Checks that all navigation links in the site’s top navigation bar are working and do not return error pages.
