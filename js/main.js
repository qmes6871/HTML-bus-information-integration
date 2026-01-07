// Menu data
const menuData = [
  {
    title: "센터소개",
    items: [
      { label: "센터소개", href: "/center/intro" },
      { label: "오시는길", href: "/center/location" },
      { label: "ITS 안내", href: "/center/its" },
      { label: "BIS 안내", href: "/center/bis" }
    ]
  },
  {
    title: "교통정보",
    items: [
      { label: "영상(cctv)정보", href: "/traffic/cctv" },
      { label: "주차(PIS)정보", href: "/traffic/parking" },
      { label: "도로 전광표지(VMS)정보", href: "/traffic/vms" },
      { label: "돌발 및 통제정보", href: "/traffic/incident" },
      { label: "교통소통정보 통계", href: "/traffic/statistics" }
    ]
  },
  {
    title: "버스정보",
    items: [
      { label: "요금안내", href: "/bus/fare" },
      { label: "환승안내", href: "/bus/transfer" },
      { label: "버스운행 시간표", href: "/bus/schedule" },
      { label: "저상버스 운행안내", href: "/bus/lowfloor" },
      { label: "정류소 위치 안내", href: "/bus/stops" },
      { label: "버스회사 정보조회", href: "/bus/company" }
    ]
  },
  {
    title: "고객센터",
    items: [
      { label: "공지사항", href: "/support/notice" },
      { label: "사이트", href: "/support/sitemap" }
    ]
  },
  {
    title: "길찾기",
    items: [],
    href: "/directions"
  }
];

// State
let activeMenu = null;
let mobileMenuOpen = false;
let mobileSubMenu = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  initializeMenu();
  initializeMobileMenu();
});

function initializeMenu() {
  const navItems = document.querySelectorAll('.nav-item');
  const megaMenu = document.querySelector('.mega-menu');

  navItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      showMegaMenu(index);
    });
  });

  document.querySelector('header').addEventListener('mouseleave', () => {
    hideMegaMenu();
  });

  if (megaMenu) {
    megaMenu.addEventListener('mouseenter', () => {
      if (activeMenu !== null) {
        showMegaMenu(activeMenu);
      }
    });

    megaMenu.addEventListener('mouseleave', () => {
      hideMegaMenu();
    });
  }
}

function showMegaMenu(index) {
  activeMenu = index;
  const megaMenu = document.querySelector('.mega-menu');
  const megaMenuTitle = document.querySelector('.mega-menu-title');
  const columns = document.querySelectorAll('.mega-menu-column');
  const navLinks = document.querySelectorAll('.nav-link');

  if (megaMenu && menuData[index]) {
    megaMenu.classList.add('active');

    if (megaMenuTitle) {
      megaMenuTitle.textContent = menuData[index].title;
    }

    columns.forEach((col, colIndex) => {
      if (colIndex === index) {
        col.classList.add('active');
      } else {
        col.classList.remove('active');
      }
    });

    navLinks.forEach((link, linkIndex) => {
      if (linkIndex === index) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

function hideMegaMenu() {
  activeMenu = null;
  const megaMenu = document.querySelector('.mega-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const columns = document.querySelectorAll('.mega-menu-column');

  if (megaMenu) {
    megaMenu.classList.remove('active');
  }

  navLinks.forEach(link => {
    link.classList.remove('active');
  });

  columns.forEach(col => {
    col.classList.remove('active');
  });
}

function initializeMobileMenu() {
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuHeaders = document.querySelectorAll('.mobile-menu-header');

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenuOpen = !mobileMenuOpen;
      if (mobileMenu) {
        if (mobileMenuOpen) {
          mobileMenu.classList.add('active');
        } else {
          mobileMenu.classList.remove('active');
        }
      }

      // Update icon
      const menuIcon = mobileMenuButton.querySelector('.menu-icon');
      const closeIcon = mobileMenuButton.querySelector('.close-icon');
      if (menuIcon && closeIcon) {
        if (mobileMenuOpen) {
          menuIcon.style.display = 'none';
          closeIcon.style.display = 'block';
        } else {
          menuIcon.style.display = 'block';
          closeIcon.style.display = 'none';
        }
      }
    });
  }

  mobileMenuHeaders.forEach((header, index) => {
    header.addEventListener('click', () => {
      const menu = menuData[index];
      if (menu.items && menu.items.length > 0) {
        if (mobileSubMenu === index) {
          mobileSubMenu = null;
        } else {
          mobileSubMenu = index;
        }

        const submenu = header.nextElementSibling;
        const chevron = header.querySelector('.chevron-down, .chevron-up');

        if (submenu) {
          if (mobileSubMenu === index) {
            submenu.classList.add('active');
            if (chevron) {
              chevron.innerHTML = '<path d="M18 15l-6-6-6 6"/>';
            }
          } else {
            submenu.classList.remove('active');
            if (chevron) {
              chevron.innerHTML = '<path d="M6 9l6 6 6-6"/>';
            }
          }
        }
      } else if (menu.href) {
        window.location.href = menu.href;
      }
    });
  });

  // Close mobile menu when clicking on submenu link
  const mobileSubmenuLinks = document.querySelectorAll('.mobile-submenu a');
  mobileSubmenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuOpen = false;
      if (mobileMenu) {
        mobileMenu.classList.remove('active');
      }
    });
  });
}

// Search functionality
function handleSearch() {
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    const query = searchInput.value.trim();
    if (query) {
      // Navigate to search page with query
      window.location.href = `/bus/search?q=${encodeURIComponent(query)}`;
    }
  }
}

// Add search event listeners
document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.querySelector('.search-button');
  const searchInput = document.querySelector('.search-input');

  if (searchButton) {
    searchButton.addEventListener('click', handleSearch);
  }

  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleSearch();
      }
    });
  }

  // Search tab functionality
  const searchTabs = document.querySelectorAll('.search-tab');
  searchTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      searchTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
});

// Related site navigation
function navigateToRelatedSite() {
  const select = document.querySelector('.footer-select');
  if (select && select.value) {
    window.open(select.value, '_blank');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const footerButton = document.querySelector('.footer-button');
  if (footerButton) {
    footerButton.addEventListener('click', navigateToRelatedSite);
  }
});

// Mobile Sub-menu (Accordion) functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileSubMenuHeader = document.querySelector('.mobile-sub-menu-header');
  const mobileSubMenuContent = document.querySelector('.mobile-sub-menu-content');

  if (mobileSubMenuHeader && mobileSubMenuContent) {
    mobileSubMenuHeader.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileSubMenuContent.classList.toggle('active');
    });
  }
});
