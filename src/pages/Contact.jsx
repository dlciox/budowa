import React from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";

function Contact() {
  const navigate = useNavigate();
  const email = "osk.budvip@wp.pl";
  const phoneNumber = "690 112 664";

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const subject = form.subject.value;
    const message = form.message.value;

    const mailtoLink = document.createElement("a");
    mailtoLink.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Imię i nazwisko: ${name}\n\nWiadomość:\n${message}`
    )}`;
    mailtoLink.click();
  };

  const handleSectionNavigation = (sectionId) => {
    navigate('/', { state: { scrollTo: sectionId } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 mt-24">
      {/* Przyciski nawigacyjne */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <button
          onClick={() => handleSectionNavigation('about')}
          className="text-gray-300 hover:text-yellow-400 transition-colors px-4 py-2 text-lg"
        >
          O nas
        </button>
        <button
          onClick={() => handleSectionNavigation('services')}
          className="text-gray-300 hover:text-yellow-400 transition-colors px-4 py-2 text-lg"
        >
          Usługi
        </button>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Nagłówek strony */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Skontaktuj się z nami
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Masz pytania dotyczące naszych usług? Potrzebujesz wyceny? Napisz
              do nas, a my odezwiemy się najszybciej jak to możliwe.
            </p>
          </div>

          <div className="flex flex-wrap -mx-4">
            {/* Formularz kontaktowy */}
            <div className="w-full lg:w-7/12 px-4 mb-10 lg:mb-0">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Wyślij wiadomość</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="name">
                      Imię i nazwisko <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none border-gray-300"
                      placeholder="Jan Kowalski"
                      required
                    />
                  </div>

                  <div>
                    <label
                      className="block text-gray-700 mb-2"
                      htmlFor="subject"
                    >
                      Temat
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none appearance-none bg-white"
                    >
                      <option value="Zapytanie ogólne">Zapytanie ogólne</option>
                      <option value="Wycena">Prośba o wycenę</option>
                      <option value="Współpraca">Propozycja współpracy</option>
                      <option value="Reklamacja">Reklamacja</option>
                      <option value="Inne">Inne</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-gray-700 mb-2"
                      htmlFor="message"
                    >
                      Wiadomość <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      className="w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none border-gray-300"
                      placeholder="Twoja wiadomość..."
                      required
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full py-3 px-6 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                    >
                      Wyślij wiadomość
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Informacje kontaktowe */}
            <div className="w-full lg:w-5/12 px-4">
              <div className="bg-black text-white rounded-lg shadow-lg p-8 h-full">
                <h2 className="text-2xl font-bold mb-6">Dane kontaktowe</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="text-yellow-400 mt-1 mr-4">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Adres</h3>
                      <p className="mt-1">Czeladź i okolice</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="text-yellow-400 mt-1 mr-4">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Telefon</h3>
                      <p className="mt-1">{phoneNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="text-yellow-400 mt-1 mr-4">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="mt-1">{email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="text-yellow-400 mt-1 mr-4">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Godziny pracy</h3>
                      <p className="mt-1">
                        Poniedziałek - Piątek: 8:00 - 18:00
                        <br />
                        Sobota: 9:00 - 14:00
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="font-semibold text-lg mb-4">Śledź nas</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://facebook.com/oskbudvip"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-yellow-400 transition-colors duration-300"
                      aria-label="Znajdź nas na Facebooku"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/osk.budvip/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-yellow-400 transition-colors duration-300"
                      aria-label="Obserwuj nas na Instagramie"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="mt-16">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d40521.29357715447!2d19.043651899999998!3d50.3169595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716da99e54d32cd%3A0x25ba783a49aea7d1!2sCzelad%C5%BA!5e0!3m2!1spl!2spl!4v1656252378427!5m2!1spl!2spl"
                  className="w-full h-full rounded-lg"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
