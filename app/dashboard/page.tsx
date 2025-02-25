'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Farmer {
  id: string;
  full_name: string;
  contact_number: number;
  state: string;
  is_verify: boolean;
}

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [farmers, setFarmers] = useState<Farmer[]>([]);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/farmers');
        const data = await response.json();
        setFarmers(data);
      } catch (error) {
        console.error('Error fetching farmers:', error);
      }
    };

    fetchFarmers();
  }, []);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = farmers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(farmers.length / itemsPerPage);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-[#00843D] text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav>
          <Link 
            href="/dashboard" 
            className="block py-2 px-4 text-[#00843D] bg-white rounded-lg hover:bg-gray-100 transition duration-200"
          >
            Dashboard
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6 text-[#00843D]">Farmers List</h1>
        
        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-[#00843D] text-white">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Contact</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Verified</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((farmer) => (
                <tr key={farmer.id} className="border-b hover:bg-gray-50 transition duration-200">
                  <td className="py-3 px-4">{farmer.id.slice(0, 8)}...</td>
                  <td className="py-3 px-4">{farmer.full_name}</td>
                  <td className="py-3 px-4">{farmer.contact_number}</td>
                  <td className="py-3 px-4">{farmer.state}</td>
                  <td className="py-3 px-4">
                    {farmer.is_verify ? 
                      <span className="text-green-600 font-bold">✓</span> : 
                      <span className="text-red-600 font-bold">✗</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center items-center">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-[#00843D] text-white rounded-lg hover:bg-[#006F33] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-[#00843D] text-white rounded-lg hover:bg-[#006F33] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}