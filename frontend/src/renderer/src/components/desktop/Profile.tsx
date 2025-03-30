import React from 'react'
import { motion } from 'framer-motion'
import { Settings, LogOut, Shield, CreditCard, Gift, Clock, Download } from 'lucide-react'

export const Profile = () => {
  return (
    <div className="flex-1 h-screen overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/30 backdrop-blur-xl rounded-xl p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold">
              JD
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">John Doe</h1>
              <p className="text-gray-400">Online - Last online 2 hours ago</p>
            </div>
            <div className="ml-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-black/20 rounded-lg p-4">
              <h3 className="font-medium mb-1">Games Owned</h3>
              <p className="text-2xl font-bold">24</p>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <h3 className="font-medium mb-1">Achievements</h3>
              <p className="text-2xl font-bold">142</p>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <h3 className="font-medium mb-1">Hours Played</h3>
              <p className="text-2xl font-bold">387</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { icon: Shield, label: 'Account Security' },
                { icon: CreditCard, label: 'Payment Methods' },
                { icon: Gift, label: 'Redeem Code' },
                { icon: Clock, label: 'Purchase History' },
                { icon: Download, label: 'Downloads' },
                { icon: LogOut, label: 'Sign Out' }
              ].map(({ icon: Icon, label }) => (
                <motion.button
                  key={label}
                  whileHover={{ scale: 1.02 }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-black/20 hover:bg-black/30"
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { title: 'Fortnite', action: 'Played for 2 hours', time: '2 hours ago' },
                { title: 'Among Us', action: 'Earned 3 achievements', time: 'Yesterday' },
                { title: 'GTA V', action: 'Purchased', time: '3 days ago' }
              ].map((activity) => (
                <div key={activity.title} className="bg-black/20 rounded-lg p-4">
                  <h3 className="font-medium">{activity.title}</h3>
                  <p className="text-sm text-gray-400">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
