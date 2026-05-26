import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  return (
    <a
      href="https://wa.me/919999999999"
      target="_blank"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-5 rounded-full shadow-2xl z-50 hover:scale-110 transition"
    >
      <FaWhatsapp size={30} />
    </a>
  );
}