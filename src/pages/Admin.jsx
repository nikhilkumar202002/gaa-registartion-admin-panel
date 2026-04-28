import React from 'react';
import { LogOut, User, Mail, MapPin, GraduationCap, BookOpen, Phone } from 'lucide-react';

const EnrollmentList = () => {
  // Mock data based on your notifyPayload structure
  const enrollments = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.j@example.com",
      phone: "+1 234 567 890",
      city: "London",
      qualification: "Bachelors in CS",
      course: "Cyber Security"
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah.s@example.com",
      phone: "+1 987 654 321",
      city: "Manchester",
      qualification: "Masters in IT",
      course: "Full Stack Development"
    }
  ];

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- HEADER --- */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo Left */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">AdminPanel</span>
          </div>

          {/* Logout Right */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors group"
          >
            <span className="text-sm font-medium hidden sm:block">Logout</span>
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Enrollment Applications</h1>
            <p className="text-gray-500 text-sm">Manage and view all incoming student payloads.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-full border text-sm font-medium text-gray-600 shadow-sm">
            Total: {enrollments.length}
          </div>
        </div>

        {/* --- LIST GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {/* Decorative side bar */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
              
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <User size={20} />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {item.course}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
              
              <div className="space-y-3 mt-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail size={16} className="text-gray-400" />
                  {item.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone size={16} className="text-gray-400" />
                  {item.phone}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin size={16} className="text-gray-400" />
                  {item.city}
                </div>
                
                <hr className="my-2 border-gray-50" />
                
                <div className="flex items-center gap-3 text-sm font-medium text-gray-800">
                  <GraduationCap size={16} className="text-blue-500" />
                  {item.qualification}
                </div>
              </div>

              <button className="w-full mt-6 py-2 text-sm font-semibold bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EnrollmentList;