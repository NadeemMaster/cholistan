const tractorsData = [
    {
        id: 'nh480s',
        name: 'New Holland 480 Special',
        urduName: 'نیو ہالینڈ 480 اسپیشل',
        hp: '55 HP',
        price: 'Rs. 2,428,200',
        image: 'https://www.alghazitractors.com/wp-content/uploads/2025/08/01-NH-480s-1.jpg',
        desc: 'New Holland 8035.06 4-Stroke, direct injection diesel engine. 3 cylinders. Max Torque: 22.7 kgm.',
        features: ['Dual plate, dry type clutch', '8 forward and 2 reverse speeds', 'Hydraulic Lift capacity: 1,450 kg'],
        fullSpecs: {
            "Engine Power": "55 HP",
            "Operating Weight": "1,710 kg",
            "Engine Type & Cylinders": "New Holland 8035.06, 4-Stroke Direct Injection, 3 Cylinders",
            "Displacement / Bore & Stroke": "2,710 cc / 100 x 115 mm",
            "Max Torque": "22.7 kgm @ 1,500 rpm",
            "Cooling System": "Water cooled, 4-row brass tube & copper fin radiator",
            "Clutch": "Dual plate, dry type, 11 inch diameter",
            "Transmission": "8 Forward, 2 Reverse Speeds (Constant mesh)",
            "Steering": "Manual / Hydro assisted power steering (Optional)",
            "Power Take Off (PTO)": "6 Spline, Fully independent 540 rpm",
            "Hydraulics & Lift": "Draft & Position Control, Pump: 22.7 L/min, Lift: 1,450 kg",
            "Brakes": "Service: Dry band-type. Parking: Hand lever",
            "Tyres (Front / Rear)": "6.00-16 / 12.4/11-28",
            "Dimensions & Wheelbase": "Length: 2,960 mm, Wheelbase: 1,920 mm",
            "Ground Clearance": "480 mm"
        }
    },
    {
        id: 'nh480pp',
        name: 'New Holland 480 Power Plus',
        urduName: 'نیو ہالینڈ 480 پاور پلس',
        hp: '55 HP',
        price: 'Rs. 2,522,820',
        image: 'https://www.alghazitractors.com/wp-content/uploads/2025/08/02-NH-480pp-1.jpg',
        desc: 'New Holland 8035.06 4-Stroke, direct injection diesel engine. Enhanced power and durability.',
        features: ['Dual plate, dry type clutch', 'Hydro assisted power steering (optional)', 'Max Lift capacity: 1,450 kg'],
        fullSpecs: {
            "Engine Power": "55 HP",
            "Operating Weight": "1,710 kg",
            "Engine Type & Cylinders": "New Holland 8035.06, 4-Stroke Direct Injection, 3 Cylinders",
            "Displacement / Bore & Stroke": "2,710 cc / 100 x 115 mm",
            "Max Torque": "22.7 kgm @ 1,500 rpm",
            "Cooling System": "Water cooled, 4-row brass tube & copper fin radiator",
            "Clutch": "Dual plate, dry type, 11 inch diameter",
            "Transmission": "8 Forward, 2 Reverse Speeds (Constant mesh)",
            "Steering": "Manual / Hydro assisted power steering (Optional)",
            "Power Take Off (PTO)": "6 Spline, Fully independent 540 rpm",
            "Hydraulics & Lift": "Draft & Position Control, Pump: 22.7 L/min, Lift: 1,450 kg",
            "Brakes": "Service: Dry band-type. Parking: Hand lever",
            "Tyres (Front / Rear)": "6.00-16 / 12.4/11-28",
            "Dimensions & Wheelbase": "Length: 2,960 mm, Wheelbase: 1,920 mm",
            "Ground Clearance": "480 mm"
        }
    },
    {
        id: 'ghazi',
        name: 'New Holland Ghazi',
        urduName: 'نیو ہالینڈ غازی',
        hp: '65 HP',
        price: 'Rs. 2,807,820',
        image: 'https://www.alghazitractors.com/wp-content/uploads/2025/08/03-NH-Ghazi-1.jpg',
        desc: 'New Holland 8035.05 engine. 3 Cylinders, 2,931 cc. Max Torque: 23.9 kgm. Legendary mid-range performer.',
        features: ['Oil-bath air cleaner', '8 forward and 2 reverse speeds', 'Max Lifting capacity: 1,650 kg'],
        fullSpecs: {
            "Engine Power": "65 HP",
            "Operating Weight": "1,785 kg",
            "Engine Type & Cylinders": "New Holland 8035.05, 4-Stroke Direct Injection, 3 Cylinders",
            "Displacement": "2,931 cc",
            "Max Torque": "23.9 kgm @ 1,500 rpm",
            "Cooling System": "Water cooled, 5-row brass tube and fin radiator",
            "Clutch": "Dual plate, dry-type, 11 inch diameter",
            "Transmission": "8 Forward, 2 Reverse Speeds (Constant mesh)",
            "Steering": "Hydro assisted power steering, independent circuit",
            "Power Take Off (PTO)": "6 spline shaft, Fully independent 540 rpm",
            "Hydraulics & Lift": "Draft & Position Control, Pump: 22.7 L/min, Lift: 1,650 kg",
            "Brakes": "Service: Dry band-type. Parking: Hand lever",
            "Tyres (Front / Rear)": "6.00-16 / 14.9/13-28",
            "Dimensions & Wheelbase": "Length: 3,046 mm, Wheelbase: 1,953 mm",
            "Ground Clearance": "480 mm"
        }
    },
    {
        id: 'nh640',
        name: 'New Holland 640',
        urduName: 'نیو ہالینڈ 640',
        hp: '75 HP',
        price: 'Rs. 3,642,300',
        image: 'https://www.alghazitractors.com/wp-content/uploads/2025/08/04-NH-640-1.jpg',
        desc: 'New Holland 8045.06 4-cylinder engine. 3,613 cc. Max Torque: 24.9 kgm. A heavy-duty workhorse.',
        features: ['8 forward, 2 reverse speeds', 'Hydro assisted steering', 'Max lifting capacity: 1,650 kg'],
        fullSpecs: {
            "Engine Power": "75 HP",
            "Operating Weight": "2,070 kg",
            "Engine Type & Cylinders": "New Holland 8045.06, 4-Stroke Direct Injection, 4 Cylinders",
            "Displacement / Bore & Stroke": "3,613 cc / 100 x 115 mm",
            "Max Torque": "24.9 kgm @ 1,400 rpm",
            "Cooling System": "Water cooled, 5-row brass tube & copper fin radiator",
            "Clutch": "Dual plate, dry-type, 11 inch diameter",
            "Transmission": "8 Forward, 2 Reverse Speeds (Constant mesh)",
            "Steering": "Hydro assisted with independent circuit",
            "Power Take Off (PTO)": "6 spline shaft, Fully independent 540 rpm",
            "Hydraulics & Lift": "Draft & Position Control, Pump: 24.8 L/min, Lift: 1,650 kg",
            "Brakes": "Service: Dry band-type, mechanically operated",
            "Tyres (Front / Rear)": "7.50-16 / 16.9/14-30",
            "Dimensions & Wheelbase": "Length: 3,200 mm, Wheelbase: 2,070 mm",
            "Ground Clearance": "520 mm"
        }
    },
    {
        id: 'nh850lift',
        name: 'New Holland 850 Lift-O-Matic',
        urduName: 'نیو ہالینڈ 850 لفٹ او میٹک',
        hp: '85 HP',
        price: 'Rs. 3,994,560',
        image: 'https://www.alghazitractors.com/wp-content/uploads/2025/08/05-NH-850-1.jpg',
        desc: 'Features Lift-O-Matic precision hydraulics. The ultimate 85 HP powerhouse for the toughest jobs.',
        features: ['Draft & Position control', '8 Forward, 2 Reverse gears', 'Supreme Torque'],
        fullSpecs: {
            "Engine Power": "85 HP",
            "Operating Weight": "2,894 kg max",
            "Engine Type & Cylinders": "4 Cylinders, Naturally Aspirated Diesel",
            "Clutch": "Dual Plate Dry-Type, Ceramic Lining",
            "Transmission": "8 Forward, 2 Reverse Speeds (Constant Mesh)",
            "Steering": "Hydrostatic Power Steering",
            "Power Take Off (PTO)": "Mechanical, 6 Splines, 540 rpm",
            "Hydraulics & Lift": "Lift-O-Matic, Draft/Position Control, Lift: 2,200 kg",
            "Brakes": "Service: Mechanical, Latched Pedal",
            "Front Axle": "Inverted U, Telescoping, Centre Pivoting",
            "Tyres (Front / Rear)": "7.50-16 / 18.4/15-30",
            "Dimensions & Wheelbase": "Length: 3,959 mm, Wheelbase: 2,220 mm",
            "Ground Clearance": "480 mm"
        }
    },
    {
        id: 'nh850reg',
        name: 'New Holland 850 Regular',
        urduName: 'نیو ہالینڈ 850 ریگولر',
        hp: '85 HP',
        price: 'Rs. 3,776,820',
        image: 'https://www.alghazitractors.com/wp-content/uploads/2025/08/06-NH-850-without-lift-o-matic-1.jpg',
        desc: 'High-power 85 HP tractor designed for heavy duty operations and rigorous commercial farming.',
        features: ['Constant mesh transmission', '8 Forward, 2 Reverse speeds', 'Heavy duty rear axle'],
        fullSpecs: {
            "Engine Power": "85 HP Rated Power @ 2500RPM",
            "Operating Weight": "2,894 kg max",
            "Engine Type & Cylinders": "4 Cylinders, Naturally Aspirated Diesel",
            "Max Torque": "High Torque @ 1600 RPM",
            "Clutch": "Dual Plate Dry-Type, Ceramic Lining, 11 inch",
            "Transmission": "8 Forward, 2 Reverse Speeds (Constant Mesh)",
            "Steering": "Hydrostatic Power Steering",
            "Power Take Off (PTO)": "Mechanical, 6 Splines, 540 rpm",
            "Hydraulics & Lift": "Draft & Position Control, Gear Pump 32 L/min, Lift: 2,200 kg",
            "Brakes": "Service: Mechanical, Latched Pedal",
            "Front Axle": "Inverted U, Telescoping, Centre Pivoting",
            "Tyres (Front / Rear)": "7.50-16 / 18.4/15-30",
            "Dimensions & Wheelbase": "Length: 3,959 mm, Wheelbase: 2,220 mm",
            "Ground Clearance": "480 mm"
        }
    },
    {
        id: 'nh850ecolift',
        name: 'New Holland 850 ECO Lift-O-Matic',
        urduName: 'نیو ہالینڈ 850 ایکو لفٹ او میٹک',
        hp: '85 HP',
        price: 'Rs. 3,733,072',
        image: 'https://www.alghazitractors.com/wp-content/uploads/2025/08/07-NH-850s-ECO-2.jpg',
        desc: 'Maximum efficiency with ECO tuning. Includes advanced Lift-O-Matic rear hydraulics control.',
        features: ['Lift-O-Matic hydraulics', 'Hydrostatic power steering', 'Advanced implement control'],
        fullSpecs: {
            "Engine Power": "85 HP (ECO Mode)",
            "Operating Weight": "2,894 kg max",
            "Engine Type & Cylinders": "4 Cylinders, Naturally Aspirated Diesel",
            "Clutch": "Dual Plate Dry-Type, Ceramic Lining, 11 inch",
            "Transmission": "8 Forward, 2 Reverse Speeds (Constant Mesh)",
            "Steering": "Hydrostatic Power Steering",
            "Power Take Off (PTO)": "Mechanical, 6 Splines, 540 rpm",
            "Hydraulics & Lift": "Lift-O-Matic, Float/Position Control, Lift: 2,200 kg",
            "Brakes": "Service: Mechanical, Latched Pedal",
            "Front Axle": "Inverted U, Telescoping, Centre Pivoting",
            "Tyres (Front / Rear)": "7.50-16 / 18.4/15-30",
            "Dimensions & Wheelbase": "Length: 3,959 mm, Wheelbase: 2,220 mm",
            "Ground Clearance": "480 mm"
        }
    },
    {
        id: 'nh850eco',
        name: 'New Holland 850 ECO',
        urduName: 'نیو ہالینڈ 850 ایکو',
        hp: '85 HP',
        price: 'Rs. 3,544,372',
        image: 'https://www.alghazitractors.com/wp-content/uploads/2025/08/08-NH-850s-ECO-without-lift-o-matic-2.jpg',
        desc: 'Economical performance with 85 HP. Designed for efficiency and reliable field operation.',
        features: ['Hydrostatic power steering', 'Independent PTO', 'Heavy duty transmission'],
        fullSpecs: {
            "Engine Power": "85 HP (ECO Mode)",
            "Operating Weight": "2,895 kg max",
            "Engine Type & Cylinders": "4 Cylinders, Naturally Aspirated Diesel",
            "Max Torque": "High Torque @ 1600 RPM",
            "Clutch": "Dual Plate Dry-Type, Ceramic Lining, 11 inch",
            "Transmission": "8 Forward, 2 Reverse Speeds (Constant Mesh)",
            "Steering": "Hydrostatic Power Steering",
            "Power Take Off (PTO)": "Mechanical, 6 Splines, 540 rpm",
            "Hydraulics & Lift": "Draft & Position Control, Gear Pump 32 L/min, Lift: 2,200 kg",
            "Brakes": "Service: Mechanical, Latched Pedal",
            "Front Axle": "Inverted U, Telescoping, Centre Pivoting",
            "Tyres (Front / Rear)": "7.50-16 / 18.4/15-30",
            "Dimensions & Wheelbase": "Length: 3,959 mm, Wheelbase: 2,220 mm",
            "Ground Clearance": "480 mm"
        }
    }
];

