import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { SolarPage } from './pages/SolarPage'
import { ServicesPage } from './pages/ServicesPage'
import { AntennaPage } from './pages/AntennaPage'
import { VehiclePage } from './pages/VehiclePage'
import { ProductsPage } from './pages/ProductsPage'
import { OutdoorPage } from './pages/OutdoorPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { NotFoundPage } from './pages/NotFoundPage'

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="aurinkosahko" element={<SolarPage />} />
        <Route path="palvelut" element={<ServicesPage />} />
        <Route path="palvelut/antenniasennukset" element={<AntennaPage />} />
        <Route path="palvelut/ajoneuvoasennukset" element={<VehiclePage />} />
        <Route path="tuotteet" element={<ProductsPage />} />
        <Route path="tuotteet/metsastys-ja-maasto" element={<OutdoorPage />} />
        <Route path="tietoa-meista" element={<AboutPage />} />
        <Route path="yhteystiedot" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
