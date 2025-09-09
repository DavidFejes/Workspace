document.addEventListener('DOMContentLoaded', () => {

    // === ELEMEK KIGYŰJTÉSE ===
    const fileLinks = document.querySelectorAll('.file-link');
    const contentPanes = document.querySelectorAll('.content-pane');
    const mainContent = document.querySelector('.main-content');
    const workspaceLink = document.getElementById('workspace-link');
    const aboutMeLink = document.querySelector('a[data-target="about"]');
    const sidebar = document.querySelector('.sidebar');
    let toggleBar = document.querySelector('.sidebar-toggle-bar');
    let workspaceBtn = document.querySelector('.sidebar-toggle-btn');

    if (!toggleBar) {
        toggleBar = document.createElement('div');
        toggleBar.className = 'sidebar-toggle-bar';
        document.body.appendChild(toggleBar);
    }

    if (!workspaceBtn) {
        workspaceBtn = document.createElement('button');
        workspaceBtn.textContent = 'WORKSPACE';
        workspaceBtn.className = 'sidebar-toggle-btn';
    }

    // Always ensure button is in the bar
    if (!toggleBar.contains(workspaceBtn)) {
        toggleBar.appendChild(workspaceBtn);
    }
    toggleBar.style.display = 'none';

    // Add sidebar overlay for mobile
    let sidebarOverlay = document.querySelector('.sidebar-overlay');
    if (!sidebarOverlay) {
        sidebarOverlay = document.createElement('div');
        sidebarOverlay.className = 'sidebar-overlay';
        document.body.appendChild(sidebarOverlay);
    }
    sidebarOverlay.addEventListener('click', function() {
        hideSidebar();
    });

    // === FUNKCIÓ A TÉMA FRISSÍTÉSÉHEZ ===
    const updateTheme = (activePane) => {
        const themeColor = activePane.getAttribute('data-theme-color');
        if (themeColor) {
            mainContent.style.setProperty('--current-theme-color', themeColor);
        }
    };

    // === ESEMÉNYFIGYELŐ A FÁJL-LINKEKRE ===
    fileLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('data-target');
            if (!targetId) return; // Ha külső link, ne csináljon semmit
            
            event.preventDefault();

            const targetPane = document.getElementById(targetId);
            if (!targetPane) return;

            // Téma frissítése az új panel alapján
            updateTheme(targetPane);
            
            // "Active" osztályok kezelése
            fileLinks.forEach(otherLink => otherLink.classList.remove('active'));
            contentPanes.forEach(pane => pane.classList.remove('active'));
            link.classList.add('active');
            targetPane.classList.add('active');

            // Mobil nézet kezelése
            if (window.innerWidth <= 900) {
                sidebar.style.display = 'none';
                toggleBar.style.display = 'flex';
                document.body.classList.add('sidebar-hidden');
            }
        });
    });

    // === ESEMÉNYFIGYELŐ A WORKSPACE FEJLÉCRE ===
    if (workspaceLink && aboutMeLink) {
        workspaceLink.addEventListener('click', (event) => {
            event.preventDefault();
            // Programozottan rákattintunk a "rolam.md" linkre
            aboutMeLink.click();
        });
    }

    // === INDULÓ ÁLLAPOT BEÁLLÍTÁSA ===
    const initialActivePane = document.querySelector('.content-pane.active');
    if (initialActivePane) {
        updateTheme(initialActivePane);
    }

    // === OLDALSÁV KEZELÉSE MOBILON ===
    function isMobile() {
        return window.innerWidth <= 900;
    }

    function showSidebar() {
        sidebar.style.display = '';
        toggleBar.style.display = 'none';
        document.body.classList.remove('sidebar-hidden');
        sidebarOverlay.style.display = 'block';
    }

    function hideSidebar() {
        sidebar.style.display = 'none';
        toggleBar.style.display = 'flex';
        document.body.classList.add('sidebar-hidden');
        sidebarOverlay.style.display = 'none';
    }

    // Oldalsáv elrejtése mobilon, amikor fájl-linkre kattintanak
    sidebar.addEventListener('click', function(e) {
        if (isMobile() && e.target.closest('.file-link')) {
            hideSidebar();
        }
    });

    // Oldalsáv megjelenítése, amikor a workspace gombra kattintanak
    workspaceBtn.addEventListener('click', function() {
        showSidebar();
    });

    // Oldalsáv elrejtése, amikor a fő tartalom üres területére kattintanak (csak mobilon)
    if (mainContent) {
        mainContent.addEventListener('click', function(e) {
            if (isMobile() && document.body.classList.contains('sidebar-hidden') === false) {
                // Csak akkor zárja be, ha üres területre kattintanak, nem linkre vagy interaktív elemre
                if (e.target === mainContent) {
                    hideSidebar();
                }
            }
        });
    }

    // Swipe a sidebar bezárásához (érintéses események)
    let touchStartX = null;
    sidebar.addEventListener('touchstart', function(e) {
        if (!isMobile()) return;
        touchStartX = e.touches[0].clientX;
    });
    sidebar.addEventListener('touchmove', function(e) {
        if (!isMobile() || touchStartX === null) return;
        const touchX = e.touches[0].clientX;
        if (touchStartX - touchX > 60) { // balra söprés
            hideSidebar();
            touchStartX = null;
        }
    });
    sidebar.addEventListener('touchend', function() {
        touchStartX = null;
    });

    // Reszponzív: oldalsáv megjelenítése/elrejtése ablakméret változásakor
    function handleResize() {
        if (isMobile()) {
            hideSidebar();
        } else {
            showSidebar();
        }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
});