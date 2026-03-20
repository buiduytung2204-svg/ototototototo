import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { motion } from 'motion/react';
import CarCard from '../components/CarCard';
import { Car } from '../types';
import { mockCars } from '../data/cars';

export default function Catalog() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialBrand = queryParams.get('brand') || 'All';

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setCars(mockCars);
      setLoading(false);
      if (initialBrand !== 'All') {
        setSelectedBrand(initialBrand);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [initialBrand]);

  useEffect(() => {
    let result = cars;

    if (searchTerm) {
      result = result.filter(car => car.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (selectedBrand !== 'All') {
      result = result.filter(car => car.brand === selectedBrand);
    }

    result = result.filter(car => car.price >= priceRange[0] && car.price <= priceRange[1]);

    setFilteredCars(result);
  }, [cars, searchTerm, selectedBrand, priceRange]);

  const brands = ['All', ...Array.from(new Set(cars.map(c => c.brand)))];

  return (
    <div className="bg-black min-h-screen text-white pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Danh mục xe</h1>
          <p className="text-gray-400 max-w-2xl">Khám phá bộ sưu tập xe hơi sang trọng của chúng tôi. Lọc theo thương hiệu, giá cả hoặc tìm kiếm mẫu xe yêu thích của bạn.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 sticky top-28">
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <h2 className="text-xl font-semibold">Bộ lọc</h2>
                <button onClick={() => setIsFilterOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Search */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Tìm kiếm</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tên xe..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                  />
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                </div>
              </div>

              {/* Brands */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Thương hiệu</label>
                <div className="space-y-3">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center group cursor-pointer">
                      <input
                        type="radio"
                        name="brand"
                        value={brand}
                        checked={selectedBrand === brand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="form-radio h-5 w-5 text-white bg-black border-white/30 focus:ring-white focus:ring-offset-black"
                      />
                      <span className={`ml-3 text-sm transition-colors ${selectedBrand === brand ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-200'}`}>
                        {brand === 'All' ? 'Tất cả' : brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Mức giá</label>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>${priceRange[0].toLocaleString()}</span>
                    <span>${priceRange[1].toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-400">Hiển thị <span className="text-white font-medium">{filteredCars.length}</span> kết quả</p>
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/10 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                <Filter className="h-4 w-4" />
                Bộ lọc
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-zinc-900/50 rounded-2xl border border-white/5">
                <p className="text-xl text-gray-400 mb-4">Không tìm thấy xe phù hợp</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedBrand('All');
                    setPriceRange([0, 500000]);
                  }}
                  className="text-white underline hover:text-gray-300 transition-colors"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
