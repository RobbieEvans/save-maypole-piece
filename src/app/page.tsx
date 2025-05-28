'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';

export default function Home() {
  const [pledgeType, setPledgeType] = useState('money');
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null); // 'success', 'error', or null

  const handlePledgeTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPledgeType(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionStatus(null); // Clear previous status

    const formData = new FormData(event.currentTarget);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phoneNumber: formData.get('phoneNumber'),
      pledgeType: formData.get('pledgeType'),
      ...(formData.get('pledgeType') === 'money' && { pledgeAmount: formData.get('pledgeAmount') }),
      ...(formData.get('pledgeType') === 'services' && { serviceDetails: formData.get('serviceDetails') }),
      message: formData.get('message'),
    };

    console.log('Submitting data:', data);

    if (!data.email) {
        setSubmissionStatus('error');
        console.error('Email is required for pledge submission.');
        return;
    }

    try {
      const response = await fetch('/api/pledge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log('Response from API:', responseData);

      if (response.ok) {
        setSubmissionStatus('success');
        // Optionally clear the form here
        // event.currentTarget.reset();
      } else {
        setSubmissionStatus('error');
        console.error('API error:', responseData);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 shadow-sm py-2 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-900 flex items-center">
            <Image
              src="/images/Logo/F9954568-66C9-40B8-B222-A4731D67A6DC_1_105_c.jpeg"
              alt="Friends of the Maypole Logo"
              width={120}
              height={120}
              className="mr-4 rounded-full"
            />
            Friends of the Maypole
          </Link>
          <div className="flex gap-8">
            <Link href="/gallery" className="text-gray-600 hover:text-gray-900">
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
      </nav>

      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="/images/Maypole_06.jpeg"
          alt="Maypole Piece Landscape"
          fill
          className="object-cover transform hover:scale-105 transition-transform duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl md:text-7xl text-white font-bold mb-6 tracking-tight">
              Help Save Maypole Piece
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-8">
              A Vital Green Space for Bewdley
            </p>
            <a href="#pledge-form-section" className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 inline-block">
              Make a Pledge
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              The Friends of The Maypole is a newly formed community group working urgently to secure and protect Maypole Piece – a historic and much-loved green space in Wribbenhall, Bewdley – which has just been listed for sale.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              This land has been at the heart of the community for generations, providing a sanctuary for local wildlife and a peaceful, natural space for residents to enjoy. So many people have wonderful stories of this space – from the bonfire celebrating the end of WWII, to Major Webb riding his horse church on a Sunday, to fetes and football matches being held on the top of the hill. As such, we believe it should remain in the hands of the community, not private developers.
            </p>
          </div>
          <div className="relative h-[500px] group">
            <Image
              src="/images/Maypole_01.jpeg"
              alt="Maypole Piece"
              fill
              className="object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our aim is to purchase Maypole Piece and place it into charitable trust ownership, preserving it forever for public benefit. But we can&apos;t do this alone.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Donations</h3>
              <p className="text-gray-600">
                Every contribution, big or small, will take us closer to saving this land.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Expertise</h3>
              <p className="text-gray-600">
                Are you experienced in land purchase, legal processes, fundraising or setting up charities? We&apos;d love to hear from you.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Community Support</h3>
              <p className="text-gray-600">
                Help us spread the word and build a movement! Share your stories, help with leafleting, and tell everyone you know!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pledge Form Section */}
      <section id="pledge-form-section" className="py-24 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Make Your Pledge</h2>
            <p className="text-lg text-gray-600">
              Help us save Maypole Piece by making a pledge today. Your support will help preserve this vital green space for future generations.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
            {/* Pledge Type Selection */}
            <div>
              <label className="block text-gray-900 font-bold mb-2">Pledge Type</label>
              <div className="flex items-center space-x-6">
                <label className="inline-flex items-center">
                  <input type="radio" name="pledgeType" value="money" className="form-radio text-blue-600" checked={pledgeType === 'money'} onChange={handlePledgeTypeChange} required />
                  <span className="ml-2 text-gray-700">Money</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="pledgeType" value="services" className="form-radio text-blue-600" checked={pledgeType === 'services'} onChange={handlePledgeTypeChange} required />
                  <span className="ml-2 text-gray-700">Services</span>
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-900 font-bold mb-2">First Name</label>
                <input type="text" name="firstName" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black placeholder-gray-700" required />
              </div>
              <div>
                <label className="block text-gray-900 font-bold mb-2">Last Name</label>
                <input type="text" name="lastName" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black placeholder-gray-700" required />
              </div>
            </div>
            <div>
              <label className="block text-gray-900 font-bold mb-2">Email</label>
              <input type="email" name="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black placeholder-gray-700" required />
            </div>

            <div>
                <label className="block text-gray-900 font-bold mb-2">Phone Number (Optional)</label>
                <input type="tel" name="phoneNumber" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black placeholder-gray-700" />
              </div>

            {/* Conditional input based on pledgeType */}
            {pledgeType === 'money' && (
              <div id="money-pledge-input">
                <label className="block text-gray-900 font-bold mb-2">Pledge Amount (£)</label>
                <div className="flex items-center">
                  <span className="text-gray-700 text-lg mr-2">£</span>
                  <input type="number" name="pledgeAmount" min="1" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black placeholder-gray-700" required />
                </div>
              </div>
            )}

            {pledgeType === 'services' && (
               <div id="services-pledge-input">
                <label className="block text-gray-900 font-bold mb-2">Describe Your Services</label>
                <textarea name="serviceDetails" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-32 text-black placeholder-gray-700" placeholder="e.g., legal expertise, fundraising support, volunteering time"></textarea>
              </div>
            )}

            <div>
              <label className="block text-gray-900 font-bold mb-2">Message (Optional)</label>
              <textarea name="message" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-32 text-black placeholder-gray-700" placeholder="Your message here..."></textarea>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
              Submit Pledge
            </button>

             {/* Submission Status Message */}
            {submissionStatus === 'success' && (
              <p className="text-green-600 text-center font-semibold">Thank you for your pledge!</p>
            )}
            {submissionStatus === 'error' && (
              <p className="text-red-600 text-center font-semibold">There was an error submitting your pledge. Please try again.</p>
            )}
          </form>

          {/* Privacy Statement */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Your details will only be used for purposes related to the Save the Maypole Piece action and will not be shared with third parties.
            Your data will be kept private and accessible only to the administrators of the Friends of the Maypole Piece campaign.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Gallery</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the natural beauty of our 37-acre green space
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
    
              "/images/Maypole_01.jpeg",
              "/images/Maypole_04.jpeg",
             "/images/Maypole_07.jpeg",
              "/images/Maypole_10.jpeg",
              "/images/Maypole_14.jpeg",
              "/images/Maypole_24.jpeg",
            ].map((src, index) => (
              <div key={index} className="group relative h-[400px] overflow-hidden rounded-2xl">
                <Image
                  src={src}
                  alt={`Maypole Piece ${index + 1}`}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">Maypole Piece {index + 1}</h3>
                    <p className="text-sm text-white/90">Click to view full image</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Get Involved</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We&apos;re working to set up a bank account and fundraising platform – updates will follow shortly. In the meantime, please connect with us, share our mission, and stand with us to protect this vital piece of Bewdley&apos;s heritage.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Contact Us</h2>
              <p className="text-lg text-gray-600">
                Email: <a href="mailto:admin@friendsofthemaypole.co.uk" className="text-blue-600 hover:underline">
                admin@friendsofthemaypole.co.uk
                </a><br />
                  Facebook: @Friends of the Maypole
                  </p>
              <div className="pt-4">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                  Join Our Community
                </button>
              </div>
            </div>
            <div className="relative h-[400px] group">
              <Image
                src="/images/Maypole_08.jpeg"
                alt="Maypole Piece"
                fill
                className="object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Images Section */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Discover Maypole Piece</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore some highlights of the natural beauty and historical significance of this vital green space.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Color Images */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/Maypole_05.jpeg"
              alt="Maypole Piece Landscape"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/Maypole_11.jpeg"
            
              alt="Maypole Piece Nature"
              fill
              className="object-cover"
            />
          </div>
          {/* Black and White Images */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/Old_Images/B_W_01.jpeg"
              alt="Maypole Piece Historical Photo"
              fill
              className="object-cover"
            />
          </div>
           <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/Old_Images/B_W_03.jpeg"
              alt="Maypole Piece Historical Gathering"
              fill
              className="object-cover"
            />
          </div>
          {/* More Color Images */}
           <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/Maypole_20.jpeg"
              alt="Maypole Piece View"
              fill
              className="object-cover"
            />
          </div>
           <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/Panorama.jpeg"
              alt="Maypole Piece Panorama"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Friends of the Maypole</h3>
              <p className="text-gray-400">
                Together, we can save Maypole Piece
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-400">
                Email: admin@friendsofthemaypole.co.uk<br />
                Facebook: @Friends of the Maypole
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/p/Friends-Of-The-Maypole-61576028020681/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
