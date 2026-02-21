'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Doctor {
  id: number
  name: string
  specialization: string
  contact: string
  availability: string
  status: 'Available' | 'Busy'
  avatar: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [search, setSearch] = useState('')
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null) 
  // modal state
  const [appointmentDoctor, setAppointmentDoctor] = useState<Doctor | null>(null)
const [appointmentDate, setAppointmentDate] = useState('')
const [appointmentTime, setAppointmentTime] = useState('')

  useEffect(() => {
    const storedName = sessionStorage.getItem('signupName')
    const storedEmail = sessionStorage.getItem('signupEmail')

    if (!storedEmail) {
      router.push('/login')
    } else {
      if (storedName) setName(storedName)
      setEmail(storedEmail)

      // Sample doctor data
      setDoctors([
        {
          id: 1,
          name: 'Dr. Alice Smith',
          specialization: 'Cardiologist',
          contact: '+91 9876543210',
          availability: 'Mon-Fri 10am-4pm',
          status: 'Available',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        {
          id: 2,
          name: 'Dr. Bob Johnson',
          specialization: 'Dermatologist',
          contact: '+91 9123456780',
          availability: 'Tue-Thu 12pm-6pm',
          status: 'Busy',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        {
          id: 3,
          name: 'Dr. Clara Lee',
          specialization: 'Pediatrician',
          contact: '+91 9988776655',
          availability: 'Mon-Fri 9am-3pm',
          status: 'Available',
          avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
        },
        {
          id: 4,
          name: 'Dr. David Kim',
          specialization: 'Neurologist',
          contact: '+91 9234567890',
          availability: 'Wed-Fri 11am-5pm',
          status: 'Busy',
          avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
        },
      ])

      setReady(true)
    }
  }, [router])

  const handleLogout = () => {
    sessionStorage.clear()
    router.push('/login')
  }

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(search.toLowerCase())
  )

  if (!ready) return null

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Doctor Dashboard</h1>
        <div className="flex items-center space-x-4">
          <p className="text-gray-600 font-medium">{name || 'User'}</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="p-6 flex justify-center">
        <input
          type="text"
          placeholder="Search doctors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Doctor Cards */}
      <main className="p-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-2xl shadow-lg p-6 space-y-3 hover:shadow-xl transition-shadow flex flex-col items-center text-center"
          >
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-purple-400"
            />
            <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
            <p className="text-gray-600 font-medium">{doctor.specialization}</p>
            <p className="text-gray-500">Contact: {doctor.contact}</p>
            <p className="text-gray-500">{doctor.availability}</p>
            <span
              className={`px-3 py-1 rounded-full text-white font-semibold ${
                doctor.status === 'Available' ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {doctor.status}
            </span>

            {/* View Profile */}
            <button
              className="mt-3 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
              onClick={() => setSelectedDoctor(doctor)}
            >
              View Profile
            </button>

            {/* Book Appointment */}
            <button
              className="mt-2 w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all"
              onClick={() => alert(`Booking appointment with ${doctor.name}`)}
            >
              Book Appointment
            </button>
            <button
  className="mt-2 w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all"
  onClick={() => setAppointmentDoctor(doctor)} // open appointment modal
>
  Book Appointment
</button>
{appointmentDoctor && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6 w-11/12 max-w-md relative">
      {/* Close button */}
      <button
        onClick={() => setAppointmentDoctor(null)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
      >
        &times;
      </button>

      <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
        Book Appointment with {appointmentDoctor.name}
      </h2>

      {/* Appointment Form */}
      <div className="flex flex-col space-y-4">
        <label className="flex flex-col text-gray-700 font-medium">
          Select Date
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </label>

        <label className="flex flex-col text-gray-700 font-medium">
          Select Time
          <input
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </label>

        <button
          className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all"
          onClick={() => {
            alert(
              `Appointment booked with ${appointmentDoctor.name} on ${appointmentDate} at ${appointmentTime}`
            )
            setAppointmentDoctor(null)
            setAppointmentDate('')
            setAppointmentTime('')
          }}
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  </div>
)}
          </div>
        ))}
      </main>

      {/* Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-11/12 max-w-md relative">
            {/* Close button */}
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              &times;
            </button>

            <img
              src={selectedDoctor.avatar}
              alt={selectedDoctor.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-purple-400"
            />
            <h2 className="text-xl font-bold text-gray-800 text-center">{selectedDoctor.name}</h2>
            <p className="text-gray-600 text-center">{selectedDoctor.specialization}</p>
            <p className="text-gray-500 mt-2 text-center">Contact: {selectedDoctor.contact}</p>
            <p className="text-gray-500 text-center">{selectedDoctor.availability}</p>

            <div className="mt-4 space-y-2">
              <p><strong>Experience:</strong> 10 years</p>
              <p><strong>Patients Handled:</strong> 1200+</p>
              <p><strong>Ratings:</strong> ⭐⭐⭐⭐☆</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}