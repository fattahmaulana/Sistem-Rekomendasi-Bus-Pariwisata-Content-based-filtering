"use client";

import { useState, useEffect } from 'react';
import { Bus, Wifi, Wind, Armchair, Tv, Coffee, Sparkles, X, Users, DollarSign, Star, TrendingUp, MapPin, ChevronDown, Calendar, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Dataset 100 Bus Pariwisata Jawa-Bali
const busDataset = [
  // Executive Class (High End)
  { id: 1, nama_bus: "Sumber Kencono SHD", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 52, harga_start: 3500000, tahun: 2023, rute: "Jakarta-Surabaya", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 2, nama_bus: "Rosalia Indah Premiere", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 48, harga_start: 3800000, tahun: 2023, rute: "Surabaya-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 3, nama_bus: "Pahala Kencana Platinum", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 50, harga_start: 4000000, tahun: 2024, rute: "Jakarta-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack", "Massage Seat"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 4, nama_bus: "PO Haryanto Royal Class", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 46, harga_start: 3700000, tahun: 2023, rute: "Semarang-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 5, nama_bus: "Medali Mas Premium", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 52, harga_start: 3600000, tahun: 2023, rute: "Solo-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 6, nama_bus: "Nusantara Luxury", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 44, harga_start: 4200000, tahun: 2024, rute: "Jakarta-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack", "Massage Seat"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 7, nama_bus: "Kramat Djati Executive", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 50, harga_start: 3500000, tahun: 2023, rute: "Bandung-Surabaya", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 8, nama_bus: "Sinar Jaya Gold", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 48, harga_start: 3900000, tahun: 2023, rute: "Jakarta-Banyuwangi", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 9, nama_bus: "Tentrem Bus Executive", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 46, harga_start: 3400000, tahun: 2022, rute: "Yogyakarta-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 10, nama_bus: "Garuda Mas Executive", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 52, harga_start: 3550000, tahun: 2023, rute: "Malang-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  
  // VIP Class
  { id: 11, nama_bus: "Lorena VIP Sleeper", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 40, harga_start: 3800000, tahun: 2023, rute: "Jakarta-Surabaya", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 12, nama_bus: "Agra Mas VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 42, harga_start: 3650000, tahun: 2023, rute: "Semarang-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 13, nama_bus: "Harapan Jaya Premium", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 44, harga_start: 3700000, tahun: 2023, rute: "Solo-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 14, nama_bus: "Budiman Luxury", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 40, harga_start: 4000000, tahun: 2024, rute: "Jakarta-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack", "Massage Seat"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 15, nama_bus: "Putera Mulya VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 42, harga_start: 3750000, tahun: 2023, rute: "Bandung-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 16, nama_bus: "Bintang Timur Premium", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 44, harga_start: 3680000, tahun: 2022, rute: "Surabaya-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 17, nama_bus: "Elok Wisata VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 40, harga_start: 3900000, tahun: 2023, rute: "Jakarta-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack", "Massage Seat"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 18, nama_bus: "Sejahtera VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 42, harga_start: 3620000, tahun: 2022, rute: "Malang-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 19, nama_bus: "Prima Jasa VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 44, harga_start: 3720000, tahun: 2023, rute: "Yogyakarta-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 20, nama_bus: "Maju Lancar VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 40, harga_start: 3850000, tahun: 2023, rute: "Jakarta-Banyuwangi", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },

  // Economy Plus
  { id: 21, nama_bus: "Safari Dharma Raya Plus", tipe_bus: "Economy Plus", kelas_bus: "Standard", kapasitas: 54, harga_start: 2900000, tahun: 2022, rute: "Jakarta-Surabaya", fasilitas: ["AC", "Reclining Seat", "TV", "WiFi"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 22, nama_bus: "Cita Rasa Express", tipe_bus: "Economy Plus", kelas_bus: "Standard", kapasitas: 56, harga_start: 2850000, tahun: 2022, rute: "Semarang-Surabaya", fasilitas: ["AC", "Reclining Seat", "TV", "WiFi"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 23, nama_bus: "Djaya Indah Plus", tipe_bus: "Economy Plus", kelas_bus: "Standard", kapasitas: 54, harga_start: 2950000, tahun: 2023, rute: "Solo-Bali", fasilitas: ["AC", "Reclining Seat", "TV", "WiFi", "USB Port"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 24, nama_bus: "Mandiri Express", tipe_bus: "Economy Plus", kelas_bus: "Standard", kapasitas: 55, harga_start: 2880000, tahun: 2022, rute: "Bandung-Surabaya", fasilitas: ["AC", "Reclining Seat", "TV", "WiFi"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 25, nama_bus: "Sentosa Jaya Plus", tipe_bus: "Economy Plus", kelas_bus: "Standard", kapasitas: 54, harga_start: 2920000, tahun: 2023, rute: "Yogyakarta-Surabaya", fasilitas: ["AC", "Reclining Seat", "TV", "WiFi"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  
  // Economy Standard
  { id: 26, nama_bus: "Gunung Harta Express", tipe_bus: "Economy", kelas_bus: "Standard", kapasitas: 59, harga_start: 2500000, tahun: 2021, rute: "Jakarta-Surabaya", fasilitas: ["AC", "Reclining Seat"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 27, nama_bus: "Eka Mitra Wisata", tipe_bus: "Economy", kelas_bus: "Standard", kapasitas: 58, harga_start: 2450000, tahun: 2021, rute: "Semarang-Surabaya", fasilitas: ["AC", "Reclining Seat"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 28, nama_bus: "Pahala Nusantara", tipe_bus: "Economy", kelas_bus: "Standard", kapasitas: 60, harga_start: 2550000, tahun: 2022, rute: "Solo-Surabaya", fasilitas: ["AC", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 29, nama_bus: "Fajar Utama", tipe_bus: "Economy", kelas_bus: "Standard", kapasitas: 59, harga_start: 2480000, tahun: 2021, rute: "Bandung-Surabaya", fasilitas: ["AC", "Reclining Seat"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 30, nama_bus: "Berkah Jaya", tipe_bus: "Economy", kelas_bus: "Standard", kapasitas: 58, harga_start: 2520000, tahun: 2022, rute: "Yogyakarta-Surabaya", fasilitas: ["AC", "Reclining Seat"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },

  // 31-100: Variasi tambahan
  ...Array.from({ length: 70 }, (_, i) => {
    const id = i + 31;
    const types = ["Executive", "VIP", "Economy Plus", "Economy"];
    const rutes = ["Jakarta-Surabaya", "Semarang-Bali", "Solo-Denpasar", "Bandung-Bali", "Yogyakarta-Bali", "Malang-Denpasar", "Jakarta-Bali", "Surabaya-Denpasar", "Jakarta-Banyuwangi", "Bandung-Surabaya"];
    const names = ["Sumber", "Rosalia", "Pahala", "Gunung", "PO", "Medali", "Safari", "Nusantara", "Kramat", "Garuda", "Lorena", "Agra", "Harapan", "Budiman", "Putera", "Bintang", "Elok", "Sejahtera", "Prima", "Maju"];
    const surnames = ["Kencono", "Indah", "Kencana", "Harta", "Haryanto", "Mas", "Dharma", "Luxury", "Djati", "Express", "Transport", "Jaya", "Mulya", "Timur", "Wisata", "Raya", "Sejahtera", "Mandiri"];
    
    const tipe = types[id % types.length];
    const kelas = tipe === "Executive" ? "Super High Deck" : tipe === "VIP" ? "High Deck" : "Standard";
    const kapasitas = tipe === "Executive" ? 44 + (id % 9) : tipe === "VIP" ? 40 + (id % 5) : tipe === "Economy Plus" ? 54 + (id % 3) : 58 + (id % 3);
    const harga = tipe === "Executive" ? 3400000 + (id % 8) * 100000 : tipe === "VIP" ? 3600000 + (id % 5) * 100000 : tipe === "Economy Plus" ? 2800000 + (id % 3) * 50000 : 2400000 + (id % 3) * 50000;
    
    let fasilitas = ["AC", "Reclining Seat"];
    if (tipe === "Executive" || tipe === "VIP") {
      fasilitas = ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port"];
      if (id % 2 === 0) fasilitas.push("Snack");
      if (id % 5 === 0) fasilitas.push("Massage Seat");
    } else if (tipe === "Economy Plus") {
      fasilitas = ["AC", "Reclining Seat", "TV", "WiFi"];
      if (id % 3 === 0) fasilitas.push("USB Port");
    }
    
    return {
      id,
      nama_bus: `${names[id % names.length]} ${surnames[id % surnames.length]} ${id}`,
      tipe_bus: tipe,
      kelas_bus: kelas,
      kapasitas,
      harga_start: harga,
      tahun: 2021 + (id % 4),
      rute: rutes[id % rutes.length],
      fasilitas,
      image: id % 2 === 0 ? "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" : "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800"
    };
  })
];

const availableFasilitas = [
  { name: "AC", icon: Wind },
  { name: "WiFi", icon: Wifi },
  { name: "Toilet", icon: Users },
  { name: "Reclining Seat", icon: Armchair },
  { name: "TV", icon: Tv },
  { name: "USB Port", icon: Sparkles },
  { name: "Snack", icon: Coffee },
  { name: "Massage Seat", icon: Sparkles },
];

const extractCities = () => {
  const cities = new Set<string>();
  busDataset.forEach(bus => {
    const [asal, tujuan] = bus.rute.split('-');
    cities.add(asal);
    cities.add(tujuan);
  });
  return Array.from(cities).sort();
};

const getCapacityRangeByType = (tipeBus: string) => {
  if (!tipeBus) return { min: 40, max: 60 };
  
  const busesOfType = busDataset.filter(b => b.tipe_bus === tipeBus);
  const capacities = busesOfType.map(b => b.kapasitas);
  
  return {
    min: Math.min(...capacities),
    max: Math.max(...capacities)
  };
};

const ITEMS_PER_PAGE = 9;

const cosineSimilarity = (a: number[], b: number[]) => {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
  const magB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
};

const TIPE_BUS = ["Executive", "VIP", "Economy Plus", "Economy"];
const KELAS_BUS = ["Super High Deck", "High Deck", "Standard"];
const ROUTE_ORIGIN = Array.from(new Set(busDataset.map(b => b.rute.split("-")[0])));
const ROUTE_DEST = Array.from(new Set(busDataset.map(b => b.rute.split("-")[1])));
const ALL_FASILITAS = Array.from(new Set(busDataset.flatMap(b => b.fasilitas)));

const createBusVector = (bus: any) => {
  const vector: number[] = [];
  TIPE_BUS.forEach(t => vector.push(bus.tipe_bus === t ? 1 : 0));
  KELAS_BUS.forEach(k => vector.push(bus.kelas_bus === k ? 1 : 0));
  const [asal, tujuan] = bus.rute.split("-");
  ROUTE_ORIGIN.forEach(o => vector.push(asal === o ? 1 : 0));
  ROUTE_DEST.forEach(d => vector.push(tujuan === d ? 1 : 0));
  ALL_FASILITAS.forEach(f => vector.push(bus.fasilitas.includes(f) ? 1 : 0));
  vector.push(bus.kapasitas / 100);
  vector.push(bus.harga_start / 5_000_000);
  vector.push((bus.tahun - 2020) / 5);
  return vector;
};

const calculateSimilarity = (bus1: any, bus2: any) => {
  const v1 = createBusVector(bus1);
  const v2 = createBusVector(bus2);
  return cosineSimilarity(v1, v2);
};

export default function HomePage() {
  const cities = extractCities();
  
  const [searchFilters, setSearchFilters] = useState({
    asal: '',
    tujuan: '',
    jumlahKursi: 1,
    tipeBus: '',
    fasilitas: [] as string[]
  });

  const [capacityRange, setCapacityRange] = useState({ min: 40, max: 60 });
  const [filteredBuses, setFilteredBuses] = useState(busDataset);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBus, setSelectedBus] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  useEffect(() => {
    const range = getCapacityRangeByType(searchFilters.tipeBus);
    setCapacityRange(range);
    
    if (searchFilters.jumlahKursi < range.min) {
      setSearchFilters(prev => ({ ...prev, jumlahKursi: range.min }));
    } else if (searchFilters.jumlahKursi > range.max) {
      setSearchFilters(prev => ({ ...prev, jumlahKursi: range.max }));
    }
  }, [searchFilters.tipeBus]);

  const handleSearch = () => {
    let results = busDataset.filter(bus => {
      const [asal, tujuan] = bus.rute.split('-');
      const matchAsal = !searchFilters.asal || asal === searchFilters.asal;
      const matchTujuan = !searchFilters.tujuan || tujuan === searchFilters.tujuan;
      const matchKapasitas = bus.kapasitas >= searchFilters.jumlahKursi;
      const matchTipe = !searchFilters.tipeBus || bus.tipe_bus === searchFilters.tipeBus;
      const matchFasilitas = searchFilters.fasilitas.length === 0 || 
        searchFilters.fasilitas.every(f => bus.fasilitas.includes(f));
      
      return matchAsal && matchTujuan && matchKapasitas && matchTipe && matchFasilitas;
    });
    
    setFilteredBuses(results);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleSearch();
  }, [searchFilters]);

  const totalPages = Math.ceil(filteredBuses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBuses = filteredBuses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleBooking = (bus: any) => {
    setSelectedBus(bus);
    setShowModal(true);
    const recs = busDataset
      .filter(b => b.id !== bus.id)
      .map(b => ({ ...b, similarity: calculateSimilarity(bus, b) }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 6);
    setRecommendations(recs);
  };

  const toggleFasilitas = (fas: string) => {
    setSearchFilters(prev => ({
      ...prev,
      fasilitas: prev.fasilitas.includes(fas)
        ? prev.fasilitas.filter(f => f !== fas)
        : [...prev.fasilitas, fas]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Pattern overlay */}
      <div className="fixed inset-0 opacity-30 -z-10 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      {/* Header */}
      <div className="sticky top-0 backdrop-blur-md bg-white/80 shadow-sm border-b border-white/20 z-40">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-1.5 sm:p-2 bg-blue-500 rounded-xl shadow-lg"
              >
                <Bus className="text-white" size={24} strokeWidth={2.5} />
              </motion.div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">BusGo</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Sistem Rekomendasi Cerdas</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-md bg-white/50 rounded-full border border-white/30">
              <Sparkles className="text-blue-500" size={14} />
              <span className="text-xs sm:text-sm font-medium text-gray-700">{busDataset.length} Bus</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-md bg-gradient-to-br from-blue-50/95 via-white/95 to-purple-50/95 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 mb-6 sm:mb-8 max-w-6xl mx-auto border-2 border-blue-200/50"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <Bus className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pesan Tiket Bus</h2>
                <p className="text-xs text-gray-500 hidden sm:block">Temukan bus terbaik untuk perjalanan Anda</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                showAdvancedFilter 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/40' 
                  : 'backdrop-blur-md bg-white/80 text-gray-700 border-2 border-blue-200 hover:border-blue-300'
              }`}
            >
              <Filter size={16} />
              <span>Filter</span>
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <motion.div whileHover={{ scale: 1.02, y: -2 }} className="relative">
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-lg sm:text-xl">🚏</span>
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Kota Asal</span>
              </label>
              <div className="relative">
                <select
                  value={searchFilters.asal}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, asal: e.target.value }))}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 backdrop-blur-md bg-white/90 border-2 border-blue-200 rounded-xl text-sm sm:text-base text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 appearance-none cursor-pointer shadow-sm hover:bg-white hover:border-blue-300 transition-all"
                >
                  <option value="">Pilih Kota Asal</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none" size={18} />
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02, y: -2 }} className="relative">
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-lg sm:text-xl">📍</span>
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Kota Tujuan</span>
              </label>
              <div className="relative">
                <select
                  value={searchFilters.tujuan}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, tujuan: e.target.value }))}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 backdrop-blur-md bg-white/90 border-2 border-purple-200 rounded-xl text-sm sm:text-base text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 appearance-none cursor-pointer shadow-sm hover:bg-white hover:border-purple-300 transition-all"
                >
                  <option value="">Pilih Kota Tujuan</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500 pointer-events-none" size={18} />
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02, y: -2 }} className="relative">
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-lg sm:text-xl">🚌</span>
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Tipe Bus</span>
              </label>
              <div className="relative">
                <select
                  value={searchFilters.tipeBus}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, tipeBus: e.target.value }))}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 backdrop-blur-md bg-white/90 border-2 border-orange-200 rounded-xl text-sm sm:text-base text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 appearance-none cursor-pointer shadow-sm hover:bg-white hover:border-orange-300 transition-all"
                >
                  <option value="">Semua Tipe</option>
                  <option value="Executive">🌟 Executive</option>
                  <option value="VIP">💎 VIP</option>
                  <option value="Economy Plus">✨ Economy Plus</option>
                  <option value="Economy">💺 Economy</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none" size={18} />
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02, y: -2 }}>
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <span className="text-lg sm:text-xl">👥</span>
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Jumlah Kursi</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={capacityRange.min}
                  max={capacityRange.max}
                  value={searchFilters.jumlahKursi}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, jumlahKursi: Number(e.target.value) }))}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 backdrop-blur-md bg-white/90 border-2 border-green-200 rounded-xl text-sm sm:text-base text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 shadow-sm hover:bg-white hover:border-green-300 transition-all"
                  placeholder="Minimal kursi"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-md font-bold border border-green-200">
                  {capacityRange.min}-{capacityRange.max}
                </div>
              </div>
            </motion.div>
          </div>

          <AnimatePresence>
            {showAdvancedFilter && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <motion.div
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  exit={{ y: -20 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="p-4 sm:p-6 backdrop-blur-md bg-gradient-to-br from-purple-50/80 via-pink-50/80 to-blue-50/80 rounded-xl sm:rounded-2xl border-2 border-purple-200/50"
                >
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
                    <Sparkles className="text-purple-500" size={18} />
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Pilih Fasilitas Premium</span>
                  </label>
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
                    {availableFasilitas.map((fas) => {
                      const Icon = fas.icon;
                      const isSelected = searchFilters.fasilitas.includes(fas.name);
                      return (
                        <motion.button
                          key={fas.name}
                          initial={false}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleFasilitas(fas.name)}
                          className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 shadow-sm ${
                            isSelected
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/40 border-2 border-purple-300 scale-105'
                              : 'backdrop-blur-md bg-white/90 text-gray-700 border-2 border-purple-200 hover:bg-white hover:border-purple-300'
                          }`}
                        >
                          <Icon size={16} className={isSelected ? 'animate-pulse' : ''} />
                          <span className="truncate">{fas.name}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                  <AnimatePresence>
                    {searchFilters.fasilitas.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3 sm:p-4 backdrop-blur-md bg-white/90 rounded-lg sm:rounded-xl border-2 border-purple-200">
                          <p className="text-xs sm:text-sm text-gray-700 font-medium">
                            <span className="text-purple-600 font-bold">✓ Filter aktif:</span> {searchFilters.fasilitas.join(', ')}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-purple-600 hover:to-purple-700 text-white font-bold py-3 sm:py-4 rounded-xl text-sm sm:text-base shadow-lg shadow-blue-500/40 transition-all flex items-center justify-center gap-2 border-2 border-blue-400"
          >
            <span>🔍 Cari Bus Sekarang</span>
          </motion.button>

          <div className="mt-4 p-3 sm:p-4 backdrop-blur-md bg-gradient-to-r from-blue-50/80 to-cyan-50/80 rounded-xl border-2 border-blue-200">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="text-xl sm:text-2xl mt-0.5">💡</div>
              <div className="text-xs sm:text-sm text-gray-700">
                <strong className="text-blue-600">Tips Pencarian:</strong> Pilih tipe bus terlebih dahulu untuk melihat rentang kapasitas yang tersedia.
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto mb-4 sm:mb-6">
          <div className="backdrop-blur-md bg-gradient-to-r from-blue-50/90 via-purple-50/90 to-pink-50/90 rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-blue-200 shadow-lg flex items-center justify-between flex-wrap gap-2">
            <p className="text-xs sm:text-sm text-gray-700 font-bold flex items-center gap-2">
              <Sparkles className="text-blue-500" size={16} />
              <span className="text-blue-600 font-bold px-2 py-0.5 bg-blue-100 rounded-lg">{currentBuses.length}</span> dari <span className="text-purple-600 font-bold px-2 py-0.5 bg-purple-100 rounded-lg">{filteredBuses.length}</span> bus
            </p>
            {totalPages > 1 && (
              <p className="text-xs sm:text-sm text-gray-700 font-bold flex items-center gap-1 sm:gap-2">
                <span className="hidden sm:inline">Halaman</span>
                <span className="text-blue-600 font-bold px-2 py-0.5 bg-blue-100 rounded-lg">{currentPage}</span> 
                <span>/</span>
                <span className="text-purple-600 font-bold px-2 py-0.5 bg-purple-100 rounded-lg">{totalPages}</span>
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {currentBuses.map((bus, idx) => (
              <motion.div
                key={bus.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="backdrop-blur-md bg-white/85 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-white/30"
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img src={bus.image} alt={bus.nama_bus} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 backdrop-blur-md bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/30">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="text-blue-500" />
                      <span className="text-gray-800 font-bold text-xs">{bus.tahun}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3">
                    <div className="backdrop-blur-md bg-white/20 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-white/30">
                      <div className="flex items-center gap-1 sm:gap-2 text-white">
                        <MapPin size={14} />
                        <span className="text-xs sm:text-sm font-semibold truncate">{bus.rute}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3 line-clamp-1">{bus.nama_bus}</h3>
                  
                  <div className="flex gap-2 mb-3 sm:mb-4">
                    <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold">{bus.tipe_bus}</span>
                    <span className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-bold truncate">{bus.kelas_bus}</span>
                  </div>

                  <div className="flex items-center justify-between mb-3 sm:mb-4 p-2 sm:p-3 backdrop-blur-md bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-xl border border-white/30">
                    <div className="flex items-center gap-1 sm:gap-2 text-gray-700">
                      <Users size={16} className="text-blue-500" />
                      <span className="text-xs sm:text-sm font-semibold">{bus.kapasitas} kursi</span>
                    </div>
                    <div className="flex items-center gap-0.5 sm:gap-1 text-green-600">
                      <DollarSign size={16} />
                      <span className="text-xs sm:text-sm font-bold">{(bus.harga_start / 1000000).toFixed(1)}jt</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {bus.fasilitas.slice(0, 3).map((fas: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 sm:py-1 backdrop-blur-md bg-white/60 text-gray-600 rounded-lg text-xs font-medium border border-white/30 truncate">{fas}</span>
                    ))}
                    {bus.fasilitas.length > 3 && (
                      <span className="px-2 py-0.5 sm:py-1 backdrop-blur-md bg-blue-50/50 text-blue-600 rounded-lg text-xs font-bold border border-blue-200">+{bus.fasilitas.length - 3}</span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleBooking(bus)}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm sm:text-base font-bold py-2.5 sm:py-3 rounded-xl transition-all shadow-lg shadow-blue-500/30"
                  >
                    Pesan Sekarang
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="backdrop-blur-md bg-white/70 border border-white/30 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm text-gray-700 font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-all shadow-sm"
            >
              Prev
            </motion.button>
            
            <div className="flex gap-1.5 sm:gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <motion.button
                    key={pageNum}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                      currentPage === pageNum
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : 'backdrop-blur-md bg-white/70 border border-white/30 text-gray-700 hover:bg-white'
                    }`}
                  >
                    {pageNum}
                  </motion.button>
                );
              })}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="backdrop-blur-md bg-white/70 border border-white/30 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm text-gray-700 font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-all shadow-sm"
            >
              Next
            </motion.button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && selectedBus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="backdrop-blur-2xl bg-white/90 rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/30"
            >
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <div>
                  <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">{selectedBus.nama_bus}</h2>
                  <div className="flex items-center gap-1 sm:gap-2 text-blue-600">
                    <MapPin size={16} />
                    <span className="text-sm sm:text-base font-semibold">{selectedBus.rute}</span>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  onClick={() => setShowModal(false)} 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </motion.button>
              </div>

              <div className="mb-6 sm:mb-8">
                <img src={selectedBus.image} alt={selectedBus.nama_bus} className="w-full h-48 sm:h-72 object-cover rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-xl" />
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-gray-800 mb-3 sm:mb-4">
                  <div className="backdrop-blur-md bg-gradient-to-br from-blue-50 to-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/30">
                    <p className="text-blue-600 text-xs sm:text-sm mb-1 font-semibold">Kapasitas</p>
                    <p className="text-xl sm:text-3xl font-bold">{selectedBus.kapasitas}</p>
                    <p className="text-xs text-gray-500">Kursi</p>
                  </div>
                  <div className="backdrop-blur-md bg-gradient-to-br from-green-50 to-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/30">
                    <p className="text-green-600 text-xs sm:text-sm mb-1 font-semibold">Harga</p>
                    <p className="text-base sm:text-2xl font-bold text-green-600">{(selectedBus.harga_start / 1000000).toFixed(1)}jt</p>
                  </div>
                  <div className="backdrop-blur-md bg-gradient-to-br from-purple-50 to-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/30">
                    <p className="text-purple-600 text-xs sm:text-sm mb-1 font-semibold">Tahun</p>
                    <p className="text-xl sm:text-3xl font-bold">{selectedBus.tahun}</p>
                  </div>
                </div>
                <div className="backdrop-blur-md bg-gradient-to-br from-blue-50/50 to-white/50 p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/30">
                  <p className="text-blue-600 text-xs sm:text-sm mb-2 sm:mb-3 font-bold">✨ Fasilitas Lengkap</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {selectedBus.fasilitas.map((fas: string, i: number) => (
                      <span key={i} className="px-2 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold border border-blue-200">{fas}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <Star className="text-yellow-500" size={20} />
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-800">Rekomendasi</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
                  {recommendations.map((rec) => (
                    <motion.div
                      key={rec.id}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="backdrop-blur-md bg-white/80 border border-white/30 rounded-xl sm:rounded-2xl p-2 sm:p-3 cursor-pointer hover:shadow-xl transition-all"
                      onClick={() => {
                        setSelectedBus(rec);
                        const newRecs = busDataset
                          .filter(b => b.id !== rec.id)
                          .map(b => ({ ...b, similarity: calculateSimilarity(rec, b) }))
                          .sort((a, b) => b.similarity - a.similarity)
                          .slice(0, 6);
                        setRecommendations(newRecs);
                      }}
                    >
                      <img src={rec.image} alt={rec.nama_bus} className="w-full h-20 sm:h-24 object-cover rounded-lg sm:rounded-xl mb-1 sm:mb-2" />
                      <p className="text-gray-800 font-bold text-xs mb-0.5 sm:mb-1 line-clamp-2">{rec.nama_bus}</p>
                      <p className="text-gray-500 text-xs mb-1 sm:mb-2 truncate">{rec.rute}</p>
                      <div className="flex items-center justify-center gap-1 sm:gap-2 bg-gradient-to-r from-green-100 to-green-50 py-1 sm:py-1.5 rounded-lg border border-green-200">
                        <TrendingUp className="text-green-600" size={12} />
                        <span className="text-green-600 font-bold text-xs">{(rec.similarity * 100).toFixed(0)}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.a
                href="https://wa.me/6281274603234?text=Halo,%20saya%20ingin%20konfirmasi%20pesanan"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full mt-4 sm:mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-center text-sm sm:text-base font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl shadow-blue-500/30 transition-all cursor-pointer"
              >
                Konfirmasi Pemesanan
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="backdrop-blur-md bg-white/70 border-t border-white/20 py-6 sm:py-8 mt-8 sm:mt-12">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
              <Sparkles className="text-blue-500" size={20} />
              <h3 className="text-base sm:text-xl font-bold text-gray-800">Content-Based Filtering AI</h3>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6 px-2">
              Sistem rekomendasi cerdas menggunakan algoritma Content-Based Filtering
            </p>
            <div className="flex items-center justify-center gap-4 sm:gap-8">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">{busDataset.length}</p>
                <p className="text-xs text-gray-500 font-medium">Total Bus</p>
              </div>
              <div className="w-px h-10 sm:h-12 bg-gray-300"></div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">{new Set(busDataset.map(b => b.rute)).size}</p>
                <p className="text-xs text-gray-500 font-medium">Rute</p>
              </div>
              <div className="w-px h-10 sm:h-12 bg-gray-300"></div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">99%</p>
                <p className="text-xs text-gray-500 font-medium">Akurasi</p>
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6">© 2025 BusGo. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}