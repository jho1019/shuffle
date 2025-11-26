# Mock Data Configuration

## Current Status
The app is currently configured to use **MOCK DATA** to conserve PSA API rate limits during development.

## Mock Data Details

### Card Details API (`/api/analyze`)
Returns mock data for Bobby Witt Jr. 2022 Bowman Chrome Sapphire Edition card:
- **Cert Number**: 126198911
- **Grade**: GEM MT 10
- **Subject**: BOBBY WITT JR.
- **Year**: 2022
- **Brand**: BOWMAN CHROME SAPPHIRE EDITION

### Card Images API (`/api/images`)
Returns two mock images:
- Front image
- Back image

## Switching to Live PSA API

When you're ready to use the real PSA API:

### 1. Update `/src/app/api/images/route.ts`
```typescript
// Comment out the mock data section
/*
const mockImages = [ ... ];
return NextResponse.json(mockImages);
*/

// Uncomment the real API call section
const response = await fetch(`https://api.psacard.com/publicapi/cert/GetImagesByCertNumber/${certNumber}`, {
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
    },
});
// ... rest of the real API code
```

### 2. Restart the Development Server
```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## Benefits of Mock Data
- ✅ Conserves API rate limits during development
- ✅ Faster development without network latency
- ✅ Consistent test data for UI development
- ✅ No need for API key during initial setup
- ✅ Easy to switch back and forth

## Testing with Real Data
Once you switch to live API:
1. Make sure your `PSA_API_KEY` is set in `.env.local`
2. Enter any valid PSA certification number
3. The app will fetch real data from PSA's API