// DOM Elements
const tractorsContainer = document.getElementById('tractors-container');
const bookingModal = document.getElementById('booking-modal');
const specsModal = document.getElementById('specs-modal');
const closeBookingBtn = document.querySelector('.close-btn');
const closeSpecsBtn = document.querySelector('.close-specs-btn');
const modalTractorName = document.getElementById('modal-tractor-name');
const specsModalTractorName = document.getElementById('specs-modal-tractor-name');
const bookingForm = document.getElementById('booking-form');
const contactForm = document.getElementById('main-contact-form');

// Language State
let currentLang = localStorage.getItem('cholistan_lang') || 'en';

// Update body class on load
document.body.className = `lang-${currentLang}`;

// Render Tractors
function renderTractors() {
    tractorsContainer.innerHTML = ''; // Clear container
    tractorsData.forEach(tractor => {
        const features = currentLang === 'ur' ? 
            ['ڈوئل پلیٹ، ڈرائی ٹائپ کلچ', '8 فارورڈ اور 2 ریورس اسپیڈز', 'ہائیڈرولک لفٹ کی گنجائش: 1,450 کلوگرام'] : // Simplified for demo
            tractor.features;
        
        const featuresHTML = features.map(f => `<li>${f}</li>`).join('');
        const tractorName = currentLang === 'ur' ? tractor.urduName : tractor.name;
        const tractorDesc = currentLang === 'ur' ? 
            'الغازي نیو ہالینڈ ٹریکٹرز: کارکردگی اور پائیداری کا بہترین امتزاج۔' : 
            tractor.desc;
        const bookBtnText = currentLang === 'ur' ? 'ابھی بک کریں' : 'Book Now';
        const specsBtnText = currentLang === 'ur' ? 'تفصیلات' : 'Specs';

        const cardHTML = `
            <div class="tractor-card">
                <div class="hp-badge">${tractor.hp}</div>
                <div class="price-badge">${tractor.price}</div>
                <div class="card-img-wrapper">
                    <div class="img-skeleton"></div>
                    <img src="${tractor.image}" alt="${tractorName}" class="card-img" style="opacity: 0;" onload="this.style.opacity=1; setTimeout(() => this.previousElementSibling?.remove(), 500);" loading="lazy">
                </div>
                <div class="card-content">
                    <div class="card-title">
                        <span>${tractorName}</span>
                    </div>
                    <p class="card-desc">${tractorDesc}</p>
                    <ul class="features-list">
                        ${featuresHTML}
                    </ul>
                    
                    <div style="display: flex; gap: 10px; margin-top: auto;">
                        <button class="btn card-btn book-now-btn" data-tractor-id="${tractor.id}" style="flex: 1; padding: 10px;">${bookBtnText}</button>
                        <button class="btn btn-outline specs-btn" data-tractor-id="${tractor.id}" style="flex: 1; padding: 10px; border: 1px solid var(--primary-color); color: var(--primary-color); background: transparent; border-radius: 12px; cursor: pointer;">${specsBtnText}</button>
                    </div>
                </div>
            </div>
        `;
        tractorsContainer.innerHTML += cardHTML;
    });
}

