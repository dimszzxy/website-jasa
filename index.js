
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Menu, X, Star, Crown, ArrowUp, Heart, ShoppingCart, CheckCircle } from "lucide-react";

export default function WebJasa() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showVipModal, setShowVipModal] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulir berhasil dikirim!");
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    alert(`${item} ditambahkan ke keranjang!`);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Keranjang Anda kosong!");
      return;
    }
    const message = encodeURIComponent(`Saya ingin memesan:
${cart.join("
")}`);
    if (window.confirm("Apakah Anda yakin ingin melakukan checkout?")) {
      window.location.href = `https://wa.me/6287740794085?text=${message}`;
    }
  };

  return (
    <div className="font-poppins bg-gray-900 text-white">
      {/* Navbar dengan animasi */}
      <nav className="fixed top-0 w-full bg-gray-900 text-white p-4 flex justify-between items-center z-50 shadow-lg transition-all duration-300 backdrop-blur-md">
        <h1 className="text-lg font-bold">Dimzz Store</h1>
        <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </div>
        <div className={`md:flex space-x-4 ${menuOpen ? "block" : "hidden"}`}>
          <a href="#home" className="hover:underline">Home</a>
          <a href="#keranjang" className="hover:underline relative">
            Keranjang {cart.length > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{cart.length}</span>}
          </a>
          <a href="#formulir" className="hover:underline">Formulir</a>
          <a href="#galeri" className="hover:underline">Galeri</a>
          <a href="#donasi" className="hover:underline">Donasi</a>
          <Button className="ml-4 bg-blue-600 text-white hover:bg-blue-500" onClick={handleCheckout}>Pesan Sekarang</Button>
          <Button className="ml-4 bg-gold text-black flex items-center animate-glow hover:shadow-xl transition-all" onClick={() => setShowVipModal(true)}>
            <Crown className="mr-2 animate-pulse" /> VIP 100K
          </Button>
        </div>
      </nav>

      {/* Tombol Back to Top */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-500">
        <ArrowUp />
      </button>

      {/* Halaman Donasi */}
      <motion.section id="donasi" className="p-6 space-y-6 bg-gray-700 text-white min-h-screen flex flex-col justify-center items-center text-center">
        <motion.h2 className="text-4xl font-bold text-red-500" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          Dukung Kami dengan Donasi ❤️
        </motion.h2>
        <motion.p className="text-lg" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
          Jika Anda menyukai layanan kami dan ingin mendukung pengembangan lebih lanjut, Anda dapat memberikan donasi dengan mudah.
        </motion.p>
        <Button className="bg-red-500 text-white p-4 rounded-lg text-lg flex items-center hover:bg-red-400 transition-all animate-pulse" onClick={() => window.location.href = "https://wa.me/6287740794085?text=Saya%20ingin%20memberikan%20donasi"}>
          <Heart className="mr-2" /> Donasi Sekarang
        </Button>
        <p className="text-sm mt-2">Nomor Dana: <strong>087740794085</strong></p>
      </motion.section>
    </div>
  );
}
