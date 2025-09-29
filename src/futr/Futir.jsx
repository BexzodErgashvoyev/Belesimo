import { FaFacebookF, FaInstagram, FaTelegramPlane } from "react-icons/fa";

const Futir = () => {
  return (
    <footer className="bg-[#222627] text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo va Telefon */}
        <div>
          <img
            src="https://imas.uz/img/Bellissimo_Pizza_logo.png"
            alt="Bellissimo Pizza Logo"
            className="h-14 mb-3"
          />
          <p className="text-sm font-medium">
            RAQAMGA QO‘NG‘IROQ QILING - <span className="text-white">1174</span>
          </p>
        </div>

        {/* Linklar 1 */}
        <div className="flex flex-col gap-2 text-sm">
          <a href="#">Biz haqimizda</a>
          <a href="#">Ommaviy oferta</a>
          <a href="#">Maxfiylik siyosati</a>
          <a href="#">Halol sertifikati</a>
          <a href="#">Restoranlar</a>
        </div>

        {/* Linklar 2 */}
        <div className="flex flex-col gap-2 text-sm">
          <a href="#">Bizning ish o‘rinlarimiz</a>
          <a href="#">Franshiza</a>

          {/* To‘lov tizimlari */}
          <div className="flex items-center gap-3 mt-4">
            <img
              src="https://media.licdn.com/dms/image/v2/D5616AQHLRfyFDFkyQQ/profile-displaybackgroundimage-shrink_200_800/profile-displaybackgroundimage-shrink_200_800/0/1686812953640?e=2147483647&v=beta&t=8a-CT9fD2nTO_AttNrLNyxdZBMv4sY102-T7wHPzPGc"
              alt="Payme"
              className="h-6"
            />
            <img
              src="https://api.uzcard.uz/wp-content/uploads/2024/07/Uzcard_Logo_-3.png"
              alt="UzCard"
              className="h-14"
            />
            <img
              src="https://click.uz/uploads/20250523/ainvbf2a9b74a80086b847800fbf9905a53a1747975388.jpg"
              alt="Click"
              className="h-14"
            />
          </div>
        </div>

        {/* Social links */}
        <div>
          <h3 className="mb-3 text-white text-sm font-semibold">
            Bizni kuzatib boring
          </h3>
          <div className="flex items-center gap-4 text-lg">
            <a href="#" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white">
              <FaTelegramPlane />
            </a>
          </div>
        </div>
      </div>

      {/* Pastki chiziq */}
      <div className="text-center text-sm text-gray-400 mt-8 border-t border-gray-600 pt-4">
        © 2016-2025 Bellissimo Pizza.
      </div>
    </footer>
  );
};

export default Futir;