// Language Toggle Logic
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ur' : 'en';
    localStorage.setItem('cholistan_lang', currentLang);
    document.body.className = `lang-${currentLang}`;
    
    // Update Static Content
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = el.getAttribute(`data-${currentLang}`);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = text;
        } else {
            // Keep icons if they exist
            const icon = el.querySelector('svg, i, .arrow');
            if (icon) {
                // If it's a button with an arrow, we need to be careful
                if (el.classList.contains('rich-primary-btn')) {
                    el.innerHTML = `${text} <span class="arrow">→</span>`;
                }
            } else {
                el.textContent = text;
            }
        }
    });

    renderTractors();
}

// Event delegation for tractors container
tractorsContainer.addEventListener('click', (e) => {
    const bookBtn = e.target.closest('.book-now-btn');
    const specsBtn = e.target.closest('.specs-btn');

    if (bookBtn) {
        const tractorId = bookBtn.getAttribute('data-tractor-id');
        const tractor = tractorsData.find(t => t.id === tractorId);
        if (tractor) {
            const msgText = currentLang === 'ur' ? 
                `اسلام علیکم!\nمیں اس ماڈل میں دلچسپی رکھتا ہوں:\n\n🚜 ماڈل: ${tractor.urduName}\n💰 قیمت: ${tractor.price}\n\nبراہ کرم مزید تفصیلات فراہم کریں۔ شکریہ!` :
                `Assalam o Alaikum!\nI am interested in:\n\n🚜 Model: ${tractor.name}\n💰 Price: ${tractor.price}\n\nPlease share more details. Thank you!`;
            const msg = encodeURIComponent(msgText);
            window.open(`https://wa.me/923035019308?text=${msg}`, '_blank');
        }
    }

    if (specsBtn) {
        const tractorId = specsBtn.getAttribute('data-tractor-id');
        openSpecsModal(tractorId);
    }
});

