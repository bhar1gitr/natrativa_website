export default function Contact() {
  const whatsappNumber = "1234567890" // Replace with your WhatsApp number
  const whatsappMessage = encodeURIComponent("Hi Sarasss! I'm interested in your products.")
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h2>
        <p className="text-gray-300 text-lg mb-12 leading-relaxed">
          Have questions about our collections? Want to place a custom order? Reach out to us on WhatsApp and we'll get
          back to you as soon as possible.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-black font-bold text-lg hover:bg-gray-200 transition rounded-lg inline-flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.946 1.347l-.355.192-.368-.06a9.879 9.879 0 00-3.464.608l.564 2.173 1.888-.959a9.877 9.877 0 018.368 1.215l.341-.11a9.876 9.876 0 015.52 5.588l.325 1.001 2.04-1.111a9.88 9.88 0 00-1.51-5.26 9.877 9.877 0 00-8.769-4.479z" />
            </svg>
            Chat on WhatsApp
          </a>
          <a
            href="mailto:hello@sarasss.com"
            className="px-8 py-4 border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-black transition rounded-lg"
          >
            Email Us
          </a>
        </div>

        <p className="text-gray-400 mt-8 text-sm">Response time: Usually within 2-4 hours</p>
      </div>
    </section>
  )
}
