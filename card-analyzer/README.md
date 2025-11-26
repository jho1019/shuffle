# Card Analyzer

A modern web application for verifying PSA certified trading cards using the PSA Public API.

## Features

- 🔍 **Instant Verification**: Look up PSA certified cards by certification number
- 🎨 **Premium UI**: Modern, dark-themed interface with glassmorphism effects
- 🔐 **Secure**: API key stored server-side in environment variables
- ⚡ **Fast**: Built with Next.js 15 and Tailwind CSS v4

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PSA API token (get one at [psacard.com/publicapi](https://www.psacard.com/publicapi))

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables:
```bash
cp .env.example .env.local
```

3. Edit `.env.local` and add your PSA API key:
```
PSA_API_KEY=your_actual_api_key_here
```

Get your API key from [psacard.com/publicapi](https://www.psacard.com/publicapi)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Usage

**Note**: The app is currently configured to use mock data to conserve API rate limits. See [MOCK_DATA.md](MOCK_DATA.md) for details on switching to live PSA API.

1. Enter any PSA certification number in the search box
2. Click "Analyze" to view card details and images
3. Use the carousel arrows to view front/back images (if available)

## API Integration

This app uses the PSA Public API to fetch card certification data:

- **Endpoint**: `GET /cert/GetByCertNumber/{certNumber}`
- **Authentication**: Bearer token
- **Rate Limit**: 100 calls/day (free tier)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **API**: PSA Public API

## Project Structure

```
card-analyzer/
├── src/
│   ├── app/
│   │   ├── api/analyze/     # API route for PSA integration
│   │   ├── globals.css      # Global styles and animations
│   │   └── page.tsx         # Main application page
│   └── components/
│       ├── CardInput.tsx    # Search input component
│       └── CardResult.tsx   # Results display component
├── public/                  # Static assets
└── package.json
```

## Build for Production

```bash
npm run build
npm start
```

## License

MIT