// Specs Translation Map
const specsTranslation = {
    "Engine Power": "انجن پاور",
    "Operating Weight": "آپریٹنگ وزن",
    "Engine Type & Cylinders": "انجن کی قسم اور سلنڈر",
    "Displacement / Bore & Stroke": "ڈسپلیسمنٹ / بور اور اسٹروک",
    "Displacement": "ڈسپلیسمنٹ",
    "Max Torque": "زیادہ سے زیادہ ٹارک",
    "Cooling System": "کولنگ سسٹم",
    "Clutch": "کلچ",
    "Transmission": "ٹرانسمیشن",
    "Steering": "اسٹیئرنگ",
    "Power Take Off (PTO)": "پاور ٹیک آف (پی ٹی او)",
    "Hydraulics & Lift": "ہائیڈرولکس اور لفٹ",
    "Brakes": "بریک",
    "Tyres (Front / Rear)": "ٹائر (اگلے / پچھلے)",
    "Dimensions & Wheelbase": "طول و عرض اور وہیل بیس",
    "Ground Clearance": "گراؤنڈ کلیئرنس",
    "Front Axle": "فرنٹ ایکسل",
    "Detailed Specifications": "مزید تفصیلی معلومات"
};

// Modal Logic
function openSpecsModal(tractorId) {
    const tractor = tractorsData.find(t => t.id === tractorId);
    if (!tractor) return;

    const tractorName = currentLang === 'ur' ? tractor.urduName : tractor.name;
    const subTitleText = currentLang === 'ur' ? specsTranslation["Detailed Specifications"] : "Detailed Specifications";
    
    // Set Tractor Name
    specsModalTractorName.textContent = tractorName;
    
    // Set Subtitle
    const modalSubTitle = specsModal.querySelector('.modal-header .urdu-text');
    if (modalSubTitle) {
        modalSubTitle.textContent = subTitleText;
    }
    
    const specsContainer = document.getElementById('specs-data-container');
    let specsHTML = '';
    
    for (const [key, value] of Object.entries(tractor.fullSpecs)) {
        const translatedKey = currentLang === 'ur' ? (specsTranslation[key] || key) : key;
        
        specsHTML += `
            <div class="spec-item">
                <span class="spec-label">${translatedKey}</span>
                <span class="spec-value">${value}</span>
            </div>
        `;
    }
    
    specsContainer.innerHTML = specsHTML;
    specsModal.classList.add('show');
    document.body.style.overflow = 'hidden'; 
}

