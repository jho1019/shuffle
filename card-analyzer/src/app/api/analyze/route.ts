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
        console.log('Returning mock data for cert:', certNumber);

        /*
        // MOCK DATA - Replace this section with the real API call when ready
        const mockData = {
            "PSACert": {
                "CertNumber": "126198911",
                "SpecID": 8303513,
                "SpecNumber": "BVG2000004",
                "LabelType": "LighthouseLabel",
                "ReverseBarCode": true,
                "Year": "2022",
                "Brand": "BOWMAN CHROME SAPPHIRE EDITION",
                "Category": "BASEBALL CARDS",
                "CardNumber": "77",
                "Subject": "BOBBY WITT JR.",
                "Variety": "",
                "IsPSADNA": false,
                "IsDualCert": false,
                "GradeDescription": "GEM MT 10",
                "CardGrade": "GEM MT 10",
                "TotalPopulation": 796,
                "TotalPopulationWithQualifier": 0,
                "PopulationHigher": 0
            }
        };

        return NextResponse.json(mockData);
        */

        // /* REAL API CALL - Uncomment when ready to use live data
        const response = await fetch(`https://api.psacard.com/publicapi/cert/GetByCertNumber/${certNumber}`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('PSA API Response Status:', response.status);

        const data = await response.json();
        console.log('PSA API Response Data:', data);

        if (!response.ok) {
            const errorText = JSON.stringify(data);
            return NextResponse.json({
                error: `PSA API Error: ${response.statusText}`,
                details: errorText,
                status: response.status
            }, { status: response.status });
        }

        return NextResponse.json(data);
        // */
    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: String(error) }, { status: 500 });
    }
}
