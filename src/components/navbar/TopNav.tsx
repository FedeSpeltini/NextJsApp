"use client";

import { Button, Link } from "@nextui-org/react";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarMenuToggle, 
  NavbarMenu, 
  NavbarMenuItem 
} from '@heroui/navbar';
import { GiMatchTip } from "react-icons/gi";
import NavLink from "./NavLink";
import { UserMenu } from "./UserMenu";
import FiltersWrapper from './FiltersWrapper';
import { User } from "@auth/core/types";
import { useState } from 'react';

type Props = {
    userInfo: User | undefined;
}

export default function TopNav({userInfo}: Props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
      <div className="w-full overflow-x-hidden">
        <Navbar
          maxWidth={"xl"}
          className="bg-gradient-to-r from-purple-400 to-purple-700 w-full"
          classNames={{
            base: ["w-full", "max-w-full"],
            wrapper: ["w-full", "max-w-full", "px-4"],
            item: [
              "text-lg md:text-xl",
              "text-white",
              "uppercase",
              "data-[active=true]:text-yellow-200",
            ],
            menu: [
              "bg-gradient-to-b from-purple-400 to-purple-700",
              "backdrop-blur-md",
              "!w-72", // Ancho fijo en lugar de w-full
              "!max-w-72", // Máximo ancho
              "!right-0", // Alineado a la derecha
              "!left-auto", // Anula el left por defecto
              "!top-16", // Posición desde el top
              "!h-screen", // Altura completa de la pantalla
              "!max-h-screen", // Altura máxima de la pantalla
              "rounded-l-lg", // Bordes redondeados en la izquierda
              "shadow-lg", // Sombra
              "!absolute", // Posición absoluta
              "!z-50" // Z-index alto
            ],
          }}
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
        >
          {/* Brand - Siempre visible */}
          <NavbarContent className="!grow-0 !shrink-0">
            <NavbarBrand as={Link} href="/" className="flex items-center gap-2 max-w-fit">
              <GiMatchTip size={28} className="text-gray-200 md:w-10 md:h-10 flex-shrink-0" />
              <div className="font-bold text-lg md:text-3xl flex whitespace-nowrap">
                <span className="text-gray-900">Next</span>
                <span className="text-gray-200">Match</span>
              </div>
            </NavbarBrand>
          </NavbarContent>

          {/* Links de navegación - Solo desktop */}
          <NavbarContent className="hidden md:flex !grow" justify="center">
            <NavLink href="/members" label="Matches" />
            <NavLink href="/lists" label="Lists" />
            <NavLink href="/messages" label="Messages" />
          </NavbarContent>

          {/* Botones de autenticación - Solo desktop */}
          <NavbarContent className="hidden md:flex !grow-0 !shrink-0" justify="end">
            {userInfo ? (
              <UserMenu user={{
                name: userInfo.name ?? null,
                image: userInfo.image ?? null
              }} />
            ) : (
              <div className="flex gap-2">
                <Button
                  as={Link}
                  href={"/login"}
                  variant={"bordered"}
                  className={
                    "text-white border-white hover:bg-white hover:text-purple-600"
                  }
                  size="sm"
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  href={"/register"}
                  variant={"bordered"}
                  className={
                    "text-white border-white hover:bg-white hover:text-purple-600"
                  }
                  size="sm"
                >
                  Register
                </Button>
              </div>
            )}
          </NavbarContent>

          {/* Toggle del menú móvil */}
          <NavbarContent className="md:hidden !grow-0 !shrink-0 flex" justify="end">
            {userInfo && (
              <div className="mr-2">
                <UserMenu user={{
                  name: userInfo.name ?? null,
                  image: userInfo.image ?? null
                }} />
              </div>
            )}
            <NavbarMenuToggle 
              className="text-white w-6 h-6"
              aria-label="toggle navigation"
            />
          </NavbarContent>

          {/* Menú móvil - Ahora más compacto y a la derecha */}
          <NavbarMenu className="pt-4 px-4">
            <div className="flex flex-col gap-1">
              <NavbarMenuItem>
                <Link
                  href="/members"
                  className="w-full text-white text-base py-2 px-3 hover:bg-white/20 rounded-md transition-colors block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Matches
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  href="/lists"
                  className="w-full text-white text-base py-2 px-3 hover:bg-white/20 rounded-md transition-colors block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Lists
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  href="/messages"
                  className="w-full text-white text-base py-2 px-3 hover:bg-white/20 rounded-md transition-colors block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Messages
                </Link>
              </NavbarMenuItem>
              
              {/* Botones de autenticación en móvil */}
              {!userInfo && (
                <>
                  <NavbarMenuItem className="mt-3">
                    <Button 
                      as={Link} 
                      href={'/login'} 
                      variant={'bordered'} 
                      className={'text-white border-white hover:bg-white hover:text-purple-600 w-full'}
                      size="sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Button>
                  </NavbarMenuItem>
                  <NavbarMenuItem className="mt-2">
                    <Button 
                      as={Link} 
                      href={'/register'} 
                      variant={'solid'}
                      className={'bg-white text-purple-600 hover:bg-gray-100 w-full'}
                      size="sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Button>
                  </NavbarMenuItem>
                </>
              )}
            </div>
          </NavbarMenu>
        </Navbar>
        
        {/* Overlay para cerrar el menú al hacer clic fuera */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
        
        <FiltersWrapper />
      </div>
    );
}