import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Property, InquirySubmission, ProjectDevelopment } from '../types';
import { NEW_PROJECTS } from '../data/projects';
import { useTheme } from '../context/ThemeContext';
import { AdminLoginPage, AdminUser } from './AdminLoginPage';
import { AdminSidebar, AdminTab } from '../components/admin/AdminSidebar';
import { 
  Building2, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  Star, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  Download, 
  ArrowUpRight, 
  Eye, 
  TrendingUp, 
  ShieldCheck, 
  RefreshCw, 
  X, 
  ExternalLink,
  MessageSquare,
  FileSpreadsheet,
  Check,
  AlertTriangle,
  Sliders,
  DollarSign,
  Tag,
  Menu,
  Image as ImageIcon,
  Copy,
  Sparkles,
  LogOut,
  FolderOpen,
  Layers,
  LayoutList,
  Table as TableIcon,
  Calendar,
  Compass
} from 'lucide-react';

interface AdminPageProps {
  properties: Property[];
  onUpdateProperties: (updated: Property[]) => void;
  projects?: ProjectDevelopment[];
  onUpdateProjects?: (updated: ProjectDevelopment[]) => void;
  onSelectPropertyToView: (property: Property) => void;
  onBackToSite: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  properties,
  onUpdateProperties,
  projects: propProjects,
  onUpdateProjects: propOnUpdateProjects,
  onSelectPropertyToView,
  onBackToSite,
}) => {
  const navigate = useNavigate();
  const { themeConfig } = useTheme();

  // --------------------------------------------------------------------------
  // AUTHENTICATION STATE
  // --------------------------------------------------------------------------
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    try {
      const stored = localStorage.getItem('aura_prime_admin_session');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn(e);
    }
    return null;
  });

  const handleLoginSuccess = (user: AdminUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('aura_prime_admin_session', JSON.stringify(user));
    } catch (e) {
      console.warn(e);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('aura_prime_admin_session');
    } catch (e) {
      console.warn(e);
    }
    setCurrentUser(null);
  };

  // --------------------------------------------------------------------------
  // NAVIGATION & SIDEBAR STATE
  // --------------------------------------------------------------------------
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // --------------------------------------------------------------------------
  // PROJECTS STATE (Landmark Developments)
  // --------------------------------------------------------------------------
  const [projects, setProjects] = useState<ProjectDevelopment[]>(() => {
    if (propProjects && propProjects.length > 0) return propProjects;
    try {
      const stored = localStorage.getItem('jerin_projects_v2');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn(e);
    }
    return NEW_PROJECTS;
  });

  const saveProjects = (updated: ProjectDevelopment[]) => {
    setProjects(updated);
    if (propOnUpdateProjects) {
      propOnUpdateProjects(updated);
    }
    try {
      localStorage.setItem('jerin_projects_v2', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  // Project inspection & view mode
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<ProjectDevelopment>(
    () => projects[0] || NEW_PROJECTS[0]
  );
  const [projectDetailsViewMode, setProjectDetailsViewMode] = useState<'details' | 'table'>('details');
  const [projectSearch, setProjectSearch] = useState('');
  const [projectStatusFilter, setProjectStatusFilter] = useState('all');
  const [projectCategoryFilter, setProjectCategoryFilter] = useState('all');

  // Project Modals
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectDevelopment | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<ProjectDevelopment | null>(null);
  const [modalActiveImage, setModalActiveImage] = useState<string>('');

  // Project Form State
  const [pName, setPName] = useState('');
  const [pDeveloper, setPDeveloper] = useState('');
  const [pStatus, setPStatus] = useState<ProjectDevelopment['status']>('Under Construction');
  const [pCategory, setPCategory] = useState<ProjectDevelopment['category']>('Ultra Luxury');
  const [pLocation, setPLocation] = useState('');
  const [pNeighborhood, setPNeighborhood] = useState('Marathahalli');
  const [pPriceStart, setPPriceStart] = useState('₹2.45 Cr onwards');
  const [pPriceNumeric, setPPriceNumeric] = useState<number>(24500000);
  const [pConfig, setPConfig] = useState('3, 3.5 & 4 BHK Residences');
  const [pUnits, setPUnits] = useState('1,200 Units across 20 Acres');
  const [pPossession, setPPossession] = useState('Dec 2026');
  const [pRera, setPRera] = useState('PRM/KA/RERA/1251/446/PR/200923/006282');
  const [pImage, setPImage] = useState('/images/hero_luxury_property_1793437949212.jpg');
  const [pGallery, setPGallery] = useState('');
  const [pHighlight, setPHighlight] = useState('Clubhouse, Olympic Swimming Pools, Mediterranean Pergolas');
  const [pAmenities, setPAmenities] = useState('Grand Clubhouse, Olympic Pools, Tennis Courts, Wine Cellar, Private Theater');
  const [pDescription, setPDescription] = useState('');

  // Filtered Projects for Admin
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (projectSearch.trim()) {
        const q = projectSearch.toLowerCase();
        const match = 
          p.name.toLowerCase().includes(q) ||
          p.developer.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.neighborhood.toLowerCase().includes(q) ||
          p.reraId.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (projectStatusFilter !== 'all' && p.status !== projectStatusFilter) return false;
      if (projectCategoryFilter !== 'all' && p.category !== projectCategoryFilter) return false;
      return true;
    });
  }, [projects, projectSearch, projectStatusFilter, projectCategoryFilter]);

  // Open Project Modal (Add or Edit)
  const handleOpenProjectModal = (proj?: ProjectDevelopment) => {
    if (proj) {
      setEditingProject(proj);
      setPName(proj.name);
      setPDeveloper(proj.developer);
      setPStatus(proj.status);
      setPCategory(proj.category);
      setPLocation(proj.location);
      setPNeighborhood(proj.neighborhood);
      setPPriceStart(proj.priceStart);
      setPPriceNumeric(proj.priceStartNumeric);
      setPConfig(proj.configuration);
      setPUnits(proj.units);
      setPPossession(proj.possessionDate);
      setPRera(proj.reraId);
      setPImage(proj.image);
      setPGallery(proj.gallery?.join(', ') || proj.image);
      setPHighlight(proj.highlight);
      setPAmenities(proj.amenities.join(', '));
      setPDescription(proj.description);
    } else {
      setEditingProject(null);
      setPName('');
      setPDeveloper('Prestige Group');
      setPStatus('Under Construction');
      setPCategory('Ultra Luxury');
      setPLocation('Outer Ring Road, Bengaluru');
      setPNeighborhood('Marathahalli');
      setPPriceStart('₹2.80 Cr onwards');
      setPPriceNumeric(28000000);
      setPConfig('3 & 4 BHK Sky Mansions');
      setPUnits('850 Units across 18 Acres');
      setPPossession('Q3 2026');
      setPRera(`PRM/KA/RERA/1251/${Math.floor(100 + Math.random() * 900)}/PR/240510/00${Math.floor(1000 + Math.random() * 9000)}`);
      setPImage('/images/hero_luxury_property_1793437949212.jpg');
      setPGallery('/images/hero_luxury_property_1793437949212.jpg, /images/property_penthouse_1793437950337.jpg');
      setPHighlight('50,000 sq.ft Clubhouse, Heated Lap Pools, Private Balcony Sky Decks');
      setPAmenities('Clubhouse, Heated Lap Pool, Tennis Court, Wine Cellar, Private Theater, Spa');
      setPDescription('A visionary landmark residential township combining classical architectural proportion with smart luxury amenities.');
    }
    setIsProjectModalOpen(true);
  };

  // Save Project
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedAmenities = pAmenities.split(',').map((a) => a.trim()).filter(Boolean);
    const parsedGallery = pGallery.split(',').map((g) => g.trim()).filter(Boolean);

    if (editingProject) {
      const updated = projects.map((p) => {
        if (p.id === editingProject.id) {
          const updatedItem: ProjectDevelopment = {
            ...p,
            name: pName,
            developer: pDeveloper,
            status: pStatus,
            category: pCategory,
            location: pLocation,
            neighborhood: pNeighborhood,
            priceStart: pPriceStart,
            priceStartNumeric: pPriceNumeric,
            configuration: pConfig,
            units: pUnits,
            possessionDate: pPossession,
            reraId: pRera,
            image: pImage,
            gallery: parsedGallery.length ? parsedGallery : [pImage],
            highlight: pHighlight,
            amenities: parsedAmenities,
            description: pDescription,
          };
          // Update currently inspected project if it was edited
          if (selectedProjectForDetail.id === p.id) {
            setSelectedProjectForDetail(updatedItem);
          }
          return updatedItem;
        }
        return p;
      });
      saveProjects(updated);
      showToast('Project details updated successfully.');
    } else {
      const newProject: ProjectDevelopment = {
        id: `proj-${Date.now()}`,
        name: pName || 'New Sovereign Development',
        developer: pDeveloper || 'Prestige Group',
        status: pStatus,
        category: pCategory,
        location: pLocation || 'Bengaluru, Karnataka',
        neighborhood: pNeighborhood,
        priceStart: pPriceStart,
        priceStartNumeric: pPriceNumeric,
        configuration: pConfig,
        units: pUnits,
        possessionDate: pPossession,
        reraId: pRera,
        image: pImage,
        gallery: parsedGallery.length ? parsedGallery : [pImage],
        highlight: pHighlight,
        amenities: parsedAmenities,
        description: pDescription,
      };
      const updated = [newProject, ...projects];
      saveProjects(updated);
      setSelectedProjectForDetail(newProject);
      showToast('New landmark project created in portfolio.');
    }

    setIsProjectModalOpen(false);
  };

  // Quick Project Status Change
  const handleQuickProjectStatusChange = (id: string, newStatus: ProjectDevelopment['status']) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, status: newStatus } : p));
    saveProjects(updated);
    if (selectedProjectForDetail.id === id) {
      setSelectedProjectForDetail({ ...selectedProjectForDetail, status: newStatus });
    }
    showToast(`Project status updated to ${newStatus}`);
  };

  // Delete Project
  const confirmDeleteProject = () => {
    if (!projectToDelete) return;
    const updated = projects.filter((p) => p.id !== projectToDelete.id);
    saveProjects(updated);
    if (selectedProjectForDetail.id === projectToDelete.id) {
      setSelectedProjectForDetail(updated[0] || NEW_PROJECTS[0]);
    }
    setProjectToDelete(null);
    showToast('Landmark project deleted from catalog.');
  };

  // --------------------------------------------------------------------------
  // LEADS STATE (Initialized from localStorage)
  // --------------------------------------------------------------------------
  const [leads, setLeads] = useState<InquirySubmission[]>(() => {
    try {
      const stored = localStorage.getItem('aura_prime_inquiries');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn(e);
    }
    return [
      {
        id: 'ENQ-819204',
        propertyId: 'prop-1',
        propertyTitle: 'The Solarium Palatial Villa, Sadashivanagar',
        inquiryType: 'property_enquiry',
        fullName: 'Vikram Sethi',
        phone: '+91 76760 21032',
        email: 'vikram.sethi@cloudventure.in',
        address: 'Sadashivanagar, Bengaluru',
        message: 'Interested in private viewing this Saturday. Seeking immediate possession timeline and title deeds verification.',
        submittedAt: 'Today, 10:15 AM',
        status: 'new',
      },
      {
        id: 'ENQ-639102',
        propertyId: 'prop-2',
        propertyTitle: 'The Skyview Duplex Penthouse, Lavelle Road',
        inquiryType: 'property_enquiry',
        fullName: 'Dr. Ananya Rao',
        phone: '+91 76760 21032',
        email: 'ananya.rao@manipalmed.org',
        address: 'Lavelle Road, Bengaluru',
        message: 'Please share complete CAD architectural floorplans and BBMP A-Khata documentation.',
        submittedAt: 'Yesterday, 04:30 PM',
        status: 'contacted',
      },
      {
        id: 'ENQ-492817',
        propertyId: 'prop-4',
        propertyTitle: 'The Heritage Verandah Bungalow, Indiranagar',
        inquiryType: 'property_enquiry',
        fullName: 'Rohan & Priyam Murthy',
        phone: '+91 76760 21032',
        email: 'rohan@murthycapital.com',
        address: 'Defense Colony, Indiranagar, Bengaluru',
        message: 'Looking for verified heritage colonial bungalows with large private garden. Requesting physical walkthrough with Eleanor Vance.',
        submittedAt: 'Oct 29, 02:10 PM',
        status: 'visit_scheduled',
      },
      {
        id: 'ENQ-310948',
        propertyId: 'prop-3',
        propertyTitle: 'The Lakeside Zen Sanctuary, Whitefield',
        inquiryType: 'property_enquiry',
        fullName: 'Siddharth Nair',
        phone: '+91 76760 21032',
        email: 'siddharth@fintechhub.sg',
        address: 'Palm Meadows, Whitefield, Bengaluru',
        message: 'NRI capital transfer through Singapore NRE account. Need tax counsel on luxury residential capital gains.',
        submittedAt: 'Oct 28, 11:45 AM',
        status: 'negotiation',
      },
    ];
  });

  const saveLeadsToStorage = (updatedLeads: InquirySubmission[]) => {
    setLeads(updatedLeads);
    try {
      localStorage.setItem('aura_prime_inquiries', JSON.stringify(updatedLeads));
    } catch (e) {
      console.warn(e);
    }
  };

  // --------------------------------------------------------------------------
  // PROPERTY SEARCH & FILTERS
  // --------------------------------------------------------------------------
  const [propertySearch, setPropertySearch] = useState('');
  const [propertyStatusFilter, setPropertyStatusFilter] = useState<string>('all');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<string>('all');

  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');

  // Modals for Properties
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<InquirySubmission | null>(null);

  // Property Form State
  const [formTitle, setFormTitle] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formPriceCr, setFormPriceCr] = useState<number>(20);
  const [formAddress, setFormAddress] = useState('');
  const [formNeighborhood, setFormNeighborhood] = useState('Sadashivanagar');
  const [formType, setFormType] = useState<Property['type']>('Villa');
  const [formStatus, setFormStatus] = useState<Property['status']>('For Sale');
  const [formBedrooms, setFormBedrooms] = useState<number>(5);
  const [formBathrooms, setFormBathrooms] = useState<number>(6);
  const [formSqft, setFormSqft] = useState<number>(8500);
  const [formGarage, setFormGarage] = useState<number>(3);
  const [formYear, setFormYear] = useState<number>(2025);
  const [formImage, setFormImage] = useState('/images/hero_luxury_property_1793437949212.jpg');
  const [formDescription, setFormDescription] = useState('');
  const [formFeatures, setFormFeatures] = useState('');
  const [formFeatured, setFormFeatured] = useState(false);
  const [formAgentName, setFormAgentName] = useState('Eleanor Vance');
  const [formAgentPhone, setFormAgentPhone] = useState('+91 76760 21032');

  // New Walk-in Lead Form State
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadAddress, setNewLeadAddress] = useState('');
  const [newLeadPropertyId, setNewLeadPropertyId] = useState(properties[0]?.id || '');
  const [newLeadMessage, setNewLeadMessage] = useState('');
  const [newLeadStatus, setNewLeadStatus] = useState<InquirySubmission['status']>('new');

  // Compute Overall Portfolio Metrics
  const portfolioMetrics = useMemo(() => {
    const totalValue = properties.reduce((acc, curr) => acc + curr.price, 0);
    const totalSqft = properties.reduce((acc, curr) => acc + curr.sqft, 0);
    const avgPriceSqft = totalSqft > 0 ? Math.round(totalValue / totalSqft) : 0;
    const forSaleCount = properties.filter((p) => p.status === 'For Sale').length;
    const underOfferCount = properties.filter((p) => p.status === 'Under Offer').length;
    const newDevCount = properties.filter((p) => p.status === 'New Development').length;
    const featuredCount = properties.filter((p) => p.featured).length;

    const totalLeads = leads.length;
    const newLeads = leads.filter((l) => (l.status || 'new') === 'new').length;
    const contactedLeads = leads.filter((l) => l.status === 'contacted').length;
    const scheduledLeads = leads.filter((l) => l.status === 'visit_scheduled').length;
    const closedLeads = leads.filter((l) => l.status === 'closed').length;

    return {
      totalValueCr: (totalValue / 10000000).toFixed(2),
      totalProperties: properties.length,
      totalProjects: projects.length,
      avgPriceSqft,
      forSaleCount,
      underOfferCount,
      newDevCount,
      featuredCount,
      totalLeads,
      newLeads,
      contactedLeads,
      scheduledLeads,
      closedLeads,
    };
  }, [properties, leads, projects]);

  // Filtered Properties for Admin Table
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      if (propertySearch.trim()) {
        const q = propertySearch.toLowerCase();
        const match = 
          prop.title.toLowerCase().includes(q) ||
          prop.neighborhood.toLowerCase().includes(q) ||
          prop.address.toLowerCase().includes(q) ||
          prop.type.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (propertyStatusFilter !== 'all' && prop.status !== propertyStatusFilter) {
        return false;
      }
      if (propertyTypeFilter !== 'all' && prop.type !== propertyTypeFilter) {
        return false;
      }
      return true;
    });
  }, [properties, propertySearch, propertyStatusFilter, propertyTypeFilter]);

  // Filtered Leads for CRM
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (leadSearch.trim()) {
        const q = leadSearch.toLowerCase();
        const match = 
          lead.fullName.toLowerCase().includes(q) ||
          lead.email.toLowerCase().includes(q) ||
          lead.phone.toLowerCase().includes(q) ||
          (lead.address && lead.address.toLowerCase().includes(q)) ||
          (lead.propertyTitle && lead.propertyTitle.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (leadStatusFilter !== 'all' && (lead.status || 'new') !== leadStatusFilter) {
        return false;
      }
      return true;
    });
  }, [leads, leadSearch, leadStatusFilter]);

  // Open Property Modal for Create or Edit
  const handleOpenPropertyModal = (property?: Property) => {
    if (property) {
      setEditingProperty(property);
      setFormTitle(property.title);
      setFormTagline(property.tagline);
      setFormPriceCr(property.price / 10000000);
      setFormAddress(property.address);
      setFormNeighborhood(property.neighborhood);
      setFormType(property.type);
      setFormStatus(property.status);
      setFormBedrooms(property.bedrooms ?? 0);
      setFormBathrooms(property.bathrooms ?? 8);
      setFormSqft(property.sqft);
      setFormGarage(property.garageSpaces);
      setFormYear(property.yearBuilt);
      setFormImage(property.mainImage || '/images/hero_luxury_property_1793437949212.jpg');
      setFormDescription(property.description);
      setFormFeatures(property.features.join(', '));
      setFormFeatured(!!property.featured);
      setFormAgentName(property.agent?.name || 'Eleanor Vance');
      setFormAgentPhone(property.agent?.phone || '+91 76760 21032');
    } else {
      setEditingProperty(null);
      setFormTitle('');
      setFormTagline('');
      setFormPriceCr(22.5);
      setFormAddress('');
      setFormNeighborhood('Sadashivanagar');
      setFormType('Villa');
      setFormStatus('For Sale');
      setFormBedrooms(5);
      setFormBathrooms(6);
      setFormSqft(8200);
      setFormGarage(3);
      setFormYear(2025);
      setFormImage('/images/hero_luxury_property_1793437949212.jpg');
      setFormDescription('');
      setFormFeatures('Private Plunge Pool, Italian Marble, Gaggenau Suite, 100% Power Back-up, Staff Quarters');
      setFormFeatured(false);
      setFormAgentName('Eleanor Vance');
      setFormAgentPhone('+91 76760 21032');
    }
    setIsPropertyModalOpen(true);
  };

  // Save Property (Create or Update)
  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();

    const priceNumeric = Math.round(formPriceCr * 10000000);
    const priceDisplay = `₹${formPriceCr.toFixed(2)} Cr`;
    const pricePerSqft = formSqft > 0 ? Math.round(priceNumeric / formSqft) : 0;
    const parsedFeatures = formFeatures.split(',').map((f) => f.trim()).filter(Boolean);

    if (editingProperty) {
      const updatedList = properties.map((p) => {
        if (p.id === editingProperty.id) {
          return {
            ...p,
            title: formTitle,
            tagline: formTagline,
            price: priceNumeric,
            priceDisplay,
            address: formAddress,
            neighborhood: formNeighborhood,
            type: formType,
            status: formStatus,
            bedrooms: formBedrooms,
            bathrooms: formBathrooms,
            sqft: formSqft,
            garageSpaces: formGarage,
            yearBuilt: formYear,
            mainImage: formImage,
            galleryImages: p.galleryImages?.length ? [formImage, ...p.galleryImages.slice(1)] : [formImage],
            description: formDescription,
            features: parsedFeatures.length ? parsedFeatures : p.features,
            featured: formFeatured,
            pricePerSqft,
            agent: {
              name: formAgentName,
              role: p.agent?.role || 'Senior Managing Director',
              phone: formAgentPhone,
              email: p.agent?.email || 'private@auraprime.com',
              experience: p.agent?.experience || '18 Years Experience',
            },
          };
        }
        return p;
      });
      onUpdateProperties(updatedList);
      showToast('Property updated successfully.');
    } else {
      const newId = `prop-${Date.now()}`;
      const newProp: Property = {
        id: newId,
        title: formTitle || 'Palatial Architectural Residence',
        tagline: formTagline || 'Exclusive Trophy Estate in Prime Bengaluru',
        price: priceNumeric,
        priceDisplay,
        status: formStatus,
        type: formType,
        bedrooms: formBedrooms,
        bathrooms: formBathrooms,
        sqft: formSqft,
        yearBuilt: formYear,
        garageSpaces: formGarage,
        address: formAddress || 'Sadashivanagar Enclave, Bengaluru',
        city: 'Bengaluru, Karnataka',
        neighborhood: formNeighborhood,
        mapCoords: {
          lat: 12.98,
          lng: 77.59,
          svgX: 50,
          svgY: 50,
        },
        mainImage: formImage,
        galleryImages: [
          formImage,
          '/images/property_penthouse_1793437950337.jpg',
          '/images/property_coastal_villa_1793437950634.jpg',
        ],
        features: parsedFeatures.length
          ? parsedFeatures
          : ['Private Plunge Pool', 'Double Height Salon', 'Sub-Zero Kitchen', 'Biometric Access'],
        amenities: ['Pool', 'Security', 'Private Lift', 'Smart Home'],
        description: formDescription || 'An extraordinary Bengaluru residential achievement.',
        floorPlan: {
          levels: [
            {
              name: 'Level 1 - Grand Reception & Living',
              sqft: Math.round(formSqft * 0.55),
              rooms: ['Double-Height Living Salon', 'Formal Dining Room', 'Show & Wet Kitchens', 'Guest Suite', 'Staff Quarters'],
            },
            {
              name: 'Level 2 - Master Suites & Sky Lounge',
              sqft: Math.round(formSqft * 0.45),
              rooms: ['Primary Master Suite', 'VIP En-Suite Bedrooms', 'Family Lounge', 'Private Study'],
            },
          ],
        },
        agent: {
          name: formAgentName,
          role: 'Managing Director & Partner',
          phone: formAgentPhone,
          email: 'e.vance@auraprime.com',
          experience: '22 Years Prime Experience',
        },
        pricePerSqft,
        hoaFeeMonthly: 45000,
        annualTax: 180000,
        featured: formFeatured,
      };
      onUpdateProperties([newProp, ...properties]);
      showToast('New property created in portfolio.');
    }

    setIsPropertyModalOpen(false);
  };

  // Quick Status Toggle for Property
  const handleQuickStatusChange = (propertyId: string, newStatus: Property['status']) => {
    const updated = properties.map((p) => (p.id === propertyId ? { ...p, status: newStatus } : p));
    onUpdateProperties(updated);
    showToast(`Property status updated to ${newStatus}`);
  };

  // Quick Toggle Featured Property
  const handleToggleFeatured = (propertyId: string) => {
    const updated = properties.map((p) => (p.id === propertyId ? { ...p, featured: !p.featured } : p));
    onUpdateProperties(updated);
    showToast('Featured spotlight updated.');
  };

  // Delete Property
  const confirmDeleteProperty = () => {
    if (!propertyToDelete) return;
    const updated = properties.filter((p) => p.id !== propertyToDelete.id);
    onUpdateProperties(updated);
    setPropertyToDelete(null);
    showToast('Estate deleted from catalog.');
  };

  // Lead Status Change
  const handleLeadStatusChange = (leadId: string, newStatus: InquirySubmission['status']) => {
    const updated = leads.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l));
    saveLeadsToStorage(updated);
    showToast(`Lead status updated to ${newStatus}`);
  };

  // Delete Lead
  const confirmDeleteLead = () => {
    if (!leadToDelete) return;
    const updated = leads.filter((l) => l.id !== leadToDelete.id);
    saveLeadsToStorage(updated);
    setLeadToDelete(null);
    showToast('Lead entry removed.');
  };

  // Add Manual Walk-In Lead
  const handleSaveWalkInLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadPhone) return;

    const matchedProp = properties.find((p) => p.id === newLeadPropertyId);
    const newSubmission: InquirySubmission = {
      id: `ENQ-${Math.floor(100000 + Math.random() * 900000)}`,
      propertyId: newLeadPropertyId,
      propertyTitle: matchedProp?.title || 'General Consultation',
      inquiryType: 'property_enquiry',
      fullName: newLeadName,
      phone: newLeadPhone,
      email: newLeadEmail || 'client.private@aura.com',
      address: newLeadAddress || 'Bengaluru, Karnataka',
      message: newLeadMessage || 'Walk-in confidential inquiry registered at UB City bureau.',
      submittedAt: 'Just now',
      status: newLeadStatus || 'new',
    };

    saveLeadsToStorage([newSubmission, ...leads]);
    setIsAddLeadModalOpen(false);
    setNewLeadName('');
    setNewLeadPhone('');
    setNewLeadEmail('');
    setNewLeadAddress('');
    setNewLeadMessage('');
    showToast('Walk-in lead registered in CRM.');
  };

  // Export Leads to CSV
  const exportLeadsCSV = () => {
    const headers = ['Enquiry ID', 'Client Name', 'Phone', 'Email', 'Address', 'Property', 'Message', 'Date', 'Status'];
    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.fullName}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.address || ''}"`,
      `"${l.propertyTitle || ''}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${l.submittedAt}"`,
      `"${l.status || 'new'}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `jerin_realtors_bengaluru_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CRM leads exported to CSV.');
  };

  // Reset to default data
  const handleResetToDefault = () => {
    if (window.confirm('Reset all property inventory, projects, and leads back to default Bengaluru showroom state?')) {
      localStorage.removeItem('aura_prime_properties_v2');
      localStorage.removeItem('jerin_projects_v2');
      localStorage.removeItem('aura_prime_inquiries');
      window.location.reload();
    }
  };

  // Export Full JSON Backup
  const exportJSONBackup = () => {
    const data = {
      timestamp: new Date().toISOString(),
      properties,
      projects,
      leads,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jerin_realtors_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Database JSON backup downloaded.');
  };

  // --------------------------------------------------------------------------
  // PUBLIC IMAGES DIRECTORY ASSETS
  // --------------------------------------------------------------------------
  const PUBLIC_IMAGE_ASSETS = [
    {
      name: 'hero_luxury_property_1793437949212.jpg',
      path: '/images/hero_luxury_property_1793437949212.jpg',
      title: 'Sadashivanagar Palatial Villa Exterior',
      category: 'Estate Architecture',
      size: '824 KB',
      recommendedFor: 'Main Hero & Palatial Villa Catalog',
    },
    {
      name: 'property_penthouse_1793437950337.jpg',
      path: '/images/property_penthouse_1793437950337.jpg',
      title: 'Lavelle Road Sky Duplex Penthouse',
      category: 'CBD Penthouse',
      size: '808 KB',
      recommendedFor: 'Trophy Penthouses & Sky Mansions',
    },
    {
      name: 'property_coastal_villa_1793437950634.jpg',
      path: '/images/property_coastal_villa_1793437950634.jpg',
      title: 'Whitefield Lakefront Modernist Retreat',
      category: 'Waterfront Villa',
      size: '966 KB',
      recommendedFor: 'Waterfront Villas & Golf Estates',
    },
    {
      name: 'director_portrait_1793437949528.jpg',
      path: '/images/director_portrait_1793437949528.jpg',
      title: 'Eleanor Vance Executive Portrait',
      category: 'Leadership & Brokerage',
      size: '708 KB',
      recommendedFor: 'Director Profiles & Agent Mandates',
    },
    {
      name: 'image_ffc4da71.png',
      path: '/public/assets/aistudio/image_ffc4da71.png',
      title: 'Jerin Realtors Brand Crest & Emblem',
      category: 'Branding Asset',
      size: '142 KB',
      recommendedFor: 'Brand Crest & Watermarks',
    },
  ];

  const handleCopyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    showToast(`Copied public URL "${path}" to clipboard.`);
  };

  // --------------------------------------------------------------------------
  // CONDITIONAL RENDER: IF NOT AUTHENTICATED, SHOW PROPER LOGIN
  // --------------------------------------------------------------------------
  if (!currentUser) {
    return (
      <AdminLoginPage
        onLoginSuccess={handleLoginSuccess}
        onBackToSite={onBackToSite}
      />
    );
  }

  // --------------------------------------------------------------------------
  // AUTHENTICATED: RENDER SIDEBAR LAYOUT
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex font-sans selection:bg-[#6246EA] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E293B] text-white border border-slate-700 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Responsive Left Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
        onBackToSite={onBackToSite}
        onOpenNewPropertyModal={() => handleOpenPropertyModal()}
        propertyCount={properties.length}
        projectsCount={projects.length}
        newLeadsCount={portfolioMetrics.newLeads}
        featuredCount={portfolioMetrics.featuredCount}
        isOpenMobile={isSidebarMobileOpen}
        onCloseMobile={() => setIsSidebarMobileOpen(false)}
      />

      {/* Main Content Area (offset by sidebar width on desktop) */}
      <div className="flex-1 min-w-0 lg:pl-72 flex flex-col min-h-screen bg-[#0B0F19]">
        {/* Top Header Navigation Bar */}
        <header className="sticky top-0 z-30 h-16 bg-[#0F172A]/90 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsSidebarMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb / Title */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <span>Admin Suite</span>
                <span>/</span>
                <span className="text-[#6246EA] font-semibold uppercase tracking-wider">
                  {activeTab === 'overview' && 'Dashboard Overview'}
                  {activeTab === 'properties' && 'Property Portfolio'}
                  {activeTab === 'projects' && 'Landmark Projects Details'}
                  {activeTab === 'leads' && 'Leads CRM'}
                  {activeTab === 'hero' && 'Hero Spotlight'}
                  {activeTab === 'media' && 'Public Images & Media'}
                  {activeTab === 'settings' && 'System & Backups'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Header Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {activeTab === 'projects' ? (
              <button
                onClick={() => handleOpenProjectModal()}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#6246EA] via-[#2878FF] to-[#FF7043] text-white text-xs font-bold shadow-md shadow-[#6246EA]/20 hover:opacity-95 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Project</span>
              </button>
            ) : (
              <>
                <button
                  onClick={exportLeadsCSV}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-xs font-semibold text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  title="Download Leads CSV"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={() => setIsAddLeadModalOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-xs font-semibold text-slate-300 hover:text-white border border-slate-700 transition-colors"
                >
                  <Users className="w-3.5 h-3.5 text-blue-400" />
                  <span>+ Walk-In</span>
                </button>

                <button
                  onClick={() => handleOpenPropertyModal()}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#6246EA] via-[#2878FF] to-[#FF7043] text-white text-xs font-bold shadow-md shadow-[#6246EA]/20 hover:opacity-95 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Estate</span>
                </button>
              </>
            )}

            {/* User Avatar & Logout */}
            <div className="pl-2 border-l border-slate-800 flex items-center gap-2">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-lg object-cover border border-slate-700"
                title={`${currentUser.name} (${currentUser.role})`}
              />
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                title="Sign out of admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* ========================================================================= */}
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {/* ========================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Executive Welcome Bar */}
              <div className="bg-gradient-to-r from-slate-900 via-[#131127] to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#6246EA]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-[#6246EA]/20 text-[#A594FD] border border-[#6246EA]/30 font-bold uppercase">
                        Enterprise Session
                      </span>
                      <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Live Bengaluru Inventory
                      </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-editorial text-white tracking-tight">
                      Good day, {currentUser.name}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                      Welcome to the Jerin Realtors command desk. Monitoring ₹{portfolioMetrics.totalValueCr} Cr in verified trophy assets and active private concierge mandates.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setActiveTab('properties')}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-all border border-slate-700 cursor-pointer"
                    >
                      Properties ({portfolioMetrics.totalProperties})
                    </button>
                    <button
                      onClick={() => setActiveTab('projects')}
                      className="px-4 py-2 bg-gradient-to-r from-[#6246EA] to-[#2878FF] text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-[#6246EA]/20 cursor-pointer"
                    >
                      Projects ({projects.length})
                    </button>
                  </div>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* KPI 1 */}
                <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Portfolio Value</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30">
                      Active
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                    ₹{portfolioMetrics.totalValueCr} <span className="text-xs font-sans text-slate-400">Cr</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Across {portfolioMetrics.totalProperties} prime estates
                  </p>
                </div>

                {/* KPI 2 */}
                <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Landmark Projects</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-400 font-semibold border border-indigo-500/30">
                      Tier-1 Masterplans
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                    {projects.length} <span className="text-xs font-sans text-slate-400">Townships</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Sobha, Prestige, Total Env, Godrej
                  </p>
                </div>

                {/* KPI 3 */}
                <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Client Enquiries</span>
                    {portfolioMetrics.newLeads > 0 ? (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40 animate-pulse">
                        {portfolioMetrics.newLeads} Action Required
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                    {portfolioMetrics.totalLeads} <span className="text-xs font-sans text-slate-400">Mandates</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {portfolioMetrics.scheduledLeads} site visits scheduled
                  </p>
                </div>

                {/* KPI 4 */}
                <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Available Inventory</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 font-semibold border border-amber-500/30">
                      Showcase
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                    {portfolioMetrics.forSaleCount} <span className="text-xs font-sans text-slate-400">For Sale</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {portfolioMetrics.underOfferCount} under exclusive LOI
                  </p>
                </div>
              </div>

              {/* Grid: Recent Leads & Top Properties */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Recent Leads Feed */}
                <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="font-bold text-white font-editorial text-lg">
                        Recent Enquiries & Mandates
                      </h3>
                      <p className="text-xs text-slate-400">
                        Incoming client inquiries from concierge popup and website
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('leads')}
                      className="text-xs font-semibold text-[#A594FD] hover:text-white flex items-center gap-1"
                    >
                      <span>View All Leads</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="divide-y divide-slate-800">
                    {leads.slice(0, 4).map((lead) => (
                      <div key={lead.id} className="py-3 flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white text-xs sm:text-sm">
                              {lead.fullName}
                            </span>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                              lead.status === 'new' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                              lead.status === 'contacted' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                              lead.status === 'visit_scheduled' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                              lead.status === 'negotiation' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                              'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}>
                              {(lead.status || 'new').replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 font-medium">
                            {lead.propertyTitle}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 font-mono">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-slate-500" />
                              {lead.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-500" />
                              {lead.submittedAt}
                            </span>
                          </div>
                        </div>

                        <select
                          value={lead.status || 'new'}
                          onChange={(e) => handleLeadStatusChange(lead.id, e.target.value as any)}
                          className="text-[11px] font-mono bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-slate-200 focus:outline-none focus:border-[#6246EA]"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="visit_scheduled">Visit</option>
                          <option value="negotiation">Offer</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Neighborhood & Portfolio Distribution */}
                <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-white font-editorial text-lg">
                      Bengaluru Enclave Allocation
                    </h3>
                    <p className="text-xs text-slate-400">
                      Estate concentration across Bengaluru luxury micro-markets
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: 'Sadashivanagar', count: properties.filter(p => p.neighborhood.includes('Sadashivanagar')).length, percent: '35%' },
                      { name: 'Lavelle Road & UB City', count: properties.filter(p => p.neighborhood.includes('Lavelle')).length, percent: '25%' },
                      { name: 'Whitefield & Palm Meadows', count: properties.filter(p => p.neighborhood.includes('Whitefield')).length, percent: '20%' },
                      { name: 'Indiranagar & Defence Colony', count: properties.filter(p => p.neighborhood.includes('Indiranagar')).length, percent: '20%' },
                    ].map((item) => (
                      <div key={item.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-200">{item.name}</span>
                          <span className="font-mono text-slate-400">{item.count} Estates ({item.percent})</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-[#6246EA] to-[#2878FF] h-full rounded-full"
                            style={{ width: item.percent }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>Public Image Cache</span>
                    <span className="text-emerald-400 font-mono">100% Synced in /public/images/</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB: LANDMARK PROJECTS (DETAILS VIEW & INSPECTOR) */}
          {/* ========================================================================= */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Projects Toolbar */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search projects, builders, RERA ID..."
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-[#6246EA]"
                  />
                  {projectSearch && (
                    <button
                      onClick={() => setProjectSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filters & View Switcher */}
                <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                  <select
                    value={projectStatusFilter}
                    onChange={(e) => setProjectStatusFilter(e.target.value)}
                    className="text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-[#6246EA]"
                  >
                    <option value="all">All Stages</option>
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="New Launch">New Launch</option>
                  </select>

                  <select
                    value={projectCategoryFilter}
                    onChange={(e) => setProjectCategoryFilter(e.target.value)}
                    className="text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-[#6246EA]"
                  >
                    <option value="all">All Categories</option>
                    <option value="Ultra Luxury">Ultra Luxury</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>

                  {/* View Mode Toggle: Details View vs Table View */}
                  <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
                    <button
                      onClick={() => setProjectDetailsViewMode('details')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        projectDetailsViewMode === 'details'
                          ? 'bg-[#6246EA] text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="Split Master-Details View"
                    >
                      <LayoutList className="w-3.5 h-3.5" />
                      <span>Details View</span>
                    </button>
                    <button
                      onClick={() => setProjectDetailsViewMode('table')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        projectDetailsViewMode === 'table'
                          ? 'bg-[#6246EA] text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="Table Grid View"
                    >
                      <TableIcon className="w-3.5 h-3.5" />
                      <span>Table View</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleOpenProjectModal()}
                    className="px-4 py-2 bg-gradient-to-r from-[#6246EA] via-[#2878FF] to-[#FF7043] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-[#6246EA]/20 hover:opacity-95 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Project</span>
                  </button>
                </div>
              </div>

              {/* =================================================================== */}
              {/* DETAILS VIEW MODE: Split Screen Master-Detail Inspector */}
              {/* =================================================================== */}
              {projectDetailsViewMode === 'details' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Projects Master List */}
                  <div className="lg:col-span-5 space-y-3 max-h-[820px] overflow-y-auto pr-1">
                    <div className="flex items-center justify-between text-xs text-slate-400 px-1 pb-1">
                      <span className="font-mono font-bold uppercase tracking-wider text-[11px]">
                        Projects Master List ({filteredProjects.length})
                      </span>
                      <span>Select to Inspect</span>
                    </div>

                    {filteredProjects.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 bg-slate-900/60 rounded-2xl border border-slate-800 text-xs">
                        No projects match your filter.
                      </div>
                    ) : (
                      filteredProjects.map((proj) => {
                        const isSelected = selectedProjectForDetail.id === proj.id;
                        return (
                          <div
                            key={proj.id}
                            onClick={() => setSelectedProjectForDetail(proj)}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 group ${
                              isSelected
                                ? 'bg-[#181C2E] border-[#6246EA] shadow-lg shadow-[#6246EA]/15 ring-1 ring-[#6246EA]'
                                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                            }`}
                          >
                            <img
                              src={proj.image}
                              alt={proj.name}
                              className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] font-mono uppercase text-[#A594FD] font-bold truncate">
                                  {proj.developer}
                                </span>
                                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase shrink-0 ${
                                  proj.status === 'Ready to Move' ? 'bg-emerald-500/15 text-emerald-400' :
                                  proj.status === 'New Launch' ? 'bg-amber-500/15 text-amber-400' :
                                  'bg-blue-500/15 text-blue-400'
                                }`}>
                                  {proj.status}
                                </span>
                              </div>
                              <h4 className="font-bold text-white text-xs sm:text-sm truncate mt-0.5 group-hover:text-[#6246EA] transition-colors font-editorial">
                                {proj.name}
                              </h4>
                              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                                <span className="font-mono font-bold text-white">{proj.priceStart}</span>
                                <span className="truncate max-w-[120px]">{proj.neighborhood}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Right Column: Full Details Inspector Panel */}
                  <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
                    {selectedProjectForDetail ? (
                      <>
                        {/* Header & Primary Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-5">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono uppercase text-[#A594FD] font-bold">
                                {selectedProjectForDetail.developer}
                              </span>
                              <span className="text-slate-600">•</span>
                              <span className="text-[11px] font-mono text-slate-400">
                                ID: {selectedProjectForDetail.id}
                              </span>
                            </div>
                            <h2 className="text-2xl font-bold font-editorial text-white tracking-tight">
                              {selectedProjectForDetail.name}
                            </h2>
                            <p className="text-xs text-slate-400 flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-[#FF7043]" />
                              <span>{selectedProjectForDetail.location}</span>
                            </p>
                          </div>

                          {/* Quick Action Buttons */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => navigate(`/project/${selectedProjectForDetail.id}`)}
                              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-colors"
                              title="Open Public Showcase Page"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                              <span>View Public Page</span>
                            </button>

                            <button
                              onClick={() => handleOpenProjectModal(selectedProjectForDetail)}
                              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 hover:text-blue-100 border border-slate-700 transition-colors"
                              title="Edit Project"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => setProjectToDelete(selectedProjectForDetail)}
                              className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-rose-400 hover:text-rose-200 border border-slate-700 transition-colors"
                              title="Delete Project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Visual Presentation Area */}
                        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                          <img
                            src={modalActiveImage || selectedProjectForDetail.image}
                            alt={selectedProjectForDetail.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3 flex items-center gap-2">
                            <select
                              value={selectedProjectForDetail.status}
                              onChange={(e) => handleQuickProjectStatusChange(selectedProjectForDetail.id, e.target.value as any)}
                              className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border shadow-md focus:outline-none cursor-pointer ${
                                selectedProjectForDetail.status === 'Ready to Move' ? 'bg-emerald-600 text-white border-emerald-500' :
                                selectedProjectForDetail.status === 'New Launch' ? 'bg-[#FF7043] text-white border-orange-500' :
                                'bg-[#2878FF] text-white border-blue-500'
                              }`}
                            >
                              <option value="Ready to Move">Ready to Move</option>
                              <option value="Under Construction">Under Construction</option>
                              <option value="New Launch">New Launch</option>
                            </select>
                            <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-mono text-white border border-white/20 font-bold">
                              {selectedProjectForDetail.category}
                            </span>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                            <div>
                              <span className="text-[10px] font-mono text-purple-200 block">Starting Price</span>
                              <span className="text-xl font-bold font-mono text-[#FFC857]">
                                {selectedProjectForDetail.priceStart}
                              </span>
                            </div>
                            <span className="text-[11px] font-mono bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
                              Handover: {selectedProjectForDetail.possessionDate}
                            </span>
                          </div>
                        </div>

                        {/* Thumbnail Strip (if gallery exists) */}
                        {selectedProjectForDetail.gallery && selectedProjectForDetail.gallery.length > 1 && (
                          <div className="flex items-center gap-2 overflow-x-auto pb-1">
                            {selectedProjectForDetail.gallery.map((img, idx) => (
                              <button
                                key={idx}
                                onClick={() => setModalActiveImage(img)}
                                className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                                  (modalActiveImage || selectedProjectForDetail.image) === img 
                                    ? 'border-[#6246EA] scale-105' 
                                    : 'border-transparent opacity-60 hover:opacity-100'
                                }`}
                              >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Specifications Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-800">
                            <span className="text-[10px] font-mono text-slate-400 uppercase block">Layouts</span>
                            <span className="text-xs font-bold text-white mt-0.5 block truncate" title={selectedProjectForDetail.configuration}>
                              {selectedProjectForDetail.configuration}
                            </span>
                          </div>
                          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-800">
                            <span className="text-[10px] font-mono text-slate-400 uppercase block">Units & Acreage</span>
                            <span className="text-xs font-bold text-white mt-0.5 block truncate" title={selectedProjectForDetail.units}>
                              {selectedProjectForDetail.units}
                            </span>
                          </div>
                          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-800">
                            <span className="text-[10px] font-mono text-slate-400 uppercase block">Possession</span>
                            <span className="text-xs font-bold text-white mt-0.5 block">
                              {selectedProjectForDetail.possessionDate}
                            </span>
                          </div>
                          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-800">
                            <span className="text-[10px] font-mono text-slate-400 uppercase block">Starting Base</span>
                            <span className="text-xs font-bold font-mono text-emerald-400 mt-0.5 block">
                              ₹{(selectedProjectForDetail.priceStartNumeric / 10000000).toFixed(2)} Cr
                            </span>
                          </div>
                        </div>

                        {/* RERA Legal Verification Box */}
                        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                            <div>
                              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
                                Karnataka RERA Sanction Verified
                              </span>
                              <span className="font-mono text-slate-200">
                                {selectedProjectForDetail.reraId}
                              </span>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                            Sanctioned
                          </span>
                        </div>

                        {/* Signature Highlight */}
                        <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs space-y-1">
                          <span className="text-[10px] font-mono uppercase text-amber-300 font-bold block flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            Development Signature Highlight
                          </span>
                          <p className="text-slate-300 leading-relaxed">
                            {selectedProjectForDetail.highlight}
                          </p>
                        </div>

                        {/* Architectural Description */}
                        <div className="space-y-1.5 text-xs">
                          <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-bold">
                            Architectural Vision & Positioning
                          </span>
                          <p className="text-slate-300 leading-relaxed bg-slate-800/30 p-3 rounded-xl border border-slate-800">
                            {selectedProjectForDetail.description}
                          </p>
                        </div>

                        {/* Amenities Grid */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-bold">
                            Master Lifestyle Amenities
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedProjectForDetail.amenities.map((a, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[11px] font-medium text-slate-200 flex items-center gap-1"
                              >
                                <Check className="w-3 h-3 text-[#6246EA]" />
                                <span>{a}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="p-12 text-center text-slate-500">
                        Select a project from the left to inspect its complete specifications.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* =================================================================== */}
              {/* TABLE VIEW MODE: Tabular Overview for Bulk Operations */}
              {/* =================================================================== */}
              {projectDetailsViewMode === 'table' && (
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-800/80 text-[11px] font-mono uppercase text-slate-400 border-b border-slate-800">
                        <tr>
                          <th className="py-3.5 px-4">Development & Builder</th>
                          <th className="py-3.5 px-4">Location</th>
                          <th className="py-3.5 px-4">Stage</th>
                          <th className="py-3.5 px-4">Starting Price</th>
                          <th className="py-3.5 px-4">Configurations</th>
                          <th className="py-3.5 px-4">RERA ID</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {filteredProjects.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-12 text-center text-slate-500">
                              No projects match your filter criteria.
                            </td>
                          </tr>
                        ) : (
                          filteredProjects.map((p) => (
                            <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                                  />
                                  <div>
                                    <div className="font-bold text-white text-xs sm:text-sm">
                                      {p.name}
                                    </div>
                                    <div className="text-[10px] text-[#A594FD] font-mono uppercase">
                                      {p.developer}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="py-4 px-4">
                                <div className="text-slate-200">{p.location}</div>
                                <div className="text-[10px] text-slate-500">{p.neighborhood}</div>
                              </td>

                              <td className="py-4 px-4">
                                <select
                                  value={p.status}
                                  onChange={(e) => handleQuickProjectStatusChange(p.id, e.target.value as any)}
                                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-lg border focus:outline-none cursor-pointer ${
                                    p.status === 'Ready to Move' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' :
                                    p.status === 'New Launch' ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' :
                                    'bg-blue-500/15 text-blue-300 border-blue-500/30'
                                  }`}
                                >
                                  <option value="Ready to Move">Ready to Move</option>
                                  <option value="Under Construction">Under Construction</option>
                                  <option value="New Launch">New Launch</option>
                                </select>
                              </td>

                              <td className="py-4 px-4 font-mono font-bold text-white">
                                {p.priceStart}
                              </td>

                              <td className="py-4 px-4 font-mono text-[11px] text-slate-300">
                                <div>{p.configuration}</div>
                                <div className="text-slate-500 text-[10px]">{p.units}</div>
                              </td>

                              <td className="py-4 px-4 font-mono text-[11px] text-emerald-400">
                                {p.reraId.split('/')[4] ? `RERA: ...${p.reraId.slice(-6)}` : p.reraId}
                              </td>

                              <td className="py-4 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => {
                                      setSelectedProjectForDetail(p);
                                      setProjectDetailsViewMode('details');
                                    }}
                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                                    title="View Details in Inspector"
                                  >
                                    <LayoutList className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => navigate(`/project/${p.id}`)}
                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                                    title="Open Public Page"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleOpenProjectModal(p)}
                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-300 hover:text-blue-100"
                                    title="Edit Project"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => setProjectToDelete(p)}
                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-rose-400 hover:text-rose-200"
                                    title="Delete Project"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: PROPERTY INVENTORY */}
          {/* ========================================================================= */}
          {activeTab === 'properties' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Filter Toolbar */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by title, address, or neighborhood..."
                    value={propertySearch}
                    onChange={(e) => setPropertySearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-[#6246EA]"
                  />
                  {propertySearch && (
                    <button
                      onClick={() => setPropertySearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter Dropdowns */}
                <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                  <select
                    value={propertyStatusFilter}
                    onChange={(e) => setPropertyStatusFilter(e.target.value)}
                    className="text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-[#6246EA]"
                  >
                    <option value="all">All Statuses</option>
                    <option value="For Sale">For Sale</option>
                    <option value="Under Offer">Under Offer</option>
                    <option value="Sold">Sold</option>
                    <option value="New Development">New Development</option>
                  </select>

                  <select
                    value={propertyTypeFilter}
                    onChange={(e) => setPropertyTypeFilter(e.target.value)}
                    className="text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-[#6246EA]"
                  >
                    <option value="all">All Types</option>
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Modern Estate">Modern Estate</option>
                    <option value="Waterfront">Waterfront</option>
                  </select>

                  <button
                    onClick={() => handleOpenPropertyModal()}
                    className="px-4 py-2 bg-gradient-to-r from-[#6246EA] via-[#2878FF] to-[#FF7043] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-[#6246EA]/20 hover:opacity-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Estate</span>
                  </button>
                </div>
              </div>

              {/* Properties Table */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-800/80 text-[11px] font-mono uppercase text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="py-3.5 px-4">Estate & Location</th>
                        <th className="py-3.5 px-4">Type</th>
                        <th className="py-3.5 px-4">Valuation</th>
                        <th className="py-3.5 px-4">Specifications</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-center">Hero Pin</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredProperties.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-slate-500 text-sm">
                            No properties match your filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredProperties.map((prop) => (
                          <tr key={prop.id} className="hover:bg-slate-800/40 transition-colors">
                            {/* Property Main Info */}
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={prop.mainImage}
                                  alt={prop.title}
                                  className="w-14 h-14 rounded-xl object-cover border border-slate-700 shrink-0"
                                />
                                <div>
                                  <div className="font-bold text-white text-xs sm:text-sm line-clamp-1">
                                    {prop.title}
                                  </div>
                                  <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                                    <MapPin className="w-3 h-3 text-[#6246EA]" />
                                    <span>{prop.neighborhood}</span>
                                  </div>
                                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                                    ID: {prop.id}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Type */}
                            <td className="py-4 px-4 font-semibold text-slate-200">
                              <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[11px]">
                                {prop.type}
                              </span>
                            </td>

                            {/* Price */}
                            <td className="py-4 px-4">
                              <div className="font-mono font-bold text-white text-sm">
                                {prop.priceDisplay}
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono">
                                ₹{prop.pricePerSqft?.toLocaleString('en-IN')}/sqft
                              </div>
                            </td>

                            {/* Specs */}
                            <td className="py-4 px-4 font-mono text-[11px] text-slate-300">
                              <div>{prop.bedrooms} Bed · {prop.bathrooms} Bath</div>
                              <div className="text-slate-400">{prop.sqft.toLocaleString('en-IN')} sq.ft</div>
                            </td>

                            {/* Status Selector */}
                            <td className="py-4 px-4">
                              <select
                                value={prop.status}
                                onChange={(e) => handleQuickStatusChange(prop.id, e.target.value as any)}
                                className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                                  prop.status === 'For Sale' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' :
                                  prop.status === 'Under Offer' ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' :
                                  prop.status === 'New Development' ? 'bg-blue-500/15 text-blue-300 border-blue-500/30' :
                                  'bg-slate-800 text-slate-400 border-slate-700'
                                }`}
                              >
                                <option value="For Sale">For Sale</option>
                                <option value="Under Offer">Under Offer</option>
                                <option value="New Development">New Development</option>
                                <option value="Sold">Sold</option>
                              </select>
                            </td>

                            {/* Hero Pin / Featured */}
                            <td className="py-4 px-4 text-center">
                              <button
                                onClick={() => handleToggleFeatured(prop.id)}
                                className={`p-1.5 rounded-lg transition-colors ${
                                  prop.featured 
                                    ? 'text-amber-400 bg-amber-500/15 border border-amber-500/30' 
                                    : 'text-slate-600 hover:text-slate-300 bg-slate-800'
                                }`}
                                title={prop.featured ? 'Pinned to Hero Banner' : 'Pin to Hero Slider'}
                              >
                                <Star className={`w-4 h-4 ${prop.featured ? 'fill-amber-400' : ''}`} />
                              </button>
                            </td>

                            {/* Action Buttons */}
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => onSelectPropertyToView(prop)}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                                  title="View Public Presentation"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleOpenPropertyModal(prop)}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-300 hover:text-blue-100"
                                  title="Edit Property"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setPropertyToDelete(prop)}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-rose-400 hover:text-rose-200"
                                  title="Delete Property"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: LEADS & ENQUIRIES CRM */}
          {/* ========================================================================= */}
          {activeTab === 'leads' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* CRM Toolbar */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by client name, email, phone..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-[#6246EA]"
                  />
                  {leadSearch && (
                    <button
                      onClick={() => setLeadSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                  <select
                    value={leadStatusFilter}
                    onChange={(e) => setLeadStatusFilter(e.target.value)}
                    className="text-xs bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-[#6246EA]"
                  >
                    <option value="all">All Lead Statuses</option>
                    <option value="new">New ({leads.filter(l => (l.status || 'new') === 'new').length})</option>
                    <option value="contacted">Contacted</option>
                    <option value="visit_scheduled">Visit Scheduled</option>
                    <option value="negotiation">Offer / Negotiation</option>
                    <option value="closed">Closed / Acquired</option>
                  </select>

                  <button
                    onClick={exportLeadsCSV}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 border border-slate-700"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={() => setIsAddLeadModalOpen(true)}
                    className="px-4 py-2 bg-gradient-to-r from-[#6246EA] via-[#2878FF] to-[#FF7043] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-[#6246EA]/20 hover:opacity-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Walk-In Lead</span>
                  </button>
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-800/80 text-[11px] font-mono uppercase text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="py-3.5 px-4">Client Identity</th>
                        <th className="py-3.5 px-4">Target Estate</th>
                        <th className="py-3.5 px-4">Contact Details</th>
                        <th className="py-3.5 px-4">Client Request / Notes</th>
                        <th className="py-3.5 px-4">Date</th>
                        <th className="py-3.5 px-4">Pipeline Status</th>
                        <th className="py-3.5 px-4 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-slate-500 text-sm">
                            No inquiries match your current search criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                            {/* Client Name & ID */}
                            <td className="py-4 px-4">
                              <div className="font-bold text-white text-xs sm:text-sm">
                                {lead.fullName}
                              </div>
                              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                                {lead.id}
                              </div>
                            </td>

                            {/* Property */}
                            <td className="py-4 px-4">
                              <div className="font-semibold text-slate-200 line-clamp-1 max-w-xs">
                                {lead.propertyTitle || 'General Advisory Request'}
                              </div>
                              {lead.address && (
                                <div className="text-[10px] text-slate-400 truncate max-w-xs">
                                  {lead.address}
                                </div>
                              )}
                            </td>

                            {/* Contacts */}
                            <td className="py-4 px-4 font-mono text-[11px] space-y-0.5">
                              <div className="text-white flex items-center gap-1.5">
                                <Phone className="w-3 h-3 text-slate-500" />
                                {lead.phone}
                              </div>
                              <div className="text-slate-400 flex items-center gap-1.5">
                                <Mail className="w-3 h-3 text-slate-500" />
                                {lead.email}
                              </div>
                            </td>

                            {/* Message / Requirement */}
                            <td className="py-4 px-4 max-w-xs">
                              <p className="text-slate-300 text-xs line-clamp-2 italic">
                                "{lead.message || 'Private viewing request'}"
                              </p>
                            </td>

                            {/* Timestamp */}
                            <td className="py-4 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                              {lead.submittedAt}
                            </td>

                            {/* Status Dropdown */}
                            <td className="py-4 px-4">
                              <select
                                value={lead.status || 'new'}
                                onChange={(e) => handleLeadStatusChange(lead.id, e.target.value as any)}
                                className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                                  lead.status === 'new' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                                  lead.status === 'contacted' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' :
                                  lead.status === 'visit_scheduled' ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' :
                                  lead.status === 'negotiation' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                                  'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                }`}
                              >
                                <option value="new">🔴 New Mandate</option>
                                <option value="contacted">🔵 Contacted</option>
                                <option value="visit_scheduled">🟣 Site Walkthrough</option>
                                <option value="negotiation">🟠 Offer Underway</option>
                                <option value="closed">🟢 Closed / Acquired</option>
                              </select>
                            </td>

                            {/* Delete Action */}
                            <td className="py-4 px-4 text-right">
                              <button
                                onClick={() => setLeadToDelete(lead)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-rose-400 hover:text-rose-200"
                                title="Remove Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: HERO & SPOTLIGHT SLIDER */}
          {/* ========================================================================= */}
          {activeTab === 'hero' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  <span>Showcase Curation Engine</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-editorial text-white">
                  Hero Banner Spotlight Properties
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
                  Properties flagged as "Featured" are given prime rotation on the top hero slider and homepage showroom. Select or toggle estates below to update your spotlight showcase in real-time.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((prop) => (
                  <div
                    key={prop.id}
                    className={`bg-slate-900/90 rounded-2xl border overflow-hidden transition-all duration-300 ${
                      prop.featured
                        ? 'border-amber-500/50 shadow-lg shadow-amber-500/10'
                        : 'border-slate-800 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="relative aspect-[16/10]">
                      <img
                        src={prop.mainImage}
                        alt={prop.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white font-mono text-[10px] font-bold">
                          {prop.neighborhood}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <button
                          onClick={() => handleToggleFeatured(prop.id)}
                          className={`p-2 rounded-xl transition-all shadow-md ${
                            prop.featured
                              ? 'bg-amber-500 text-slate-950 font-bold'
                              : 'bg-black/60 text-white hover:bg-black/80'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${prop.featured ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white font-mono">{prop.priceDisplay}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                          prop.featured ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {prop.featured ? '★ In Hero Rotation' : 'Standard Catalog'}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-xs sm:text-sm line-clamp-1 font-editorial">
                        {prop.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2">
                        {prop.tagline}
                      </p>
                      <button
                        onClick={() => handleToggleFeatured(prop.id)}
                        className={`w-full mt-2 py-2 rounded-xl text-xs font-semibold transition-all ${
                          prop.featured
                            ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        {prop.featured ? 'Remove from Hero Slider' : 'Pin to Hero Slider'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: PUBLIC IMAGES & MEDIA */}
          {/* ========================================================================= */}
          {activeTab === 'media' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold">
                  <FolderOpen className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Production Build Image Assets (/public/images/)</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-editorial text-white">
                  Public Assets & Media Directory
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
                  All images are imported into the <code>/public/images/</code> folder. During <code>npm run build</code>, Vite bundles everything in <code>/public/</code> directly into the output <code>dist/</code> root, ensuring all images load with 100% reliability in production without broken bundler paths.
                </p>
              </div>

              {/* Media Asset Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PUBLIC_IMAGE_ASSETS.map((asset) => (
                  <div
                    key={asset.name}
                    className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[16/10] bg-slate-950">
                        <img
                          src={asset.path}
                          alt={asset.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-emerald-500/30 font-bold">
                            Production Ready
                          </span>
                        </div>
                        <div className="absolute bottom-2.5 right-2.5">
                          <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-slate-300">
                            {asset.size}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <div className="text-[10px] font-mono text-[#6246EA] uppercase font-bold">
                          {asset.category}
                        </div>
                        <h4 className="font-bold text-white text-xs sm:text-sm">
                          {asset.title}
                        </h4>
                        <div className="p-2 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 break-all select-all flex items-center justify-between gap-2">
                          <span className="truncate">{asset.path}</span>
                          <button
                            onClick={() => handleCopyPath(asset.path)}
                            className="p-1 hover:text-white text-slate-400 hover:bg-slate-800 rounded transition-colors shrink-0"
                            title="Copy Public URL"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {asset.recommendedFor}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <button
                        onClick={() => handleCopyPath(asset.path)}
                        className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5 text-blue-400" />
                        <span>Copy Public Image URL</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: SYSTEM SETTINGS & BACKUPS */}
          {/* ========================================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Backup & Persistence */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center gap-2.5 text-white">
                    <Download className="w-5 h-5 text-[#6246EA]" />
                    <h3 className="font-bold text-base font-editorial">
                      Database Backup & Archival
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Download a full JSON snapshot of all active property catalog records, landmark projects, and client inquiries. Can be imported or archived for regulatory compliance.
                  </p>
                  <button
                    onClick={exportJSONBackup}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-slate-700"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-400" />
                    <span>Download Full JSON Backup</span>
                  </button>
                </div>

                {/* Reset to Showroom Defaults */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center gap-2.5 text-rose-300">
                    <RefreshCw className="w-5 h-5 text-rose-400" />
                    <h3 className="font-bold text-base font-editorial">
                      Restore Default Showroom Catalog
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Clears client-side modifications and restores all benchmark Sadashivanagar villas, projects, and inquiry seed data.
                  </p>
                  <button
                    onClick={handleResetToDefault}
                    className="w-full py-2.5 px-4 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-200 text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-rose-500/30"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Database to Factory Defaults</span>
                  </button>
                </div>
              </div>

              {/* System Audit Information */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-3">
                <h4 className="text-sm font-bold text-white font-editorial">
                  Environment & Security Compliance
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-800">
                    <div className="text-slate-500 font-mono text-[10px] uppercase">Storage Mode</div>
                    <div className="font-bold text-slate-200 mt-1">Local Browser Persistence v2</div>
                  </div>
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-800">
                    <div className="text-slate-500 font-mono text-[10px] uppercase">Image Bundle Root</div>
                    <div className="font-bold text-emerald-400 mt-1">/public/images/ (Vite Build Verified)</div>
                  </div>
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-800">
                    <div className="text-slate-500 font-mono text-[10px] uppercase">Admin Operator</div>
                    <div className="font-bold text-slate-200 mt-1">{currentUser.name} ({currentUser.role})</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT PROJECT (LANDMARK DEVELOPMENT) */}
      {/* ========================================================================= */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#111827] border border-slate-800 text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 my-8 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-editorial text-white">
                  {editingProject ? 'Edit Landmark Project' : 'Add New Landmark Development'}
                </h3>
                <p className="text-xs text-slate-400">
                  Configure township attributes, developer credentials, and RERA sanction number.
                </p>
              </div>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Project Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    required
                    value={pName}
                    onChange={(e) => setPName(e.target.value)}
                    placeholder="e.g. Sobha Neopolis"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA]"
                  />
                </div>

                {/* Developer */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Master Developer Brand
                  </label>
                  <input
                    type="text"
                    required
                    value={pDeveloper}
                    onChange={(e) => setPDeveloper(e.target.value)}
                    placeholder="e.g. Sobha Limited, Prestige Group"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA]"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Construction Stage
                  </label>
                  <select
                    value={pStatus}
                    onChange={(e) => setPStatus(e.target.value as any)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA]"
                  >
                    <option value="Under Construction">Under Construction</option>
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="New Launch">New Launch</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category Tier
                  </label>
                  <select
                    value={pCategory}
                    onChange={(e) => setPCategory(e.target.value as any)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA]"
                  >
                    <option value="Ultra Luxury">Ultra Luxury</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                {/* Price Display */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Starting Price Label
                  </label>
                  <input
                    type="text"
                    required
                    value={pPriceStart}
                    onChange={(e) => setPPriceStart(e.target.value)}
                    placeholder="e.g. ₹2.45 Cr onwards"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-[#6246EA]"
                  />
                </div>

                {/* Numeric Price */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Numeric Price Value (in ₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={pPriceNumeric}
                    onChange={(e) => setPPriceNumeric(parseInt(e.target.value) || 0)}
                    placeholder="24500000"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-[#6246EA]"
                  />
                </div>

                {/* Location */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Location Address
                  </label>
                  <input
                    type="text"
                    required
                    value={pLocation}
                    onChange={(e) => setPLocation(e.target.value)}
                    placeholder="e.g. Panathur, Off Marathahalli-ORR, Bengaluru"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA]"
                  />
                </div>

                {/* Neighborhood & Possession */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Enclave / Sub-Market
                  </label>
                  <input
                    type="text"
                    required
                    value={pNeighborhood}
                    onChange={(e) => setPNeighborhood(e.target.value)}
                    placeholder="e.g. Marathahalli, Lavelle Road, Whitefield"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Handover Date
                  </label>
                  <input
                    type="text"
                    required
                    value={pPossession}
                    onChange={(e) => setPPossession(e.target.value)}
                    placeholder="e.g. Dec 2026 or Ready to Move"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA]"
                  />
                </div>

                {/* Configuration & Units */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Unit Configurations
                  </label>
                  <input
                    type="text"
                    required
                    value={pConfig}
                    onChange={(e) => setPConfig(e.target.value)}
                    placeholder="e.g. 3, 3.5 & 4 BHK Greek-Themed Residences"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Total Units & Land Parcel
                  </label>
                  <input
                    type="text"
                    required
                    value={pUnits}
                    onChange={(e) => setPUnits(e.target.value)}
                    placeholder="e.g. 1,875 Units across 25 Acres"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA]"
                  />
                </div>

                {/* RERA ID */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Karnataka RERA Registration Number
                  </label>
                  <input
                    type="text"
                    required
                    value={pRera}
                    onChange={(e) => setPRera(e.target.value)}
                    placeholder="PRM/KA/RERA/1251/446/PR/200923/006282"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-[#6246EA]"
                  />
                </div>

                {/* Image URL & Gallery */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Main Hero Image URL
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      required
                      value={pImage}
                      onChange={(e) => setPImage(e.target.value)}
                      className="flex-1 text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-[#6246EA]"
                    />
                    <img
                      src={pImage}
                      alt="Preview"
                      className="w-10 h-10 rounded-lg object-cover border border-slate-700 shrink-0"
                    />
                  </div>

                  {/* Public Preset Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                    <span className="text-slate-500 font-mono">Public Presets:</span>
                    <button
                      type="button"
                      onClick={() => setPImage('/images/hero_luxury_property_1793437949212.jpg')}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 font-mono text-[10px]"
                    >
                      Villa / Township
                    </button>
                    <button
                      type="button"
                      onClick={() => setPImage('/images/property_penthouse_1793437950337.jpg')}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 font-mono text-[10px]"
                    >
                      Towers / Penthouse
                    </button>
                    <button
                      type="button"
                      onClick={() => setPImage('/images/property_coastal_villa_1793437950634.jpg')}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 font-mono text-[10px]"
                    >
                      Lakefront / Greens
                    </button>
                  </div>
                </div>

                {/* Highlight */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Signature Highlight (e.g. 77,000 sq.ft Club Santorini, 3 Olympic Swimming Pools)
                  </label>
                  <input
                    type="text"
                    required
                    value={pHighlight}
                    onChange={(e) => setPHighlight(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA]"
                  />
                </div>

                {/* Amenities */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Master Amenities (comma separated)
                  </label>
                  <input
                    type="text"
                    required
                    value={pAmenities}
                    onChange={(e) => setPAmenities(e.target.value)}
                    placeholder="Olympic Pool, Grand Clubhouse, Tennis Court, Wine Cellar, Spa"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA]"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Architectural Statement & Masterplan Description
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={pDescription}
                    onChange={(e) => setPDescription(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA] resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6246EA] via-[#2878FF] to-[#FF7043] text-white text-xs font-bold shadow-md shadow-[#6246EA]/20 hover:opacity-95 cursor-pointer"
                >
                  {editingProject ? 'Save Project Changes' : 'Publish Landmark Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT PROPERTY */}
      {/* ========================================================================= */}
      {isPropertyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#111827] border border-slate-800 text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 my-8 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-editorial text-white">
                  {editingProperty ? 'Edit Bengaluru Estate' : 'Add New Luxury Property'}
                </h3>
                <p className="text-xs text-slate-400">
                  Update architectural attributes, price in Crores, and public asset image.
                </p>
              </div>
              <button
                onClick={() => setIsPropertyModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProperty} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Property Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. The Glass Pavilion Villa, Sadashivanagar"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA]"
                  />
                </div>

                {/* Tagline */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tagline / One-Line Overview
                  </label>
                  <input
                    type="text"
                    required
                    value={formTagline}
                    onChange={(e) => setFormTagline(e.target.value)}
                    placeholder="e.g. Rare lakefront sanctuary with private heated pool & zen gardens"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA]"
                  />
                </div>

                {/* Price in Crores */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Valuation (₹ in Crores)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    required
                    value={formPriceCr}
                    onChange={(e) => setFormPriceCr(parseFloat(e.target.value) || 0)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-[#6246EA]"
                  />
                </div>

                {/* Neighborhood */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Bengaluru Neighborhood
                  </label>
                  <select
                    value={formNeighborhood}
                    onChange={(e) => setFormNeighborhood(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA]"
                  >
                    <option value="Outer Ring Road (ORR)">Outer Ring Road (ORR)</option>
                    <option value="Whitefield Tech Corridor">Whitefield Tech Corridor</option>
                    <option value="Central CBD (MG Rd & Lavelle Rd)">Central CBD (MG Rd & Lavelle Rd)</option>
                    <option value="Indiranagar 100ft Road">Indiranagar 100ft Road</option>
                    <option value="Koramangala Commercial Hub">Koramangala Commercial Hub</option>
                    <option value="North Bengaluru / Airport Corridor">North Bengaluru / Airport Corridor</option>
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Commercial Asset Class
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA]"
                  >
                    <option value="Grade-A Office">Grade-A Office</option>
                    <option value="Pre-Leased Asset">Pre-Leased Asset</option>
                    <option value="Tech Park Campus">Tech Park Campus</option>
                    <option value="High-Street Retail">High-Street Retail</option>
                    <option value="Managed Enterprise">Managed Enterprise</option>
                    <option value="Logistics & Warehousing">Logistics & Warehousing</option>
                    <option value="Commercial Land">Commercial Land</option>
                  </select>
                </div>

                {/* Listing Status */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Commercial Mandate Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA]"
                  >
                    <option value="Pre-Leased">Pre-Leased</option>
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                    <option value="Institutional Mandate">Institutional Mandate</option>
                    <option value="Under Offer">Under Offer</option>
                    <option value="New Development">New Development</option>
                  </select>
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Street Address & Landmarks
                  </label>
                  <input
                    type="text"
                    required
                    value={formAddress}
                    onChange={(e) => setFormAddress(e.target.value)}
                    placeholder="e.g. 14th Cross, Sadashivanagar (Near Palace Orchards)"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA]"
                  />
                </div>

                {/* Bedrooms & Bathrooms */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formBedrooms}
                      onChange={(e) => setFormBedrooms(parseInt(e.target.value) || 1)}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-[#6246EA]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formBathrooms}
                      onChange={(e) => setFormBathrooms(parseInt(e.target.value) || 1)}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-[#6246EA]"
                    />
                  </div>
                </div>

                {/* Sqft & Garage */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Area (Sq.Ft)
                    </label>
                    <input
                      type="number"
                      min="500"
                      value={formSqft}
                      onChange={(e) => setFormSqft(parseInt(e.target.value) || 1000)}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-[#6246EA]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Garage Bays
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formGarage}
                      onChange={(e) => setFormGarage(parseInt(e.target.value) || 1)}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-[#6246EA]"
                    />
                  </div>
                </div>

                {/* Main Architectural Image */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Main Image (from public/images)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      required
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      className="flex-1 text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-[#6246EA]"
                    />
                    <img
                      src={formImage}
                      alt="Preview"
                      className="w-10 h-10 rounded-lg object-cover border border-slate-700"
                    />
                  </div>

                  {/* Preset quick buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                    <span className="text-slate-500 font-mono">Public Presets:</span>
                    <button
                      type="button"
                      onClick={() => setFormImage('/images/hero_luxury_property_1793437949212.jpg')}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 font-mono text-[10px]"
                    >
                      Sadashivanagar Villa
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormImage('/images/property_penthouse_1793437950337.jpg')}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 font-mono text-[10px]"
                    >
                      Lavelle Penthouse
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormImage('/images/property_coastal_villa_1793437950634.jpg')}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 font-mono text-[10px]"
                    >
                      Whitefield Villa
                    </button>
                  </div>
                </div>

                {/* Features */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Signature Features (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formFeatures}
                    onChange={(e) => setFormFeatures(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA]"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Architectural Statement & Description
                  </label>
                  <textarea
                    rows={3}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA] resize-none"
                  />
                </div>

                {/* Featured checkbox */}
                <div className="sm:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-200">
                    <input
                      type="checkbox"
                      checked={formFeatured}
                      onChange={(e) => setFormFeatured(e.target.checked)}
                      className="rounded border-slate-700 text-[#6246EA] focus:ring-[#6246EA] bg-slate-900"
                    />
                    <span>Pin to Hero Spotlight Slider & Showcase</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPropertyModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6246EA] via-[#2878FF] to-[#FF7043] text-white text-xs font-bold shadow-md shadow-[#6246EA]/20 hover:opacity-95"
                >
                  {editingProperty ? 'Save Changes' : 'Publish Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD WALK-IN LEAD */}
      {/* ========================================================================= */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#111827] border border-slate-800 text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold font-editorial text-white">
                  Register Walk-In / Phone Lead
                </h3>
                <p className="text-xs text-slate-400">
                  Record new luxury client mandate from private concierge bureau.
                </p>
              </div>
              <button
                onClick={() => setIsAddLeadModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveWalkInLead} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Client Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajiv Chandrasekhar"
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 76760 21032"
                    value={newLeadPhone}
                    onChange={(e) => setNewLeadPhone(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-[#6246EA]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="client@venture.in"
                    value={newLeadEmail}
                    onChange={(e) => setNewLeadEmail(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Estate
                </label>
                <select
                  value={newLeadPropertyId}
                  onChange={(e) => setNewLeadPropertyId(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA]"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.priceDisplay})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Enquiry Requirement / Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Notes from consultation or private viewing request..."
                  value={newLeadMessage}
                  onChange={(e) => setNewLeadMessage(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#6246EA] resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddLeadModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#6246EA] via-[#2878FF] to-[#FF7043] text-white text-xs font-bold shadow-md shadow-[#6246EA]/20 hover:opacity-95"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DELETE CONFIRMATIONS */}
      {/* ========================================================================= */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#111827] border border-slate-800 text-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base font-editorial">
                Delete Landmark Project?
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Are you sure you want to remove <strong className="text-white">{projectToDelete.name}</strong> by {projectToDelete.developer}? This will remove it from the showroom.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteProject}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded-xl text-xs font-bold text-white shadow-md shadow-rose-600/30 cursor-pointer"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}

      {propertyToDelete && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#111827] border border-slate-800 text-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base font-editorial">
                Delete Property?
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Are you sure you want to remove <strong className="text-white">{propertyToDelete.title}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setPropertyToDelete(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteProperty}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded-xl text-xs font-bold text-white shadow-md shadow-rose-600/30"
              >
                Delete Estate
              </button>
            </div>
          </div>
        </div>
      )}

      {leadToDelete && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#111827] border border-slate-800 text-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base font-editorial">
                Delete Inquiry Record?
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Remove inquiry mandate from <strong className="text-white">{leadToDelete.fullName}</strong> ({leadToDelete.id})?
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setLeadToDelete(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteLead}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded-xl text-xs font-bold text-white shadow-md shadow-rose-600/30"
              >
                Delete Inquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
