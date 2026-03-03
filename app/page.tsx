"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Bus {
  id: number;
  nama_bus: string;
  tipe_bus: string;
  kelas_bus: string;
  kapasitas: number;
  harga_start: number;
  tahun: number;
  rute: string;
  fasilitas: string[];
  image: string;
}

const busDataset: Bus[] = [
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
  { id: 11, nama_bus: "Lorena VIP Sleeper", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 40, harga_start: 3800000, tahun: 2023, rute: "Jakarta-Surabaya", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 12, nama_bus: "Agra Mas VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 42, harga_start: 3650000, tahun: 2023, rute: "Semarang-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 13, nama_bus: "Harapan Jaya Premium", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 44, harga_start: 3700000, tahun: 2023, rute: "Solo-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 14, nama_bus: "Budiman Luxury", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 40, harga_start: 4000000, tahun: 2024, rute: "Jakarta-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack", "Massage Seat"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 15, nama_bus: "Putera Mulya VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 42, harga_start: 3750000, tahun: 2023, rute: "Bandung-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 16, nama_bus: "Bintang Timur Premium", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 44, harga_start: 3680000, tahun: 2022, rute: "Surabaya-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 17, nama_bus: "Elok Wisata VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 40, harga_start: 3900000, tahun: 2023, rute: "Jakarta-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack", "Massage Seat"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 18, nama_bus: "Sejahtera VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 42, harga_start: 3620000, tahun: 2022, rute: "Malang-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 19, nama_bus: "Prima Jasa VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 44, harga_start: 3720000, tahun: 2023, rute: "Yogyakarta-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 20, nama_bus: "Maju Lancar VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 40, harga_start: 3850000, tahun: 2023, rute: "Jakarta-Banyuwangi", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 21, nama_bus: "Safari Dharma Raya Plus", tipe_bus: "Economy Plus", kelas_bus: "Standard", kapasitas: 54, harga_start: 2900000, tahun: 2022, rute: "Jakarta-Surabaya", fasilitas: ["AC", "Reclining Seat", "TV", "WiFi"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 22, nama_bus: "Cita Rasa Express", tipe_bus: "Economy Plus", kelas_bus: "Standard", kapasitas: 56, harga_start: 2850000, tahun: 2022, rute: "Semarang-Surabaya", fasilitas: ["AC", "Reclining Seat", "TV", "WiFi"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 23, nama_bus: "Djaya Indah Plus", tipe_bus: "Economy Plus", kelas_bus: "Standard", kapasitas: 54, harga_start: 2950000, tahun: 2023, rute: "Solo-Bali", fasilitas: ["AC", "Reclining Seat", "TV", "WiFi", "USB Port"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 24, nama_bus: "Mandiri Express", tipe_bus: "Economy Plus", kelas_bus: "Standard", kapasitas: 55, harga_start: 2880000, tahun: 2022, rute: "Bandung-Surabaya", fasilitas: ["AC", "Reclining Seat", "TV", "WiFi"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 25, nama_bus: "Sentosa Jaya Plus", tipe_bus: "Economy Plus", kelas_bus: "Standard", kapasitas: 54, harga_start: 2920000, tahun: 2023, rute: "Yogyakarta-Surabaya", fasilitas: ["AC", "Reclining Seat", "TV", "WiFi"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 26, nama_bus: "Gunung Harta Express", tipe_bus: "Economy", kelas_bus: "Standard", kapasitas: 59, harga_start: 2500000, tahun: 2021, rute: "Jakarta-Surabaya", fasilitas: ["AC", "Reclining Seat"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 27, nama_bus: "Eka Mitra Wisata", tipe_bus: "Economy", kelas_bus: "Standard", kapasitas: 58, harga_start: 2450000, tahun: 2021, rute: "Semarang-Surabaya", fasilitas: ["AC", "Reclining Seat"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 28, nama_bus: "Pahala Nusantara", tipe_bus: "Economy", kelas_bus: "Standard", kapasitas: 60, harga_start: 2550000, tahun: 2022, rute: "Solo-Surabaya", fasilitas: ["AC", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 29, nama_bus: "Fajar Utama", tipe_bus: "Economy", kelas_bus: "Standard", kapasitas: 59, harga_start: 2480000, tahun: 2021, rute: "Bandung-Surabaya", fasilitas: ["AC", "Reclining Seat"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 30, nama_bus: "Berkah Jaya", tipe_bus: "Economy", kelas_bus: "Standard", kapasitas: 58, harga_start: 2520000, tahun: 2022, rute: "Yogyakarta-Surabaya", fasilitas: ["AC", "Reclining Seat"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 31, nama_bus: "Pandawa 87 Dream Coach", tipe_bus: "Executive", kelas_bus: "Sleeper Bus", kapasitas: 22, harga_start: 5500000, tahun: 2024, rute: "Jakarta-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Sleeper Seat", "Personal TV", "Snack", "Pillow", "Blanket"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 32, nama_bus: "Juragan 99 Trans Luxury", tipe_bus: "Executive", kelas_bus: "Sleeper Bus", kapasitas: 18, harga_start: 6500000, tahun: 2024, rute: "Malang-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Sleeper Seat", "Coffee Maker", "Personal Screen", "Snack"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 33, nama_bus: "Kencana Luxury Double Decker", tipe_bus: "Executive", kelas_bus: "Double Decker", kapasitas: 42, harga_start: 4800000, tahun: 2023, rute: "Semarang-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "Electric Leg Rest", "Snack"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 34, nama_bus: "Sudiro Tungga Jaya Premium", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 50, harga_start: 3700000, tahun: 2023, rute: "Madiun-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 35, nama_bus: "Mtrans Bali Express", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 48, harga_start: 3600000, tahun: 2023, rute: "Kediri-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 36, nama_bus: "Bejeu Black Bus Platinum", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 46, harga_start: 3800000, tahun: 2023, rute: "Jepara-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Coffee Maker"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 37, nama_bus: "Agam Tungga Jaya VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 44, harga_start: 3300000, tahun: 2022, rute: "Magelang-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 38, nama_bus: "Shantika Executive Gold", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 48, harga_start: 3750000, tahun: 2023, rute: "Jakarta-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "USB Port"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 39, nama_bus: "Gunung Harta Solutions", tipe_bus: "Executive", kelas_bus: "Double Decker", kapasitas: 40, harga_start: 4900000, tahun: 2024, rute: "Surabaya-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "Personal TV", "Snack"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 40, nama_bus: "Tami Jaya Suite Class", tipe_bus: "Executive", kelas_bus: "Sleeper Bus", kapasitas: 21, harga_start: 5200000, tahun: 2023, rute: "Yogyakarta-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Sleeper Seat", "TV", "USB Port", "Snack"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 41, nama_bus: "Sinar Jaya Suite Class", tipe_bus: "Executive", kelas_bus: "Sleeper Bus", kapasitas: 22, harga_start: 5100000, tahun: 2023, rute: "Jakarta-Surabaya", fasilitas: ["AC", "WiFi", "Toilet", "Sleeper Seat", "TV", "USB Port", "Snack"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 42, nama_bus: "Handoyo VIP Class", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 42, harga_start: 3400000, tahun: 2022, rute: "Semarang-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 43, nama_bus: "Ramayana VIP Executive", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 44, harga_start: 3350000, tahun: 2022, rute: "Yogyakarta-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "Snack"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 44, nama_bus: "Laju Prima Gold", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 50, harga_start: 3650000, tahun: 2023, rute: "Jakarta-Banyuwangi", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 45, nama_bus: "Madu Kismo Royal", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 48, harga_start: 3700000, tahun: 2023, rute: "Solo-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "USB Port"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 46, nama_bus: "Efisiensi Royal Class", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 44, harga_start: 3850000, tahun: 2024, rute: "Cilacap-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 47, nama_bus: "Sindoro Satriamas Premium", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 50, harga_start: 3600000, tahun: 2023, rute: "Semarang-Surabaya", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 48, nama_bus: "Tiara Mas VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 42, harga_start: 3200000, tahun: 2022, rute: "Surabaya-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 49, nama_bus: "Jaya Utama Indo", tipe_bus: "Economy Plus", kelas_bus: "Standard", kapasitas: 54, harga_start: 2800000, tahun: 2021, rute: "Surabaya-Banyuwangi", fasilitas: ["AC", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 50, nama_bus: "Akas Asri Patas", tipe_bus: "Economy Plus", kelas_bus: "Standard", kapasitas: 52, harga_start: 2750000, tahun: 2021, rute: "Surabaya-Denpasar", fasilitas: ["AC", "Reclining Seat", "WiFi"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 51, nama_bus: "White Horse Deluxe", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 48, harga_start: 3950000, tahun: 2023, rute: "Jakarta-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 52, nama_bus: "Big Bird Premium", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 44, harga_start: 4100000, tahun: 2024, rute: "Jakarta-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Personal Screen"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 53, nama_bus: "TRAC Luxury Bus", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 40, harga_start: 4300000, tahun: 2024, rute: "Jakarta-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Massage Seat"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 54, nama_bus: "Blue Star Executive", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 50, harga_start: 3700000, tahun: 2023, rute: "Bandung-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 55, nama_bus: "Jackal Holidays Luxury", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 42, harga_start: 4000000, tahun: 2024, rute: "Bandung-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 56, nama_bus: "Safa Trans Bali", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 48, harga_start: 3600000, tahun: 2023, rute: "Yogyakarta-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 57, nama_bus: "Subur Jaya Premium", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 50, harga_start: 3550000, tahun: 2023, rute: "Semarang-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 58, nama_bus: "Kalisari VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 42, harga_start: 3450000, tahun: 2022, rute: "Surabaya-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 59, nama_bus: "Menggala VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 44, harga_start: 3380000, tahun: 2022, rute: "Sidoarjo-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 60, nama_bus: "Restu Panda Patas", tipe_bus: "Economy Plus", kelas_bus: "Standard", kapasitas: 54, harga_start: 2850000, tahun: 2022, rute: "Malang-Bali", fasilitas: ["AC", "Reclining Seat", "TV", "WiFi"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 61, nama_bus: "Daya Melati Executive", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 50, harga_start: 3600000, tahun: 2023, rute: "Jakarta-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 62, nama_bus: "Dedy Jaya VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 44, harga_start: 3250000, tahun: 2021, rute: "Brebes-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 63, nama_bus: "Gajah Mungkur VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 42, harga_start: 3300000, tahun: 2022, rute: "Wonogiri-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 64, nama_bus: "Gumarang Jaya Executive", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 50, harga_start: 3750000, tahun: 2023, rute: "Jakarta-Surabaya", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "USB Port"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 65, nama_bus: "Kalingga Jaya VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 44, harga_start: 3350000, tahun: 2022, rute: "Jepara-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 66, nama_bus: "Muji Jaya Executive", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 48, harga_start: 3650000, tahun: 2023, rute: "Jakarta-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 67, nama_bus: "Purnayasa VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 42, harga_start: 3400000, tahun: 2022, rute: "Denpasar-Surabaya", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 68, nama_bus: "Putra Remaja Executive", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 50, harga_start: 3600000, tahun: 2023, rute: "Yogyakarta-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "USB Port"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 69, nama_bus: "Sugeng Rahayu VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 44, harga_start: 3100000, tahun: 2021, rute: "Surabaya-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 70, nama_bus: "Zentral VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 42, harga_start: 3200000, tahun: 2022, rute: "Solo-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 71, nama_bus: "Bali Radiance VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 44, harga_start: 3300000, tahun: 2022, rute: "Jakarta-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 72, nama_bus: "Bhaladika Platinum", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 48, harga_start: 3800000, tahun: 2023, rute: "Jakarta-Surabaya", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 73, nama_bus: "Borlindo Executive", tipe_bus: "Executive", kelas_bus: "Double Decker", kapasitas: 42, harga_start: 4500000, tahun: 2024, rute: "Jakarta-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "Personal Screen"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 74, nama_bus: "Damri Royal Class", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 44, harga_start: 3900000, tahun: 2024, rute: "Jakarta-Surabaya", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "Snack", "USB Port"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 75, nama_bus: "Antavaya Premium", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 48, harga_start: 3850000, tahun: 2023, rute: "Jakarta-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 76, nama_bus: "Karina VIP Class", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 42, harga_start: 3450000, tahun: 2022, rute: "Jakarta-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 77, nama_bus: "Malinda Executive", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 50, harga_start: 3550000, tahun: 2023, rute: "Malang-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 78, nama_bus: "Aditya Utama Patas", tipe_bus: "Economy Plus", kelas_bus: "Standard", kapasitas: 56, harga_start: 2700000, tahun: 2021, rute: "Surabaya-Banyuwangi", fasilitas: ["AC", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 79, nama_bus: "Kurnia VIP", tipe_bus: "VIP", kelas_bus: "High Deck", kapasitas: 44, harga_start: 3300000, tahun: 2022, rute: "Bandung-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 80, nama_bus: "Sempati Star Luxury", tipe_bus: "Executive", kelas_bus: "Double Decker", kapasitas: 38, harga_start: 5500000, tahun: 2024, rute: "Jakarta-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Sleeper Seat", "TV", "Snack"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 81, nama_bus: "Agramas Medium Bus", tipe_bus: "Medium", kelas_bus: "Medium Bus", kapasitas: 31, harga_start: 2200000, tahun: 2023, rute: "Semarang-Surabaya", fasilitas: ["AC", "TV", "Karaoke", "Reclining Seat"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 82, nama_bus: "Sinar Jaya Medium", tipe_bus: "Medium", kelas_bus: "Medium Bus", kapasitas: 33, harga_start: 2100000, tahun: 2022, rute: "Jakarta-Bandung", fasilitas: ["AC", "TV", "Reclining Seat"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 83, nama_bus: "Haryanto Medium", tipe_bus: "Medium", kelas_bus: "Medium Bus", kapasitas: 29, harga_start: 2300000, tahun: 2023, rute: "Solo-Yogyakarta", fasilitas: ["AC", "TV", "Karaoke", "Reclining Seat"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 84, nama_bus: "Rosalia Indah Medium", tipe_bus: "Medium", kelas_bus: "Medium Bus", kapasitas: 31, harga_start: 2250000, tahun: 2023, rute: "Surabaya-Malang", fasilitas: ["AC", "TV", "Reclining Seat", "Snack"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 85, nama_bus: "Mtrans Medium Bali", tipe_bus: "Medium", kelas_bus: "Medium Bus", kapasitas: 35, harga_start: 2400000, tahun: 2024, rute: "Denpasar-Singaraja", fasilitas: ["AC", "TV", "WiFi", "Reclining Seat"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 86, nama_bus: "Pahala Kencana Economy", tipe_bus: "Economy", kelas_bus: "Standard", kapasitas: 59, harga_start: 2400000, tahun: 2021, rute: "Jakarta-Denpasar", fasilitas: ["AC", "Reclining Seat"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 87, nama_bus: "Lorena Economy Plus", tipe_bus: "Economy Plus", kelas_bus: "Standard", kapasitas: 54, harga_start: 2850000, tahun: 2021, rute: "Jakarta-Surabaya", fasilitas: ["AC", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 88, nama_bus: "Budiman Economy Plus", tipe_bus: "Economy Plus", kelas_bus: "Standard", kapasitas: 56, harga_start: 2750000, tahun: 2021, rute: "Bandung-Tasikmalaya", fasilitas: ["AC", "Reclining Seat"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 89, nama_bus: "Kramat Djati Economy", tipe_bus: "Economy", kelas_bus: "Standard", kapasitas: 59, harga_start: 2350000, tahun: 2020, rute: "Jakarta-Bali", fasilitas: ["AC", "Reclining Seat"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 90, nama_bus: "Akas Mila Sejahtera", tipe_bus: "Economy", kelas_bus: "Standard", kapasitas: 60, harga_start: 2200000, tahun: 2020, rute: "Surabaya-Banyuwangi", fasilitas: ["AC", "Reclining Seat"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 91, nama_bus: "Harapan Jaya Double Decker", tipe_bus: "Executive", kelas_bus: "Double Decker", kapasitas: 40, harga_start: 4700000, tahun: 2024, rute: "Jakarta-Solo", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 92, nama_bus: "Pandawa 87 SHD Premium", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 48, harga_start: 3800000, tahun: 2023, rute: "Jakarta-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 93, nama_bus: "Nusantara Double Decker", tipe_bus: "Executive", kelas_bus: "Double Decker", kapasitas: 38, harga_start: 4950000, tahun: 2024, rute: "Jakarta-Kudus", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "Personal TV", "USB Port"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 94, nama_bus: "Maju Lancar Patas", tipe_bus: "Economy Plus", kelas_bus: "Standard", kapasitas: 52, harga_start: 2900000, tahun: 2022, rute: "Yogyakarta-Bali", fasilitas: ["AC", "Reclining Seat", "WiFi"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 95, nama_bus: "Safari Dharma Raya SHD", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 46, harga_start: 3750000, tahun: 2023, rute: "Jakarta-Denpasar", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "Snack"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 96, nama_bus: "Eka Cepat Patas", tipe_bus: "Economy Plus", kelas_bus: "Standard", kapasitas: 50, harga_start: 2950000, tahun: 2023, rute: "Surabaya-Yogyakarta", fasilitas: ["AC", "WiFi", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 97, nama_bus: "Mira Cepat Patas", tipe_bus: "Economy Plus", kelas_bus: "Standard", kapasitas: 54, harga_start: 2800000, tahun: 2022, rute: "Surabaya-Solo", fasilitas: ["AC", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 98, nama_bus: "Sumber Selamat Patas", tipe_bus: "Economy Plus", kelas_bus: "Standard", kapasitas: 54, harga_start: 2750000, tahun: 2022, rute: "Surabaya-Yogyakarta", fasilitas: ["AC", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" },
  { id: 99, nama_bus: "Sugeng Rahayu Golden Star", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 48, harga_start: 3600000, tahun: 2023, rute: "Bandung-Surabaya", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV"], image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" },
  { id: 100, nama_bus: "Tiara Mas SHD Premium", tipe_bus: "Executive", kelas_bus: "Super High Deck", kapasitas: 50, harga_start: 3700000, tahun: 2024, rute: "Jakarta-Bali", fasilitas: ["AC", "WiFi", "Toilet", "Reclining Seat", "TV", "USB Port", "Snack"], image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800" }
];

const TIPE_BUS: string[] = ["Executive", "VIP", "Economy Plus", "Economy"];
const KELAS_BUS: string[] = ["Super High Deck", "High Deck", "Standard"];
const ROUTE_ORIGIN: string[] = Array.from(new Set(busDataset.map(b => b.rute.split("-")[0])));
const ROUTE_DEST: string[] = Array.from(new Set(busDataset.map(b => b.rute.split("-")[1])));
const ALL_FASILITAS: string[] = Array.from(new Set(busDataset.flatMap(b => b.fasilitas)));

const cosineSimilarity = (a: number[], b: number[]): number => {
  const dot = a.reduce((sum: number, v: number, i: number) => sum + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum: number, v: number) => sum + v * v, 0));
  const magB = Math.sqrt(b.reduce((sum: number, v: number) => sum + v * v, 0));
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
};

const createBusVector = (bus: Bus): number[] => {
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

const extractCities = (): string[] => {
  const cities = new Set<string>();
  busDataset.forEach((bus: Bus) => {
    const [asal, tujuan] = bus.rute.split('-');
    cities.add(asal);
    cities.add(tujuan);
  });
  return Array.from(cities).sort();
};

const ITEMS_PER_PAGE = 9;

const tipeConfig = {
  "Executive": { label: "Executive", color: "#0f172a" },
  "VIP": { label: "VIP", color: "#334155" },
  "Economy Plus": { label: "Eco Plus", color: "#475569" },
  "Economy": { label: "Economy", color: "#64748b" },
  "Medium": { label: "Medium", color: "#94a3b8" },
};

const fasilitasIcons = {
  "AC": "❄",
  "WiFi": "⊛",
  "Toilet": "⬡",
  "Reclining Seat": "⊠",
  "TV": "▣",
  "USB Port": "⌘",
  "Snack": "◈",
  "Massage Seat": "◉",
  "Sleeper Seat": "◐",
  "Personal TV": "▤",
  "Pillow": "◫",
  "Blanket": "◧",
  "Coffee Maker": "◑",
  "Personal Screen": "▦",
  "Electric Leg Rest": "◻",
  "Karaoke": "◎",
};

export default function HomePage() {
  const cities: string[] = extractCities();
  const [isDark, setIsDark] = useState<boolean>(false);
  interface Filters { asal: string; tujuan: string; jumlahKursi: number; tipeBus: string; fasilitas: string[] }
  const [filters, setFilters] = useState<Filters>({ asal: '', tujuan: '', jumlahKursi: 1, tipeBus: '', fasilitas: [] });
  const [filteredBuses, setFilteredBuses] = useState<Bus[]>(busDataset);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [recommendations, setRecommendations] = useState<(Bus & { similarity: number })[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handleSearch = () => {
    const results = busDataset.filter(bus => {
      const [asal, tujuan] = bus.rute.split('-');
      return (
        (!filters.asal || asal === filters.asal) &&
        (!filters.tujuan || tujuan === filters.tujuan) &&
        bus.kapasitas >= filters.jumlahKursi &&
        (!filters.tipeBus || bus.tipe_bus === filters.tipeBus) &&
        (filters.fasilitas.length === 0 || filters.fasilitas.every(f => bus.fasilitas.includes(f)))
      );
    });
    setFilteredBuses(results);
    setCurrentPage(1);
  };

  useEffect(() => { handleSearch(); }, [filters]);

  const totalPages = Math.ceil(filteredBuses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBuses = filteredBuses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleBooking = (bus: Bus) => {
    setSelectedBus(bus);
    setShowModal(true);
    const recs = busDataset
      .filter(b => b.id !== bus.id)
      .map(b => ({ ...b, similarity: cosineSimilarity(createBusVector(bus), createBusVector(b)) }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 6);
    setRecommendations(recs);
  };

  const toggleFasilitas = (fas: string) => {
    setFilters(prev => ({
      ...prev,
      fasilitas: prev.fasilitas.includes(fas) ? prev.fasilitas.filter(f => f !== fas) : [...prev.fasilitas, fas]
    }));
  };

  const pageNums = (() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1,2,3,4,5];
    if (currentPage >= totalPages - 2) return [totalPages-4,totalPages-3,totalPages-2,totalPages-1,totalPages];
    return [currentPage-2,currentPage-1,currentPage,currentPage+1,currentPage+2];
  })();

  return (
    <>
      <div className={`busgo-root${isDark ? ' dark' : ''}`}>

        {/* NAV */}
        <motion.nav className="nav" initial={{ y: -64 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: [0.4,0,0.2,1] }}>
          <div className="nav-inner">
            <div className="nav-brand">
              <div className="nav-logo">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" rx="2"/>
                  <path d="M16 8h4l3 5v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <span className="nav-wordmark">BusGo</span>
            </div>
            <div className="nav-right">
              <span className="nav-badge">{busDataset.length} Armada</span>
              <motion.button
                className="theme-toggle"
                onClick={() => setIsDark(d => !d)}
                whileTap={{ scale: 0.92 }}
                title={isDark ? 'Beralih ke tema terang' : 'Beralih ke tema gelap'}
                aria-label="Toggle tema"
              >
                <motion.div
                  className={`theme-toggle-thumb ${isDark ? 'dark-active' : ''}`}
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isDark ? 'moon' : 'sun'}
                      className="theme-toggle-icon"
                      initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isDark ? '☽' : '☀'}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.nav>

        {/* HERO */}
        <div className="hero">
          <motion.span className="hero-label" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
            Sistem Rekomendasi Bus Jawa — Bali
          </motion.span>
          <motion.h1 className="hero-title" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            Perjalanan<br /><em>nyaman</em> dimulai<br />dari sini.
          </motion.h1>
          <motion.p className="hero-sub" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}>
            Temukan armada bus terbaik dengan rekomendasi cerdas berbasis AI. Lebih dari 100 pilihan bus premium.
          </motion.p>
        </div>

        {/* SEARCH */}
        <motion.div className="search-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}>
          <div className="search-card">
            <div className="search-main">
              <div className="search-grid">
                <div>
                  <label className="field-label">Kota Asal</label>
                  <div className="field-wrap">
                    <select className="field-select" value={filters.asal} onChange={e => setFilters(p => ({...p, asal: e.target.value}))}>
                      <option value="">Semua Kota</option>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <span className="field-arrow">▾</span>
                  </div>
                </div>
                <div>
                  <label className="field-label">Kota Tujuan</label>
                  <div className="field-wrap">
                    <select className="field-select" value={filters.tujuan} onChange={e => setFilters(p => ({...p, tujuan: e.target.value}))}>
                      <option value="">Semua Kota</option>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <span className="field-arrow">▾</span>
                  </div>
                </div>
                <div>
                  <label className="field-label">Tipe Bus</label>
                  <div className="field-wrap">
                    <select className="field-select" value={filters.tipeBus} onChange={e => setFilters(p => ({...p, tipeBus: e.target.value}))}>
                      <option value="">Semua Tipe</option>
                      <option value="Executive">Executive</option>
                      <option value="VIP">VIP</option>
                      <option value="Economy Plus">Economy Plus</option>
                      <option value="Economy">Economy</option>
                    </select>
                    <span className="field-arrow">▾</span>
                  </div>
                </div>
                <div>
                  <label className="field-label">Min. Kapasitas</label>
                  <input type="number" className="field-input" min={1} max={60} value={filters.jumlahKursi}
                    onChange={e => setFilters(p => ({...p, jumlahKursi: Number(e.target.value)}))} />
                </div>
              </div>
            </div>

            <div className="search-actions">
              <button className="btn-ghost" onClick={() => setShowFilter(!showFilter)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
                Filter Fasilitas
                <span className={`filter-dot ${filters.fasilitas.length > 0 ? 'active' : ''}`} />
              </button>
              <motion.button className="btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleSearch}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                Cari Bus
              </motion.button>
            </div>

            <AnimatePresence>
              {showFilter && (
                <motion.div className="filter-panel"
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4,0,0.2,1] }} style={{ overflow: 'hidden' }}>
                  <span className="filter-label">Fasilitas</span>
                  <div className="fas-grid">
                    {Object.entries(fasilitasIcons).map(([name, icon]) => (
                      <motion.button key={name} className={`fas-chip ${filters.fasilitas.includes(name) ? 'selected' : ''}`}
                        onClick={() => toggleFasilitas(name)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        <span className="fas-icon">{icon}</span>
                        {name}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* RESULTS */}
        <div className="results-section">
          <motion.div className="results-meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
            <p className="results-count">Menampilkan <strong>{currentBuses.length}</strong> dari <strong>{filteredBuses.length}</strong> armada</p>
            {totalPages > 1 && <p className="results-page">Hal. {currentPage} / {totalPages}</p>}
          </motion.div>

          <div className="bus-grid">
            <AnimatePresence mode="wait">
              {currentBuses.map((bus, idx) => {
                const [from, to] = bus.rute.split('-');
                return (
                  <motion.div key={bus.id} className="bus-card"
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                    transition={{ delay: idx * 0.04, duration: 0.35, ease: [0.4,0,0.2,1] }}
                    layout>
                    <div className="card-img-wrap">
                      <img src={bus.image} alt={bus.nama_bus} className="card-img" loading="lazy" />
                      <div className="card-img-overlay" />
                      <div className="card-route">
                        <span className="card-route-from">{from}</span>
                        <span className="card-route-arrow">→</span>
                        <span className="card-route-to">{to}</span>
                      </div>
                      <span className="card-year">{bus.tahun}</span>
                    </div>
                    <div className="card-body">
                      <div className="card-tipe-row">
                        <span className="card-tipe">{bus.tipe_bus}</span>
                        <span className="card-kelas">{bus.kelas_bus}</span>
                      </div>
                      <h3 className="card-name">{bus.nama_bus}</h3>
                      <div className="card-meta">
                        <div className="card-meta-item">
                          <div className="card-meta-label">Kursi</div>
                          <div className="card-meta-value">{bus.kapasitas}</div>
                        </div>
                        <div className="card-meta-divider" />
                        <div className="card-meta-item">
                          <div className="card-meta-label">Mulai</div>
                          <div className="card-meta-value">{(bus.harga_start/1000000).toFixed(1)}jt</div>
                        </div>
                        <div className="card-meta-divider" />
                        <div className="card-meta-item">
                          <div className="card-meta-label">Tahun</div>
                          <div className="card-meta-value">{bus.tahun}</div>
                        </div>
                      </div>
                      <div className="card-fas">
                        {bus.fasilitas.slice(0,4).map((f,i) => <span key={i} className="fas-tag">{f}</span>)}
                        {bus.fasilitas.length > 4 && <span className="fas-more">+{bus.fasilitas.length - 4} lainnya</span>}
                      </div>
                      <motion.button className="btn-primary" style={{width:'100%', justifyContent:'center'}} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={() => handleBooking(bus)}>
                        Lihat Detail &amp; Pesan
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button className="page-btn page-arrow" onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1}>‹</button>
              {pageNums.map(n => (
                <motion.button key={n} className={`page-btn ${currentPage === n ? 'active' : ''}`}
                  onClick={() => setCurrentPage(n)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {n}
                </motion.button>
              ))}
              <button className="page-btn page-arrow" onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages}>›</button>
            </div>
          )}
        </div>

        {/* MODAL */}
        <AnimatePresence>
          {showModal && selectedBus && (
            <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }} onClick={() => setShowModal(false)}>
              <motion.div className="modal"
                initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.4,0,0.2,1] }}
                onClick={e => e.stopPropagation()}>

                <div className="modal-header">
                  <div>
                    <h2 className="modal-title">{selectedBus.nama_bus}</h2>
                    <p className="modal-route">{selectedBus.rute.replace('-', ' → ')} &middot; {selectedBus.tipe_bus} &middot; {selectedBus.kelas_bus}</p>
                  </div>
                  <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
                </div>

                <div className="modal-body">
                  <img src={selectedBus.image} alt={selectedBus.nama_bus} className="modal-img" />
                  <div className="modal-stats">
                    <div className="modal-stat">
                      <div className="modal-stat-label">Kapasitas</div>
                      <div className="modal-stat-value">{selectedBus.kapasitas}</div>
                      <div className="modal-stat-unit">Kursi</div>
                    </div>
                    <div className="modal-stat">
                      <div className="modal-stat-label">Harga Mulai</div>
                      <div className="modal-stat-value">{(selectedBus.harga_start/1000000).toFixed(1)}jt</div>
                      <div className="modal-stat-unit">IDR</div>
                    </div>
                    <div className="modal-stat">
                      <div className="modal-stat-label">Tahun</div>
                      <div className="modal-stat-value">{selectedBus.tahun}</div>
                      <div className="modal-stat-unit">Produksi</div>
                    </div>
                  </div>

                  <div className="modal-fas-section">
                    <p className="modal-section-label">Fasilitas</p>
                    <div className="modal-fas-list">
                      {selectedBus.fasilitas.map((f, i) => <span key={i} className="modal-fas-tag">{f}</span>)}
                    </div>
                  </div>

                  <div className="modal-rec-section">
                    <p className="modal-section-label">Rekomendasi Serupa</p>
                    <div className="rec-grid">
                      {recommendations.map(rec => (
                        <motion.div key={rec.id} className="rec-card" whileHover={{ scale: 1.03 }}
                          onClick={() => {
                            setSelectedBus(rec);
                            setRecommendations(busDataset.filter(b=>b.id!==rec.id).map(b=>({...b,similarity:cosineSimilarity(createBusVector(rec),createBusVector(b))})).sort((a,b)=>b.similarity-a.similarity).slice(0,6));
                          }}>
                          <img src={rec.image} alt={rec.nama_bus} className="rec-img" loading="lazy" />
                          <div className="rec-body">
                            <p className="rec-name">{rec.nama_bus}</p>
                            <p className="rec-match">{(rec.similarity*100).toFixed(0)}% cocok</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.a href="https://wa.me/6281274603234?text=Halo,%20saya%20ingin%20konfirmasi%20pesanan"
                    target="_blank" rel="noopener noreferrer" className="btn-primary"
                    style={{display:'block', width:'100%', justifyContent:'center', borderRadius:'var(--radius-lg)', padding:'14px', fontSize:'14px'}}
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                    Konfirmasi Pemesanan via WhatsApp
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-stats">
              <div>
                <div className="footer-stat-n">{busDataset.length}</div>
                <div className="footer-stat-l">Armada</div>
              </div>
              <div>
                <div className="footer-stat-n">{new Set(busDataset.map(b => b.rute)).size}</div>
                <div className="footer-stat-l">Rute</div>
              </div>
              <div>
                <div className="footer-stat-n">AI</div>
                <div className="footer-stat-l">Rekomendasi</div>
              </div>
            </div>
            <div style={{textAlign:'right'}}>
              <div className="footer-algo">Content-Based Filtering · Cosine Similarity</div>
              <div className="footer-copy" style={{marginTop:'6px'}}>© 2025 BusGo. All rights reserved.</div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
