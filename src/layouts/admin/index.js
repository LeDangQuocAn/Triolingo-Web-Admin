// Chakra imports
import { Portal, Box, useDisclosure } from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin.js';
// Layout components
import Navbar from 'components/navbar/NavbarAdmin.js';
import Sidebar from 'components/sidebar/Sidebar.js';
import { SidebarContext } from 'contexts/SidebarContext';
import React, { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import routes from 'routes.js';

// Custom Chakra theme
export default function Dashboard(props) {
  const { ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== '/admin/full-screen-maps';
  };
  const location = useLocation();

  const getRoutePath = () => location.pathname;
  const getActiveRoute = (routes) => {
    const current = getRoutePath();

    // Flatten routes into list of { fullPath, name }
    const flat = [];
    const walk = (items) => {
      items.forEach((r) => {
        if (r.collapse || r.category) {
          if (r.layout && r.path) flat.push({ fullPath: r.layout + r.path, name: r.name });
          if (r.items) walk(r.items);
        } else {
          if (r.layout && r.path) flat.push({ fullPath: r.layout + r.path, name: r.name });
        }
      });
    };
    walk(routes);

    // Find all routes whose fullPath is a prefix of current
    const matches = flat.filter((f) => current === f.fullPath || current.startsWith(f.fullPath + '/'));
    // Sort by path length to get parent -> child order
    matches.sort((a, b) => a.fullPath.length - b.fullPath.length);
    // Return array of names (breadcrumb chain)
    return matches.map((m) => m.name);
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    const current = getRoutePath();
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        const fullPath = routes[i].layout + routes[i].path;
        if (current === fullPath || current.startsWith(fullPath + '/')) {
          return routes[i].secondary;
        }
      }
    }
    return activeNavbar;
  };
  const getActiveNavbarText = (routes) => {
    let activeNavbar = false;
    const current = getRoutePath();
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        const fullPath = routes[i].layout + routes[i].path;
        if (current === fullPath || current.startsWith(fullPath + '/')) {
          return routes[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((route, key) => {
      if (route.layout === '/admin') {
        return (
          <Route path={`${route.path}`} element={route.component} key={key} />
        );
      }
      if (route.collapse) {
        return getRoutes(route.items);
      } else {
        return null;
      }
    });
  };
  document.documentElement.dir = 'ltr';
  const { onOpen } = useDisclosure();
  document.documentElement.dir = 'ltr';
  return (
    <Box>
      <Box>
        <SidebarContext.Provider
          value={{
            toggleSidebar,
            setToggleSidebar,
          }}
        >
          <Sidebar routes={routes} display="none" {...rest} />
          <Box
            float="right"
            minHeight="100vh"
            height="100%"
            overflow="auto"
            position="relative"
            maxHeight="100%"
            w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
            maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
            transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
            transitionDuration=".2s, .2s, .35s"
            transitionProperty="top, bottom, width"
            transitionTimingFunction="linear, linear, ease"
          >
            <Portal>
              <Box>
                <Navbar
                  onOpen={onOpen}
                  logoText={'Horizon UI Dashboard PRO'}
                  brandText={getActiveRoute(routes)}
                  secondary={getActiveNavbar(routes)}
                  message={getActiveNavbarText(routes)}
                  fixed={fixed}
                  {...rest}
                />
              </Box>
            </Portal>

            {getRoute() ? (
              <Box
                mx="auto"
                p={{ base: '20px', md: '30px' }}
                pe="20px"
                minH="100vh"
                pt="50px"
              >
                <Routes>
                  {getRoutes(routes)}
                  <Route
                    path="/"
                    element={<Navigate to="/admin/default" replace />}
                  />
                </Routes>
              </Box>
            ) : null}
            <Box>
              <Footer />
            </Box>
          </Box>
        </SidebarContext.Provider>
      </Box>
    </Box>
  );
}