function closeSpecsModal() {
    specsModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

closeSpecsBtn.addEventListener('click', closeSpecsModal);

window.addEventListener('click', (e) => {
    if (e.target === specsModal) closeSpecsModal();
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const phone = document.getElementById('contact-phone').value;
    const message = document.getElementById('contact-message').value;
    
    const msgText = currentLang === 'ur' ?
        `اسلام علیکم!\n\n👤 نام: ${name}\n📞 فون: ${phone}\n💬 پیغام: ${message}` :
        `Assalam o Alaikum!\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n💬 Message: ${message}`;
        
    const msg = encodeURIComponent(msgText);
    window.open(`https://wa.me/923035019308?text=${msg}`, '_blank');
    contactForm.reset();
});

// Hero Carousel Logic
const carouselImages = document.querySelectorAll('.carousel-img');
const carouselIndicators = document.querySelectorAll('#hero-carousel-indicators .indicator');
let currentSlide = 0;
const slideInterval = 4000;
let carouselTimer;

function goToSlide(index) {
    if (carouselImages.length === 0) return;
    carouselImages[currentSlide].classList.remove('active');
    carouselIndicators[currentSlide].classList.remove('active');
    currentSlide = index;
    carouselImages[currentSlide].classList.add('active');
    carouselIndicators[currentSlide].classList.add('active');
}

function nextSlide() {
    if (carouselImages.length === 0) return;
    let nextIndex = (currentSlide + 1) % carouselImages.length;
    goToSlide(nextIndex);
}

if (carouselImages.length > 0) {
    carouselTimer = setInterval(nextSlide, slideInterval);
    carouselIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(carouselTimer);
            goToSlide(index);
            carouselTimer = setInterval(nextSlide, slideInterval);
        });
    });
}

// Smooth Scroll
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Mobile Navigation
const mobileToggle = document.getElementById('mobile-toggle');
const navLinksContainer = document.getElementById('nav-links');

if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if(navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', toggleLanguage);
    }

    renderTractors();
    
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    const backToTopBtn = document.getElementById('fab-back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) backToTopBtn.classList.add('visible');
            else backToTopBtn.classList.remove('visible');
        });
        backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Trigger initial translation check for static elements if language is Urdu
    if (currentLang === 'ur') {
        const tempLang = currentLang;
        currentLang = 'en'; // Flip to trigger update
        toggleLanguage(); 
    }
});
