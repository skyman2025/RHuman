'use client'

import { useState,useEffect } from 'react';
import { getProfessions } from '../apiController/professionApi';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  CursorArrowRaysIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

/* const products = [
  { name: 'Desarrollador de Software', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Ingeniero de Sistemas', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Analista de Datos', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Especialista en Ciberseguridad', href: '#', icon: CursorArrowRaysIcon  },
  { name: 'Administrador de Base de Datos', href: '#', icon: CursorArrowRaysIcon  },
  { name: 'Ingeniero DevOps', href: '#', icon: CursorArrowRaysIcon  },
  { name: 'Arquitecto de Soluciones', href: '#', icon: CursorArrowRaysIcon  },
  { name: 'Desarrollador Front End', href: '#', icon: CursorArrowRaysIcon  },
  { name: 'Desarrollador Back End', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Analista de Sistemas', href: '#', icon: CursorArrowRaysIcon  },
] */

export default function NavigationBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profesions,setProfesions] = useState([]);

  useEffect(() => {
    getProfessions().then(res => {
      setProfesions(res);
    });
  },[]);

  return (
  <header className="bg-white">
    <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
      <div className="flex lg:flex-1">
        <a href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img alt="" src="/rrhh.png" className="h-12 w-auto" />
        </a>
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon aria-hidden="true" className="h-6 w-6" />
        </button>
      </div>
      <PopoverGroup className="hidden lg:flex lg:gap-x-12">
        <Popover className="flex items-center relative">
          <PopoverButton className="flex items-center gap-x-1 text-base font-semibold leading-7 text-gray-900 hover:bg-blue-100 transition px-4 py-2 rounded-lg">
            Profesiones
            <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
          </PopoverButton>

          <PopoverPanel
            transition
            className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="p-4">
              {profesions.map((item) => (
                <div
                  key={"k"+item.name}
                  className="group relative flex items-center gap-x-6 rounded-lg p-1 text-sm leading-6 hover:bg-blue-100"
                >
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white p-1 m-1">
                    <CursorArrowRaysIcon aria-hidden="true" className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" />
                  </div>
                  <div className="flex-auto">
                    <a href={`/applicants?profession=${encodeURIComponent(item.name)}`} className="block font-semibold text-gray-900">
                      {item.name}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </PopoverPanel>
        </Popover>

        <a href="/error" className="text-base font-semibold leading-7 text-gray-900 hover:bg-blue-100 rounded-lg px-4 py-2 transition">Empresas</a>
        <a href="/applicants" className=" text-base font-semibold leading-7 text-gray-900 hover:bg-blue-100 rounded-lg px-4 py-2 transition">Aspirantes</a>
        <a href="/contact" className="text-base font-semibold leading-7 text-gray-900 hover:bg-blue-100  rounded-lg px-4 py-2 transition">Contacto</a>
      </PopoverGroup>

      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <a
          href="/applicants/register"
          className="flex-none rounded-full custom-link px-3.5 py-1 text-base font-semibold leading-7 text-white rounded-lg px-4 py-2 transition"
        >
          Postulate
        </a>
      </div>

      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="/login" className="custom-link px-3.5 py-1 text-base font-semibold leading-7 text-white rounded-lg px-4 py-2 transition">
          Acceder <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </nav>

    <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
      <div className="fixed inset-0 z-10" />
      <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="" src="/rrhh.png" className="h-12 w-auto" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <Disclosure as="div" className="-mx-3">
                <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-blue-100 transition">
                  Profesiones
                  <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
                </DisclosureButton>

                <DisclosurePanel className="mt-2 space-y-2">
                  {profesions.map((item) => (
                    <DisclosureButton
                      key={"k2"+item.name}
                      as="a"
                      href={`/applicants?profession=${encodeURIComponent(item.name)}`}
                      className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-blue-100 transition"
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </DisclosurePanel>
              </Disclosure>

              <a
                href="/error"
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-blue-100 transition"
              >
                Empresas
              </a>
              <a
                href="/applicants"
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900  hover:bg-blue-100 transition"
              >
                Aspirantes
              </a>
              <a
                href="/contact"
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-blue-100 transition"
              >
                Contacto
              </a>
            </div>

            <div className="py-6">
              <a
                href="/applicants/register"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-blue-100 transition"
              >
                Postular
              </a>
            </div>

            <div className="py-6">
              <a
                href="/login"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900  hover:bg-blue-100 transition"
              >
                Acceder
              </a>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
  )
}
