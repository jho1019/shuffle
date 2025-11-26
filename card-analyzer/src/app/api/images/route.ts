import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const certNumber = searchParams.get('cert');

    if (!certNumber) {
        return NextResponse.json({ error: 'Certification number is required' }, { status: 400 });
    }

    // Get API key from environment variables
    const apiKey = process.env.PSA_API_KEY;

    if (!apiKey) {
        console.error('PSA_API_KEY is not configured in environment variables');
        return NextResponse.json({
            error: 'Server configuration error: PSA API key not configured'
        }, { status: 500 });
    }

    try {
        console.log('Returning mock image data for cert:', certNumber);

        // MOCK DATA - Replace this section with the real API call when ready
        /*
        const mockImages = [
            {
                "IsFrontImage": false,
                "ImageURL": "https://d1htnxwo4o0jhw.cloudfront.net/cert/186783149/2ONEfrQsCEeMSngjoaT42A.jpg"
            },
            {
                "IsFrontImage": true,
                "ImageURL": "https://d1htnxwo4o0jhw.cloudfront.net/cert/186783149/xFlC1ydzAkuXhFDNXia2kw.jpg"
            }
        ];

        return NextResponse.json(mockImages);
        */

        // /* REAL API CALL - Uncomment when ready to use live data
        const response = await fetch(`https://api.psacard.com/publicapi/cert/GetImagesByCertNumber/${certNumber}`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('PSA Images API Response Status:', response.status);

        if (!response.ok) {
            // If images not found, return empty array instead of error
            if (response.status === 404) {
                return NextResponse.json([]);
            }

            const errorText = await response.text();
            return NextResponse.json({
                error: `PSA Images API Error: ${response.statusText}`,
                details: errorText,
                status: response.status
            }, { status: response.status });
        }

        const data = await response.json();
        console.log('PSA Images API Response Data:', data);

        return NextResponse.json(data);
        // */
    } catch (error) {
        console.error('Images API Route Error:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: String(error) }, { status: 500 });
    }
}
