import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Mail, MapPin, GraduationCap, Phone, MoreHorizontal, Download, Filter, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { getRegistrations } from '../axios/axios';

const EnrollmentTable = () => {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async (page) => {
    setLoading(true);
    setError('');
    try {
      const { data: res } = await getRegistrations(page);
      setEnrollments(res.data);
      setPagination(res.pagination);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setError('Failed to load registrations. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* --- HEADER --- */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/gaa_logo_black.png" alt="GAA Logo" className="h-9 w-auto object-contain" />
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all group"
          >
            <span className="text-sm font-semibold">Logout</span>
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">

        {/* Page Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Enrollment Database</h1>
            <p className="text-gray-500 text-sm mt-1">Review and manage student applications for the 2024 session.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <Filter size={16} /> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-xl text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-md shadow-blue-100">
              <Download size={16} /> Export CSV
            </button>
          </div>
        </div>

        {/* --- TABLE CONTAINER --- */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {error && (
            <div className="px-6 py-4 text-sm text-red-600 bg-red-50 border-b border-red-100">
              {error}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Contact Info</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Qualification</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-gray-400">
                      <Loader2 size={28} className="animate-spin mx-auto mb-2" />
                      <span className="text-sm">Loading registrations…</span>
                    </td>
                  </tr>
                ) : enrollments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-sm text-gray-400">
                      No registrations found.
                    </td>
                  </tr>
                ) : (
                  enrollments.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                      {/* Name & City */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                            {item.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900">{item.name}</div>
                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                              <MapPin size={12} /> {item.city}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="px-6 py-5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail size={14} className="text-gray-400 shrink-0" />
                            {item.email_address}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone size={14} className="text-gray-400 shrink-0" />
                            {item.contact_number_1}
                            {item.contact_number_2 && item.contact_number_2 !== item.contact_number_1 && (
                              <span className="text-gray-400">/ {item.contact_number_2}</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Course Badge */}
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10">
                          {item.course}
                        </span>
                      </td>

                      {/* Qualification */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                          <GraduationCap size={16} className="text-gray-400 shrink-0" />
                          {item.qualification}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5 text-right">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                          <MoreHorizontal size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          {pagination && (
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Showing{' '}
                <span className="font-semibold text-gray-900">{pagination.from}</span>
                {' '}to{' '}
                <span className="font-semibold text-gray-900">{pagination.to}</span>
                {' '}of{' '}
                <span className="font-semibold text-gray-900">{pagination.total}</span>
                {' '}results
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => p - 1)}
                  disabled={!pagination.prev_page_url || loading}
                  className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={15} /> Prev
                </button>
                <span className="text-sm text-gray-500 px-1">
                  Page <span className="font-semibold text-gray-900">{pagination.current_page}</span> of <span className="font-semibold text-gray-900">{pagination.last_page}</span>
                </span>
                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={!pagination.next_page_url || loading}
                  className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EnrollmentTable;