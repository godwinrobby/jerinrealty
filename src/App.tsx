import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';
import { Property, InquirySubmission, ProjectDevelopment } from './types';
import { PROPERTIES } from './data/properties';
import { NEW_PROJECTS } from './data/projects';
import { Header, NavigationPage, PropertyAction } from './components/Header';
import { Footer } from './components/Footer';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { AboutPage } from './pages/AboutPage';
import { DirectorsPage } from './pages/DirectorsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { EnquiryModal } from './components/EnquiryModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ThemeProvider } from './context/ThemeContext';
import { Check, X } from 'lucide-react';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}

// Route wrapper for individual property detail pages (/property/:id)
function PropertyDetailRouteWrapper({
  properties,
  onOpenEnquiry,
  onSelectProperty,
  onBack,
}: {
  properties: Property[];
  onOpenEnquiry: (property: Property) => void;
  onSelectProperty: (property: Property) => void;
  onBack: () => void;
}) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const property = properties.find((p) => p.id === id) || PROPERTIES.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold font-editorial text-stone-900 mb-2">Property Not Found</h2>
        <p className="text-sm text-stone-600 mb-6">
          The estate you are looking for is no longer available or the address link has changed.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 bg-gradient-to-r from-[#6246EA] via-[#2878FF] to-[#FF7043] text-white text-xs font-bold rounded-xl shadow-md hover:opacity-95 transition-all"
        >
          Return to Properties Portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6">
      <PropertyDetailPage
        property={property}
        onBack={onBack}
        onSelectProperty={onSelectProperty}
        onOpenEnquiry={onOpenEnquiry}
      />
    </div>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Sanitize any legacy /src/assets/images/ paths stored in client localStorage
  const sanitizeProperties = (list: Property[]): Property[] => {
    return list.map((p) => ({
      ...p,
      mainImage: p.mainImage ? p.mainImage.replace(/^\/src\/assets\/images\//, '/images/') : p.mainImage,
      galleryImages: p.galleryImages?.map((img) => img.replace(/^\/src\/assets\/images\//, '/images/')) || [],
    }));
  };

  const sanitizeProjects = (list: ProjectDevelopment[]): ProjectDevelopment[] => {
    return list.map((p) => ({
      ...p,
      image: p.image ? p.image.replace(/^\/src\/assets\/images\//, '/images/') : p.image,
      gallery: p.gallery?.map((img) => img.replace(/^\/src\/assets\/images\//, '/images/')) || [],
    }));
  };

  // Persistent properties inventory initialized from localStorage
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const stored = localStorage.getItem('aura_prime_properties_v2');
      if (stored) {
        return sanitizeProperties(JSON.parse(stored));
      }
    } catch (e) {
      console.warn(e);
    }
    return sanitizeProperties(PROPERTIES);
  });

  // Persistent landmark projects inventory initialized from localStorage
  const [projects, setProjects] = useState<ProjectDevelopment[]>(() => {
    try {
      const stored = localStorage.getItem('jerin_projects_v2');
      if (stored) {
        return sanitizeProjects(JSON.parse(stored));
      }
    } catch (e) {
      console.warn(e);
    }
    return sanitizeProjects(NEW_PROJECTS);
  });

  const handleUpdateProperties = (updated: Property[]) => {
    const sanitized = sanitizeProperties(updated);
    setProperties(sanitized);
    try {
      localStorage.setItem('aura_prime_properties_v2', JSON.stringify(sanitized));
    } catch (e) {
      console.warn(e);
    }
    showToast('Portfolio database updated successfully.');
  };

  const handleUpdateProjects = (updated: ProjectDevelopment[]) => {
    const sanitized = sanitizeProjects(updated);
    setProjects(sanitized);
    try {
      localStorage.setItem('jerin_projects_v2', JSON.stringify(sanitized));
    } catch (e) {
      console.warn(e);
    }
    showToast('Landmark projects portfolio updated successfully.');
  };

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(() => properties[0] || PROPERTIES[0]);

  // Enquiry Modal state
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryProperty, setEnquiryProperty] = useState<Property | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleSelectPropertyToView = (property: Property) => {
    setSelectedProperty(property);
    navigate(`/property/${property.id}`);
  };

  const handleOpenEnquiry = (propertyOrTitle?: any) => {
    if (typeof propertyOrTitle === 'object' && propertyOrTitle !== null) {
      setEnquiryProperty(propertyOrTitle);
    } else if (typeof propertyOrTitle === 'string') {
      setEnquiryProperty({
        ...(selectedProperty || properties[0]),
        title: propertyOrTitle,
      });
    } else {
      setEnquiryProperty(selectedProperty || properties[0] || null);
    }
    setIsEnquiryOpen(true);
  };

  const handleEnquirySuccess = (submission: InquirySubmission) => {
    showToast(`Enquiry ${submission.id} registered. Our private office will contact you shortly.`);
  };

  const handlePropertyAction = (action: PropertyAction) => {
    if (action === 'sell') {
      handleOpenEnquiry();
    } else if (action === 'projects') {
      navigate('/projects');
    } else {
      navigate('/');
    }
  };

  // Determine if viewing full-screen Admin Portal
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-[#6246EA] selection:text-white">
        <ScrollToTop />
        <AdminPage
          properties={properties}
          onUpdateProperties={handleUpdateProperties}
          projects={projects}
          onUpdateProjects={handleUpdateProjects}
          onSelectPropertyToView={handleSelectPropertyToView}
          onBackToSite={() => navigate('/')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5FF] text-[#17213A] flex flex-col font-sans selection:bg-[#6246EA] selection:text-white transition-colors duration-200">
      <ScrollToTop />

      {/* Top Header with React Router Navigation */}
      <Header
        onOpenEnquiry={() => handleOpenEnquiry()}
        onPropertyAction={handlePropertyAction}
      />

      {/* Main Page Body: Driven by React Router */}
      <main className="flex-1 w-full">
        <Routes>
          {/* Home / Properties Showroom */}
          <Route
            path="/"
            element={
              <PropertiesPage
                properties={properties}
                projects={projects}
                onSelectProperty={handleSelectPropertyToView}
                onOpenEnquiry={handleOpenEnquiry}
                statusFilter="all"
                onNavigateToProjects={() => navigate('/projects')}
                onNavigateToContact={() => navigate('/contact')}
              />
            }
          />

          <Route path="/home" element={<Navigate to="/" replace />} />

          {/* About Us Page */}
          <Route
            path="/about"
            element={
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6">
                <AboutPage
                  onNavigate={(page) => navigate(page === 'properties' ? '/' : `/${page}`)}
                  onOpenEnquiry={() => handleOpenEnquiry()}
                />
              </div>
            }
          />

          {/* Board of Directors Page */}
          <Route
            path="/directors"
            element={
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6">
                <DirectorsPage onOpenEnquiry={() => handleOpenEnquiry()} />
              </div>
            }
          />

          {/* Contact Page */}
          <Route
            path="/contact"
            element={
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6">
                <ContactPage onOpenEnquiry={() => handleOpenEnquiry()} />
              </div>
            }
          />

          {/* Admin Management Desk */}
          <Route
            path="/admin"
            element={
              <AdminPage
                properties={properties}
                onUpdateProperties={handleUpdateProperties}
                projects={projects}
                onUpdateProjects={handleUpdateProjects}
                onSelectPropertyToView={handleSelectPropertyToView}
                onBackToSite={() => navigate('/')}
              />
            }
          />

          {/* Dedicated Individual Property Detail Route */}
          <Route
            path="/property/:id"
            element={
              <PropertyDetailRouteWrapper
                properties={properties}
                onOpenEnquiry={handleOpenEnquiry}
                onSelectProperty={handleSelectPropertyToView}
                onBack={() => navigate('/')}
              />
            }
          />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Modern Multi-Column Footer with React Router Navigation */}
      <Footer
        onOpenEnquiry={() => handleOpenEnquiry()}
      />

      {/* Enquiry Us Modal (5 Fields) */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        property={enquiryProperty}
        onSuccess={handleEnquirySuccess}
      />

      {/* Floating WhatsApp Quick Action Button (positioned at bottom-right) */}
      {location.pathname !== '/admin' && (
        <FloatingWhatsApp onOpenDirectEnquiry={() => handleOpenEnquiry()} />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 bg-[#17213A] text-white text-xs px-4 py-3 rounded-2xl shadow-2xl border border-purple-500/30 animate-in slide-in-from-bottom-2 duration-200 max-w-sm">
          <Check className="w-4 h-4 text-[#12A878] shrink-0" />
          <span className="flex-1 font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-purple-300 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}
