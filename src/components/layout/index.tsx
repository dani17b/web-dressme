import React, { useState } from "react";
import {
  Avatar,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  useDisclosure,
} from "@nextui-org/react";
import { Route, routes } from "../../routes";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

export const Layout = (props: any) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = routes
    .filter((route: Route) => {
      if (route.menuLink === undefined) {
        return false;
      }

      return !route.visibleForRoles;
    })
    .map((route: Route) => ({
      name: route.menuLink?.name,
      link: route.menuLink?.link,
      key: route.menuLink?.key,
    }));

  return (
    <div className="app flex flex-col">
      <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            data-testid="menu-toggle"
          />
          <Link
            color="foreground"
            className="cursor-pointer"
            onPress={() => {
              navigate(`/`);
              setIsMenuOpen(false);
            }}
          >
            <NavbarBrand>
              <div className="font-bold text-inherit flex items-center">
                <img src="/logo_small.png" alt="DressMe" className="h-8" />
              </div>
            </NavbarBrand>
          </Link>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {props.title && <NavbarItem>{props.title}</NavbarItem>}
        </NavbarContent>
        
        <NavbarMenu className="z-50">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full cursor-pointer"
                size="lg"
                data-testid={item.key}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`${item.link}`);
                  setIsMenuOpen(false);
                }}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <div className="flex h-max flex-1 items-center flex-col">
        <div className="flex z-40 max-w-[1024px] w-full h-auto items-center justify-center p-4">
          {props.children}
        </div>
      </div>
    </div>
  );
};
