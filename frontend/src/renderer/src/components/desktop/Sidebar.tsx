import { Home, Library, Box, TowerControl as GameController } from 'lucide-react'
import { motion } from 'framer-motion'
import { View } from '../../pages/Home'
import owlLogo from '@renderer/assets/owl.png'
import { Link } from 'react-router-dom'
interface SidebarProps {
  isOpen: boolean
  currentView: View
  onViewChange: (view: View) => void
}

const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
  onClick
}: {
  icon: any
  label: string
  isActive: boolean
  onClick: () => void
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
      isActive ? 'bg-white/10' : 'hover:bg-white/10'
    }`}
    onClick={onClick}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </motion.div>
)

export const Sidebar = ({ isOpen, currentView, onViewChange }: SidebarProps) => {
  return (
    <div
      className={`fixed top-10 left-0 w-60 z-50 bg-[#121212] font-urbanist backdrop-blur-xl h-screen p-4 flex flex-col gap-4  border-r border-gray-200/5 ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div className="mb-8 mt-2">
        <img src={owlLogo} alt="owl logo" className="w-8  " />
      </div>

      <SidebarItem
        icon={Home}
        label="Store"
        isActive={currentView === 'store'}
        onClick={() => onViewChange('store')}
      />
      <SidebarItem
        icon={Library}
        label="Library"
        isActive={currentView === 'library'}
        onClick={() => onViewChange('library')}
      />

      <div className="mt-8">
        <h3 className="flex gap-x-2 items-center text-sm text-gray-400 px-4 mb-2">
          <GameController className="w-4 h-4" />
          QUICK LAUNCH
        </h3>
      </div>
    </div>
  )
}
