import Image from "next/image";
import Link from "next/link";

export default function Gallery() {
  const images = [
    "/images/Maypole_01.jpeg",
    "/images/Maypole_02.jpeg",
    "/images/Maypole_03.jpeg",
    "/images/Maypole_04.jpeg",
    "/images/Maypole_05.jpeg",
    "/images/Maypole_06.jpeg",
    "/images/Maypole_07.jpeg",
    "/images/Maypole_08.jpeg",
    "/images/Maypole_09.jpeg",
    "/images/Maypole_10.jpeg",
    "/images/Maypole_11.jpeg",
    "/images/Maypole_13.jpeg",
    "/images/Maypole_14.jpeg",
    "/images/Maypole_15.jpeg",
    "/images/Maypole_16.jpeg",
    "/images/Maypole_17.jpeg",
    "/images/Maypole_18.jpeg",
    "/images/Maypole_19.jpeg",
    "/images/Maypole_20.jpeg",
    "/images/Maypole_21.jpeg",
    "/images/Maypole_22.jpeg",
    "/images/Maypole_23.jpeg",
    "/images/Maypole_24.jpeg",
    "/images/Panorama.jpeg",
    // Old Images
    "/images/Old_Images/B_W_01.jpeg",
    "/images/Old_Images/B_W_02.jpeg",
    "/images/Old_Images/B_W_03.jpeg",
    "/images/Old_Images/B_W_04.jpeg",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 shadow-sm pt-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-gray-900 flex items-center">
            <Image
                src="/images/Logo/MaypoleNewLogo.jpeg"
                alt="Friends of the Maypole Logo"
                width={120}
                height={120}
                className="mr-4 rounded-full"
              />
              Friends of the Maypole
            </Link>
            <div className="flex gap-8">
              <Link href="/gallery" className="text-gray-900 font-medium">
                Gallery
              </Link>
              <a 
                href="https://www.facebook.com/p/Friends-Of-The-Maypole-61576028020681/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Gallery Content */}
      <div className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Maypole Piece Gallery</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A collection of photographs showcasing the beauty and history of Maypole Piece
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((src, index) => {
              // Extract filename from path
              const filename = src.split('/').pop();
              const title = filename ? filename.split('.')[0] : `Maypole Piece ${index + 1}`;

              return (
                <div key={index} className="group relative h-[400px] overflow-hidden rounded-2xl">
                  <Image
                    src={src}
                    alt={title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-semibold mb-2">{title}</h3>
                      <p className="text-sm text-white/90">Click to view full image</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 truncate">{src}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 