import CardImageCarousel from './CardImageCarousel';

interface PSACert {
    CertNumber: string;
    SpecID: number;
    SpecNumber: string;
    LabelType: string;
    ReverseBarCode: boolean;
    Year: string;
    Brand: string;
    Category: string;
    CardNumber: string;
    Subject: string;
    Variety: string;
    IsPSADNA: boolean;
    IsDualCert: boolean;
    GradeDescription: string;
    CardGrade: string;
    TotalPopulation: number;
    TotalPopulationWithQualifier: number;
    PopulationHigher: number;
}

interface CardData {
    PSACert: PSACert;
}

interface CardImage {
    IsFrontImage: boolean;
    ImageURL: string;
}

interface CardResultProps {
    data: CardData | null;
    error: string | null;
    images?: CardImage[];
}

export default function CardResult({ data, error, images = [] }: CardResultProps) {
    if (error) {
        return (
            <div className="mt-8 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 text-center backdrop-blur-sm">
                {error}
            </div>
        );
    }

    if (!data || !data.PSACert) return null;

    const cert = data.PSACert;

    return (
        <div className="mt-12 w-full max-w-6xl mx-auto animate-fade-in-up">
            <div className="relative bg-gray-900/60 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-2xl overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Image Carousel (if images exist) */}
                    {images && images.length > 0 && (
                        <div className="lg:col-span-1">
                            <CardImageCarousel images={images} />
                        </div>
                    )}

                    {/* Right Column - Card Details */}
                    <div className={`space-y-6 ${images && images.length > 0 ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                        {/* Header Section */}
                        <div className="border-b border-white/10 pb-6">
                            <div className="flex items-start justify-between mb-3">
                                <div className="text-blue-400 text-sm font-mono tracking-wider">
                                    CERT #{cert.CertNumber}
                                </div>
                                <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                                    <span className="text-2xl font-bold text-green-300">{cert.CardGrade}</span>
                                </div>
                            </div>
                            <h2 className="text-4xl font-bold text-white leading-tight mb-2">{cert.Subject}</h2>
                            <p className="text-gray-400 text-lg">
                                {cert.Year} {cert.Brand} #{cert.CardNumber}
                            </p>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            <div className="space-y-1">
                                <span className="block text-xs text-gray-500 uppercase tracking-wider">Category</span>
                                <span className="text-white font-medium">{cert.Category}</span>
                            </div>

                            <div className="space-y-1">
                                <span className="block text-xs text-gray-500 uppercase tracking-wider">Year</span>
                                <span className="text-white font-medium">{cert.Year}</span>
                            </div>

                            <div className="space-y-1">
                                <span className="block text-xs text-gray-500 uppercase tracking-wider">Card Number</span>
                                <span className="text-white font-medium">#{cert.CardNumber}</span>
                            </div>

                            <div className="space-y-1">
                                <span className="block text-xs text-gray-500 uppercase tracking-wider">Label Type</span>
                                <span className="text-white font-medium text-sm">{cert.LabelType}</span>
                            </div>

                            <div className="space-y-1">
                                <span className="block text-xs text-gray-500 uppercase tracking-wider">Total Population</span>
                                <span className="text-white font-bold text-lg">{cert.TotalPopulation.toLocaleString()}</span>
                            </div>

                            <div className="space-y-1">
                                <span className="block text-xs text-gray-500 uppercase tracking-wider">Population Higher</span>
                                <span className="text-white font-bold text-lg">{cert.PopulationHigher.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Variety Section (if exists) */}
                        {cert.Variety && (
                            <div className="pt-4 border-t border-white/10">
                                <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Variety</span>
                                <span className="text-white font-medium">{cert.Variety}</span>
                            </div>
                        )}

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                            <div className="px-3 py-1.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                ✓ PSA CERTIFIED
                            </div>
                            {cert.IsPSADNA && (
                                <div className="px-3 py-1.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                    PSA/DNA
                                </div>
                            )}
                            {cert.IsDualCert && (
                                <div className="px-3 py-1.5 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                                    DUAL CERT
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
