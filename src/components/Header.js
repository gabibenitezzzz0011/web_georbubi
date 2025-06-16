import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import styled from 'styled-components';
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, useMediaQuery, useTheme, Box } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const HeaderContainer = styled(AppBar)`
  background: transparent;
  box-shadow: none;
  transition: all 0.5s ease;
  
  &.scrolled {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const Logo = styled.div`
  font-family: var(--fuente-romantica);
  font-size: 1.8rem;
  color: ${props => props.scrolled ? 'var(--color-rosa-oscuro)' : 'var(--color-blanco)'};
  text-shadow: ${props => props.scrolled ? 'none' : '1px 1px 2px rgba(0,0,0,0.5)'};
  transition: all 0.5s ease;
`;

const NavItem = styled(Button)`
  margin: 0 10px;
  color: ${props => props.scrolled ? 'var(--color-rosa-oscuro)' : 'var(--color-blanco)'};
  font-family: var(--fuente-texto);
  font-weight: 500;
  text-shadow: ${props => props.scrolled ? 'none' : '1px 1px 2px rgba(0,0,0,0.5)'};
  
  &:hover {
    background: ${props => props.scrolled ? 'rgba(244, 172, 183, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const MobileNavItem = styled(ListItem)`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

const DrawerContent = styled(Box)`
  width: 250px;
  height: 100%;
  background: linear-gradient(135deg, var(--color-rosa) 0%, var(--color-lila) 100%);
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled(IconButton)`
  align-self: flex-end;
  margin-bottom: 20px;
  color: white;
`;

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = [
    { name: 'Inicio', to: 'portada' },
    { name: 'Nuestra Historia', to: 'historia' },
    { name: 'Galería', to: 'galeria' },
    { name: 'Mensaje', to: 'mensaje' }
  ];

  return (
    <HeaderContainer position="fixed" className={scrolled ? 'scrolled' : ''}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Logo scrolled={scrolled}>Mi Amor</Logo>
        </motion.div>

        {isMobile ? (
          <>
            <IconButton 
              edge="end" 
              color="inherit" 
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <DrawerContent
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <CloseButton onClick={toggleDrawer(false)}>
                  <CloseIcon />
                </CloseButton>
                
                <List>
                  <AnimatePresence>
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <MobileNavItem>
                          <ScrollLink
                            to={item.to}
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={800}
                            style={{ 
                              width: '100%', 
                              textAlign: 'center',
                              color: 'white',
                              fontSize: '1.2rem',
                              fontFamily: 'var(--fuente-titulo)',
                              cursor: 'pointer'
                            }}
                          >
                            {item.name}
                          </ScrollLink>
                        </MobileNavItem>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </List>
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          <Box>
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                style={{ display: 'inline-block' }}
              >
                <NavItem 
                  scrolled={scrolled ? 1 : 0}
                  component={ScrollLink}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={800}
                >
                  {item.name}
                </NavItem>
              </motion.div>
            ))}
          </Box>
        )}
      </Toolbar>
    </HeaderContainer>
  );
}

export default Header; 