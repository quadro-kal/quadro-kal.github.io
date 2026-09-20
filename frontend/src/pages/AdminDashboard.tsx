import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-m3-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-m3-primary">Admin Dashboard</h1>
          <button onClick={handleLogout} className="px-4 py-2 bg-m3-secondary text-white rounded-full hover:opacity-90">
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold text-m3-primary mb-4">Proyek</h2>
            <p className="text-m3-secondary mb-4">Kelola daftar proyek portofolio Anda di sini.</p>
            <button className="w-full py-2 bg-m3-primary text-white rounded-full">Tambah Proyek</button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold text-m3-primary mb-4">Artikel Blog</h2>
            <p className="text-m3-secondary mb-4">Kelola dan tulis artikel blog baru.</p>
            <button className="w-full py-2 bg-m3-primary text-white rounded-full">Tulis Artikel</button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold text-m3-primary mb-4">Pesan Kontak</h2>
            <p className="text-m3-secondary mb-4">Baca pesan dari pengunjung web.</p>
            <button className="w-full py-2 bg-m3-primary text-white rounded-full">Lihat Pesan</button>
          </div>
        </div>
      </div>
    </div>
  );
}