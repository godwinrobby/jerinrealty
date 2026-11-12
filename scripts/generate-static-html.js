import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'https://jerinrealty.com';
const DIST_DIR = path.join(__dirname, '..', 'dist');

const routeSEO = {
  '/': {
    title: 'Jerin Realty | Commercial Real Estate & Pre-Leased Investment Advisory',
    description: 'Premier commercial real estate advisory platform featuring Grade-A corporate office towers, high-yield pre-leased assets, tech park campuses, and high-street retail across Bengaluru.',
    ogTitle: 'Jerin Realty | Commercial Real Estate & Pre-Leased Investment Advisory',
    ogDescription: 'Premier commercial real estate advisory platform featuring Grade-A corporate office towers, high-yield pre-leased assets, tech park campuses, and high-street retail across Bengaluru.',
    ogImage: `${BASE_URL}/images/Jerin-Realty-Logo.png`,
    canonical: BASE_URL,
    type: 'website'
  },
  '/about': {
    title: 'About Jerin Realty | Commercial Real Estate Advisory Leadership',
    description: 'Learn about Jerin Realty\'s 18+ years of market leadership in commercial real estate advisory. RERA-registered advisors specializing in corporate site acquisitions, retail expansion, and pre-leased investments.',
    ogTitle: 'About Jerin Realty | Commercial Real Estate Advisory Leadership',
    ogDescription: 'Learn about Jerin Realty\'s 18+ years of market leadership in commercial real estate advisory. RERA-registered advisors specializing in corporate site acquisitions, retail expansion, and pre-leased investments.',
    ogImage: `${BASE_URL}/images/Jerin-Realty-Logo.png`,
    canonical: `${BASE_URL}/about`,
    type: 'website'
  },
  '/directors': {
    title: 'Board of Directors | Jerin Realty Leadership',
    description: 'Meet the Board of Directors at Jerin Realty - chartered fiduciaries and architectural scholars with over six decades of combined experience in ultra-prime asset management.',
    ogTitle: 'Board of Directors | Jerin Realty Leadership',
    ogDescription: 'Meet the Board of Directors at Jerin Realty - chartered fiduciaries and architectural scholars with over six decades of combined experience in ultra-prime asset management.',
    ogImage: `${BASE_URL}/images/Jerin-Realty-Logo.png`,
    canonical: `${BASE_URL}/directors`,
    type: 'website'
  },
  '/contact': {
    title: 'Contact Jerin Realty | Commercial Real Estate Advisory & Enquiries',
    description: 'Contact Jerin Realty for expert commercial real estate advisory, corporate site acquisitions, retail portfolio expansion, and pre-leased property investments across India. Schedule a confidential consultation.',
    ogTitle: 'Contact Jerin Realty | Commercial Real Estate Advisory & Enquiries',
    ogDescription: 'Get in touch with Jerin Realty for strategic commercial real estate advisory. Corporate site acquisitions, retail portfolio expansion, pre-leased investments across India.',
    ogImage: `${BASE_URL}/images/Jerin-Realty-Logo.png`,
    canonical: `${BASE_URL}/contact`,
    type: 'website'
  }
};

function updateHTML(html, seo) {
  let updated = html
    .replace(/<title>.*<\/title>/, `<title>${seo.title}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${seo.description}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${seo.ogTitle}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${seo.ogDescription}" />`)
    .replace(/<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${seo.type}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${seo.canonical}" />`)
    .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${seo.ogImage}" />`)
    .replace(/<meta name="twitter:card" content="[^"]*" \/>/, `<meta name="twitter:card" content="summary_large_image" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${seo.ogTitle}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${seo.ogDescription}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${seo.ogImage}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${seo.canonical}" />`);

  // Add missing meta tags after og:description - only once
  const insertAfter = `<meta property="og:description" content="${seo.ogDescription}" />`;
  
  const hasOgImage = updated.includes('og:image');
  const hasOgUrl = updated.includes('og:url');
  const hasTwitterTitle = updated.includes('twitter:title');
  const hasCanonical = updated.includes('canonical');
  
  let additions = '';
  if (!hasOgImage) {
    additions += `
    <meta property="og:image" content="${seo.ogImage}" />
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">`;
  }
  if (!hasOgUrl) {
    additions += `
    <meta property="og:url" content="${seo.canonical}" />`;
  }
  
  if (additions) {
    updated = updated.replace(insertAfter, `${insertAfter}${additions}`);
  }
  
  // Add twitter meta tags if missing
  if (!hasTwitterTitle) {
    updated = updated.replace(
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${seo.ogTitle}" />
    <meta name="twitter:description" content="${seo.ogDescription}" />
    <meta name="twitter:image" content="${seo.ogImage}" />`
    );
  }
  
  // Add canonical if missing
  if (!hasCanonical) {
    updated = updated.replace(
      `</head>`,
      `    <link rel="canonical" href="${seo.canonical}" />
  </head>`
    );
  }

  // Deduplicate any duplicate meta tags (safety net)
  const lines = updated.split('\n');
  const seen = new Set();
  const deduped = lines.filter(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('<meta property="og:image:width"') || 
        trimmed.startsWith('<meta property="og:image:height"') ||
        trimmed.startsWith('<meta property="og:image"') ||
        trimmed.startsWith('<meta property="og:url"') ||
        trimmed.startsWith('<meta name="twitter:title"') ||
        trimmed.startsWith('<meta name="twitter:description"') ||
        trimmed.startsWith('<meta name="twitter:image"') ||
        trimmed.startsWith('<link rel="canonical"')) {
      if (seen.has(trimmed)) {
        return false;
      }
      seen.add(trimmed);
    }
    return true;
  });
  
  return deduped.join('\n');
}

async function generateStaticHTML() {
  console.log('🚀 Building Vite project...');
  execSync('npm run build', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

  console.log('\n📁 Generating static HTML for each route...');
  
  const indexHTML = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');

  for (const [route, seo] of Object.entries(routeSEO)) {
    const routePath = route === '/' ? 'index' : route.slice(1);
    const routeDir = path.join(DIST_DIR, routePath);
    const routeFile = path.join(routeDir, 'index.html');
    
    fs.mkdirSync(routeDir, { recursive: true });
    
    let updatedHTML = updateHTML(indexHTML, seo);
    
    fs.writeFileSync(routeFile, updatedHTML);
    console.log(`✅ Created ${routeFile}`);
  }

  console.log('\n✨ Static HTML generation complete!');
  console.log('\n📂 Output structure:');
  
  function printStructure(dir, prefix = '') {
    const files = fs.readdirSync(dir);
    files.forEach((file, index) => {
      const isLast = index === files.length - 1;
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        console.log(`${prefix}${isLast ? '└── ' : '├── '}${file}/`);
        printStructure(filePath, prefix + (isLast ? '    ' : '│   '));
      } else {
        console.log(`${prefix}${isLast ? '└── ' : '├── '}${file}`);
      }
    });
  }
  printStructure(DIST_DIR);
}

generateStaticHTML().catch(console.error);